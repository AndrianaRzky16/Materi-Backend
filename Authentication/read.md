Authentication

Buat model User

Buat model Token

Migration user seeds

Buat auth route: request token

validasi request, pastikan ada req.body.email & req.body.password

cari email yang ada di database, jika tidak ada tendang

compare hash password, jika gagal tendang

bikin token baru, simpan di tabel tokens

kembalikan response: token & user

Verifikasi user: menggunakan middleware

cek apakah ada authorization header, jika tidak ada tendang

cek apakah token ada di database, jika tidak ada tendang

cek apakah token expire, jika iya tendang

cek apakah user diblock, jika iya tendang

tempelkan data user di request (req.user)

next()
