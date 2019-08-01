# Cara Instalasi 

clone project dengan cara berikut ini: (dengan terminal pada ubuntu)

pilih direktori untuk tempat penyimpanan file
lalu klik kanan dan buka terminal dengan klik "Open in Terminal"
lalu ketik 

`git clone https://github.com/didi-stwn/Xirka-ServerBaru.git`

lalu terminal akan secara otomatis mendownload file yang ada di GitHub
setelah file selesai diClone, masuk ke direktori folder yang baru di download 

`cd Xirka-ServerBaru`

atau close terminal lalu buka folder `Xirka-ServerBaru` yang berhasil dibuat tadi

setelah proses clone selesai, sekarang proses install

ketik 

`sudo npm install` 

![alt text](https://github.com/didi-stwn/Xirka-FrontEnd/blob/master/screenshoot/npminstall.png)

untuk menginstall node_modules, tunggu beberapa saat hingga proses selesai.

lalu ketik 

`npm start` 

![alt text](https://github.com/didi-stwn/Xirka-FrontEnd/blob/master/screenshoot/npm%20start.png)

untuk memulai memasang pada server

lalu akan ditemukan error sebagai berikut:

![alt text](https://github.com/didi-stwn/Xirka-FrontEnd/blob/master/screenshoot/errorods.png)

lalu buka folder tempat error berada `./node_modules/tempa-xlsx/`

![alt text](https://github.com/didi-stwn/Xirka-FrontEnd/blob/master/screenshoot/odsjs.png)

kemudian hapus isi file `ods.js` atau buat file document baru bernama `ods.js` sehingga isi dari `ods.js` kosong seperti dibawah ini

![alt text](https://github.com/didi-stwn/Xirka-FrontEnd/blob/master/screenshoot/filekosong.png)

kemudian balik ke direktori 

`./Xirka-ServerBaru`

lalu ketik 

`npm start`

lalu tunggu beberapa saat dan buka browser lalu buka buka localhost:8000 atau ip berdasarkan PCnya



# Cara Build

jika perintah `npm start ` dapat berjalan dengan baik, maka langkah berikutnya adalah build project yang kemudian akan dipasang di webservernya

pertama, buka direktori tempat clone berada lalu ketik

`sudo npm run build`

tunggu hingga proses selesai. setelah selesai akan terbentuk folder baru bernama `build`

file build sudah selesai dibuat, kemudian langkah berikutnya disesuaikan dengan web browser yang diinginkan seperti nginx, apache dan sebagainya

