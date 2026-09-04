import json
import os

translations = {
    "en": "Our Luxury Services Across Australia",
    "ar": "خدماتنا الفاخرة في جميع أنحاء أستراليا",
    "de": "Unsere Luxus-Services in ganz Australien",
    "es": "Nuestros Servicios de Lujo en Toda Australia",
    "fr": "Nos Services de Luxe à Travers l'Australie",
    "ja": "オーストラリア全土でのラグジュアリーサービス",
    "nl": "Onze Luxediensten in Heel Australië",
    "th": "บริการสุดหรูของเราทั่วออสเตรเลีย",
    "zh": "全澳尊贵奢华服务"
}

locales_dir = "src/locales"

for lang, banner_text in translations.items():
    file_path = os.path.join(locales_dir, lang, "translation.json")
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        if "services" in data:
            data["services"]["banner"] = banner_text
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"[UPDATED] {lang}")
        else:
            print(f"[WARNING] No 'services' section in {file_path}")
    else:
        print(f"[ERROR] File not found: {file_path}")

print("All translations updated successfully.")
