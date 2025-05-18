# Vue Todo App

Aplikasi Todo List yang dibangun dengan Vue, TypeScript, dan Vite. Aplikasi ini memungkinkan pengguna untuk mengelola tugas-tugas dengan fitur-fitur berikut:

## Fitur Utama
- **Autentikasi Pengguna**: Login, Register dan Logout dengan manajemen token
- **Manajemen Todo**: Tambah, edit, hapus, dan lihat daftar todo
- **Pencarian**: Cari todo berdasarkan parameter tertentu
- **Validasi Form**: Validasi input menggunakan Yup dan Vee Validate
- **Notifikasi**: Feedback kepada pengguna menggunakan Vue Toastify
- **Tema Gelap/Terang**: Dukungan untuk mode gelap dan terang

## Teknologi yang Digunakan
- **Frontend**: Vue dengan TypeScript
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS
- **Form Handling**: Vee Validate dengan Yup
- **HTTP Requests**: Axios
- **UI Library**: Vue Toastify
- **Icons**: Heroicons
- **Build Tool**: Vite

## Struktur Aplikasi
Aplikasi ini mengikuti arsitektur komponen Atomic Design:
- **Atoms**: Komponen dasar seperti Button, Input dan TextArea
- **Molecules**: Komponen yang terdiri dari beberapa atom seperti Header dan SearchBar
- **Organisms**: Komponen kompleks seperti TodoForm, TodoList dan TodoItem
- **Pages**: Halaman utama seperti TodosPage, RegisterPage dan LoginPage

## Cara Menjalankan
1. Clone repository
2. Install dependencies: `npm install`
3. Copy `.env.example` menjadi `.env` dan sesuaikan konfigurasi
4. Jalankan dalam mode development: `npm run dev`
5. Build untuk production: `npm run build`        