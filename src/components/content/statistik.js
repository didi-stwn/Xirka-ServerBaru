import React,{Component} from 'react';
import Chart from 'react-google-charts';
import {Link,withRouter} from 'react-router-dom';
import get from './config';

class Statistik extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sort:'date',
            ascdsc:'asc',
            pagesize: null,
            pagee: 1,
            startDate: '',
            endDate: '',
            searching: '',
            isidata: [],
            getRangeDate: [],
            ruang: '',
            inputruang:'',
            inputstatus:'',
            status: '',
            pesan:'',
            datasalah: false,
            databenar: false,
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
        const {status,ruang,sort,ascdsc,pagesize,pagee,startDate,endDate,searching} = this.state
        this.setState({inputstatus:status})
        this.setState({inputruang:ruang})
        var filterstart,filterend,startDatee,endDatee,starttahun,startbulan,sb,starttanggal,st,endtahun,endbulan,eb,endtanggal,et
        startDatee=new Date(startDate)
        starttahun=startDatee.getFullYear()
        sb=startDatee.getMonth()+1
        if (sb<=9){
        startbulan="0"+String(sb)
        }
        else {
        startbulan=String(sb)
        }
        st=startDatee.getDate()
        if (st<=9){
        starttanggal="0"+String(st)
        }
        else {
        starttanggal=String(st)
        }
        filterstart=starttahun+"-"+startbulan+"-"+starttanggal;
        
        endDatee= new Date(endDate)
        endtahun=endDatee.getFullYear()
        eb=endDatee.getMonth()+1
        if (eb<=9){
        endbulan="0"+String(eb)
        }
        else {
        endbulan=String(eb)
        }
        et=endDatee.getDate()
        if (et<=9){
        endtanggal="0"+String(et)
        }
        else {
        endtanggal=String(et)
        }
        filterend=endtahun+"-"+endbulan+"-"+endtanggal;
        
        fetch(get.listlog, {
            method: 'post',
            headers :{
                "Authorization" : "Bearer "+ sessionStorage.name,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                sort_by: sort,
                ascordsc: ascdsc,
                page_size: pagesize,
                page: pagee,
                date_start: filterstart,
                date_end: filterend,
                search: searching
            })
        })
        .then (response =>response.json())  
        .then (response =>{ 
            if (response.detail==="Signature has expired."){
                sessionStorage.removeItem("name")
            }
            else if(response.list.length===0){
                var a="user not exists"
                this.setState({pesan:a})
                this.setState({datasalah:true})
                this.setState({databenar:false})
            }
            else{
                this.setState({isidata:response.list})
                this.setState({datasalah:false})
                this.setState({databenar:true})
            }
        })
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
        const {isidata,datasalah,pesan,inputruang,inputstatus,getRangeDate}=this.state
        var jumlahcheckin = 0;
        var jumlahcheckout = 0;
        var checkin = [];
        var checkout = [];
        var pengguna = [];
        var deteksipengguna = 0;
        var ruangan = [];
        var deteksiruangan = 0;
        var isijam =[];
        var isijamcheckin=[];
        var isijamcheckout=[];
        var grafikcheckin= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        var grafikcheckout= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        var arraybaru = [];
        for (var i=0; i<isidata.length; i++){
            if (isidata[i].status===1){
                if (inputruang===''){
                    arraybaru.push(isidata[i])
                }
                else if (inputruang!==''){
                    if (isidata[i].kode_ruangan===parseInt(inputruang)){
                        arraybaru.push(isidata[i])
                    }
                }
            }
        }
        console.log(arraybaru)
        //mendapatkan jumlah checkin
        for (var i=0; i<getRangeDate.length; i++){
            var date=new Date(getRangeDate[i])
            var tahun=date.getFullYear()
            var bulan=date.getMonth()
            var tanggal=date.getDate()
            for (var j=0; j<arraybaru.length; j++){
                var d=new Date(arraybaru[j].date)
                var thn=d.getFullYear()
                var bln=d.getMonth()
                var tgl=d.getDate()
                if ((tahun===thn)&&(bulan===bln)&&(tanggal===tgl)){
                    checkin.push(arraybaru[j].date)
                    break
                }
                checkin=[]
            }
            if (checkin.length===1){
                jumlahcheckin++
            }
        
        }
        //mendapatkan jumlah checkout
        for (var i=0; i<getRangeDate.length; i++){
            var date=new Date(getRangeDate[i])
            var tahun=date.getFullYear()
            var bulan=date.getMonth()
            var tanggal=date.getDate()
            for (var j=0; j<arraybaru.length; j++){
                var d=new Date(arraybaru[j].date)
                var thn=d.getFullYear()
                var bln=d.getMonth()
                var tgl=d.getDate()
                if ((tahun===thn)&&(bulan===bln)&&(tanggal===tgl)){
                    checkout.push(arraybaru[j].date)
                    var jm=new Date(arraybaru[j].date+" "+arraybaru[j].time)
                    var jam = jm.getHours()
                    isijam.push(jam)
                }
            }
            var a0=isijam[0]
            if (a0!==undefined){
                isijamcheckin.push(a0)
            }
            var at=isijam[isijam.length-1]
            if (at!==a0){
                isijamcheckout.push(at)
            }
            isijam=[]
            if (checkout.length>1){
                jumlahcheckout++
            }
            checkout=[]
        }
        
        //mendapatkan jumlah pengguna dan ruangan
        for (var i=0; i<arraybaru.length; i++){
            for (var j=0; j<=pengguna.length; j++){
                if (arraybaru[i].nim === pengguna[j]){
                    deteksipengguna = deteksipengguna +1;
                }
            }
            for (j=0; j<=ruangan.length; j++){
                if (arraybaru[i].kode_ruangan === ruangan[j]){
                    deteksiruangan = deteksiruangan +1;
                }
            }
            if (deteksipengguna===0){
                pengguna.push(arraybaru[i].nim)
            }
            if (deteksiruangan===0){
                ruangan.push(arraybaru[i].kode_ruangan)
            }
            deteksipengguna = 0;
            deteksiruangan = 0;
        }

        //mengisi isi grafik checkin
        for (var i=0; i<isijamcheckin.length; i++){
            for (var j=0; j<24; j++){
                if (isijamcheckin[i]===j){
                    grafikcheckin[j] = grafikcheckin[j] + 1;
                }
            }
        }

        //mengisi isi grafik checkout
        for (var i=0; i<isijamcheckout.length; i++){
            for (var j=0; j<24; j++){
                if (isijamcheckout[i]===j){
                    grafikcheckout[j] = grafikcheckout[j] + 1;
                }
            }
        }
        console.log(inputstatus)

        if (parseInt(inputstatus)===0){
            for (var j=0; j<24; j++){
                grafikcheckout[j] = 0
            }
            jumlahcheckout=0;
        }
        else if (parseInt(inputstatus)===1){
            for (var j=0; j<24; j++){
                grafikcheckin[j] = 0
            }
            jumlahcheckin=0;
        }
        console.log(jumlahcheckin)

        const datagrafik = [
            ['Jumlah', ' Check In', 'Check Out'],
            ['0 AM', grafikcheckin[0], grafikcheckout[0]],
            ['1 AM', grafikcheckin[1], grafikcheckout[1]],
            ['2 AM', grafikcheckin[2], grafikcheckout[2]],
            ['3 AM', grafikcheckin[3], grafikcheckout[3]],
            ['4 AM', grafikcheckin[4], grafikcheckout[4]],
            ['5 AM', grafikcheckin[5], grafikcheckout[5]],
            ['6 AM', grafikcheckin[6], grafikcheckout[6]],
            ['7 AM', grafikcheckin[7], grafikcheckout[7]],
            ['8 AM', grafikcheckin[8], grafikcheckout[8]],
            ['9 AM', grafikcheckin[9], grafikcheckout[9]],
            ['10 AM', grafikcheckin[10], grafikcheckout[10]],
            ['11 AM', grafikcheckin[11], grafikcheckout[11]],
            ['12 PM', grafikcheckin[12], grafikcheckout[12]],
            ['1 PM', grafikcheckin[13], grafikcheckout[13]],
            ['2 PM', grafikcheckin[14], grafikcheckout[14]],
            ['3 PM', grafikcheckin[15], grafikcheckout[15]],
            ['4 PM', grafikcheckin[16], grafikcheckout[16]],
            ['5 PM', grafikcheckin[17], grafikcheckout[17]],
            ['6 PM', grafikcheckin[18], grafikcheckout[18]],
            ['7 PM', grafikcheckin[19], grafikcheckout[19]],
            ['8 PM', grafikcheckin[20], grafikcheckout[20]],
            ['9 PM', grafikcheckin[21], grafikcheckout[21]],
            ['10 PM', grafikcheckin[22], grafikcheckout[22]],
            ['11 PM', grafikcheckin[23], grafikcheckout[23]],
            ]
        return (
            <div>
                <div className="kotakinput">
                    <form className="kotakforminput" onSubmit={this.handleSubmit}>
                        
                        <label>Ruang </label>
                        <input name="ruang" className="kotakpicker" type="text" onChange={this.handleChange}></input>
                        <br></br>

                        <label>Start </label>
                        <input name="startDate" className="kotakdatepickerstart" type="date" onChange={this.handleChange} required></input>
                        <br></br>

                        <label>End </label>
                        <input name="endDate" className="kotakdatepickerend" type="date" onChange={this.handleChange} required></input>
                        <br></br>

                        <label>Status </label>
                        <select name="status" className="kotakpicker" onChange={this.handleChange}>
                            <option value="">  </option>
                            <option value="0"> Check In </option>
                            <option value="1"> Check Out </option>
                        </select>

                        <button type="submit" className="kkotakinput">
                            <span>Go </span>
                            <i className="fa fa-chevron-right"></i>
                        </button>
                    </form>
                </div>
                <div className="kotakcheckin">
                    <span className="kotakangkastat" >{jumlahcheckin}</span>
                    <span className="kotakhalamanstat">CHECK IN</span>
                    <Link to="/logpintu">
                        <div className="kkotakstat"> 
                            <span> View More </span> 
                            <i className="fa fa-chevron-right"></i>
                        </div>
                    </Link>
                </div>
                <div className="kotakcheckout">
                    <span className="kotakangkastat" >{jumlahcheckout}</span>
                    <span className="kotakhalamanstat">CHECK OUT</span>
                    <Link to="/logpintu">
                        <div className="kkotakstat"> 
                            <span> View More </span> 
                            <i className="fa fa-chevron-right"></i>
                        </div>
                    </Link>
                </div>
                <div className="kotakpengguna">
                    <span className="kotakangkastat" >{pengguna.length}</span>
                    <span className="kotakhalamanstat">PENGGUNA</span>
                    <Link to="/pengguna">
                        <div className="kkotakstat"> 
                            <span> View More </span> 
                            <i className="fa fa-chevron-right"></i>
                        </div>
                    </Link>
                </div>
                <div className="kotakruangan">
                    <span className="kotakangkastat" >{ruangan.length}</span>
                    <span className="kotakhalamanstat">RUANGAN</span>
                    <Link to="/ruangan">
                        <div className="kkotakstat"> 
                            <span> View More </span> 
                            <i className="fa fa-chevron-right"></i>
                        </div>
                    </Link>
                </div>
                <div className="kotakgrafik">
                    <div className="kotakisigrafik">
                        {
                        datasalah &&
                            <span className="textmerah">*{pesan}</span>
                        
                        }
                        <div className="kotakisigrafik2">
                            <Chart 
                            width="1053px"
                            height="290px"
                            chartType="ColumnChart"
                            loader={
                                    <div className="loadinggrafik"> 
                                        <i className="fa fa-spinner fa-pulse" style={{fontSize:"550%", color:"#E43A34"}}> </i>
                                    </div>
                                    }
                            data={datagrafik}
                            options={{
                                legend: { position: 'top-right'},
                                title: 'Statistik Check In dan Check Out',
                                hAxis: {title: 'Waktu'},
                                vAxis: {title: 'Jumlah'},
                                }}
                            legendToggle
                            />
                        </div>
                    </div>
                </div>
            </div>
            
        )
    } 
}

export default withRouter(Statistik);