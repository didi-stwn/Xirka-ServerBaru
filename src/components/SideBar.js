import React, {Component} from 'react';
import logo from './content/img/logoxirka.png';
import {Link,withRouter} from 'react-router-dom';

class SideBar extends Component {
    render(){
        return (
            <div className="main-sidebar">
                <div className="sidebar">
                    <div>
                        <div>
                            <div className="user-panel">
                                <div className="pull-left image">                                        <img src={logo} className="img-circle" alt="User Image" />
                                </div>
                                <div className="pull-left info">
                                    <p className="tulisanadmin">ADMIN</p>
                                </div>
                            </div>
                        </div>
                        <div className="scrollsidebar">
                            <ul className="sidebar-menu" data-widget="tree">
                                <li className="header">MENU</li>
                                <li>
                                    <Link to="/statistik">
                                        <i className="fa fa-bar-chart"></i>
                                        <span>Statistik</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/logpintu">
                                        <i className="fa fa-sign-in"></i> 
                                        <span>Log Pintu</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/pengguna">
                                        <i className="fa fa-users"></i>
                                        <span>Pengguna</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/ruangan">
                                        <i className="fa fa-home"></i> 
                                        <span>Ruangan</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/ruanganuser">
                                        <i className="fa fa-user"></i> 
                                        <span>Ruangan Pengguna</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/device">
                                        <i className="fa fa-credit-card"></i> 
                                        <span>Device</span>
                                    </Link>
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
