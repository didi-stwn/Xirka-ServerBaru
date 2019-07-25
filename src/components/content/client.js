import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import {Route,Link,withRouter} from "react-router-dom";
import Daftarclient from './daftarclient';
import Editclient from './editclient';
import "@fortawesome/fontawesome-free/css/all.min.css";

class Client extends Component{
    constructor(props) {
      super(props);
      this.state = {
        isidata: [],
        editID:'',
        user:'',
        pass:'',
        gagal: false,
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
        const {username, password} = this.state
        let h= new Headers()
        h.append ('Authorization', 'Basic ' + btoa(username + ':' + password))
        fetch('https://192.168.2.7/smartlock/api/v1/login/', {
           method: 'GET',
           headers: h
        })
        .then(response => {
            if(response.status === 200) {
                sessionStorage.setItem("login","true")
                window.location.reload();
            }
            else{
                this.setState({gagal:true})
            }
        })
    }

    deleteData(e,f,g){
      var yes = window.confirm("Apakah anda yakin ingin menghapus data berikut: Username = " +e+", Password= "+f+", Nama Client= "+g+" ?");
      if (yes === true){
        let he= new Headers()
        let token = this.props.token
        he.append ('x-access-token', token)
        fetch('http://192.168.2.7:3000/client/'+e, {
          method: 'delete',
          headers: he 
        })
        window.location.reload();
      }
    }

    editData(e){
      this.setState({editID:e})
    }

    componentDidMount(){
      let he= new Headers()
      let token = this.props.token
      he.append ('x-access-token', token)
      fetch('http://192.168.2.7:3000/client', {
        method: 'GET',
        headers: he
      })
      .then(response=>response.json())
      .then(data => this.setState({isidata: data}))
    }

    
  
    render(){
        const {isidata} = this.state;
        var x=1;
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
            label: 'Username',
            field: 'username',
            sort: 'asc',
          },
          {
            label: 'Password',
            field: 'password',
            sort: 'asc',
          },
          {
            label: 'Nama Client',
            field: 'namaclient',
            sort: 'asc',
          },
          {
            label: 'Keterangan',
            field: 'keterangan'
          }
        ],
        rows: isidata.map(isi=>{
          return {
            no:no(x++),
            username:isi.username,
            password:isi.password,
            namaclient:isi.name,
            keterangan:<div className="editdelete"> <Link to="/client/edit" onClick={() => this.editData(isi.username)}><i className="fa fa-pencil"></i></Link> | <a className="mousepointer" onClick={() => this.deleteData(isi.username,isi.password,isi.name)}> <i className="fa fa-trash"></i></a> </div>
            }
            })
        };
        const {editID,gagal}= this.state;
        if (sessionStorage.login==="true"){
            return (
                <div>
                  <div>
                    <Route path="/client/daftar" render={ () => <Daftarclient token={this.props.token} /> } />
                    <Route path="/client/edit" render={ () => <Editclient token={this.props.token} editID={editID}/> } />
                  </div>
                   
                  <div className="box-footer">
                      <div className="kotakdaftarruangan">
                          <Link to="/client/daftar">
                            <div className="daftar">
                              <i className="fa fa-plus"></i> 
                              <span> Client </span>
                            </div>
                          </Link>
                      </div>
                      <div className="isitabel">
                          <MDBDataTable
                          responsive
                          striped
                          bordered
                          hover
                          data={data}
                          /> 
                      </div>  
                  </div>
                </div>       
            );
        }
        else {
            return(
                <div className="loginclientt">
                    <div className="loginclient">
                        <form  onSubmit={this.handleSubmit}>
                            <h2 className="loginnim">Username</h2>
                            <input className="inputnim2" name="username" placeholder="Username"  onChange={this.handleChange} type="text" required/>
                            <br></br>

                            <h2 className="loginpass">Password</h2>
                            <input className="inputpass2" name="password" placeholder="Password" onChange={this.handleChange} type="password" required/>
                            <br></br>
                            {
                                gagal &&
                                <p className="gagallogin2">*username or password is incorrect</p>
                            }
                            <button className="submitform" type="submit"> 
                                <span>
                                    <span>
                                        Login&nbsp;
                                    </span>
                                    <i className="fa fa-sign-in"> 
                                    </i>
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            )
        }   
      
    }
}
export default withRouter(Client);