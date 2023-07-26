# Express API Example

API ini berisi data untuk online store seperti user, card, dan history. Untuk lengkapnya bisa dilihat di API-Hitpoint-Documentation.json.

## Installation

Clone repo ini lalu install modulenya.

```bash
npm install
```

Buat database dan edit file env sesuai dengan database yang telah dibuat, setelah itu migrasi database dengan sequelize menggunakan perintah ini.

```bash
npx sequelize db:migrate
```

## Usage

```bash
# Untuk menjalankan secara normal
npm run start

# Untuk menjalankan dengan autoload (jika sudah menginstall nodemon)
npm run dev

```
