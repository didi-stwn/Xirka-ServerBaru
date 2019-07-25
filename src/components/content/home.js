import React,{Component} from 'react';
import logo from "./img/logoxirkawarna.png"
import {withRouter} from 'react-router-dom'

class Home extends Component{
    render(){
        return (
        <div>
            <div className="kotakhomexirka"> 
                <div>
                    <img className="homexirka" src={logo}/> 
                </div>
                <div>
                    <span className="welcometo"><b>WELCOME TO</b></span>
                    <span className="welcometoxirka"><b>Xirka Silicon Technology</b></span>
                </div>
            </div>
        </div>
        )
    } 
}

export default withRouter(Home);