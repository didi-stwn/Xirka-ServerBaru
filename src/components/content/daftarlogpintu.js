import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';

class Daftarlogpintu extends Component{
    constructor(props) {
        super(props);
        this.state = {
        nimc:'',
        ruanganc:'',
        methodc:'',
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
        const {nimc,ruanganc,methodc} = this.state
        fetch('http://192.168.2.7:8020/doorlog/addlog/', {
          method: 'post',
          headers :{
            "Authorization" : "Bearer "+ sessionStorage.name,
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            nim: nimc,
            ruangan: ruanganc,
            method:methodc
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
                  <label> NIM </label> <br></br>
                  <input name="nimc" onChange={this.handleChange} className="inputformpenggunanim" type="text" placeholder="ID Ruangan" required></input>
                </div>
    
                <div className="kotakinputpenggunanama">
                  <label> Nama Ruangan</label> <br></br>
                  <input name="ruanganc" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Nama Ruangan" required ></input>
                </div> 
                
                <div className="kotakinputlogpintustatus">
                    <label> Method </label> <br></br>
                    <select name="methodc" onChange={this.handleChange} className="inputformlogpintustatus" required>
                        <option value="1"> Contact </option>
                        <option value="2"> Contactless </option>
                        <option value="3"> Finger print </option>
                        <option value="4"> Admin </option>
                    </select>
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
                  <Link to="/logpintu"> <span className="cancelformpengguna">Cancel</span></Link>
                </div>
              </form> 
            </div>
            <div className="paddingtop30px">
            </div>
          </div>
        )
      }  
}
export default withRouter(Daftarlogpintu);