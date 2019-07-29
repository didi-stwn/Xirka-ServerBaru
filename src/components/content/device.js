import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import {withRouter} from "react-router-dom";

class Device extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isidata: [],
      daftar: false,
      edit:false,
      idc:'',
      ipc:'',
      portrc: '',
      portsc: '',
      idu:'',
      ipu:'',
      portsu:'',
      portru:'',
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
    const {idc,ipc,portrc,portsc} = this.state
    fetch('http://192.168.2.7:8020/doorlog/regdevais/', {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        id_ruangan: idc,
        ip_reader: ipc,
        port_reader:portrc,
        port_server_used:portsc
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
    const {idu,portsu,ipu,portru} = this.state
    fetch('http://192.168.2.7:8020/doorlog/editdevais/', {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        port_server_used:portsu,
        new_id_ruangan: idu,
        new_ip_reader: ipu,
        new_port_reader: portru,
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
    fetch('http://192.168.2.7:8020/doorlog/listdevais/', {
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
    fetch('http://192.168.2.7:8020/doorlog/listdevais/', {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      }
    })
    .then (response =>response.json())  
    .then (response =>this.setState({isidata:response.list}))
  }

  deleteData(e){
    var yes = window.confirm("Apakah anda yakin ingin menghapus data berikut: Port Server = " +e);
    if (yes === true){
      fetch('http://192.168.2.7:8020/doorlog/deldevais/', {
        method: 'post',
        headers :{
          "Authorization" : "Bearer "+ sessionStorage.name,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          port_server_used: e
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
    this.setState({datasalah:false})
    this.setState({databenar:false})
  }

  showEdit(a){
    this.setState({edit:true})
    this.setState({portsu:a})
  }
  hideEdit(){
    this.setState({edit:false})
    this.setState({datasalah:false})
    this.setState({databenar:false})
  }

  render(){
    const {idc,daftar,edit,databenar,datasalah,portsu} = this.state
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
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
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
        }
      ],
      rows: this.state.isidata.map(isi=>{
        return {
          no:no(x++),
          id:isi.id,
          portserver:isi.port_server_used,
          ipreader:isi.ip_reader,
          portreader:isi.port_reader,
          idruangan:isi.ruangan_id,
          status:isi.status,
          keterangan:<div className="editdelete"> <a onClick={() => this.showEdit(isi.port_server_used)}><i className="fa fa-pencil"></i></a> | <a className="mousepointer" onClick={() => this.deleteData(isi.port_server_used)}> <i className="fa fa-trash"></i></a> </div>
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
                  <input onChange={this.handleChange} className="inputformpenggunascardid" type="text" placeholder="Port Server" value={portsu} required></input>
                </div>

                <div className="kotakinputpenggunanim">
                  <label> IP Reader</label><br></br>
                  <input name="ipu" onChange={this.handleChange} className="inputformpenggunanim" type="text" placeholder="IP Reader" required ></input>
                </div> 

                <div className="kotakinputpenggunanama">
                  <label> Port Reader</label><br></br>
                  <input name="portru" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Port Reader" required ></input>
                </div>

                <div className="kotakinputpenggunainstansi">
                  <label> ID Ruangan</label><br></br>
                  <input name="idu" onChange={this.handleChange} className="inputformpenggunainstansi" type="text" placeholder="ID Ruangan" required ></input>
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
                {/* <span>
                  <a onClick={() => this.refresh()}>
                    <div className="daftar2">
                      <i className="fa fa-refresh"></i>
                    </div>
                  </a>
                </span> */}
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
export default withRouter(Device);