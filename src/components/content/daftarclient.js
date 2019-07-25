import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';


class Daftarclient extends Component{
  constructor(props) {
    super(props);
    this.state = {
    username: '',
    password:'',
    nameclient:'',
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
    const {username,password,namaclient} = this.state
    var request = 'username='+username+'&password='+password+'&name='+namaclient;
    
    let he= new Headers()
    let token = this.props.token
    he.append ('x-access-token', token)
    he.append ('Content-type', 'application/x-www-form-urlencoded')
    fetch('http://192.168.2.7:3000/client', {
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
              <div className="kotakinputruangantermid">
                <label> Username </label> <br></br>
                <input name="username" onChange={this.handleChange} className="inputformruangantermid" type="text" placeholder="Username" required></input>
              </div>
              
              <div className="kotakinputruangannama">
                <label> Password </label> <br></br>
                <input name="password" onChange={this.handleChange} className="inputformruangannama" type="text" placeholder="Password" required></input>
              </div>

              <div className="kotakinputruanganinstansi">
                <label> Nama Client </label> <br></br>
                <input name="namaclient" onChange={this.handleChange} className="inputformruanganinstansi" type="text" placeholder="Nama Client" required></input>
              </div> 
              
              <div className="kotaksubmitruangan">
                <input className="submitformlogpintu" type="submit" value="Add"></input>
              </div>

              <div className="kotakcancelruangan">
                <Link to="/client"> <span className="cancelformruangan">Cancel</span></Link>
              </div>
            </form> 
          </div>
          <div className="paddingtop30px">

          </div>
        </div>
      
        )
    } 
}
export default withRouter(Daftarclient);