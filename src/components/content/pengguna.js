import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import {withRouter} from "react-router-dom";
import get from './config';


class Pengguna extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isidata: [],
      daftar: false,
      edit:false,
      nimc:'',
      namac:'',
      nimu:'',
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
    const {nimc,namac} = this.state
    fetch(get.adduser, {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        user_id: sessionStorage.user,
        nim: nimc,
        nama: namac
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
    const {nimu,namau} = this.state
    fetch(get.edituser, {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        user_id: sessionStorage.user,
        nim: nimu,
        name_update: namau
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

  componentDidMount(){
    fetch(get.listuser, {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      }
    })
    .then (response =>response.json())  
    .then (response =>this.setState({isidata:response.list}))
  }

  refresh(){
    fetch(get.listuser, {
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
    var yes = window.confirm("Apakah anda yakin ingin menghapus data berikut: NIM = " +e+", Nama= "+f);
    if (yes === true){
      fetch(get.deleteuser, {
        method: 'post',
        headers :{
          "Authorization" : "Bearer "+ sessionStorage.name,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          user_id: sessionStorage.user,
          nim: e
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
    this.setState({nimu:a})
    this.setState({namau:b})
  }
  hideEdit(){
    this.setState({edit:false})
    this.setState({datasalah:false})
    this.setState({databenar:false})
  }

  render(){
    const {daftar,edit,databenar,datasalah,nimu,namau} = this.state
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
          label: 'Nama Pengguna',
          field: 'namapengguna',
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
          nim: isi.nim,
          namapengguna:isi.nama,
          keterangan:<div className="editdelete"> <a onClick={() => this.showEdit(isi.nim,isi.nama)}><i className="fa fa-pencil"></i></a> | <a className="mousepointer" onClick={() => this.deleteData(isi.nim,isi.nama)}> <i className="fa fa-trash"></i></a> </div>
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
                  <label> NIM </label><br></br>
                  <input name="nimc" onChange={this.handleChange} className="inputidruangan" type="text" placeholder="NIM" required></input>
                </div>

                <div className="labelinputnamaruangan">
                  <label> Nama Pengguna</label><br></br>
                  <input name="namac" onChange={this.handleChange} className="inputnamaruangan" type="text" placeholder="Nama Pengguna" required ></input>
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
                    <label> NIM </label><br></br>
                    <input onChange={this.handleChange} className="inputidruangan" type="text" placeholder="NIM" value={nimu} required></input>
                  </div>

                  <div className="labelinputnamaruangan">
                    <label> Nama Pengguna</label><br></br>
                    <input name="namau" onChange={this.handleChange} className="inputnamaruangan" type="text" placeholder="Nama Pengguna" value={namau} required ></input>
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
                    <span><b>Pengguna</b></span>
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

export default withRouter(Pengguna);
