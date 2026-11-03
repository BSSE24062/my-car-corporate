"use client";

import React, { useState, useRef, useEffect, useId } from 'react';
import { MapPin, X } from 'lucide-react';
import {
  PlaceSuggestionItem,
  ResolvedPlace,
  isGoogleMapsConfigured,
  createAutocompleteSessionToken,
  fetchAustralianPlaceSuggestions,
  resolvePlaceSelection,
  geocodeAustralianAddress,
} from '@/lib/google-maps';
import styles from './LocationAutocompleteInput.module.css';

interface LocationAutocompleteInputProps {
  name: string;
  value: string;
  placeholder: string;
  variant: 'pickup' | 'dropoff';
  required?: boolean;
  resolvedPlace: ResolvedPlace | null;
  onValueChange: (newValue: string) => void;
  onPlaceResolved: (place: ResolvedPlace | null) => void;
}

const LocationAutocompleteInput: React.FC<LocationAutocompleteInputProps> = ({
  name,
  value,
  placeholder,
  variant,
  required = false,
  resolvedPlace,
  onValueChange,
  onPlaceResolved,
}) => {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionTokenRef = useRef<object | undefined>(undefined);
  const requestSeqRef = useRef(0);

  const [suggestions, setSuggestions] = useState<PlaceSuggestionItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const mapsEnabled = isGoogleMapsConfigured();

  // Close suggestions dropdown on outside click
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const ensureSessionToken = async (): Promise<object | undefined> => {
    if (!sessionTokenRef.current) {
      sessionTokenRef.current = await createAutocompleteSessionToken();
    }
    return sessionTokenRef.current;
  };

  const triggerAutocomplete = (query: string) => {
    if (!mapsEnabled) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setIsFetching(false);
      return;
    }

    const seq = ++requestSeqRef.current;
    setIsFetching(true);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const token = await ensureSessionToken();
        const items = await fetchAustralianPlaceSuggestions(trimmed, token);
        if (seq !== requestSeqRef.current) return;
        setSuggestions(items);
        setIsOpen(items.length > 0);
        setActiveIndex(items.length > 0 ? 0 : -1);
      } catch {
        if (seq === requestSeqRef.current) {
          setSuggestions([]);
          setIsOpen(false);
        }
      } finally {
        if (seq === requestSeqRef.current) {
          setIsFetching(false);
        }
      }
    }, 220);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVal = e.target.value;
    onValueChange(nextVal);
    if (resolvedPlace && resolvedPlace.address !== nextVal) {
      onPlaceResolved(null);
    }
    triggerAutocomplete(nextVal);
  };

  const handleSelectSuggestion = async (item: PlaceSuggestionItem) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    requestSeqRef.current += 1;
    setIsOpen(false);
    setSuggestions([]);
    setActiveIndex(-1);
    onValueChange(item.fullText);
    setIsFetching(true);

    try {
      const resolved = await resolvePlaceSelection(item);
      // Reset session token after completing a Place Details selection per Google billing best practices
      sessionTokenRef.current = undefined;
      if (resolved) {
        onValueChange(resolved.address);
        onPlaceResolved(resolved);
      }
    } catch {
      sessionTokenRef.current = undefined;
    } finally {
      setIsFetching(false);
    }
  };

  const handleBlur = async () => {
    // Give mousedown on dropdown items priority; if user typed manually without selecting, geocode on blur
    setTimeout(async () => {
      if (!mapsEnabled) return;
      if (containerRef.current && containerRef.current.contains(document.activeElement)) {
        return;
      }
      setIsOpen(false);
      if (!resolvedPlace && value.trim().length >= 4) {
        setIsFetching(true);
        try {
          const geocoded = await geocodeAustralianAddress(value);
          if (geocoded) {
            onPlaceResolved(geocoded);
          }
        } finally {
          setIsFetching(false);
        }
      }
    }, 180);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0 && activeIndex < suggestions.length) {
      e.preventDefault();
      void handleSelectSuggestion(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const handleClear = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    requestSeqRef.current += 1;
    onValueChange('');
    onPlaceResolved(null);
    setSuggestions([]);
    setIsOpen(false);
    setIsFetching(false);
  };

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <div className={styles.inputShell}>
        <span className={styles.leadingMarker} aria-hidden="true">
          <span className={variant === 'pickup' ? styles.pickupDot : styles.dropoffSquare} />
        </span>

        <input
          type="text"
          name={name}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            } else if (value.trim().length >= 2 && !resolvedPlace) {
              triggerAutocomplete(value);
            }
          }}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          className={`${styles.input} ${resolvedPlace ? styles.inputResolved : ''}`}
        />

        <span className={styles.trailingActions}>
          {isFetching && <span className={styles.spinner} aria-label="Searching locations" />}
          {value.length > 0 && !isFetching && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label={`Clear ${variant === 'pickup' ? 'pickup' : 'drop-off'} location`}
            >
              <X size={13} />
            </button>
          )}
        </span>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className={styles.dropdown}>
          <ul id={listboxId} role="listbox" className={styles.suggestionList}>
            {suggestions.map((item, idx) => (
              <li
                key={item.placeId}
                role="option"
                aria-selected={idx === activeIndex}
                className={`${styles.suggestionItem} ${
                  idx === activeIndex ? styles.suggestionActive : ''
                }`}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => {
                  // Prevent input blur before selection runs
                  e.preventDefault();
                  void handleSelectSuggestion(item);
                }}
              >
                <MapPin size={16} className={styles.pinIcon} />
                <div className={styles.suggestionText}>
                  <span className={styles.mainText}>{item.mainText}</span>
                  {item.secondaryText && (
                    <span className={styles.secondaryText}>{item.secondaryText}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.attribution}>
            <span className={styles.auTag}>Australia Locations</span>
            <span>Powered by Google</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationAutocompleteInput;

