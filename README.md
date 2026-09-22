# Udemy Indo Translator

Chrome extension yang nambahin terjemahan Bahasa Indonesia di bawah subtitle Bahasa Inggris di Udemy.

## Cara Install

1. Buka Chrome → `chrome://extensions`
2. Aktifkan **Developer mode** (pojok kanan atas)
3. Klik **Load unpacked** → pilih folder ini

## Cara Pakai

1. Buka kursus Udemy
2. Aktifkan **Captions** (CC) di video player
3. Terjemahan Indo otomatis muncul di bawah subtitle Inggris

## Stack

- Vanilla JS (content script)
- [Google Translate unofficial API](https://translate.googleapis.com) — gratis, tanpa API key
- CSS inject via `styles.css`

## File

| File | Fungsi |
|------|--------|
| `manifest.json` | Config extension (Manifest V3) |
| `content.js` | Logic translate + inject ke DOM |
| `styles.css` | Styling teks terjemahan (kuning, bold) |

## Catatan

- Pakai `MutationObserver` — hanya jalan saat subtitle berubah, tidak polling terus-menerus
- Cache hasil terjemahan in-memory — kalimat yang sama langsung muncul tanpa request ulang
- Tidak butuh API key
- Hanya aktif di `*.udemy.com/course/*`
