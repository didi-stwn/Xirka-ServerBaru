import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import {Route,Link,withRouter,Switch} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Ruangan extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isidata: [],
      daftar: false,
      edit:false,
      idc:'',
      namac:'',
      idu:'',
      namau:'',
      datasalah: false,
      databenar: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitDaftar = this.handleSubmitDaftar.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmitDaftar(e){
    e.preventDefault();
    const {idc,namac} = this.state
    fetch('http://192.168.2.7:8020/doorlog/registerRoom/', {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        id_ruangan: idc,
        nama_ruangan: namac
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
    const {idu,namau} = this.state
    fetch('http://192.168.2.7:8020/doorlog/editRoom/', {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        id_ruangan: idu,
        nama_ruangan_baru: namau
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

  componentWillMount(){
    fetch('http://192.168.2.7:8020/doorlog/rooms/', {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      }
    })
    .then (response =>response.json())  
    .then (response =>this.setState({isidata:response.list}))
  }

  componentDidUpdate(){
    fetch('http://192.168.2.7:8020/doorlog/rooms/', {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      }
    })
    .then (response =>response.json())  
    .then (response =>this.setState({isidata:response.list}))
  }

  deleteData(e,f){
    var yes = window.confirm("Apakah anda yakin ingin menghapus data berikut: ID Ruangan = " +e+", Nama Ruangan= "+f);
    if (yes === true){
      fetch('http://192.168.2.7:8020/doorlog/deleteRoom/', {
        method: 'post',
        headers :{
          "Authorization" : "Bearer "+ sessionStorage.name,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          id_ruangan: e
          })
      })
      .then(response=>{
        if (response.ok){
          window.alert("Data berhasil dihapus")
        }
        else{
          window.alert("Data tidak berhasil dihapus")
        }
      })
    }
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
    const {daftar,edit,databenar,datasalah,idu} = this.state
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
          label: 'Keterangan',
          field: 'keterangan'
        }
      ],
      rows: this.state.isidata.map(isi=>{
        return {
          no:no(x++),
          idruangan: isi.kode_ruangan,
          namaruangan:isi.nama_ruangan,
          keterangan:<div className="editdelete"> <a onClick={() => this.showEdit(isi.kode_ruangan)}><i className="fa fa-pencil"></i></a> | <a className="mousepointer" onClick={() => this.deleteData(isi.kode_ruangan,isi.nama_ruangan)}> <i className="fa fa-trash"></i></a> </div>
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
          <div>
            {daftar &&
            
            <div className="kotakdaftar"> 
              <form className="kotakforminputlogpintu" onSubmit={this.handleSubmitDaftar}>
                {
                  databenar && 
                  <span className="texthijau">*Data berhasil disimpan</span>
                }
                {
                  datasalah &&
                  <span className="textmerah">*Data yang diinput salah</span>
                }
              
                <div className="labelinputidruangan">
                  <label> ID Ruangan </label><br></br>
                  <input name="idc" onChange={this.handleChange} className="inputidruangan" type="text" placeholder="ID Ruangan" required></input>
                </div>

                <div className="labelinputnamaruangan">
                  <label> Nama Ruangan</label><br></br>
                  <input name="namac" onChange={this.handleChange} className="inputnamaruangan" type="text" placeholder="Nama Ruangan" required ></input>
                </div> 

                <div className="kotaksubmitpengguna">
                  <input className="submitformlogpintu" type="submit" value="Add"></input>
                </div>

                <div className="kotakcancelpengguna">
                  <a onClick={() => this.hideDaftar()}> <span className="cancelformpengguna">Cancel</span></a>
                </div>
                
              </form> 
            </div>
            }
            {
              edit &&
              <div className="kotakdaftar"> 
                <form className="kotakforminputlogpintu" onSubmit={this.handleSubmitEdit}>
                  {
                    databenar && 
                    <span className="texthijau">*Data berhasil disimpan</span>
                  }
                  {
                    datasalah &&
                    <span className="textmerah">*Data yang diinput salah</span>
                  }
                
                  <div className="labelinputidruangan">
                    <label> ID Ruangan </label><br></br>
                    <input onChange={this.handleChange} className="inputidruangan" type="text" placeholder="ID Ruangan" value={idu} required></input>
                  </div>

                  <div className="labelinputnamaruangan">
                    <label> Nama Ruangan</label><br></br>
                    <input name="namau" onChange={this.handleChange} className="inputnamaruangan" type="text" placeholder="Nama Ruangan" required ></input>
                  </div> 

                  <div className="kotaksubmitpengguna">
                    <input className="submitformlogpintu" type="submit" value="Edit"></input>
                  </div>

                  <div className="kotakcancelpengguna">
                    <a onClick={() => this.hideEdit()}> <span className="cancelformpengguna">Cancel</span></a>
                  </div>
                  
                </form> 
              </div>
            }
          </div>
          { (daftar===false)&&(edit===false)&&
          <div className="kotakdaftarruangan">
                <a onClick={() => this.showDaftar()}>
                  <div className="daftar">
                    <i className="fa fa-plus"></i> 
                    <span><b>Ruangan</b></span>
                  </div>
                </a>
          </div>
          }
          <div id={aksidata} className="kotakdata">
              <div className="isitabel">
                <MDBDataTable
                responsive
                displayEntries={false}
                info={false}
                paging={false}
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
export default withRouter(Ruangan);