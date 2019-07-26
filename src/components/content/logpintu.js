import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import {withRouter,Route,Link} from 'react-router-dom';
import Daftarlogpintu from './daftarlogpintu';



class Logpintu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isidata: [],
      ins: [],
      room: [],
      scardID: '',
      terminalID: '',
      startDate: '',
      endDate: '',
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

    const {scardID,terminalID,startDate,endDate} = this.state
    var scardid
    var termid
    var starttime
    var endtime
    var filter

    if (scardID===''){
      scardid=''
    }
    else {
      scardid='&scard_id='+scardID
    }

    if (terminalID===''){
      termid=''
    }
    else {
      termid='&term_id='+terminalID
    }
    if (startDate===''){
      starttime=''
    }
    else {
      starttime='&startdatetime='+startDate.substring(0,4)+startDate.substring(5,7)+startDate.substring(8,10)+'T000000+07:00'
    }

    if (endDate===''){
      endtime=''
    }
    else {
      endtime='&enddatetime='+endDate.substring(0,4)+endDate.substring(5,7)+endDate.substring(8,10)+'T000000+07:00'
    }

    if ((endDate==='')||(startDate==='')){
      if ((startDate==='')&&(endDate!=='')){
        starttime=''
        endtime='&year='+endDate.substring(0,4)+'&month='+endDate.substring(5,7)+'&day='+endDate.substring(8,10)
      }
      else if ((endDate==='')&&(startDate!=='')){
        starttime='&year='+startDate.substring(0,4)+'&month='+startDate.substring(5,7)+'&day='+startDate.substring(8,10)
        endtime=''
      }
      else {
        starttime=''
        endtime=''
      }
    }

    if (((endDate!=='')&&(startDate!==''))&&(('&year='+startDate.substring(0,4)+'&month='+startDate.substring(5,7)+'&day='+startDate.substring(8,10))===('&year='+endDate.substring(0,4)+'&month='+endDate.substring(5,7)+'&day='+endDate.substring(8,10)))){
      starttime='&year='+startDate.substring(0,4)+'&month='+startDate.substring(5,7)+'&day='+startDate.substring(8,10)
      endtime=''
    }



    filter = scardid+termid+starttime+endtime;

    let h = new Headers();
    h.append ('Authorization', 'Basic YWRtaW46YmFuZHVuZzEyMw==')
    fetch('https://192.168.2.7/smartlock/api/v1/smartlockview.json?limit='+this.props.limit+filter+"&ob=1", {
    method: 'GET',
    headers: h
    })
    .then(response=>response.json())
    .then(data => {
      if (data.code===200){
          this.setState({isidata: data.results})
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

    //mengambil ruangan berdasarkan terminal id
    fetch('http://192.168.2.7:3000/terminal', {
    method: 'GET',
    headers: he
    })
    .then(response=>response.json())
    .then(data => this.setState({room: data}))
  }

  componentDidMount(){
    let h = new Headers();
    h.append ('Authorization', 'Basic YWRtaW46YmFuZHVuZzEyMw==')
    fetch('https://192.168.2.7/smartlock/api/v1/smartlockview.json?limit='+this.props.limit+"&ob=1", {
    method: 'GET',
    headers: h
    })
    .then(response=>response.json())
    .then(data => this.setState({isidata: data.results}))
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
    
    //mengambil ruangan berdasarkan terminal id
    fetch('http://192.168.2.7:3000/terminal', {
    method: 'GET',
    headers: he
    })
    .then(response=>response.json())
    .then(data => this.setState({room: data}))
  }
  
  refresh(){
    let h = new Headers();
    h.append ('Authorization', 'Basic YWRtaW46YmFuZHVuZzEyMw==')
    fetch('https://192.168.2.7/smartlock/api/v1/smartlockview.json?limit='+this.props.limit+"&ob=1", {
    method: 'GET',
    headers: h
    })
    .then(response=>response.json())
    .then(data => this.setState({isidata: data.results}))
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
    
    //mengambil ruangan berdasarkan terminal id
    fetch('http://192.168.2.7:3000/terminal', {
    method: 'GET',
    headers: he
    })
    .then(response=>response.json())
    .then(data => this.setState({room: data}))
  }

render(){
  const {datasalah} = this.state
  sessionStorage.removeItem("login");
  //fungsi status
  function lockstatus(e){
    var hasil
    if (e===0){
      hasil = "Checked In"
    }
    else if (e===1) {
      hasil = "Checked Out"
    }
    else if (e===2) {
      hasil = "Izin"
    }
    else if (e===3) {
      hasil = "Sakit"
    }
    return hasil
  }
  
  //fungsi ambil nama dari pengguna
  function nama(nim1,array){
    var hasil
    var i
    for ( i=0; i<array.length; i++){
      if (String(nim1)===array[i].card_id){
        hasil = array[i].name
        break
      }
      else {
        hasil = 'Tidak Terdaftar'
      }
    }
    return hasil
  }

  //fungsi ambil instansi dari pengguna
  function instansi(nim1,array){
    var hasil
    var i
    for ( i=0; i<array.length; i++){
      if (String(nim1)===array[i].card_id){
        hasil = array[i].instansi
        break
      }
      else {
        hasil = 'Tidak Terdaftar'
      }
    }
    return hasil
  }
  
  //fungsi ambil ruangan dari ruangan
  function ruangan(termid,room){
    var ruang
    var i
    for ( i=0; i<room.length; i++){
      if (String(termid)===room[i].terminal_id){
        ruang = room[i].room
        break
      }
      else {
        ruang = 'Tidak Terdaftar'
      }
    }
    return ruang
  }
  
  //fungsi parsing waktu
  function waktu(t){
    var tahun,bulan,tanggal,jam,menit,tgl,j,m,date;
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
    j = date.getHours()
    if (j<=9){
      jam = "0"+String(j)
    }
    else {
      jam = String(j)
    }
    m = date.getMinutes()
    if (m<=9){
      menit = "0"+String(m)
    }
    else {
      menit = String(m)
    }
    return bulan+" "+tanggal+", "+tahun+" "+jam+":"+menit+":00"
  }
  
  var x=1;

  function no(i){
    var m=0
    var hasil=m+i
    return  hasil
  }

  const data = {
    columns: [
      {
        label: 'No',
        field: 'no',
        sort: 'asc',
      },
      {
        label: 'Waktu',
        field: 'waktu',
        sort: 'asc',
      },
      {
        label: 'Scard ID',
        field: 'scardid',
        sort: 'asc',
      },
      {
        label: 'NIP/NIM',
        field: 'nipnim',
        sort: 'asc',
      },
      {
        label: 'Nama',
        field: 'nama',
        sort: 'asc',
      },
      {
        label: 'Instansi',
        field: 'instansi',
        sort: 'asc',
      },
      {
        label: 'Terminal ID',
        field: 'terminalid',
        sort: 'asc',
      },
      {
        label: 'Ruangan',
        field: 'ruangan',
        sort: 'asc',
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
      }
    ],
    rows:this.state.isidata.map(isi=>{
      return{
        no:no(x++),
        waktu: waktu(isi.checked_tm),
        scardid:isi.scard_id,
        nipnim:isi.scard_id,
        nama:nama(isi.scard_id,this.state.ins),
        instansi: instansi(isi.scard_id,this.state.ins),
        terminalid: isi.term_id,
        ruangan: ruangan(isi.term_id,this.state.room),
        status: lockstatus(isi.lockstatus),
      }
    })
  };
  while (document.cookie.csrftoken===''){
    return (<span>loading</span>)
  }  

  if (sessionStorage.message==="admin"){
    return (
      <div>
        <div className="kotakfilter"> 
          <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
            <div className="kotakinputlogpintuscardid">
              <label> Scard ID </label> <br></br>
              <input name="scardID" onChange={this.handleChange} className="inputformlogpintuscardid" type="text" placeholder="Scard Id"></input>
            </div>
            
            <div className="kotakinputlogpintutermid">
              <label> Terminal ID </label> <br></br>
              <input name="terminalID" onChange={this.handleChange} className="inputformlogpintutermid" type="text" placeholder="Terminal Id"></input>
            </div>
  
            <div className="kotakinputlogpintustart">
              <label> Start Date </label> <br></br>
              <input name="startDate" onChange={this.handleChange} className="inputformlogpintustart" type="date" ></input>
            </div> 
            
            <div className="kotakinputlogpintuend">
              <label> End Date </label> <br></br>
              <input name="endDate" onChange={this.handleChange} className="inputformlogpintuend" type="date"></input>
            </div>
            
            {
              datasalah &&
              <p className="textmerah">*Data yang diinput salah</p>
            }
            { 
              (datasalah===false) &&
              <p className="texthijau">&emsp;</p>
            }
            <div className="kotaksubmitlogpintu">
              <input className="submitformlogpintu" type="submit" value="Filter"></input>
            </div>
          </form> 
        </div>
        <div>
          <Route path="/logpintu/daftar" render={ () => <Daftarlogpintu token={this.props.token} /> } />
        </div>      
        <div className="kotaktabellogpintu">
            <div className="kotakdaftarruangan">
                <Link to="/logpintu/daftar">
                  <div className="daftar">
                    <i className="fa fa-plus"></i> 
                    <span> Log Pintu </span>
                  </div>
                </Link>
                <span>
                  <a onClick={() => this.refresh()}>
                    <div className="daftar2">
                      <i className="fa fa-refresh"></i>
                    </div>
                  </a>
                </span>
            </div>
            <div className="isitabel">
              <MDBDataTable
                responsive
                striped
                bordered
                small
                hover
                data={data}
              />
            </div>   
        </div>
        <div>
            
        </div>
      </div>
    );
  }
  else{
    return (
      <div>  
        <div className="kotakfilter"> 
          <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
            <div className="kotakinputlogpintuscardid">
              <label> Scard ID </label> <br></br>
              <input name="scardID" onChange={this.handleChange} className="inputformlogpintuscardid" type="text" placeholder="Scard Id"></input>
            </div>
            
            <div className="kotakinputlogpintutermid">
              <label> Terminal ID </label> <br></br>
              <input name="terminalID" onChange={this.handleChange} className="inputformlogpintutermid" type="text" placeholder="Terminal Id"></input>
            </div>
  
            <div className="kotakinputlogpintustart">
              <label> Start Date </label> <br></br>
              <input name="startDate" onChange={this.handleChange} className="inputformlogpintustart" type="date" ></input>
            </div> 
            
            <div className="kotakinputlogpintuend">
              <label> End Date </label> <br></br>
              <input name="endDate" onChange={this.handleChange} className="inputformlogpintuend" type="date"></input>
            </div>
            
            <div className="kotaksubmitlogpintu2">
              <input className="submitformlogpintu" type="submit" value="Filter"></input>
            </div>
          </form> 
        </div>   
        <div className="kotaktabellogpintu2">
            <div className="isitabel">
              <MDBDataTable
                responsive
                striped
                bordered
                small
                hover
                data={data}
              />
            </div>   
        </div>
      </div>
    );
  }

  
  }
}

export default withRouter(Logpintu);