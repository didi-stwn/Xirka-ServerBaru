import React,{Component} from 'react';
import Pdf from "react-to-pdf"
import ReactExport from "react-data-export";
import {withRouter} from 'react-router-dom'


class Laporan extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isidata: [],
          ins: [],
          getRangeDate: [],
          periodeLaporan:false,
          nim: '',
          startDate: '',
          endDate:'',
          datasalah: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(e) {
            const { name, value } = e.target;
            this.setState({ [name]: value });
        }
        
        handleSubmit(e){
            e.preventDefault();
        
            const {nim,startDate,endDate} = this.state
             var filter
        
            filter = nim
            let h = new Headers();
            h.append ('Authorization', 'Basic YWRtaW46YmFuZHVuZzEyMw==')
            fetch('https://192.168.2.7/smartlock/api/v1/smartlockview.json?limit='+this.props.limit+"&scard_id="+filter, {
            method: 'GET',
            headers: h
            })
            .then(response=>response.json())
            .then(data => {
                if (data.code===200){
                    this.setState({isidata: data.results})
                    this.setState({periodeLaporan:true})
                    this.setState({datasalah:false})
                }    
                else {
                    this.setState({datasalah:true})
                }
            })     
        
            //mengambil instansi berdasarkan scard id
            let he= new Headers()
            let token = this.props.token
            he.append ('x-access-token', token)
            fetch('http://192.168.2.7:3000/card', {
            method: 'GET',
            headers: he
            })
            .then(response=>response.json())
            .then(data => this.setState({ins: data}))

            function getDateArray(start, end) {
                var hasil = new Array();
                var startdatee = new Date(start);
                var enddatee = new Date(end);
                while (startdatee <= enddatee) {
                    hasil.push(new Date(startdatee));
                    startdatee.setDate(startdatee.getDate() + 1);
                }
                return hasil;
            }
            
            var dateArr = getDateArray(startDate, endDate);
            this.setState({getRangeDate:dateArr})
        }

    render(){
        const {datasalah}= this.state
        sessionStorage.removeItem("login");
        function waktu(t){
            var tahun,bulan,tanggal,tgl,hari,date;
            date = new Date (t)

            tahun = String(date.getFullYear())

            var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
            bulan = months[(date.getMonth())]

            tgl = date.getDate()
            if (tgl <=9){
                tanggal = "0"+String(tgl)
            }
            else {
                tanggal = String(tgl)
            }
            var days = ["Sun","Mon","Tue", "Wed", "Thu", "Fri", "Sat"];
            hari = days[(date.getDay())]
            
            return hari+", "+tanggal+"-"+bulan+"-"+tahun
        }
        const {isidata,getRangeDate} = this.state
        var nimp, nama, inst;
        function instansi(nim1,array){
            var hasil
            var i
            for ( i=0; i<array.length; i++){
              if (String(nim1)===array[i].card_id){
                hasil = array[i].instansi
                break
              }
              else {
                hasil = ''
              }
            }
            return hasil
        }

        for (var i=0; i<isidata.length; i++){
            nimp = isidata[i].scard_id;
            nama = isidata[i].name;
            inst = instansi(isidata[i].scard_id,this.state.ins)
        }

        const {startDate,endDate, periodeLaporan} = this.state;

        function Periodelaporan(start,end){
            var hasil, awal, akhir, tahunakhir, bulanawal, bulanakhir, tanggalawal, tanggalakhir, tglawal, tglakhir;
            awal = new Date(start);
            akhir = new Date(end);

            tahunakhir = String(akhir.getFullYear())

            var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            
            bulanawal = months[(awal.getMonth())]
            bulanakhir = months[(akhir.getMonth())]

            tglawal = awal.getDate()
            tglakhir = akhir.getDate()

            if (tglawal <=9){
                tanggalawal = "0"+String(tglawal)
            }
            else {
                tanggalawal = String(tglawal)
            }

            if (tglakhir <=9){
                tanggalakhir = "0"+String(tglakhir)
            }
            else {
                tanggalakhir = String(tglakhir)
            }

            hasil = tanggalawal+" "+bulanawal+" - "+tanggalakhir+" "+bulanakhir+" "+tahunakhir
            if (periodeLaporan){
                return (
                    hasil
                )
            }
        }

        function sekarang(a){
            var hasil, tgl, tanggal, bulan, tahun, j, jam, m, menit;
            tgl = a.getDate();
            if (tgl <=9){
                tanggal = "0"+String(tgl)
            }
            else {
                tanggal = String(tgl)
            }
            var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            bulan = months[(a.getMonth())]
            tahun = a.getFullYear();
            j = a.getHours()
            if (j<=9){
                jam = "0"+String(j)
            }
            else {
                jam = String(j)
            }
            m = a.getMinutes()
            if (m<=9){
                menit = "0"+String(m)
            }
            else {
                menit = String(m)
            }
            hasil =  bulan+" "+tanggal+", "+tahun+" "+jam+":"+menit+":00"
            if (periodeLaporan){
                return (
                    hasil
                )
            }
        }

        i = 1;

        function masuk(a,b){
            var hasil, tgl, tanggal, tahun, bulan;
            tgl = new Date(a)
            tanggal = tgl.getDate()
            bulan = tgl.getMonth()
            tahun = tgl.getFullYear()
            for (var i=0; i<b.length; i++){
                if (b[i].lockstatus===0){
                    var tanggalmasuk = new Date(b[i].checked_tm)
                    var tanggalmasukk = tanggalmasuk.getDate()
                    var tahuntanggalmasuk = tanggalmasuk.getFullYear()
                    var bulantanggalmasuk = tanggalmasuk.getMonth()
                    var hasilmasuk,j, jam,m, menit;
                    j = tanggalmasuk.getHours()
                    if (j<=9){
                        jam = "0"+String(j)
                    }
                    else {
                        jam = String(j)
                    }
                    m = tanggalmasuk.getMinutes()
                    if (m<=9){
                        menit = "0"+String(m)
                    }
                    else {
                        menit = String(m)
                    }

                    hasilmasuk = jam + ":" +menit+":00";
                    if ((tanggal===tanggalmasukk)&&(tahun===tahuntanggalmasuk)&&(bulan===bulantanggalmasuk)){
                        hasil = hasilmasuk
                        break
                    }
                    else{
                        hasil = "-"
                    }
                }
                else {
                    hasil = "-"
                }
            }
            return hasil;
        }

        function keluar(a,b){
            var hasil, tgl, tanggal, tahun, bulan;
            tgl = new Date(a)
            tanggal = tgl.getDate()
            bulan = tgl.getMonth()
            tahun = tgl.getFullYear()
            for (var i=0; i<b.length; i++){
                if ((b[i].lockstatus===1)||(b[i].lockstatus===2)||(b[i].lockstatus===3)){
                    var tanggalmasuk = new Date(b[i].checked_tm)
                    var tanggalmasukk = tanggalmasuk.getDate()
                    var tahuntanggalmasuk = tanggalmasuk.getFullYear()
                    var bulantanggalmasuk = tanggalmasuk.getMonth()
                    var hasilmasuk,j, jam,m, menit;
                    j = tanggalmasuk.getHours()
                    if (j<=9){
                        jam = "0"+String(j)
                    }
                    else {
                        jam = String(j)
                    }
                    m = tanggalmasuk.getMinutes()
                    if (m<=9){
                        menit = "0"+String(m)
                    }
                    else {
                        menit = String(m)
                    }

                    hasilmasuk = jam + ":" +menit+":00";
                    if ((tanggal===tanggalmasukk)&&(tahun===tahuntanggalmasuk)&&(bulan===bulantanggalmasuk)){
                        hasil = hasilmasuk
                        break
                    }
                    else{
                        hasil = "-"
                    }
                }
                else {
                    hasil = "-"
                } 
            }
            return hasil;
        }

        function total(a,b){
            var hasil, jammasuk,jamkeluar,menitmasuk,menitkeluar, j,m,jam, menit;

            var masukk = String(masuk(a,b))
            var keluarr = String(keluar(a,b))

            menitmasuk = parseInt(masukk.substring(3,5))
            menitkeluar = parseInt(keluarr.substring(3,5))
            jamkeluar = parseInt(keluarr.substring(0,2))
            jammasuk = parseInt(masukk.substring(0,2))

            m = menitkeluar-menitmasuk;
            j = jamkeluar-jammasuk;
            if (m<0){
                m = m + 60;
                j = j - 1;
            }

            if (j<=9){
                jam = "0"+String(j)
            }
            else {
                jam = String(j)
            }

            if (m<=9){
                menit = "0"+String(m)
            }
            else {
                menit = String(m)
            }
            hasil = jam+":"+menit+":00";
            if ((masukk==="-")||(keluarr==="-")){
                return "-"
            }
            else {
                return hasil
            }
        }

        function izin(a,b){
            var hasil, tgl, tanggal, tahun, bulan;
            tgl = new Date(a)
            tanggal = tgl.getDate()
            bulan = tgl.getMonth()
            tahun = tgl.getFullYear()
            for (var i=0; i<b.length; i++){
                var tanggalmasuk = new Date(b[i].checked_tm)
                var tanggalmasukk = tanggalmasuk.getDate()
                var tahuntanggalmasuk = tanggalmasuk.getFullYear()
                var bulantanggalmasuk = tanggalmasuk.getMonth()
                if ((b[i].lockstatus===2)&&(tanggal===tanggalmasukk)&&(tahun===tahuntanggalmasuk)&&(bulan===bulantanggalmasuk)){
                    hasil = "✔"
                    break
                }
                else{
                    hasil = " "
                }
                    
            }
            
            return hasil;
        }

        function sakit(a,b){
            var hasil, tgl, tanggal, tahun, bulan;
            tgl = new Date(a)
            tanggal = tgl.getDate()
            bulan = tgl.getMonth()
            tahun = tgl.getFullYear()
            for (var i=0; i<b.length; i++){
                var tanggalmasuk = new Date(b[i].checked_tm)
                var tanggalmasukk = tanggalmasuk.getDate()
                var tahuntanggalmasuk = tanggalmasuk.getFullYear()
                var bulantanggalmasuk = tanggalmasuk.getMonth()
                if ((b[i].lockstatus===3)&&(tanggal===tanggalmasukk)&&(tahun===tahuntanggalmasuk)&&(bulan===bulantanggalmasuk)){
                    hasil = "✔"
                    break
                }
                else{
                    hasil = " "
                }
                    
            }
            
            return hasil;
        }


        const ref = React.createRef();
        const ExcelFile = ReactExport.ExcelFile;
        const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
        var x=1;

        function no(i){
            var m=0
            var hasil=m+i
            return  hasil
        }

        function getDataXcl(a){
            var data=new Array(a.length);
            x = 1;
            for (var i=0; i<a.length ;i++){
                data[i] = new Array(9) 
                
                data[i][0]=(no(x++))
                data[i][1]=(waktu(a[i]))
                data[i][2]=(masuk(a[i],isidata))
                data[i][3]=(keluar(a[i],isidata))
                data[i][4]=(total(a[i],isidata))
                data[i][5]=" "
                data[i][6]=(izin(a[i],isidata))
                data[i][7]=(sakit(a[i],isidata))
                data[i][8]=" "
            }
            return data
        }

        const dataXcl = [
            {
                columns: [" ", " ", " "," "," "," "," "," "," "],
                data: [
                    ["NIM/NIP", nimp],
                    ["Nama", nama],
                    ["Instansi", inst],
                    [" "],
                    [" "],
                    [" "," "," ","Pencetak",sessionStorage.message ],
                    ["Periode",Periodelaporan(startDate,endDate)," ","Tanggal Cetak",sekarang(new Date()) ],
                ]
            },

            {
                ySteps: 2,
                columns: [
                    {title: "No", width: {wpx: 30}},
                    {title: "Hari, Tanggal", width: {wpx: 120}},
                    {title: "Jam Masuk", width: {wpx: 100}},
                    {title: "Jam Keluar", width: {wpx: 100}},
                    {title: "Total Jam/Hari", width: {wpx: 100}},
                    {title: "Alfa", width: {wpx: 50}},
                    {title: "Izin", width: {wpx: 50}},
                    {title: "Sakit", width: {wpx: 50}},
                    {title: "Keterangan", width: {wpx: 100}},
                ],
                data: getDataXcl(getRangeDate)
            }
        ]

        const namaclient = this.props.name
        if (sessionStorage.message==="admin"){
            return (
                <div>
                    <div className="kotakfilter"> 
                        <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
                            <div className="kotakinputlaporannim">
                                <label> NIM/NIP </label> <br></br>
                                <input name="nim" onChange={this.handleChange} className="inputformlaporannim" type="text" placeholder="NIM/NIP" required></input>
                            </div>
    
                            <div className="kotakinputlaporanstart">
                                <label> Start Date </label> <br></br>
                                <input name="startDate" onChange={this.handleChange} className="inputformlaporanstart" type="date" required></input>
                            </div> 
                            
                            <div className="kotakinputlaporanend">
                                <label> End Date </label> <br></br>
                                <input name="endDate" onChange={this.handleChange} className="inputformlaporanend" type="date" required></input>
                            </div>
                            {
                            datasalah &&
                            <p className="textmerah">*Data yang diinput salah</p>
                            }
                            { 
                            (datasalah===false) &&
                            <p className="texthijau">&emsp;</p>
                            }
                            <div className="kotaksubmitlaporan">
                                <input className="submitformlogpintu2" type="submit" value="Find"></input>
                            </div>
    
                            <div className="kotakprintpdflaporan">
                                <div className="printformlaporan"> 
                                    <Pdf targetRef={ref} filename={"Xirka-"+nimp}>
                                        {({ toPdf }) =>
                                            <a onClick={toPdf} style={{width:"100%",height:"100%"}}>
                                               <i className="fa fa-print"> <span> Print to PDF</span></i>
                                            </a>}
                                    </Pdf>
                                </div>
                            </div>
                               
                            <div className="kotakprintxcllaporan">
                                <div className="printformlaporan">
                                    <ExcelFile filename={"Xirka-"+nimp} element={
                                        <a>
                                            <i className="fa fa-print"> <span> Print to Excel</span></i>
                                        </a>}>
                                        <ExcelSheet dataSet={dataXcl} name={"Xirka"+nimp}/>
                                    </ExcelFile>
                                </div>
                            </div>
                        </form> 
                    </div>        
                    <div className="ruangandaftarruangan"> 
                        <div className="box-footer">
                            <div className="kotakisigrafik">
                                <div className="kotakisigrafik2">
                                    <div ref={ref} className="ruangandaftarruangan2">
                                        <table className="tabellaporan">
                                            <tbody>
                                                <tr>
                                                    <td style={{width:'5%'}}>
                                                        <b>NIM/NIP</b>
                                                    </td>
                                                    <td style={{width:'50%'}}>
                                                        <b>&emsp;:&emsp;{nimp}</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Nama</b>
                                                    </td>
                                                    <td>
                                                        <b>&emsp;:&emsp;{nama}</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Instansi</b>
                                                    </td>
                                                    <td>
                                                        <b>&emsp;:&emsp;{inst}</b>
                                                    </td>
                                                </tr>
                                                <tr><td>&emsp;</td></tr>
                                                <tr>
                                                    <td>&emsp;</td>
                                                    <td>&emsp;</td>
                                                    <td style={{width:'14%'}}><b>Pencetak</b></td>
                                                    <td style={{width:'5%',textAlign:"center"}}><b>:</b></td>
                                                    <td><b>{sessionStorage.message}</b></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Periode</b>
                                                    </td>
                                                    <td>
                                                        <b>&emsp;:&emsp;{Periodelaporan(startDate,endDate)}</b>
                                                    </td>
                                                    <td style={{width:'14%'}}>
                                                        <b>Tanggal Cetak</b>
                                                    </td>
                                                    <td style={{width:'5%',textAlign:"center"}}>
                                                        <b>:</b>
                                                    </td>
                                                    <td>
                                                        <b>{sekarang(new Date())}</b>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table className="tabellaporan">
                                            <thead>
                                                <tr className="tabellaporantrhead">
                                                    <th className ="laporanno" > No </th>
                                                    <th className ="laporanhari"> Hari, Tanggal </th>
                                                    <th className ="laporanmasuk"> Jam Masuk </th>
                                                    <th className ="laporankeluar"> Jam Keluar </th>
                                                    <th className ="laporantotal"> Total Jam/Hari </th>
                                                    <th className ="laporanalfa"> Alfa </th>
                                                    <th className ="laporanizin"> Izin </th>
                                                    <th className ="laporansakit"> Sakit </th>
                                                    <th className ="laporanketerangan"> Keterangan </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { periodeLaporan && getRangeDate.map(isi =>(
                                                <tr className="tabellaporanbody" key={isi}>
                                                    <td className ="laporanno">{i++}</td>
                                                    <td className ="laporanhari">{waktu(isi)}</td>
                                                    <td className ="laporanmasuk">{masuk(isi,isidata)}</td>
                                                    <td className ="laporankeluar">{keluar(isi,isidata)}</td>
                                                    <td className ="laporantotal">{total(isi,isidata)}</td>
                                                    <td className ="laporanalfa"></td>
                                                    <td className ="laporanizin">{izin(isi,isidata)}</td>
                                                    <td className ="laporansakit">{sakit(isi,isidata)}</td>
                                                    <td className ="laporanketerangan"></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                    <div className="kotakfilter"> 
                        <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
                            <div className="kotakinputlaporannim">
                                <label> NIM/NIP </label> <br></br>
                                <input name="nim" onChange={this.handleChange} className="inputformlaporannim" type="text" placeholder="NIM/NIP" required></input>
                            </div>
    
                            <div className="kotakinputlaporanstart">
                                <label> Start Date </label> <br></br>
                                <input name="startDate" onChange={this.handleChange} className="inputformlaporanstart" type="date" required></input>
                            </div> 
                            
                            <div className="kotakinputlaporanend">
                                <label> End Date </label> <br></br>
                                <input name="endDate" onChange={this.handleChange} className="inputformlaporanend" type="date" required></input>
                            </div>
                            
                            <div className="kotaksubmitlaporan2">
                                <input className="submitformlogpintu2" type="submit" value="Find"></input>
                            </div>
    
                            <div className="kotakprintpdflaporan">
                                <div className="printformlaporan"> 
                                    <Pdf targetRef={ref} filename={"Xirka-"+nimp}>
                                        {({ toPdf }) =>
                                            <a onClick={toPdf} style={{width:"100%",height:"100%"}}>
                                               <i className="fa fa-print"> <span> Print to PDF</span></i>
                                            </a>}
                                    </Pdf>
                                </div>
                            </div>
                               
                            <div className="kotakprintxcllaporan">
                                <div className="printformlaporan">
                                    <ExcelFile filename={"Xirka-"+nimp} element={
                                        <a>
                                            <i className="fa fa-print"> <span> Print to Excel</span></i>
                                        </a>}>
                                        <ExcelSheet dataSet={dataXcl} name={"Xirka"+nimp}/>
                                    </ExcelFile>
                                </div>
                            </div>
                        </form> 
                    </div>        
                    <div className="ruangandaftarruangan"> 
                        <div className="box-footer">
                            <div className="kotakisigrafik">
                                <div className="kotakisigrafik2">
                                    <div ref={ref} className="ruangandaftarruangan2">
                                        <table className="tabellaporan">
                                            <tbody>
                                                <tr>
                                                    <td style={{width:'5%'}}>
                                                        <b>NIM/NIP</b>
                                                    </td>
                                                    <td style={{width:'50%'}}>
                                                        <b>&emsp;:&emsp;{nimp}</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Nama</b>
                                                    </td>
                                                    <td>
                                                        <b>&emsp;:&emsp;{nama}</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Instansi</b>
                                                    </td>
                                                    <td>
                                                        <b>&emsp;:&emsp;{inst}</b>
                                                    </td>
                                                </tr>
                                                <tr><td>&emsp;</td></tr>
                                                <tr>
                                                    <td>&emsp;</td>
                                                    <td>&emsp;</td>
                                                    <td style={{width:'14%'}}><b>Pencetak</b></td>
                                                    <td style={{width:'5%',textAlign:"center"}}><b>:</b></td>
                                                    <td><b>{namaclient}</b></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <b>Periode</b>
                                                    </td>
                                                    <td>
                                                        <b>&emsp;:&emsp;{Periodelaporan(startDate,endDate)}</b>
                                                    </td>
                                                    <td style={{width:'14%'}}>
                                                        <b>Tanggal Cetak</b>
                                                    </td>
                                                    <td style={{width:'5%',textAlign:"center"}}>
                                                        <b>:</b>
                                                    </td>
                                                    <td>
                                                        <b>{sekarang(new Date())}</b>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table className="tabellaporan">
                                            <thead>
                                                <tr className="tabellaporantrhead">
                                                    <th className ="laporanno" > No </th>
                                                    <th className ="laporanhari"> Hari, Tanggal </th>
                                                    <th className ="laporanmasuk"> Jam Masuk </th>
                                                    <th className ="laporankeluar"> Jam Keluar </th>
                                                    <th className ="laporantotal"> Total Jam/Hari </th>
                                                    <th className ="laporanalfa"> Alfa </th>
                                                    <th className ="laporanizin"> Izin </th>
                                                    <th className ="laporansakit"> Sakit </th>
                                                    <th className ="laporanketerangan"> Keterangan </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getRangeDate.map(isi =>(
                                                <tr className="tabellaporanbody" key={isi}>
                                                    <td className ="laporanno">{i++}</td>
                                                    <td className ="laporanhari">{waktu(isi)}</td>
                                                    <td className ="laporanmasuk">{masuk(isi,isidata)}</td>
                                                    <td className ="laporankeluar">{keluar(isi,isidata)}</td>
                                                    <td className ="laporantotal">{total(isi,isidata)}</td>
                                                    <td className ="laporanalfa"></td>
                                                    <td className ="laporanizin">{izin(isi,isidata)}</td>
                                                    <td className ="laporansakit">{sakit(isi,isidata)}</td>
                                                    <td className ="laporanketerangan"></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
    } 
}

export default withRouter(Laporan);