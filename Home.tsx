Buatkan aplikasi web bernama “Medika Hospital Management System”, yaitu sistem informasi rumah sakit sederhana untuk tugas UAS Pemrograman Web Lanjut.

Gunakan React, TypeScript, Tailwind CSS, dan komponen UI modern. Buat aplikasi yang siap dipublikasikan melalui Lovable. Fokus utama saat ini adalah frontend/UI yang berfungsi menggunakan data contoh atau local storage, tetapi struktur kode harus mudah dihubungkan ke backend atau Supabase nantinya.

BAHASA DAN GAYA
- Gunakan seluruh teks dalam bahasa Indonesia.
- Gunakan bahasa yang sederhana dan mudah dipahami.
- Jangan gunakan lorem ipsum.
- Desain harus terlihat profesional seperti dashboard sistem rumah sakit sungguhan.
- Gunakan warna utama biru tua, biru muda, putih, dan abu-abu terang.
- Gunakan warna hijau untuk status berhasil atau selesai.
- Gunakan warna kuning untuk status menunggu.
- Gunakan warna merah untuk status dibatalkan atau belum dibayar.
- Jangan membuat desain terlalu ramai.
- Gunakan sudut card yang sedikit membulat dan bayangan tipis.
- Gunakan ikon yang relevan dan konsisten.
- Tampilan harus responsif untuk desktop, tablet, dan mobile.

STRUKTUR APLIKASI

Aplikasi mempunyai dua bagian utama:

1. Halaman publik
2. Halaman dashboard setelah login

HALAMAN PUBLIK

1. Home
Buat landing page rumah sakit dengan navbar yang berisi:
- Beranda
- Tentang Rumah Sakit
- Layanan
- Poliklinik
- Dokter
- Kontak
- Tombol Login

Hero section berisi:
- Nama “Medika Hospital”
- Judul: “Pelayanan Kesehatan Terpadu untuk Anda dan Keluarga”
- Deskripsi singkat rumah sakit
- Tombol “Lihat Layanan”
- Tombol “Login Petugas”
- Ilustrasi atau gambar rumah sakit modern

Section layanan berisi card:
- Poli Umum
- Poli Anak
- Poli Gigi
- Poli Mata
- Poli Penyakit Dalam
- Poli Kandungan

Section dokter menampilkan beberapa dokter contoh beserta:
- Foto placeholder
- Nama dokter
- Spesialisasi
- Hari praktik
- Tombol lihat jadwal

Section informasi rumah sakit:
- Jam operasional
- Nomor telepon
- Alamat
- Email

Tambahkan footer berisi informasi rumah sakit dan tautan navigasi.

2. Login
Buat halaman login dengan desain sederhana dan profesional.

Form login:
- Email
- Kata sandi
- Checkbox ingat saya
- Tombol masuk
- Tombol tampilkan atau sembunyikan kata sandi

Gunakan akun demo:
Email: admin@medikahospital.com
Password: admin123

Saat login berhasil, arahkan pengguna ke dashboard.

Jika email atau kata sandi salah, tampilkan pesan:
“Email atau kata sandi tidak sesuai.”

Simpan status login menggunakan local storage agar pengguna tetap login setelah halaman dimuat ulang.

Pengguna yang belum login tidak boleh membuka halaman dashboard dan harus diarahkan kembali ke halaman login.

DASHBOARD LAYOUT

Setelah login, gunakan layout dashboard dengan:

Sidebar sebelah kiri:
- Logo Medika Hospital
- Dashboard
- Data Pasien
- Data Dokter
- Poliklinik
- Jadwal Dokter
- Pendaftaran
- Rekam Medis
- Resep Obat
- Pembayaran
- Profil
- Logout

Topbar:
- Tombol buka dan tutup sidebar
- Kolom pencarian
- Ikon notifikasi
- Foto dan nama pengguna
- Dropdown profil dan logout

Sidebar harus dapat diciutkan pada desktop dan berubah menjadi drawer pada mobile.

HALAMAN DASHBOARD

Tampilkan kartu ringkasan:
- Total Pasien
- Total Dokter
- Total Poliklinik
- Pendaftaran Hari Ini
- Pasien Menunggu
- Pemeriksaan Selesai

Gunakan data contoh yang masuk akal.

Tambahkan grafik kunjungan pasien selama tujuh hari terakhir.

Tambahkan grafik jumlah pasien berdasarkan poliklinik.

Tambahkan tabel “Pendaftaran Terbaru” dengan kolom:
- Nomor Pendaftaran
- Nama Pasien
- Poliklinik
- Dokter
- Waktu
- Status
- Aksi

Status menggunakan badge:
- Menunggu
- Sedang Diperiksa
- Selesai
- Dibatalkan

Tambahkan bagian “Jadwal Dokter Hari Ini”.

MODUL DATA PASIEN

Buat halaman daftar pasien dengan:
- Judul halaman
- Tombol tambah pasien
- Kolom pencarian
- Filter jenis kelamin
- Filter golongan darah
- Tabel pasien
- Pagination

Kolom tabel:
- Nomor Rekam Medis
- Nama Pasien
- NIK
- Jenis Kelamin
- Tanggal Lahir
- Nomor Telepon
- Golongan Darah
- Aksi

Aksi:
- Lihat detail
- Edit
- Hapus

Form tambah dan edit pasien:
- Nomor rekam medis dibuat otomatis
- NIK
- Nama lengkap
- Tempat lahir
- Tanggal lahir
- Jenis kelamin
- Golongan darah
- Nomor telepon
- Email
- Alamat
- Alergi
- Kontak darurat

Berikan validasi form dan pesan kesalahan.

Saat data berhasil ditambahkan, tampilkan notifikasi:
“Data pasien berhasil ditambahkan.”

Buat dialog konfirmasi sebelum menghapus data.

Detail pasien menampilkan:
- Identitas pasien
- Informasi kontak
- Alergi
- Riwayat pendaftaran
- Riwayat rekam medis

MODUL DATA DOKTER

Buat halaman dokter dengan tampilan tabel atau card.

Data dokter:
- Kode dokter
- Foto
- Nama dokter
- Spesialisasi
- Poliklinik
- Nomor telepon
- Email
- Status aktif

Fitur:
- Tambah dokter
- Lihat detail
- Edit
- Hapus
- Cari dokter
- Filter spesialisasi
- Filter status

Form dokter:
- Kode dokter otomatis
- Nama lengkap
- Nomor SIP
- Spesialisasi
- Poliklinik
- Nomor telepon
- Email
- Alamat
- Status

MODUL POLIKLINIK

Buat halaman pengelolaan poliklinik.

Data:
- Kode poliklinik
- Nama poliklinik
- Ruangan
- Deskripsi
- Jumlah dokter
- Status

Contoh poliklinik:
- Poli Umum
- Poli Anak
- Poli Gigi
- Poli Mata
- Poli Kandungan
- Poli Penyakit Dalam

Sediakan fitur tambah, edit, detail, hapus, dan pencarian.

MODUL JADWAL DOKTER

Buat halaman jadwal dokter.

Data jadwal:
- Dokter
- Poliklinik
- Hari praktik
- Jam mulai
- Jam selesai
- Kuota pasien
- Status

Sediakan:
- Tampilan tabel
- Filter dokter
- Filter poliklinik
- Filter hari
- Tambah jadwal
- Edit jadwal
- Hapus jadwal

Validasi agar jam selesai tidak lebih awal dari jam mulai.

MODUL PENDAFTARAN PEMERIKSAAN

Buat halaman daftar pendaftaran pasien.

Kolom tabel:
- Nomor pendaftaran
- Nomor antrean
- Tanggal
- Nama pasien
- Poliklinik
- Dokter
- Keluhan
- Status
- Aksi

Form pendaftaran:
- Pilih pasien
- Pilih poliklinik
- Pilih dokter
- Pilih jadwal
- Pilih tanggal pemeriksaan
- Keluhan awal
- Metode pembayaran
- Jenis pasien umum atau asuransi

Nomor pendaftaran dan nomor antrean dibuat otomatis.

Status:
- Menunggu
- Sedang Diperiksa
- Selesai
- Dibatalkan

Sediakan tombol:
- Mulai pemeriksaan
- Batalkan
- Lihat detail
- Edit
- Buat rekam medis

MODUL REKAM MEDIS

Buat halaman rekam medis yang terhubung dengan data pendaftaran.

Data rekam medis:
- Nomor rekam medis
- Pasien
- Dokter
- Poliklinik
- Tanggal pemeriksaan
- Keluhan
- Tekanan darah
- Suhu tubuh
- Berat badan
- Tinggi badan
- Diagnosis
- Tindakan
- Catatan dokter

Fitur:
- Tambah hasil pemeriksaan
- Edit rekam medis
- Lihat detail
- Cari berdasarkan pasien
- Filter tanggal
- Lihat riwayat pasien
- Buat resep

Detail rekam medis harus terlihat seperti dokumen medis yang rapi dan dapat dicetak.

MODUL RESEP OBAT

Buat halaman resep obat.

Data:
- Nomor resep
- Nama pasien
- Dokter
- Tanggal
- Daftar obat
- Status resep

Dalam satu resep dapat terdapat beberapa obat.

Data obat:
- Nama obat
- Dosis
- Jumlah
- Satuan
- Aturan penggunaan
- Catatan

Status resep:
- Menunggu
- Sedang Diproses
- Sudah Diserahkan

Sediakan fitur:
- Tambah obat
- Hapus obat dari resep
- Edit resep
- Lihat detail
- Cetak resep
- Ubah status

MODUL PEMBAYARAN

Buat halaman pembayaran.

Data:
- Nomor pembayaran
- Nomor pendaftaran
- Nama pasien
- Biaya pemeriksaan
- Biaya obat
- Biaya tambahan
- Total pembayaran
- Metode pembayaran
- Status
- Tanggal pembayaran

Metode pembayaran:
- Tunai
- Transfer
- Kartu

Status:
- Belum Dibayar
- Sudah Dibayar
- Dibatalkan

Fitur:
- Buat tagihan
- Hitung total secara otomatis
- Proses pembayaran
- Lihat detail
- Cetak bukti pembayaran

MODUL PROFIL

Buat halaman profil pengguna.

Data profil:
- Foto profil
- Nama
- Email
- Nomor telepon
- Jabatan
- Alamat

Sediakan:
- Edit profil
- Ubah foto
- Ubah kata sandi

Form ubah kata sandi:
- Kata sandi lama
- Kata sandi baru
- Konfirmasi kata sandi baru

INTERAKSI DAN FUNGSIONALITAS UI

- Seluruh tombol harus dapat diklik dan memberikan respons.
- Form tambah dan edit harus bekerja menggunakan data contoh atau local storage.
- Data baru harus langsung muncul di tabel.
- Data dapat diedit dan dihapus.
- Gunakan modal atau halaman khusus untuk form.
- Tampilkan toast notification setelah aksi berhasil atau gagal.
- Gunakan dialog konfirmasi sebelum menghapus.
- Buat loading state dan empty state.
- Buat halaman 404.
- Buat breadcrumb pada halaman dashboard.
- Tabel harus responsif pada layar kecil.
- Gunakan pagination pada tabel.
- Gunakan format tanggal Indonesia.
- Gunakan format mata uang Rupiah.
- Hindari tombol atau menu yang tidak memiliki fungsi.

DATA CONTOH

Isi aplikasi dengan minimal:
- 12 pasien
- 8 dokter
- 6 poliklinik
- 10 jadwal dokter
- 12 pendaftaran
- 8 rekam medis
- 6 resep
- 8 pembayaran

Gunakan nama dan data contoh Indonesia yang realistis.

STRUKTUR KODE

- Buat komponen yang dapat digunakan ulang.
- Pisahkan layout publik dan layout dashboard.
- Gunakan routing yang jelas.
- Gunakan protected route untuk dashboard.
- Buat folder components, pages, layouts, data, hooks, types, dan utils.
- Gunakan TypeScript type atau interface untuk setiap data.
- Pastikan tidak terdapat error TypeScript.
- Pastikan tidak terdapat tautan rusak.
- Pastikan aplikasi dapat dijalankan dan dipublikasikan.

ROUTE YANG DIBUTUHKAN

/
 /login
 /dashboard
 /pasien
 /pasien/tambah
 /pasien/:id
 /pasien/:id/edit
 /dokter
 /poliklinik
 /jadwal-dokter
 /pendaftaran
 /rekam-medis
 /resep
 /pembayaran
 /profil

HASIL AKHIR

Buat seluruh halaman, navigasi, komponen, data contoh, dan interaksi dasar dalam satu aplikasi yang konsisten.

Pastikan:
- Login demo bekerja.
- Dashboard hanya dapat dibuka setelah login.
- Semua menu sidebar mempunyai halaman.
- CRUD data dapat disimulasikan menggunakan local storage.
- Tampilan responsif.
- Tidak ada halaman kosong.
- Tidak ada tombol tanpa fungsi.
- Aplikasi siap dipublikasikan melalui fitur Publish di Lovable.