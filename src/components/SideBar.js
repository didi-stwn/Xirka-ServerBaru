import React, {Component} from 'react';
import logo from './content/img/logoxirka.png';
import {Link,withRouter} from 'react-router-dom';

class SideBar extends Component {
    render(){
        var statistik=false
        var logpintu=false
        var pengguna=false
        var ruangan=false
        var ruanganuser=false
        var device=false
        var laporan=false
        if (window.location.pathname==="/statistik"){
            statistik=true
        }
        else if (window.location.pathname==="/logpintu"){
            logpintu=true
        }
        else if (window.location.pathname==="/pengguna"){
            pengguna=true
        }
        else if (window.location.pathname==="/ruangan"){
            ruangan=true
        }
        else if (window.location.pathname==="/ruanganuser"){
            ruanganuser=true
        }
        else if (window.location.pathname==="/device"){
            device=true
        }
        else if (window.location.pathname==="/laporan"){
            laporan=true
        }
        return (
            <div className="main-sidebar">
                <div className="sidebar">
                    <div>
                        <div>
                            <div className="user-panel">
                                <div className="pull-left image">                                        
                                    <img src={logo} className="img-circle" alt="User Image" />
                                </div>
                                <div className="pull-left info">
                                    <p className="tulisanadmin">ADMIN</p>
                                </div>
                            </div>
                        </div>
                        <div className="scrollsidebar">
                            <ul className="sidebar-menu">
                                <li className="header"></li>
                                <li>
                                    {   
                                        (statistik) &&
                                        <Link to="/statistik" className="dipilih" >
                                            <i className="fa fa-bar-chart"></i>
                                            <span>Statistik</span>
                                        </Link>
                                    }
                                    {
                                        (statistik===false) &&
                                        <Link to="/statistik">
                                            <i className="fa fa-bar-chart"></i>
                                            <span>Statistik</span>
                                        </Link>
                                    }
                                </li>
                                <li>
                                    {
                                        logpintu &&
                                        <Link to="/logpintu" className="dipilih">
                                            <i className="fa fa-sign-in"></i> 
                                            <span>Log Pintu</span>
                                        </Link>
                                    }
                                    {
                                        (logpintu===false)&&
                                        <Link to="/logpintu">
                                            <i className="fa fa-sign-in"></i> 
                                            <span>Log Pintu</span>
                                        </Link>
                                    }
                                    
                                </li>
                                <li>
                                    {
                                        pengguna &&
                                        <Link to="/pengguna" className="dipilih">
                                            <i className="fa fa-users"></i>
                                            <span>Pengguna</span>
                                        </Link>
                                    }
                                    {
                                        (pengguna===false) &&
                                        <Link to="/pengguna">
                                            <i className="fa fa-users"></i>
                                            <span>Pengguna</span>
                                        </Link>
                                    }
                                </li>
                                <li>
                                    {
                                        ruangan &&
                                        <Link to="/ruangan" className="dipilih">
                                            <i className="fa fa-home"></i> 
                                            <span>Ruangan</span>
                                        </Link>
                                    }
                                    {
                                        (ruangan===false) &&
                                        <Link to="/ruangan">
                                            <i className="fa fa-home"></i> 
                                            <span>Ruangan</span>
                                        </Link>
                                    }
                                </li>
                                <li>
                                    {
                                        ruanganuser &&
                                        <Link to="/ruanganuser" className="dipilih">
                                            <i className="fa fa-user"></i> 
                                            <span>Ruangan Pengguna</span>
                                        </Link>
                                    }
                                    {
                                        (ruanganuser===false) &&
                                        <Link to="/ruanganuser">
                                            <i className="fa fa-user"></i> 
                                            <span>Ruangan Pengguna</span>
                                        </Link>
                                    }
                                </li>
                                <li>
                                    {
                                        device &&
                                        <Link to="/device" className="dipilih">
                                            <i className="fa fa-credit-card"></i> 
                                            <span>Device</span>
                                        </Link>
                                    }
                                    {
                                        (device===false) &&
                                        <Link to="/device">
                                            <i className="fa fa-credit-card"></i> 
                                            <span>Device</span>
                                        </Link>
                                    }
                                </li>
                                <li>
                                    {
                                        laporan &&
                                        <Link to="/laporan" className="dipilih">
                                            <i className="fa fa-calendar"></i> 
                                            <span>Laporan</span>
                                        </Link>
                                    }
                                    {
                                        (laporan===false) &&
                                        <Link to="/laporan">
                                            <i className="fa fa-calendar"></i> 
                                            <span>Laporan</span>
                                        </Link>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

export default withRouter(SideBar);
