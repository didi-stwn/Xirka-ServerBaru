import React from 'react';
import logo from './img/logo.png';
import get from './config';
import {Route, Redirect, withRouter} from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            gagal:false,
            isLogin:false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {username, password} = this.state
        fetch(get.login, {
        method: 'post',
        headers :{"Content-Type" : "application/json"},
        body: JSON.stringify({
            username: username,
            password: password
            })
        })
        .then (response =>response.json())  
        .then (response =>{
            if (response.token===undefined){
                this.setState({gagal:true})
            }
            else{
                sessionStorage.setItem("name",response.token)
                var a=JSON.parse(atob(sessionStorage.name.split(".")[1])).user_id
                sessionStorage.setItem("user",a)
                this.setState({isLogin:true})
            }
        })
    }
    
    render(){
        const {isLogin} = this.state
        document.title="Login"
        const {gagal} = this.state;
        return (
            <div className="login">
                <div className="imglogin">
                    <img src={logo}></img>
                </div>
                
                <h1 > LOGIN </h1>

                <div className="formform">
                    <form  onSubmit={this.handleSubmit}>
                        <h2 className="loginnim">Username</h2>
                        <input className="inputnim" name="username" placeholder="Username"  onChange={this.handleChange} type="text" required/>
                        <br></br>

                        <h2 className="loginpass">Password</h2>
                        <input className="inputpass" name="password" placeholder="Password" onChange={this.handleChange} type="password" required/>
                        <br></br>
                        {
                            gagal &&
                            <p className="gagallogin">*username or password is incorrect</p>
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
                {
                    isLogin &&
                    <Redirect to="/" />
                }
            </div>
        )
    } 
}