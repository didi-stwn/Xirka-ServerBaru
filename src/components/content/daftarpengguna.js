import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';

class Daftarpengguna extends Component{
    constructor(props) {
      super(props);
      this.state = {
      nimc:'',
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
      const {nimc,namac} = this.state
      fetch('http://192.168.2.7:8020/doorlog/registerUser/', {
        method: 'post',
        headers :{
          "Authorization" : "Bearer "+ sessionStorage.name,
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
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

    render(){
      const {nimc,namac,databenar,datasalah} = this.state
      return (
        <div>
          <div className="kotakfilter"> 
            <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
                  
              <div className="kotakinputpenggunanim">
                <label> NIM </label> <br></br>
                <input name="nimc" onChange={this.handleChange} className="inputformpenggunanim" type="text" placeholder="Terminal Id" required></input>
              </div>

              <div className="kotakinputpenggunanama">
                <label> Nama </label> <br></br>
                <input name="namac" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Nama" required ></input>
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
                <Link to="/pengguna"> <span className="cancelformpengguna">Cancel</span></Link>
              </div>
            </form> 
          </div>
          <div className="paddingtop30px">
          </div>
        </div>
      )
    } 
}
export default withRouter(Daftarpengguna);