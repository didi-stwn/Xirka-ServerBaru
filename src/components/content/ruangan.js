import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import {withRouter} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import get from './config';

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
      pesan:'',
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
    fetch(get.addroom, {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        user_id: sessionStorage.user,
        id_ruangan: idc,
        nama_ruangan: namac
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response.status==="created"){
        this.setState({pesan:response.status})
        this.setState({databenar:true})
        this.setState({datasalah:false})
      }
      else {
        this.setState({pesan:response.status})
        this.setState({datasalah:true})
        this.setState({databenar:false})
      }
    })
  }

  handleSubmitEdit(e){
    e.preventDefault();
    const {idu,namau} = this.state
    fetch(get.editroom, {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        user_id: sessionStorage.user,
        id_ruangan: idu,
        nama_ruangan_baru: namau
      })
    })
    .then(response => response.json())
    .then(response =>{
      if (response.status==="updated"){
        this.setState({pesan:response.status})
        this.setState({databenar:true})
        this.setState({datasalah:false})
      }
      else {
        this.setState({pesan:response.status})
        this.setState({datasalah:true})
        this.setState({databenar:false})
      }
    })
  }

  componentDidMount(){
    fetch(get.listroom, {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      }
    })
    .then (response =>response.json())  
    .then (response =>{
      if (response.detail==="Signature has expired."){
        sessionStorage.removeItem("name")
      }
      else if (response.list.length>0){
        this.setState({isidata:response.list})
      }
    })
  }

  refresh(){
    fetch(get.listroom, {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      }
    })
    .then (response =>response.json())  
    .then (response =>{
      if (response.detail==="Signature has expired."){
        sessionStorage.removeItem("name")
      }
      else if (response.list.length>0){
        this.setState({isidata:response.list})
      }
    })
  }

  deleteData(e,f){
    var yes = window.confirm("Apakah anda yakin ingin menghapus data berikut: ID Ruangan = " +e+", Nama Ruangan= "+f);
    if (yes === true){
      fetch(get.deleteroom, {
        method: 'post',
        headers :{
          "Authorization" : "Bearer "+ sessionStorage.name,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          user_id: sessionStorage.user,
          id_ruangan: e
          })
      })
      .then (response => response.json())
      .then(response=>{
        if (response.status==="deleted"){
          window.alert(response.status)
        }
        else{
          window.alert(response.status)
        }
      })
    }
  }

  showDaftar(){
    this.setState({daftar:true})
    this.setState({edit:false})
  }
  hideDaftar(){
    this.setState({daftar:false})
    this.setState({datasalah:false})
    this.setState({databenar:false})
  }

  showEdit(a,b){
    this.setState({edit:true})
    this.setState({daftar:false})
    this.setState({idu:a})
    this.setState({namau:b})
  }
  hideEdit(){
    this.setState({edit:false})
    this.setState({datasalah:false})
    this.setState({databenar:false})
  }

  render(){
    const {daftar,edit,databenar,datasalah,idu,namau,pesan} = this.state
    const data = {
      columns: [
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
          idruangan: isi.kode_ruangan,
          namaruangan:isi.nama_ruangan,
          keterangan:<div><button className="backgroundbiru" onClick={() => this.showEdit(isi.kode_ruangan, isi.nama_ruangan)}>Edit</button>&nbsp;<button className="backgroundmerah" onClick={() => this.deleteData(isi.kode_ruangan,isi.nama_ruangan)}>Delete</button></div>,
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
                  <span className="texthijau">{pesan}</span>
                }
                {
                  datasalah &&
                  <span className="textmerah">{pesan}</span>
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
                    <span className="texthijau">{pesan}</span>
                  }
                  {
                    datasalah &&
                    <span className="textmerah">{pesan}</span>
                  }
                
                  <div className="labelinputidruangan">
                    <label> ID Ruangan </label><br></br>
                    <input onChange={this.handleChange} className="inputidruangan" type="text" placeholder="ID Ruangan" value={idu} required></input>
                  </div>

                  <div className="labelinputnamaruangan">
                    <label> Nama Ruangan</label><br></br>
                    <input name="namau" onChange={this.handleChange} className="inputnamaruangan" type="text" placeholder="Nama Ruangan" value={namau} required ></input>
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
                <span>
                  <a onClick={() => this.refresh()}>
                    <div className="daftar2">
                      <i className="fa fa-refresh"></i>
                    </div>
                  </a>
                </span>
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