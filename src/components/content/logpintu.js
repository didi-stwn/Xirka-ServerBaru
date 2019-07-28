import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import {withRouter,Route,Link,Switch} from 'react-router-dom';

class Logpintu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      sort:'nim',
      ascdsc:'asc',
      pagesize: 10,
      pagee: 1,
      startDate: new Date('2019-07-13'),
      endDate: new Date(),
      searching:'',
      isidata: [],
      daftar:false,
      edit:false,
      nimc:'',
      ruanganc:'',
      methodc:'',
      nimu: '',
      ruanganu:'',
      dateu:'',
      statusu:'',
      datasalah: false,
      databenar: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleSubmitDaftar = this.handleSubmitDaftar.bind(this);    
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  componentDidMount(){
    const {sort,ascdsc,pagesize,pagee,startDate,endDate,searching}=this.state
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
    
    fetch('http://192.168.2.7:8020/doorlog/getlogapi/', {
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
    .then (response =>this.setState({isidata:response.list}))
  }

  componentDidUpdate(){
    const {sort,ascdsc,pagesize,pagee,startDate,endDate,searching}=this.state
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
    fetch('http://192.168.2.7:8020/doorlog/getlogapi/', {
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
    .then (response =>this.setState({isidata:response.list}))
  }

  handleSubmitDaftar(e){
    e.preventDefault();
    const {nimc,ruanganc,methodc} = this.state
    fetch('http://192.168.2.7:8020/doorlog/addlog/', {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        nim: nimc,
        ruangan: ruanganc,
        method:methodc
      })
    })
    .then(response => {
      if (response.ok){
        this.setState({databenar:true})
        this.setState({datasalah:false})
      }
      else {
        this.setState({datasalah:true})
        this.setState({databenar:false})
      }
    })
  }

  handleSubmitEdit(e){
    e.preventDefault();
    const {nimu,ruanganu,dateu,statusu} = this.state;
    var dateinput, timeinput, t,tahun, b, bulan, ta, tanggal, j, jam, m, menit;
    t = new Date(dateu)
    tahun = String(t.getFullYear());
    b = t.getMonth() + 1;
    if (b<=9){
        bulan = "0"+String(b)
    }
    else {
        bulan = String(b)
    }
    ta = t.getDate();
    if (ta<=9){
        tanggal = "0"+String(ta)
    }
    else {
        tanggal = String(ta)
    }
    j = t.getHours()
    if (j<=9){
        jam = "0"+String(j)
    }
    else {
        jam = String(j)
    }
    m = t.getMinutes()
    if (m<=9){
        menit = "0"+String(m)
    }
    else {
        menit = String(m)
    }

    dateinput = tahun+"-"+bulan+"-"+tanggal
    timeinput = jam+":"+menit+":00.000000"

    fetch('http://192.168.2.7:8020/doorlog/editlog/', {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        nim: nimu,
        ruangan: ruanganu,
        date: dateinput,
        time: timeinput,
        status: statusu
      })
    })
    .then(response => {
      if (response.ok){
        this.setState({databenar:true})
        this.setState({datasalah:false})
      }
      else {
        this.setState({datasalah:true})
        this.setState({databenar:false})
      }
    })
  }

  showDaftar(){
    this.setState({daftar:true})
  }
  hideDaftar(){
    this.setState({daftar:false})
  }

  showEdit(a){
    this.setState({edit:true})
    this.setState({idu:a})
  }
  hideEdit(){
    this.setState({edit:false})
  }

  render(){
    const {isidata,daftar,edit,databenar,datasalah} = this.state
    var x = 1;
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
          label: 'NIM',
          field: 'nim',
          sort: 'asc',
        },
        {
          label: 'Nama',
          field: 'nama',
          sort: 'asc',
        },
        {
          label: 'ID Ruangan',
          field: 'idruangan',
          sort: 'asc',
        },
        {
          label: 'Nama Ruangan',
          field: 'namaruangan',
          sort: 'asc',
        },
        {
          label: 'Tanggal',
          field: 'tanggal',
          sort: 'asc',
        },
        {
          label: 'Waktu',
          field: 'waktu',
          sort: 'asc',
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Method',
          field: 'method',
          sort: 'asc',
        }
      ],
      rows: this.state.isidata.map(isi=>{
        return {
          no:no(x++),
          nim: isi.nim,
          nama: isi.nim,
          koderuangan: isi.nim,
          namaruangan: isi.nim,
          tanggal: isi.nim,
          waktu: isi.nim,
          status: isi.nim,
          method: isi.nim,
        }
      })
    };
    var aksidata
    if (daftar===true){
      aksidata = "show"
    }
    else if (edit===true){
      aksidata = "show"
    }
    else {
      aksidata = "hide"
    }
    return(
      <div>
        {
          daftar &&
          <div>
          <div className="kotakfilter2"> 
            <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
              {
                databenar && 
                <span className="texthijau">*Data berhasil disimpan</span>
              }
              {
                datasalah &&
                <span className="textmerah">*Data yang diinput salah</span>
              }
              <div className="daftarlognim">
                <label><b>NIM</b>  </label> <br></br>
                <input name="nimc" onChange={this.handleChange} className="inputdaftarlogpintu" type="text" placeholder="ID Ruangan" required></input>
              </div>
  
              <div className="daftarlognamaruangan">
                <label> <b>Nama Ruangan</b></label> <br></br>
                <input name="ruanganc" onChange={this.handleChange} className="inputdaftarlogpintu" type="text" placeholder="Nama Ruangan" required ></input>
              </div> 
              
              <div className="daftarlogmethod">
                <label><b>Method</b>  </label> <br></br>
                <select name="methodc" onChange={this.handleChange} className="inputdaftarlogpintu" required>
                  <option value="1"> Contact </option>
                  <option value="2"> Contactless </option>
                  <option value="3"> Finger Print </option>
                  <option value="4"> Admin </option>
                </select>
              </div>
              
              <div className="kotaksubmitpengguna">
                <input className="submitformlogpintu" type="submit" value="Add"></input>
              </div>
    
              <div className="kotakcancelpengguna">
                <a onClick={() => this.hideDaftar()}> <span className="cancelformpengguna">Cancel</span></a>
              </div>
            </form> 
          </div>
        </div>
        }
        
        {
          edit &&
          <div>
            <div className="kotakfilter2"> 
              <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
                {
                  databenar && 
                  <span className="texthijau">*Data berhasil disimpan</span>
                }
                {
                  datasalah &&
                  <span className="textmerah">*Data yang diinput salah</span>
                }
                <div className="kotakinputlogpintunim">
                  <label> <b>NIM</b> </label> <br></br>
                  <input name="nimu" onChange={this.handleChange} className="inputformlogpintunim" type="text" placeholder="NIM" required ></input>
                </div>
                      
                <div className="kotakinputlogpintuterminalid">
                  <label><b>Nama Ruangan</b> </label> <br></br>
                  <input name="ruanganu" onChange={this.handleChange} className="inputformlogpintuterminalid" type="text" placeholder="Terminal Id" required ></input>
                </div>

                <div className="kotakinputlogpintucheckedtm">
                  <label> <b>Waktu dan Tanggal</b>  </label> <br></br>
                  <input name="dateu" onChange={this.handleChange} className="inputformlogpintucheckedtm" type="datetime-local" required></input>
                </div> 
                      
                <div className="kotakinputlogpintustatus">
                  <label> <b>Status</b> </label> <br></br>
                  <select name="lockstatus" onChange={this.handleChange} className="inputformlogpintustatus" required>
                    <option value="1"> Hadir</option>
                    <option value="2"> Absen </option>
                    <option value="3"> Sakit </option>
                    <option value="4"> Izin </option>
                    <option value="5"> Forbidden </option>
                  </select>
                </div>
            
                <div className="kotaksubmitpengguna2">
                  <input className="submitformlogpintu" type="submit" value="Add"></input>
                </div>

                <div className="kotakcancelpengguna2">
                  <a onClick={() => this.hideEdit()}> <span className="cancelformpengguna">Cancel</span></a>
                </div>
              </form> 
            </div>
          </div>
        }
        { (daftar===false)&&(edit===false)&&
          <div>
            <div className="kotakdaftarruangan">
              <a onClick={() => this.showDaftar()}>
                <div className="daftar">
                  <i className="fa fa-plus"></i> 
                  <span><b>Log</b></span>
                </div>
              </a>
            </div>
            <div className="kotakdaftarruangan2">
              <a onClick={() => this.showEdit()}>
                <div className="daftar">
                  <i className="fa fa-pencil"></i> 
                  <span><b>Log</b></span>
                </div>
              </a>
            </div>
          </div>
        }
        <div id={aksidata} className="kotakdata">
          <div>
            <div className="filtersortlogpintu">
              <label> <b>Urutkan Berdasarkan</b> </label> <br></br>
              <select name="sort" onChange={this.handleChange} className="inputfilterlogpintu" required>
                <option value="nim"> NIM </option>
                <option value="nama"> Nama </option>
              </select>
            </div>
            <div className="filterascdsclogpintu">
              <label> <b>Jenis Urutan</b> </label> <br></br>
              <select name="ascdsc" onChange={this.handleChange} className="inputfilterlogpintu" required>
                <option value="asc"> Menaik </option>
                <option value="dsc"> Menurun </option>
              </select>
            </div>
            <div className="filterstartlogpintu">
              <label> <b>Tanggal Awal</b> </label> <br></br>
              <input name="startDate" onChange={this.handleChange} className="inputfilterlogpintu" type="date" required></input>
            </div>
            <div className="filterendlogpintu">
              <label> <b>Tanggal Akhir</b></label> <br></br>
              <input name="endDate" onChange={this.handleChange} className="inputfilterlogpintu" type="date" required></input>
            </div>
            <div className="filtersearchlogpintu">
              <label> <b>Cari Data</b> </label> <br></br>
              <input name="searching" onChange={this.handleChange} className="inputfilterlogpintu" type="text" placeholder="Cari data" required></input>
            </div>
          </div>
          <div className="paddingtop40px"></div>
          <div className="isitabel">
            <MDBDataTable
            responsive
            displayEntries={false}              info={false}
            paging={false}
            info={false}
            searching={false}
            sortable={false}
            striped
            bordered
            small
            hover
            theadColor={""}
            data={data}
            />
          </div> 
      </div>
    </div>
    )
  } 
}

export default withRouter(Logpintu);