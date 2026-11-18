# Nourisha — NICU Care Companion

Aplikasi pendamping Unit Neonatal Intensif (NICU) untuk menjaga komunikasi antara perawat dan orang tua.

## Fitur saat ini

- Halaman login statis yang meniru mockup UI/UX.
- Pemilih peran **Orang Tua** dan **Perawat** (segmented control).
- Validasi email dan kata sandi dengan pesan error yang mudah dipahami.
- Tampilkan/sembunyikan kata sandi.
- Layout responsif: perangkat mockup di desktop, layar penuh di mobile.
- Tanpa dependensi eksternal — HTML, CSS, dan JavaScript murni.

## Struktur proyek

```
nourisha v3/
├── index.html        # Markup halaman login
├── styles.css        # Seluruh visual & layout responsif
├── login.js          # Interaksi form, validasi, ganti peran
└── .preview-server.cjs  # Server statis lokal untuk pratinjau
```

## Menjalankan secara lokal

Jalankan server statis:

```bash
node .preview-server.cjs
```

Lalu buka `http://localhost:4321/` di browser.

Alternatif tanpa server: buka `index.html` langsung di browser.

## Catatan

Belum ada backend atau autentikasi sungguhan — alur login saat ini hanya simulasi sisi front-end.
