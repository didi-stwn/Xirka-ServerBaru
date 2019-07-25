import React, {Component} from 'react';
import logo from './content/img/logoxirka.png';
import {Link,withRouter} from 'react-router-dom';

class SideBar extends Component {
    render(){
        var nameuser,user;
        if (sessionStorage.message==="admin"){
            user = sessionStorage.message.toUpperCase();
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
                                        <p className="tulisanadmin">{user}</p>
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
                                        <Link to="/laporan">
                                            <i className="fa fa-calendar"></i> 
                                            <span>Laporan</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/client">
                                            <i className="fa fa-user"></i> 
                                            <span>Client</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> 
            )
        }
        else{
            nameuser=this.props.name
            user = nameuser.toUpperCase();
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
                                        <p className="tulisanadmin">{user}</p>
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
                                        <Link to="/laporan">
                                            <i className="fa fa-calendar"></i> 
                                            <span>Laporan</span>
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
}

export default withRouter(SideBar);
