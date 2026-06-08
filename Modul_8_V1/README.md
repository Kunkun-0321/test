# Web Story Modul 8 — HTML Native + JavaScript

Versi ini sudah diubah dari render slide berbasis JavaScript menjadi HTML native. Semua konten 17 slide sekarang berada langsung di `index.html`, sedangkan JavaScript hanya dipakai untuk interaksi ringan dan peta.

## Struktur

```txt
webstory-modul-8-html-native/
├─ index.html                 # markup asli semua slide
├─ css/style.css              # styling halaman
├─ js/
│  ├─ app.js                  # progress bar, tombol slide, keyboard navigation
│  ├─ data.js                 # data statis pendukung peta/layer
│  ├─ boundaries.js           # GeoJSON sebagai variabel window.boundaryGeoJSON
│  └─ map.js                  # Leaflet map + styling layer
└─ assets/geojson/            # GeoJSON mentah untuk kebutuhan GIS/API
```

## Perubahan utama

- `js/core.js` dan `js/sections/*.js` tidak lagi dipakai.
- Slide tidak lagi dibuat dengan `innerHTML` dari array JavaScript.
- Markup setiap `<section class="slide">` sudah ditulis langsung di `index.html`.
- `js/app.js` hanya menangani navigasi, progress bar, tombol CTA, resize, dan inisialisasi peta.
- `js/map.js`, `js/data.js`, dan `js/boundaries.js` tetap dipertahankan karena peta Leaflet masih membutuhkan JavaScript.

## Cara menjalankan

Cara paling aman:

```bash
cd webstory-modul-8-html-native
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

Map memakai Leaflet dan tile online, jadi butuh koneksi internet untuk basemap. Jika dibuka tanpa internet, layout tetap tampil tetapi basemap tidak termuat.
