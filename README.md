berikut merupakan tatacara untuk mendownload file dan mengedit file sekaligus mengubah data di server secara otomatis:

1. [Clone Project](#Clone-Project)
2. [Edit Project](#Edit-Project)
3. [Push Project](#Push-Project)
4. [Pull Project](#Pull-Project)


## Clone Project
clone project dengan cara berikut ini: (dengan terminal pada ubuntu)

pilih direktori untuk tempat penyimpanan file
lalu klik kanan dan buka terminal dengan klik "Open in Terminal"
lalu ketik 

`git clone https://github.com/didi-stwn/Xirka-FrontEnd.git`

lalu terminal akan secara otomatis mendownload file yang ada di GitHub
setelah file selesai diClone, masuk ke direktori folder yang baru di download 

`cd Xirka-FrontEnd`

atau close terminal lalu buka folder `Xirka-FrontEnd` yang berhasil dibuat tadi

setelah proses clone selesai, sekarang proses install

ketik 

`npm install` 

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

`./Xirka-FrontEnd`

lalu ketik 

`npm start`

lalu tunggu beberapa saat dan buka browser lalu buka buka localhost:8000 atau ip berdasarkan PCnya

## Edit Project
buka Visual Studio Code (text editor bebas) lalu buka file direktori `Xirka-FrontEnd` tadi.

untuk menjalankan projectnya dapat dilakukan dengan mengetik 

 `npm start`

pada terminal yang sudah berada pada direktori folder `Xirka-FrontEnd` 

lalu dapat dilakukan pengeditan pada file dan browser akan otomatis merefresh saat file di save


## Push Project
setelah file selesai diedit push data ke GitHub dengan cara 

buka terminal pada direktori `Xirka-FrontEnd`

lalu ketik

`git commit -m "pesan perubahan"`

kemudian ketik

`git push`

lalu masukkan username dan password GitHubnya 


## Pull Project
buka direktori folder `Xirka-FrontEnd` lalu buka terminal dan ketik

`git pull`

terminal akan otomatis merubah perubahan yang ada difile
