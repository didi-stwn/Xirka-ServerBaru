import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';


class Editruangan extends Component{
  constructor(props) {
    super(props);
    this.state = {
    idu:this.props.editID,
    namau:'',
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

    render(){
      const {databenar,datasalah,idu} = this.state
        return (
            <div>
              <div className="kotakfilter"> 
                <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>

                  <div className="kotakinputpenggunanim">
                    <label> NIM </label> <br></br>
                    <input name="idu" onChange={this.handleChange} className="inputformpenggunanim" type="text" placeholder="Terminal Id" value={idu} required></input>
                  </div>

                  <div className="kotakinputpenggunanama">
                    <label> Nama </label> <br></br>
                    <input name="namau" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Nama" required ></input>
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