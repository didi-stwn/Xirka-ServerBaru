import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';

class Daftarpengguna extends Component{
  constructor(props) {
    super(props);
    this.state = {
    scardid: '',
    nim:'',
    nama:'',
    instansi:'',
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
    const {scardid,nim,nama,instansi} = this.state
    var request = 'card_id='+scardid+'&nim='+nim+'&name='+nama+'&instansi='+instansi;
    
    let he= new Headers()
    let token = this.props.token
    he.append ('x-access-token', token)
    he.append ('Content-type', 'application/x-www-form-urlencoded')
    fetch('http://192.168.2.7:3000/card', {
      method: 'post',
      body: request,
      headers: he 
    })
    window.location.reload();
  }

    render(){
        return (
            <div>
              <div className="kotakfilter"> 
                <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
                  <div className="kotakinputpenggunascardid">
                    <label> Scard ID </label> <br></br>
                    <input name="scardid" onChange={this.handleChange} className="inputformpenggunascardid" type="text" placeholder="Scard Id" required></input>
                  </div>
                  
                  <div className="kotakinputpenggunanim">
                    <label> NIM </label> <br></br>
                    <input name="nim" onChange={this.handleChange} className="inputformpenggunanim" type="text" placeholder="Terminal Id" required></input>
                  </div>

                  <div className="kotakinputpenggunanama">
                    <label> Nama </label> <br></br>
                    <input name="nama" onChange={this.handleChange} className="inputformpenggunanama" type="text" placeholder="Nama" required ></input>
                  </div> 
                  
                  <div className="kotakinputpenggunainstansi">
                    <label> Instansi </label> <br></br>
                    <input name="instansi" onChange={this.handleChange} className="inputformpenggunainstansi" type="text" placeholder="Instansi" required></input>
                  </div>
                  
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