import React, {Component} from 'react';
import {Switch,Route,withRouter,Link} from 'react-router-dom';


class Header extends Component {
    isLogout(){
        sessionStorage.removeItem("name");
        window.location.reload()
    }
    render(){
        function Statistik(){
            return(<span><b>Statistik</b></span>)
        }
        function Logpintu(){
            return(<span><b>Log Pintu</b></span>)
        }
        function Pengguna(){
            return(<span><b>Pengguna</b></span>)
        }
        function Ruangan(){
            return(<span><b>Ruangan</b></span>)
        }
        function Laporan(){
            return(<span><b>Laporan</b></span>)
        }
        function Ruanganuser(){
            return(<span><b>Pengguna</b></span>)
        }
        function Device(){
            return(<span><b>Device</b></span>)
        }
        function Home(){
            return(<span><b>Home</b></span>)
        }
        return (
            <header className="main-header">
                <Link to="/" className="logo">
                    <span className="logo-mini"><b>X</b>r</span>
                    <span className="logo-lg"><span>Xirka Silicon Technology</span> </span>
                </Link>
                <nav className="navbar navbar-static-top">
                    <a className="sidebar-toggle" data-toggle="push-menu" role="button"></a>
                    <span className="judulhalaman">
                        <Switch>
                            <Route path="/statistik" component={Statistik} />
                            <Route path="/logpintu" component={Logpintu} />
                            <Route path="/pengguna" component={Pengguna} />
                            <Route path="/ruangan" component={Ruangan} />
                            <Route path="/laporan" component={Laporan} />
                            <Route path="/ruanganuser" component={Ruanganuser} />
                            <Route path="/device" component={Device} />
                            <Route exact path="/" component={Home} />
                        </Switch>
                        <span>
                            <a onClick={this.isLogout}>
                                <div className="kotaklogout">
                                    <i className="fa fa-sign-out"></i> 
                                    <span>Log out</span>
                                </div>
                            </a>
                       </span>
                    </span>
                    
                </nav>
            </header>
        )
    }
}
export default withRouter(Header);