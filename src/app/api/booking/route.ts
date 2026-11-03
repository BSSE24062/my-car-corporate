import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';
import { BASE_URL } from '@/lib/seo-schema';

interface RouteCoords {
  lat: number;
  lng: number;
}

interface IncomingRouteInfo {
  distanceText?: string;
  durationText?: string;
  etaText?: string;
  pickupCoords?: RouteCoords;
  dropoffCoords?: RouteCoords;
  encodedPolyline?: string;
  googleMapsUrl?: string;
}

interface BookingRequestBody {
  requestType?: 'booking' | 'quote';
  name?: string;
  contactNumber?: string;
  email?: string;
  serviceType?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  date?: string;
  pickupTime?: string;
  flightNumber?: string;
  passengerCount?: string;
  luggageCount?: string;
  vehiclePreference?: string;
  details?: string;
  routeInfo?: IncomingRouteInfo;
}

/**
 * SHA-256 hashes of deprecated developer personal email addresses / domains.
 * Prevents accidental personal sender profile cards if stale environment variables remain in hosting.
 */
const BLOCKED_SENDER_HASHES = new Set([
  '107ca057e784daa399f2b10ed2e2cf564c652f097616f5a60a9af77f8681c5eb',
  '4c2f79abe5138d14571c0157c35f2355a711af63f0d3739ccbf54f8151e6265b',
  '73a96f0f157198a53d48fa6983e13dff7c7c7a9fee41c7d8dd3013e813942716',
  '1d0258c84ee9cbe50e4038684dad86b7da12c5e5f61e7963faddfdedd224c6e5',
]);

function sha256Lower(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

function isBlockedPersonalAddress(emailAddr: string | undefined): boolean {
  if (!emailAddr) return false;
  const normalized = emailAddr.trim().toLowerCase();
  if (!normalized) return false;
  if (BLOCKED_SENDER_HASHES.has(sha256Lower(normalized))) {
    return true;
  }
  const domain = normalized.split('@')[1];
  if (domain && BLOCKED_SENDER_HASHES.has(sha256Lower(domain))) {
    return true;
  }
  return false;
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeHeaderToken(raw: string): string {
  return raw.replace(/[\r\n"<>\\]/g, ' ').replace(/\s+/g, ' ').trim();
}

function toWhatsAppDigits(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) {
    return digits.slice(1);
  }
  // Convert Australian local mobile 04xx xxx xxx -> 614xx xxx xxx
  if (digits.startsWith('0') && digits.length === 10) {
    return `61${digits.slice(1)}`;
  }
  return digits;
}

function hasValidCoords(coords?: RouteCoords): coords is RouteCoords {
  return Boolean(
    coords &&
      typeof coords.lat === 'number' &&
      typeof coords.lng === 'number' &&
      (coords.lat !== 0 || coords.lng !== 0) &&
      !Number.isNaN(coords.lat) &&
      !Number.isNaN(coords.lng)
  );
}

function buildDirectionsFallbackUrl(
  pickupLocation: string,
  dropoffLocation: string,
  routeInfo?: IncomingRouteInfo
): string {
  if (routeInfo?.googleMapsUrl && routeInfo.googleMapsUrl.startsWith('https://www.google.com/maps')) {
    return routeInfo.googleMapsUrl;
  }
  const params = new URLSearchParams({
    api: '1',
    origin: pickupLocation,
    destination: dropoffLocation,
    travelmode: 'driving',
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

interface StaticMapData {
  attachment: Mail.Attachment;
  base64Content: string;
}

/**
 * Fetches a high-DPI Google Static Map PNG showing Pickup (A), Destination (B),
 * and the encoded driving route polyline, returning an inline CID attachment for email clients.
 */
async function fetchStaticRouteMapAttachment(
  pickupLocation: string,
  dropoffLocation: string,
  routeInfo?: IncomingRouteInfo
): Promise<StaticMapData | null> {
  const apiKey = (
    process.env.GOOGLE_MAPS_SERVER_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    ''
  ).trim();

  if (!apiKey || apiKey.toLowerCase().includes('your_') || apiKey.length < 15) {
    return null;
  }

  if (!pickupLocation && !dropoffLocation) {
    return null;
  }

  const originParam = hasValidCoords(routeInfo?.pickupCoords)
    ? `${routeInfo.pickupCoords.lat},${routeInfo.pickupCoords.lng}`
    : pickupLocation;
  const destParam = hasValidCoords(routeInfo?.dropoffCoords)
    ? `${routeInfo.dropoffCoords.lat},${routeInfo.dropoffCoords.lng}`
    : dropoffLocation;

  const url = new URL('https://maps.googleapis.com/maps/api/staticmap');
  url.searchParams.set('size', '640x320');
  url.searchParams.set('scale', '2');
  url.searchParams.set('maptype', 'roadmap');
  url.searchParams.set('region', 'AU');
  url.searchParams.set('language', 'en-AU');

  // Subtle dark-slate & gold styling matching Elite Cars Australia
  const mapStyles = [
    'element:geometry|color:0x141821',
    'element:labels.text.fill|color:0xb0b8c8',
    'element:labels.text.stroke|color:0x141821',
    'feature:road|element:geometry|color:0x272f3f',
    'feature:road.highway|element:geometry|color:0x364156',
    'feature:water|element:geometry|color:0x0b0f17',
  ];
  for (const s of mapStyles) {
    url.searchParams.append('style', s);
  }

  url.searchParams.append('markers', `color:0xc9a86a|label:A|${originParam}`);
  url.searchParams.append('markers', `color:0x1f2937|label:B|${destParam}`);

  if (routeInfo?.encodedPolyline) {
    url.searchParams.set('path', `color:0xc9a86aff|weight:5|enc:${routeInfo.encodedPolyline}`);
  } else {
    url.searchParams.set('path', `color:0xc9a86aff|weight:4|${originParam}|${destParam}`);
  }

  url.searchParams.set('key', apiKey);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Referer: `${BASE_URL}/`,
      },
      signal: AbortSignal.timeout(6500),
    });

    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || !contentType.startsWith('image/')) {
      return null;
    }

    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.byteLength < 200) {
      return null;
    }

    return {
      attachment: {
        filename: 'chauffeur-route-map.png',
        content: bytes,
        contentType: 'image/png',
        cid: 'elite-booking-route-map',
        contentDisposition: 'inline',
      },
      base64Content: bytes.toString('base64'),
    };
  } catch {
    return null;
  }
}

/**
 * Sends booking/quote notification via Microsoft Graph OAuth 2.0 (works with MFA & Microsoft Authenticator enabled,
 * no App Password or Basic SMTP Auth required).
 */
async function sendViaMicrosoftGraph(params: {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  fromEmail: string;
  fromDisplayName: string;
  toEmail: string;
  replyToName: string;
  replyToEmail: string;
  subject: string;
  htmlBody: string;
  inlineMapBase64?: string;
}): Promise<void> {
  const tokenRes = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(params.tenantId)}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: params.clientId,
        client_secret: params.clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }).toString(),
    }
  );

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    throw new Error(`Microsoft OAuth token error (${tokenRes.status}): ${errText}`);
  }

  const tokenData = (await tokenRes.json()) as { access_token?: string };
  if (!tokenData.access_token) {
    throw new Error('Microsoft OAuth response did not include an access_token.');
  }

  const graphPayload = {
    message: {
      subject: params.subject,
      from: {
        emailAddress: {
          name: params.fromDisplayName,
          address: params.fromEmail,
        },
      },
      toRecipients: [
        {
          emailAddress: {
            address: params.toEmail,
          },
        },
      ],
      replyTo: [
        {
          emailAddress: {
            name: params.replyToName,
            address: params.replyToEmail,
          },
        },
      ],
      body: {
        contentType: 'HTML',
        content: params.htmlBody,
      },
      attachments: params.inlineMapBase64
        ? [
            {
              '@odata.type': '#microsoft.graph.fileAttachment',
              name: 'chauffeur-route-map.png',
              contentType: 'image/png',
              contentId: 'elite-booking-route-map',
              isInline: true,
              contentBytes: params.inlineMapBase64,
            },
          ]
        : [],
    },
    saveToSentItems: true,
  };

  const sendRes = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(params.fromEmail)}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphPayload),
    }
  );

  if (!sendRes.ok) {
    const errText = await sendRes.text();
    throw new Error(`Microsoft Graph sendMail error (${sendRes.status}): ${errText}`);
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingRequestBody;
    const {
      requestType = 'booking',
      name = '',
      contactNumber = '',
      email = '',
      serviceType = '',
      pickupLocation = '',
      dropoffLocation = '',
      date = '',
      pickupTime = '',
      flightNumber = '',
      passengerCount = '',
      luggageCount = '',
      vehiclePreference = '',
      details = '',
      routeInfo,
    } = body;

    // 1. Validate required customer fields
    const cleanName = name.trim();
    const cleanPhone = contactNumber.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanPhone || !cleanEmail) {
      return NextResponse.json(
        {
          error:
            'Missing required contact fields. Please provide your Name, Phone Number, and Email.',
        },
        { status: 400 }
      );
    }

    const isQuote = requestType === 'quote';
    const typeLabel = isQuote ? 'Price Quotation Request' : 'Confirmed Booking Reservation';
    const typeShort = isQuote ? 'Quote Request' : 'Booking';

    // 2. Validate mail configuration (supports either Microsoft Graph OAuth 2.0 OR standard SMTP)
    const msTenantId = (process.env.MS_TENANT_ID || '').trim();
    const msClientId = (process.env.MS_CLIENT_ID || '').trim();
    const msClientSecret = (process.env.MS_CLIENT_SECRET || '').trim();
    const hasGraphConfig = Boolean(
      msTenantId &&
        msClientId &&
        msClientSecret &&
        !msClientSecret.toLowerCase().includes('your_')
    );

    const smtpUser = (process.env.SMTP_USER || '').trim();
    const smtpPass = (process.env.SMTP_PASS || '').trim();
    const hasSmtpConfig = Boolean(
      smtpUser &&
        smtpPass &&
        !smtpPass.toLowerCase().includes('your_') &&
        !smtpUser.toLowerCase().includes('your_')
    );

    const smtpFromEmail = (
      process.env.SMTP_FROM_EMAIL ||
      smtpUser ||
      'info@elitecarsaustralia.com.au'
    ).trim();
    const recipientEmail = (
      process.env.BOOKING_NOTIFICATION_EMAIL || 'info@elitecarsaustralia.com.au'
    ).trim();

    if (
      isBlockedPersonalAddress(smtpUser) ||
      isBlockedPersonalAddress(smtpFromEmail) ||
      isBlockedPersonalAddress(recipientEmail)
    ) {
      console.error(
        'Blocked deprecated personal SMTP email configuration. Update SMTP_USER to info@elitecarsaustralia.com.au in environment variables.'
      );
      return NextResponse.json(
        {
          error:
            'Email sender configuration requires Elite Cars Australia business credentials (info@elitecarsaustralia.com.au). Please update SMTP_USER and SMTP_PASS in hosting environment variables.',
        },
        { status: 500 }
      );
    }

    if (!hasGraphConfig && !hasSmtpConfig) {
      console.warn(
        'Mail business credentials are not configured yet in environment variables. Returning graceful acknowledgment.'
      );
      return NextResponse.json({
        success: true,
        message: `${typeLabel} received successfully! Our team will contact you shortly.`,
      });
    }

    // 3. Fetch inline Google Static Map visual of Pickup -> Destination route (if API key configured)
    const mapData = await fetchStaticRouteMapAttachment(
      pickupLocation.trim(),
      dropoffLocation.trim(),
      routeInfo
    );

    const directionsUrl = buildDirectionsFallbackUrl(
      pickupLocation.trim(),
      dropoffLocation.trim(),
      routeInfo
    );

    // 4. Escape all dynamic fields for clean, safe HTML rendering
    const safeName = escapeHtml(cleanName);
    const safePhone = escapeHtml(cleanPhone);
    const safeEmail = escapeHtml(cleanEmail);
    const safeService = escapeHtml(serviceType || 'Standard Chauffeur');
    const safePickup = escapeHtml(pickupLocation || 'Not specified');
    const safeDropoff = escapeHtml(dropoffLocation || 'Not specified');
    const safeDate = escapeHtml(date || 'TBD');
    const safeTime = escapeHtml(pickupTime || '');
    const safeFlight = escapeHtml(flightNumber || 'N/A');
    const safePassengers = escapeHtml(passengerCount || '1');
    const safeLuggage = escapeHtml(luggageCount || 'Standard');
    const safeVehicle = escapeHtml(vehiclePreference || 'Best Available');
    const safeDetails = escapeHtml(details || 'No additional details provided.');

    const safeDistance = escapeHtml(routeInfo?.distanceText || '');
    const safeDuration = escapeHtml(routeInfo?.durationText || '');
    const safeEta = escapeHtml(routeInfo?.etaText || '');
    const safeDirectionsUrl = escapeHtml(directionsUrl);
    const waDigits = toWhatsAppDigits(cleanPhone);

    const headerCustomerName = sanitizeHeaderToken(cleanName) || 'Customer';

    const routeTelemetryHtml =
      safeDistance || safeDuration || safeEta
        ? `
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #141821; border-radius: 8px; margin-top: 12px; overflow: hidden;">
            <tr>
              <td style="padding: 12px 14px; width: 33.33%; border-right: 1px solid #262d3d;">
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af;">Distance</div>
                <div style="font-size: 15px; font-weight: bold; color: #ffffff; margin-top: 3px;">${safeDistance || 'N/A'}</div>
              </td>
              <td style="padding: 12px 14px; width: 33.33%; border-right: 1px solid #262d3d;">
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af;">Travel Time</div>
                <div style="font-size: 15px; font-weight: bold; color: #ffffff; margin-top: 3px;">${safeDuration || 'N/A'}</div>
              </td>
              <td style="padding: 12px 14px; width: 33.33%;">
                <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af;">Est. Arrival (ETA)</div>
                <div style="font-size: 14px; font-weight: bold; color: #c9a86a; margin-top: 3px;">${safeEta || 'See live route'}</div>
              </td>
            </tr>
          </table>
        `
        : '';

    const routeMapVisualHtml = mapData
      ? `
          <div style="margin-top: 14px; border-radius: 10px; overflow: hidden; border: 1px solid #d8c39e;">
            <a href="${safeDirectionsUrl}" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none;">
              <img
                src="cid:elite-booking-route-map"
                alt="Google Map Route from Pickup to Destination"
                width="600"
                style="display: block; width: 100%; max-width: 600px; height: auto; border: 0;"
              />
            </a>
          </div>
        `
      : '';

    const emailSubject = `[${typeShort}] ${headerCustomerName} — ${
      pickupLocation ? sanitizeHeaderToken(pickupLocation).slice(0, 42) : 'Elite Cars Australia'
    }`;

    const mailOptions: Mail.Options = {
      // Sent strictly from Elite Cars Australia's business mailbox so email clients never show a personal profile card
      from: `"Elite Cars Australia (${typeShort})" <${smtpFromEmail}>`,
      to: recipientEmail,
      // Replying in Gmail/Outlook/Apple Mail replies directly to the customer's name and email
      replyTo: `"${headerCustomerName}" <${cleanEmail}>`,
      subject: emailSubject,
      attachments: mapData ? [mapData.attachment] : [],
      text: [
        `ELITE CARS AUSTRALIA — ${typeLabel.toUpperCase()}`,
        '==================================================',
        '',
        'CUSTOMER CONTACT DETAILS',
        `Customer Name:      ${cleanName}`,
        `Phone Number:       ${cleanPhone}`,
        `Email Address:      ${cleanEmail}`,
        '',
        'ROUTE & ITINERARY',
        `Request Type:       ${typeLabel}`,
        `Service Selected:   ${serviceType || 'Not specified'}`,
        `Pickup (A):         ${pickupLocation || 'Not specified'}`,
        `Destination (B):    ${dropoffLocation || 'Not specified'}`,
        ...(routeInfo?.distanceText ? [`Route Distance:     ${routeInfo.distanceText}`] : []),
        ...(routeInfo?.durationText ? [`Est. Travel Time:   ${routeInfo.durationText}`] : []),
        ...(routeInfo?.etaText ? [`Est. Arrival (ETA): ${routeInfo.etaText}`] : []),
        `Google Maps Route:  ${directionsUrl}`,
        '',
        'BOOKING SCHEDULE & VEHICLE',
        `Target Date:        ${date || 'Not specified'}`,
        `Pickup Time:        ${pickupTime || 'Not specified'}`,
        `Flight Number:      ${flightNumber || 'N/A'}`,
        `Passengers:         ${passengerCount || 'Not specified'}`,
        `Luggage:            ${luggageCount || 'Not specified'}`,
        `Vehicle Preference: ${vehiclePreference || 'Best Available'}`,
        '',
        'ADDITIONAL NOTES:',
        details || 'No additional details provided.',
        '==================================================',
        'Elite Cars Australia Reservation Dispatch',
      ].join('\n'),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 18px; background-color: #f4f5f7;">
          <div style="background-color: #0b0d12; padding: 22px 24px; text-align: center; border-radius: 10px 10px 0 0; border-bottom: 2px solid #c9a86a;">
            <h2 style="color: #ffffff; margin: 0; font-family: Georgia, serif; letter-spacing: 1.5px; font-size: 20px;">ELITE CARS AUSTRALIA</h2>
            <p style="color: #c9a86a; margin: 6px 0 0 0; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">${typeLabel}</p>
          </div>

          <div style="padding: 24px; background-color: #ffffff; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb; border-top: none;">
            <!-- Prominent Customer Identity & One-Tap Actions -->
            <div style="background-color: #faf7f0; border: 1px solid #ead9b7; border-radius: 10px; padding: 16px 18px; margin-bottom: 22px;">
              <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #9a7632; margin-bottom: 4px;">Customer Details (Reply directly to this email to respond)</div>
              <div style="font-size: 19px; font-weight: bold; color: #111827; margin-bottom: 4px;">${safeName}</div>
              <div style="font-size: 14px; color: #374151; margin-bottom: 12px;">
                <a href="tel:${safePhone}" style="color: #111827; text-decoration: none; font-weight: 600;">${safePhone}</a>
                &nbsp;&bull;&nbsp;
                <a href="mailto:${safeEmail}" style="color: #9a7632; text-decoration: none; font-weight: 600;">${safeEmail}</a>
              </div>
              <div>
                <a href="tel:${safePhone}" style="display: inline-block; background-color: #111827; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: bold; padding: 8px 14px; border-radius: 6px; margin-right: 8px;">Call Customer</a>
                <a href="mailto:${safeEmail}" style="display: inline-block; background-color: #c9a86a; color: #000000; text-decoration: none; font-size: 12px; font-weight: bold; padding: 8px 14px; border-radius: 6px; margin-right: 8px;">Email Customer</a>
                ${
                  waDigits
                    ? `<a href="https://wa.me/${escapeHtml(waDigits)}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #1f9d55; color: #ffffff; text-decoration: none; font-size: 12px; font-weight: bold; padding: 8px 14px; border-radius: 6px;">WhatsApp</a>`
                    : ''
                }
              </div>
            </div>

            <!-- Pickup, Destination & Google Maps Visual Section -->
            <h3 style="color: #111827; font-size: 15px; margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #f1f3f5; text-transform: uppercase; letter-spacing: 0.6px;">Route &amp; Google Maps Overview</h3>

            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
              <tr>
                <td style="padding: 8px 0; vertical-align: top; width: 32px;">
                  <span style="display: inline-block; width: 22px; height: 22px; line-height: 22px; text-align: center; border-radius: 50%; background-color: #c9a86a; color: #000000; font-weight: bold; font-size: 12px;">A</span>
                </td>
                <td style="padding: 6px 0; vertical-align: top;">
                  <div style="font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: bold;">Pickup Location</div>
                  <div style="font-size: 14px; color: #111827; font-weight: 600; margin-top: 2px;">${safePickup}</div>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; vertical-align: top; width: 32px;">
                  <span style="display: inline-block; width: 22px; height: 22px; line-height: 22px; text-align: center; border-radius: 50%; background-color: #1f2937; color: #ffffff; font-weight: bold; font-size: 12px;">B</span>
                </td>
                <td style="padding: 6px 0; vertical-align: top;">
                  <div style="font-size: 11px; text-transform: uppercase; color: #6b7280; font-weight: bold;">Destination / Drop-off</div>
                  <div style="font-size: 14px; color: #111827; font-weight: 600; margin-top: 2px;">${safeDropoff}</div>
                </td>
              </tr>
            </table>

            ${routeTelemetryHtml}
            ${routeMapVisualHtml}

            <div style="margin-top: 12px; margin-bottom: 24px; text-align: center;">
              <a href="${safeDirectionsUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; width: 100%; box-sizing: border-box; background-color: #0b0d12; color: #c9a86a; border: 1px solid #c9a86a; text-decoration: none; font-size: 13px; font-weight: bold; padding: 11px 16px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.8px;">
                Open Live Route &amp; Directions in Google Maps &rarr;
              </a>
            </div>

            <!-- Trip & Vehicle Details -->
            <h3 style="color: #111827; font-size: 15px; margin: 0 0 10px 0; padding-bottom: 8px; border-bottom: 2px solid #f1f3f5; text-transform: uppercase; letter-spacing: 0.6px;">Schedule &amp; Fleet Specifications</h3>

            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 9px 0; color: #6b7280; font-weight: 600; width: 165px; border-bottom: 1px solid #f3f4f6;">Request Type</td>
                <td style="padding: 9px 0; color: #9a7632; font-weight: bold; border-bottom: 1px solid #f3f4f6;">${typeLabel}</td>
              </tr>
              <tr>
                <td style="padding: 9px 0; color: #6b7280; font-weight: 600; border-bottom: 1px solid #f3f4f6;">Service Type</td>
                <td style="padding: 9px 0; color: #111827; border-bottom: 1px solid #f3f4f6; text-transform: capitalize;">${safeService}</td>
              </tr>
              <tr>
                <td style="padding: 9px 0; color: #6b7280; font-weight: 600; border-bottom: 1px solid #f3f4f6;">Date &amp; Pickup Time</td>
                <td style="padding: 9px 0; color: #111827; font-weight: 600; border-bottom: 1px solid #f3f4f6;">${safeDate}${safeTime ? ` at ${safeTime}` : ''}</td>
              </tr>
              <tr>
                <td style="padding: 9px 0; color: #6b7280; font-weight: 600; border-bottom: 1px solid #f3f4f6;">Flight Number</td>
                <td style="padding: 9px 0; color: #111827; border-bottom: 1px solid #f3f4f6;">${safeFlight}</td>
              </tr>
              <tr>
                <td style="padding: 9px 0; color: #6b7280; font-weight: 600; border-bottom: 1px solid #f3f4f6;">Passengers &amp; Luggage</td>
                <td style="padding: 9px 0; color: #111827; border-bottom: 1px solid #f3f4f6;">${safePassengers} Passengers &middot; ${safeLuggage}</td>
              </tr>
              <tr>
                <td style="padding: 9px 0; color: #6b7280; font-weight: 600; border-bottom: 1px solid #f3f4f6;">Vehicle Preference</td>
                <td style="padding: 9px 0; color: #111827; font-weight: 600; border-bottom: 1px solid #f3f4f6;">${safeVehicle}</td>
              </tr>
            </table>

            <h3 style="color: #111827; font-size: 15px; margin: 20px 0 10px 0; padding-bottom: 8px; border-bottom: 2px solid #f1f3f5; text-transform: uppercase; letter-spacing: 0.6px;">Additional Itinerary Notes</h3>
            <div style="background-color: #f9fafb; border-left: 4px solid #c9a86a; padding: 14px 16px; color: #374151; border-radius: 0 6px 6px 0; white-space: pre-wrap; font-size: 14px; line-height: 1.55;">${safeDetails}</div>
          </div>

          <div style="text-align: center; margin-top: 16px; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Elite Cars Australia &middot; info@elitecarsaustralia.com.au &middot; +61 430 729 993</p>
          </div>
        </div>
      `,
    };

    // 5. Send Mail (prefer Microsoft Graph OAuth 2.0 when configured, otherwise SMTP)
    if (hasGraphConfig) {
      await sendViaMicrosoftGraph({
        tenantId: msTenantId,
        clientId: msClientId,
        clientSecret: msClientSecret,
        fromEmail: smtpFromEmail,
        fromDisplayName: `Elite Cars Australia (${typeShort})`,
        toEmail: recipientEmail,
        replyToName: headerCustomerName,
        replyToEmail: cleanEmail,
        subject: emailSubject,
        htmlBody: String(mailOptions.html || ''),
        inlineMapBase64: mapData?.base64Content,
      });
    } else {
      const smtpHost = (process.env.SMTP_HOST || 'smtp.office365.com').trim();
      const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
      const smtpSecure = process.env.SMTP_SECURE === 'true';

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        requireTLS: !smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({
      success: true,
      message: `${typeLabel} has been submitted successfully! We will contact you shortly.`,
    });
  } catch (error: unknown) {
    console.error('Nodemailer SMTP Error:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown mail transport error';
    return NextResponse.json(
      { error: `Mailer Error: Failed to send notification. Details: ${errMsg}` },
      { status: 500 }
    );
  }
}
