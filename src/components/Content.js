import React, {Component} from 'react';
import {Route,withRouter,Link} from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import Statistik from './content/statistik';
import Logpintu from './content/logpintu';
import Pengguna from './content/pengguna';
import Ruangan from './content/ruangan';
import Device from './content/device';
import Ruanganuser from './content/ruanganuser';
import Laporan from './content/laporan';
import Home from './content/home';


class Content extends Component {
    render(){
      document.title="Admin"
        return (
          <div className="content-wrapper">
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}
              className="switch-route"
            >
              <Route exact path="/" component={Home} />
              <Route path="/statistik" render={ () => <Statistik/> } />
              <Route path="/logpintu" render={ () => <Logpintu/> } />
              <Route path="/pengguna" render={ () => <Pengguna/> } />
              <Route path="/ruangan" render={ () => <Ruangan/> } />
              <Route path="/ruanganuser" render={ () => <Ruanganuser/> } />
              <Route path="/device" render={ () => <Device/> } />
              <Route path="/laporan" render={ () => <Laporan/> } />
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
