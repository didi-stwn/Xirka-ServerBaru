import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';


class Editruangan extends Component{
  constructor(props) {
    super(props);
    this.state = {
    idu:this.props.editID,
    portsu:'',
    idu2:'',
    ipu:'',
    portru:'',
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
    const {idu,portsu,idu2,ipu,portru} = this.state
    fetch('http://192.168.2.7:8020/doorlog/editdevais/', {
      method: 'post',
      headers :{
        "Authorization" : "Bearer "+ sessionStorage.name,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        port_server_used:idu,
        new_port_server_used: portsu,
        new_id_ruangan: idu2,
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

    render(){
      const {databenar,datasalah} = this.state
        return (
            <div>
              <div className="kotakfilter"> 
                <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
                
                <div className="kotakinputpenggunanim">
                  <label> Port Server lama </label> <br></br>
                  <input name="idu" onChange={this.handleChange} className="inputformpenggunanim" type="text" placeholder="ID Ruangan" value={this.props.editID} required></input>
                </div>

                <div className="kotakinputpenggunanim">
                  <label> Port Server </label> <br></br>
                  <input name="portsu" onChange={this.handleChange} className="inputformpenggunanim" type="text" placeholder="ID Ruangan" required></input>
                </div>

                <div className="kotakinputpenggunanama">
                  <label> ID Ruangan</label> <br></br>
                  <input name="idu2" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Nama Ruangan" required ></input>
                </div> 

                <div>
                  <label> IP Reader</label> <br></br>
                  <input name="ipu" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Nama Ruangan" required ></input>
                </div>

                <div>
                  <label> Port Reader </label> <br></br>
                  <input name="portru" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Nama Ruangan" required ></input>
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
                    <input className="submitformlogpintu" type="submit" value="Edit"></input>
                  </div>

                  <div className="kotakcancelpengguna">
                    <Link to="/ruangan"> <span className="cancelformpengguna">Cancel</span></Link>
                  </div>
                </form> 
              </div>
              <div className="paddingtop30px">

              </div>
            </div>
        )
    }
}

export default withRouter(Editruangan);