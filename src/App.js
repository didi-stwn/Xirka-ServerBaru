import React, { Component } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';
import Login from './components/content/login';
import get from './components/content/config';
import {Route, Redirect, withRouter} from "react-router-dom";
import './components/content/css/AdminLTE.css';
import './components/content/css/_all-skins.min.css';
import './components/content/css/font-awesome.css';
import './components/content/css/font-awesome.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class App extends Component {
    render(){
      //fungsi refresh token
      function refreshToken(){
          fetch(get.refreshtoken, {
            method: 'post',
            headers :{"Content-Type" : "application/json"},
            body: JSON.stringify({
                token: sessionStorage.name,
                })
          })
          .then (response =>response.json())  
          .then (response =>{ 
          if (response.non_field_errors==="Signature has expired."){
            sessionStorage.removeItem("name")
          }
          else{
            sessionStorage.setItem("name",response.token)
          }
        })
      }

      // kalau token ga ada
      if ((sessionStorage.name==="undefined")||(sessionStorage.name===undefined)){
        return (
          <div>
            <Redirect to="/login" />
            <Route path="/login" component={Login}/>
          </div>
        )
      }
      
      //kalau token ada
      else {
        //fungsi untuk memanggil refresh token 1 detik setelah ada sesuatu yang di klik
        setTimeout(function(){refreshToken()},10)
        
        //fungsi untuk memanggil refresh token tiap 590 detik sebanyak 6 kali
        // var x=0;
        // var refresh = setInterval(function(){
        //   refreshToken()
        //   if (x++===1){
        //     window.clearInterval(refresh)
        //   }
        // },590000)

        return(
          <div>
            <Route path="/" component={Header} />
            <Route path="/" component={SideBar} />
            <Route path="/" component={Content} />
          </div>
        ) 
      }
  }
}

export default withRouter(App);
