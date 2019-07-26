import React, {Component} from 'react';
import {Route,withRouter,Link} from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import Statistik from './content/statistik';
import Logpintu from './content/logpintu';
import Pengguna from './content/pengguna';
import Ruangan from './content/ruangan';
import Client from './content/client';
import Laporan from './content/laporan';
import Home from './content/home';


class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
          key: '',
          countdata: '',
        };
      }
    
    componentDidMount(){
      fetch('http://192.168.2.7:3000/login', {
        method: 'post',
        body: atob("dXNlcm5hbWU9YWRtaW4mcGFzc3dvcmQ9YmFuZHVuZzEyMw=="),
        headers: { 'Content-type': 'application/x-www-form-urlencoded' }
      })
      .then (response=>response.json())
      .then (data => this.setState({key: data.token}))
    
      let h = new Headers();
      h.append ('Authorization', 'Basic YWRtaW46YmFuZHVuZzEyMw==')
      fetch('https://192.168.2.7/smartlock/api/v1/smartlockview.json?limit='+this.props.limit, {
        method: 'GET',
        headers: h
      })
      .then(response=>response.json())
      .then(data => this.setState({countdata: data.count}))
    }
    

    render(){
      const {key,countdata} = this.state
      let token = key;
      let limit = countdata;
      let name = this.props.name;
      while ((token === '') || (limit === '')){
        return ( 
          <div className="content-wrapper">
            <div className="loadingdata"> 
              <i className="fa fa-spinner fa-pulse" style={{fontSize:"150px", color:"#E43A34"}}> </i>
            </div>
          </div> 
        )
      }

      if (sessionStorage.message==="admin"){
        document.title="Admin"
        
      }
      else{
        document.title="Client"
      }
        return (
          <div className="content-wrapper">
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}
              className="switch-route"
            >
              <Route exact path="/" component={Home} />
              <Route path="/login" render={()=>
                <div className="box-footer">
                  You're Logged In
                  <br></br>
                  <br></br>
                  Go to
                  <Link className="kotakgotohome" to="/">
                    <div className="gotohome">
                      <span>Home
                      </span>
                    </div> 
                  </Link>
                </div>} />
              <Route path="/statistik" render={ () => <Statistik limit={limit}/> } />
              <Route path="/logpintu" render={ () => <Logpintu token={token} limit={limit}/> } />
              <Route path="/pengguna" render={ () => <Pengguna token={token} /> } />
              <Route path="/ruangan" render={ () => <Ruangan token={token} /> } />
              <Route path="/laporan" render={ () => <Laporan limit={limit} token={token} name={name}/> } />
              <Route path="/client" render={ () => <Client token={token} /> } />
              <Route render={()=>
                <div className="box-footer">
                  404 NOT FOUND
                  <br></br>
                  <br></br>
                  Go to
                  <Link className="kotakgotohome" to="/">
                    <div className="gotohome">
                      <span>Home
                      </span>
                    </div> 
                  </Link>
                </div>
              } />
            </AnimatedSwitch>
          </div> 
        )
    }
}

export default withRouter(Content);
