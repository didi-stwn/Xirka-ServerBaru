import React from 'react';
import logo from './img/logo.png'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            gagal:false,
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
        let h= new Headers()
        h.append ('Authorization', 'Basic ' + btoa(username + ':' + password))
        fetch('https://192.168.2.7/smartlock/api/v1/login/', {
           method: 'GET',
           headers: h
        })
        .then(response => {
            if(response.status === 200) {
                sessionStorage.setItem("message","admin")
                window.location.reload()
            }
            else{
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
                    .then(data => {
                        var j=0;
                        for (var i=0;i<data.length; i++){
                            if ((username===data[i].username)&&(password===data[i].password)){
                                sessionStorage.setItem("message",data[i].name)
                                window.location.reload()
                                j=1;
                            }
                        }
                        if (j===0){
                            this.setState({gagal:true})
                        }
                        
                    }) 
                })
            }
        })        
    }
    
    render(){
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
            </div>
        )
    } 
}