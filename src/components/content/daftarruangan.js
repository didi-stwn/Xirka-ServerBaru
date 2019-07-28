import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';


class Daftarruangan extends Component{
  constructor(props) {
    super(props);
    this.state = {
    idc:'',
    namac:'',
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

  render(){
    const {idc,namac,databenar,datasalah} = this.state
    return (
      <div>
        <div className="kotakfilter"> 
          <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
                
            <div className="kotakinputpenggunanim">
              <label> ID Ruangan </label> <br></br>
              <input name="idc" onChange={this.handleChange} className="inputformpenggunanim" type="text" placeholder="ID Ruangan" required></input>
            </div>

            <div className="kotakinputpenggunanama">
              <label> Nama Ruangan</label> <br></br>
              <input name="namac" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Nama Ruangan" required ></input>
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
              <Link to="/ruangan"> <span className="cancelformpengguna">Cancel</span></Link>
            </div>
          </form> 
          <div className="paddingtop30px">
        </div>
        </div>
      </div>
    )
  } 
}
export default withRouter(Daftarruangan);