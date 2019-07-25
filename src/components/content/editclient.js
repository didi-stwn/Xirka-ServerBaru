import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';


class Editruangan extends Component{
    constructor(props) {
        super(props);
        this.state = {
        password:'',
        namauser:'',
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
        var {password,namauser} = this.state
        var request = 'password='+password+'&name='+namauser;
        let ID=this.props.editID
        let he= new Headers()
        let token = this.props.token
        he.append ('x-access-token', token)
        he.append ('Content-type', 'application/x-www-form-urlencoded')
        fetch('http://192.168.2.7:3000/client/'+ID, {
            method: 'PUT',
            body: request,
            headers: he 
        })
        window.location.reload();
    }
    


    render(){
        const editID = this.props.editID;
        return (
        <div>
          <div className="kotakfilter"> 
            <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
              <div className="kotakinputruangantermid">
                <label> Username </label> <br></br>
                <input name="username" className="inputformruangantermid" type="text" placeholder="Terminal ID" required value={editID}></input>
              </div>
              
              <div className="kotakinputruangannama">
                <label> Password </label> <br></br>
                <input name="password" onChange={this.handleChange} className="inputformruangannama" type="text" placeholder="Nama Ruangan" required></input>
              </div>

              <div className="kotakinputruanganinstansi">
                <label> Nama Client </label> <br></br>
                <input name="namauser" onChange={this.handleChange} className="inputformruanganinstansi" type="text" placeholder="Instansi" required></input>
              </div> 
              
              <div className="kotaksubmitruangan">
                <input className="submitformlogpintu" type="submit" value="Edit"></input>
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

export default withRouter(Editruangan);