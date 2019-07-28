import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';


class Daftardevice extends Component{
  constructor(props) {
    super(props);
    this.state = {
    idc:'',
    ipc:'',
    portrc: '',
    portsc: '',
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

  render(){
    const {databenar,datasalah} = this.state
    return (
      <div>
        <div className="kotakfilter"> 
          <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
                
            <div className="kotakinputpenggunanim">
              <label> ID Ruangan </label> <br></br>
              <input name="idc" onChange={this.handleChange} className="inputformpenggunanim" type="text" placeholder="ID Ruangan" required></input>
            </div>

            <div className="kotakinputpenggunanama">
              <label> IP Reader</label> <br></br>
              <input name="namac" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Nama Ruangan" required ></input>
            </div> 

            <div>
              <label> Port Reader</label> <br></br>
              <input name="portrc" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Nama Ruangan" required ></input>
            </div>

            <div>
              <label> Port Server</label> <br></br>
              <input name="portsc" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Nama Ruangan" required ></input>
            </div>
                
            {
              databenar && 
              <p className="texthijau">*Data berhasil disimpan</p>
            }
            {
              datasalah &&
              <p className="textmerah">*Data yang diinput salah</p>
            }
            { 
              (databenar===false && datasalah===false) &&
              <p className="texthijau">&emsp;</p>
            }
            <div className="kotaksubmitpengguna">
              <input className="submitformlogpintu" type="submit" value="Add"></input>
            </div>

            <div className="kotakcancelpengguna">
              <Link to="/device"> <span className="cancelformpengguna">Cancel</span></Link>
            </div>
          </form> 
        </div>
        <div className="paddingtop30px">
        </div>
      </div>
    )
  } 
}
export default withRouter(Daftardevice);