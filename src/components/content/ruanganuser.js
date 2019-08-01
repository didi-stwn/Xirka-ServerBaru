import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import {withRouter} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import get from './config';

class Ruanganuser extends Component{
  constructor(props) {
    super(props);
    this.state = {
        idl:'',
        isidata: [],
        daftar: false,
        nimc:'',
        idc:'',
        pesan:'',
        datasalah: false,
        databenar: false,
        carisalah: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitDaftar = this.handleSubmitDaftar.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmitDaftar(e){
    e.preventDefault();
    const {nimc,idc} = this.state
    fetch(get.adduserroom, {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        user_id: sessionStorage.user,
        nim: nimc,
        id_ruangan: idc
      })
    })
    .then(response=>response.json())
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

  refresh(){
    const {idl,pesan} = this.state
    if ((idl!==' ')&&(idl!=='')){
      fetch(get.listuserroom, {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        id_ruangan: idl,
      })
      })
      .then (response =>response.json())  
      .then (response =>{ 
        if (response.status==="room not exists"){
          this.setState({isidata:[]})
          this.setState({pesan:response.status})
          this.setState({carisalah:true})
        }
        else if(response.list===undefined){
          this.setState({pesan:response.status})
          this.setState({carisalah:true})
        }
        else if(response.list.length===0){
          var a="user not exists"
          this.setState({pesan:a})
          this.setState({carisalah:true})
        }
        else if(response.list.length!==0){
          this.setState({isidata:response.list})
          this.setState({carisalah:false})
        }
      })
    }
  }

  deleteData(e,f){
    const {idl} = this.state
    this.setState({carisalah:false})
    var yes = window.confirm("Apakah anda yakin ingin menghapus data berikut: NIM = " +e+", Nama Pengguna= "+f);
    if (yes === true){
      fetch(get.deleteuserroom, {
        method: 'post',
        headers :{
          "Authorization" : "Bearer "+ sessionStorage.name,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          user_id: sessionStorage.user,
          nim: e,
          id_ruangan: idl
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
  }
  hideDaftar(){
    this.setState({daftar:false})
    this.setState({datasalah:false})
    this.setState({databenar:false})
  }

  render(){
    const {daftar,databenar,datasalah,pesan,carisalah,idl} = this.state
    const data = {
      columns: [
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
          label: 'Hapus',
          field: 'hapus'
        }
      ],
      rows: this.state.isidata.map(isi=>{
        return {
          nim: isi.pengguna,
          namapengguna:isi.pengguna__nama,
          hapus:<div><button className="backgroundmerah" onClick={() => this.deleteData(isi.pengguna,isi.pengguna__nama)}>Delete</button></div>,
        }
      })
    };
    var aksidata
    if (daftar===true){
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
                  <label> NIM </label><br></br>
                  <input name="nimc" onChange={this.handleChange} className="inputidruangan" type="text" placeholder="NIM Pengguna" required></input>
                </div>

                <div className="labelinputnamaruangan">
                  <label> ID Ruangan</label><br></br>
                  <input name="idc" onChange={this.handleChange} className="inputnamaruangan" type="text" placeholder="ID Ruangan" required ></input>
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
          </div>
          { (daftar===false)&&
            <div>
              <div className="kotakdaftarruangan">
                <a onClick={() => this.showDaftar()}>
                  <div className="daftar">
                    <i className="fa fa-plus"></i> 
                    <span><b>Pengguna</b></span>
                  </div>
                </a>
              </div>
              <div className="cariidruangan">
                <div className="optionruanganuser">
                  <input className="inputoptionruanganuser" name="idl" onChange={this.handleChange} type="text" value={idl} placeholder="Masukan ID Ruangan..."></input>
                </div>
                <div>
                  <span>
                    <a onClick={() => this.refresh()}>
                      <div className="cari">
                        <span><b>Cari</b></span>
                      </div>
                    </a>
                  </span>
                </div>
                {
                  carisalah &&
                  <div className="pesancari">
                    <span className="textmerah">{pesan}</span>
                  </div>
                }
              </div>
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
export default withRouter(Ruanganuser);