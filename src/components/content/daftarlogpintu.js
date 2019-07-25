import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';

class Daftarlogpintu extends Component{
    constructor(props) {
        super(props);
        this.state = {
        nim: '',
        terminalid:'',
        checkedtm:'',
        lockstatus:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
  
    handleSubmit(e){
        e.preventDefault();
        const {nim,terminalid,checkedtm,lockstatus} = this.state;
        var hasil, checkedtminput, t,tahun, b, bulan, ta, tanggal, j, jam, m, menit;
        t = new Date(checkedtm)
        tahun = String(t.getFullYear());
        b = t.getMonth() + 1;
        if (b<=9){
            bulan = "0"+String(b)
        }
        else {
            bulan = String(b)
        }
        ta = t.getDate();
        if (ta<=9){
            tanggal = "0"+String(ta)
        }
        else {
            tanggal = String(ta)
        }
        j = t.getHours()
        if (j<=9){
            jam = "0"+String(j)
        }
        else {
            jam = String(j)
        }
        m = t.getMinutes()
        if (m<=9){
            menit = "0"+String(m)
        }
        else {
            menit = String(m)
        }
        checkedtminput = tahun+"-"+bulan+"-"+tanggal+" "+jam+":"+menit+":00.000000"
        hasil = 'term-id='+terminalid+'&nim='+nim+'&checkedtm='+checkedtminput+'&lockstatus='+lockstatus;
        
        let username = 'admin';
        let password = 'bandung123';
        let h = new Headers();
        h.append ('Content-Type', 'application/x-www-form-urlencoded')
        h.append ('Authorization', 'Basic ' + btoa(username + ':' + password))
        fetch('https://192.168.2.7/smartlock/api/v1/addlog.json', {
            method: 'POST',
            body: hasil,
            headers: h
        })
        window.location.reload();
    }

    render(){
        return (
            <div>
                <div className="paddingtop30px">
                </div>
                <div className="kotakfilter2"> 
                    <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
                    <div className="kotakinputlogpintunim">
                        <label> NIM </label> <br></br>
                        <input name="nim" onChange={this.handleChange} className="inputformlogpintunim" type="text" placeholder="NIM" required ></input>
                    </div>
                    
                    <div className="kotakinputlogpintuterminalid">
                        <label>Terminal ID </label> <br></br>
                        <input name="terminalid" onChange={this.handleChange} className="inputformlogpintuterminalid" type="text" placeholder="Terminal Id" required ></input>
                    </div>

                    <div className="kotakinputlogpintucheckedtm">
                        <label> Checked Time </label> <br></br>
                        <input name="checkedtm" onChange={this.handleChange} className="inputformlogpintucheckedtm" type="datetime-local" required></input>
                    </div> 
                    
                    <div className="kotakinputlogpintustatus">
                        <label> Status </label> <br></br>
                        <select name="lockstatus" onChange={this.handleChange} className="inputformlogpintustatus" required>
                            <option value="0"> Check In </option>
                            <option value="1"> Check Out </option>
                            <option value="2"> Izin </option>
                            <option value="3"> Sakit </option>
                        </select>
                    </div>
                    
                    <div className="kotaksubmitpengguna">
                        <input className="submitformlogpintu" type="submit" value="Add"></input>
                    </div>

                    <div className="kotakcancelpengguna">
                        <Link to="/logpintu"> <span className="cancelformpengguna">Cancel</span></Link>
                    </div>
                    </form> 
                </div>
            </div>
        )
    } 
}
export default withRouter(Daftarlogpintu);