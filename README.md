# Express API Example

API ini berisi data untuk online store seperti user, card, dan history. Untuk lengkapnya bisa dilihat di API-Hitpoint-Documentation.json.

## System Requirment

NodeJs v16^, Mysql v5.7^.

## Installation

Clone repo ini lalu install modulenya.

```bash
npm install
```

Buat database dan edit file env sesuai dengan database yang telah dibuat, setelah itu migrasi database dengan sequelize menggunakan perintah ini. atau bisa juga dengan mengeimport database yang telah diberikan dalam folder database lalu lanjut jalankan aplikasi.

```bash
# Untuk membuat struktur tabel otomatis
npx sequelize db:migrate

# Untuk mengisi data dummy
npx sequelize db:seed:all
```

## Usage

```bash
# Untuk menjalankan secara normal
npm run start

# Untuk menjalankan dengan autoload (jika sudah menginstall nodemon)
npm run dev

```


## Documentation

Dokumentasi hitpoint bisa dilihat di file Postman-documentation.json untuk di import di aplikasi Postman, atau di file RestClient-documentation.rest yang bisa digunakan dengan ekstensi VScode Rest Client.