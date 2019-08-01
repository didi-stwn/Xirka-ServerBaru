import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import {withRouter} from "react-router-dom";
import get from './config';

class Device extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isidata: [],
      daftar: false,
      edit:false,
      editID:'',
      idc:'',
      ipc:'',
      portrc: '',
      portsc: '',
      idu:'',
      ipu:'',
      portsu:'',
      portru:'',
      portss:'',
      pesan:'',
      datasalah: false,
      databenar: false,
      portssbenar: false,
      portsssalah: false,
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
    const {idc,ipc,portrc,portsc} = this.state
    fetch(get.adddevice, {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        user_id: sessionStorage.user,
        id_ruangan: idc,
        ip_reader: ipc,
        port_reader:portrc,
        port_server_used:portsc
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
    const {idu,portsu,ipu,portru,editID} = this.state
    fetch(get.editdevice, {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        user_id: sessionStorage.user,
        device_id: editID,
        new_port_server_used:portsu,
        new_id_ruangan: idu,
        new_ip_reader: ipu,
        new_port_client: portru,
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
    fetch(get.listdevice, {
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
      else {
        this.setState({pesan:"list kosong"})
      }
    })
  }

  refresh(){
    fetch(get.listdevice, {
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
      else {
        this.setState({pesan:"list kosong"})
      }
    })
  }

  deleteData(e,f,g,h,i){
    var yes = window.confirm("Apakah anda yakin ingin menghapus data berikut: ID = " +e+", Port Server = "+f+", IP Reader = "+g+", Port Reader = "+h+", ID Ruangan = "+i);
    if (yes === true){
      fetch(get.deletedevice, {
        method: 'post',
        headers :{
          "Authorization" : "Bearer "+ sessionStorage.name,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          user_id: sessionStorage.user,
          device_id: e
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

  start(a){
    if (a!==''){
      fetch(get.startdevice, {
        method: 'post',
        headers :{
          "Authorization" : "Bearer "+ sessionStorage.name,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          port_server_used: a
          })
      })
      .then(response => response.json())
      .then(response=>{
        if(response.status==="started"){
          this.setState({pesan:response.status})
          this.setState({portssbenar:true})
          this.setState({portsssalah:false})
          fetch(get.listdevice, {
            method: 'post',
            headers :{
              "Authorization" : "Bearer "+ sessionStorage.name,
              "Content-Type" : "application/json"
            }
          })
          .then (response =>response.json())  
          .then (response =>{
            if (response.list.length>0){
              this.setState({isidata:response.list})
            }
            else {
              this.setState({pesan:"list kosong"})
            }
          })
        }
        else{
          this.setState({pesan:response.status})
          this.setState({portssbenar:false})
          this.setState({portsssalah:true})
        }
      })
    }
  }
  stop(a){
    if (a!==''){
      fetch(get.stopdevice, {
        method: 'post',
        headers :{
          "Authorization" : "Bearer "+ sessionStorage.name,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          port_server_used: a
          })
      })
      .then(response => response.json())
      .then(response=>{
        if((response.status==="stopped")||(response.status==="[Errno 3] No such process")){
          this.setState({pesan:response.status})
          this.setState({portssbenar:true})
          this.setState({portsssalah:false})
          fetch(get.listdevice, {
            method: 'post',
            headers :{
              "Authorization" : "Bearer "+ sessionStorage.name,
              "Content-Type" : "application/json"
            }
          })
          .then (response =>response.json())  
          .then (response =>{
            if (response.list.length>0){
              this.setState({isidata:response.list})
            }
            else {
              this.setState({pesan:"list kosong"})
            }
          })
        }
        else{
          this.setState({pesan:response.status})
          this.setState({portssbenar:false})
          this.setState({portsssalah:true})
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

  showEdit(a,b,c,d,e){
    this.setState({edit:true})
    this.setState({daftar:false})
    this.setState({editID:a})
    this.setState({portsu:b})
    this.setState({ipu:c})
    this.setState({portru:d})
    this.setState({idu:e})
  }
  hideEdit(){
    this.setState({edit:false})
    this.setState({datasalah:false})
    this.setState({databenar:false})
  }

  render(){
    const {idc,daftar,edit,databenar,datasalah,portss, portssbenar, portsssalah, pesan} = this.state
    const {idu,ipu,portsu,portru,editID} = this.state
    let iduu,ipuu,portsuu,portruu;
    iduu = idu;
    ipuu = ipu;
    portruu = portru;
    portsuu = portsu;
    const data = {
      columns: [
        {
          label: 'Port Server',
          field: 'portserver',
          sort: 'asc',
        },
        {
          label: 'IP Reader',
          field: 'ipreader',
          sort: 'asc',
        },
        {
          label: 'Port Reader',
          field: 'portreader',
          sort: 'asc',
        },
        {
          label: 'ID Ruangan',
          field: 'idruangan',
          sort: 'asc',
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Keterangan',
          field: 'keterangan'
        },
        {
          label: 'Start/Stop',
          field: 'startstop'
        }
      ],
      rows: this.state.isidata.map(isi=>{
        return {
          portserver:isi.port_server_used,
          ipreader:isi.ip_reader,
          portreader:isi.port_reader,
          idruangan:isi.ruangan_id,
          status:isi.status,
          keterangan:<div><button className="backgroundbiru" onClick={() => this.showEdit(isi.id,isi.port_server_used,isi.ip_reader,isi.port_reader,isi.ruangan_id)}>Edit</button>&nbsp;<button className="backgroundmerah" onClick={() => this.deleteData(isi.id,isi.port_server_used,isi.ip_reader,isi.port_reader,isi.ruangan_id)}>Delete</button></div>,
          startstop:<div><button className="backgroundbiru" onClick={() => this.start(isi.port_server_used)}>Start</button>&nbsp;<button className="backgroundmerah" onClick={() => this.stop(isi.port_server_used)}>Stop</button></div>
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
              
                <div className="kotakinputpenggunascardid">
                  <label> Port Server </label><br></br>
                  <input name="portsc" onChange={this.handleChange} className="inputformpenggunascardid" type="text" placeholder="Port Server" required></input>
                </div>

                <div className="kotakinputpenggunanim">
                  <label> IP Reader</label><br></br>
                  <input name="ipc" onChange={this.handleChange} className="inputformpenggunanim" type="text" placeholder="IP Reader" required ></input>
                </div> 

                <div className="kotakinputpenggunanama">
                  <label> Port Reader</label><br></br>
                  <input name="portrc" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Port Reader" required ></input>
                </div>

                <div className="kotakinputpenggunainstansi">
                  <label> ID Ruangan</label><br></br>
                  <input name="idc" onChange={this.handleChange} className="inputformpenggunainstansi" type="text" placeholder="ID Ruangan" required ></input>
                </div>

                <div className="kotaksubmitdevice">
                  <input className="submitformlogpintu" type="submit" value="Add"></input>
                </div>

                <div className="kotakcanceldevice">
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
              
                <div className="kotakinputpenggunascardid">
                  <label> Port Server </label><br></br>
                  <input name="portsu" onChange={this.handleChange} className="inputformpenggunascardid" type="text" placeholder="Port Server" value={portsuu} required></input>
                </div>

                <div className="kotakinputpenggunanim">
                  <label> IP Reader</label><br></br>
                  <input name="ipu" onChange={this.handleChange} className="inputformpenggunanim" type="text" placeholder="IP Reader" value={ipuu} required ></input>
                </div> 

                <div className="kotakinputpenggunanama">
                  <label> Port Reader</label><br></br>
                  <input name="portru" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Port Reader" value={portruu} required ></input>
                </div>

                <div className="kotakinputpenggunainstansi">
                  <label> ID Ruangan</label><br></br>
                  <input name="idu" onChange={this.handleChange} className="inputformpenggunainstansi" type="text" placeholder="ID Ruangan" value={idu} required ></input>
                </div>

                <div className="kotaksubmitdevice">
                  <input className="submitformlogpintu" type="submit" value="Edit"></input>
                </div>

                <div className="kotakcanceldevice">
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
                    <span><b>Device</b></span>
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
              {
                portssbenar && 
                <span className="texthijau"><b>*{pesan}</b></span>
              }
              {
                portsssalah &&
                <span className="textmerah"><b>*{pesan}</b></span>
              }
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
export default withRouter(Device);