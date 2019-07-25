import React, { Component } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';
import Login from './components/content/login';
import {Route, Redirect, withRouter} from "react-router-dom";
import './components/content/css/AdminLTE.css';
import './components/content/css/_all-skins.min.css';
import './components/content/css/font-awesome.css';
import './components/content/css/font-awesome.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Modal from 'react-awesome-modal';
// import './components/content/js/581d5d54d2.js';
// import './components/content/js/adminlte.min.js';
// import './components/content/js/bootstrap.min.js';
// import './components/content/js/dashboard2.js';
// import './components/content/js/demo.js';
// import './components/content/js/jquery.min.js';
// import './components/content/js/jquery.slimscroll.min.js';
// import './components/content/js/jquery.sparkline.min.js';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          dataclient: '',
      };
    }

    componentDidMount(){
      fetch('http://192.168.2.7:3000/login', {
        method: 'post',
        body: 'username=admin&password=bandung123',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
        .then (response => response.json())
        .then (data => {
          let he= new Headers()
          let token = data.token
          he.append ('x-access-token', token)
          fetch('http://192.168.2.7:3000/client', {
            method: 'GET',
            headers: he
          })
          .then(response=>response.json())
          .then(data => this.setState({dataclient:data})) 
        })
    }
    render(){ 
      const {dataclient} = this.state
      while (dataclient===''){
        return(
          <div className="loadingdata2"> 
            <i className="fa fa-spinner fa-pulse" style={{fontSize:"150px", color:"#E43A34"}}> </i>
          </div> 
        )
      }

      var dataclientt
      for (var i=0;i<dataclient.length; i++){
        if (dataclient[i].name===sessionStorage.message){
          dataclientt = sessionStorage.message
          break
        }
        else {
          dataclientt = "login"
        }
      }

      if (sessionStorage.message==="admin"){
        return(
          <div>
            <Route path="/" component={Header} />
            <Route path="/" component={SideBar} />
            <Route path="/" component={Content} />
         </div>
        )
      }

      else if (sessionStorage.message===dataclientt){
        return(
          <div>
            <Route path="/" component={Header} />
            <Route path="/" render={ () => <SideBar name={dataclientt}/> } />
            <Route path="/" render={ () => <Content name={dataclientt}/> } />
         </div>
        )
      }
      
      else {
        return (
          <div>
            <Redirect to="/login" />
            <Route path="/login" component={Login}/>
          </div>
        )
      }
  }
}

export default withRouter(App);
