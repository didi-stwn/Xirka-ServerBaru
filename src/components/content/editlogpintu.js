import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';

class Editlogpintu extends Component{
    constructor(props) {
        super(props);
        this.state = {
        nimu: '',
        ruanganu:'',
        dateu:'',
        statusu:'',
        datasalah: false,
        databenar: false,
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
        const {nimu,ruanganu,dateu,statusu} = this.state;
        var dateinput, timeinput, t,tahun, b, bulan, ta, tanggal, j, jam, m, menit;
        t = new Date(dateu)
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

        dateinput = tahun+"-"+bulan+"-"+tanggal
        timeinput = jam+":"+menit+":00.000000"

        fetch('http://192.168.2.7:8020/doorlog/editlog/', {
          method: 'post',
          headers :{
            "Authorization" : "Bearer "+ sessionStorage.name,
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            nim: nimu,
            ruangan: ruanganu,
            date: dateinput,
            time: timeinput,
            status: statusu
          })
        })
        .then(response => {
          if (response.ok){
            this.setState({databenar:true})
            this.setState({datasalah:false})
          }
          else {
            this.setState({datasalah:true})
            this.setState({databenar:false})
          }
        })
    }

    render(){
        const {databenar,datasalah} = this.state
        return (
            <div>
                <div className="paddingtop30px">
                </div>
                <div className="kotakfilter2"> 
                    <form className="kotakforminputlogpintu" onSubmit={this.handleSubmit}>
                    <div className="kotakinputlogpintunim">
                        <label> NIM </label> <br></br>
                        <input name="nimu" onChange={this.handleChange} className="inputformlogpintunim" type="text" placeholder="NIM" required ></input>
                    </div>
                    
                    <div className="kotakinputlogpintuterminalid">
                        <label>Nama Ruangan </label> <br></br>
                        <input name="ruanganu" onChange={this.handleChange} className="inputformlogpintuterminalid" type="text" placeholder="Terminal Id" required ></input>
                    </div>

                    <div className="kotakinputlogpintucheckedtm">
                        <label> Checked Time </label> <br></br>
                        <input name="dateu" onChange={this.handleChange} className="inputformlogpintucheckedtm" type="datetime-local" required></input>
                    </div> 
                    
                    <div className="kotakinputlogpintustatus">
                        <label> Status </label> <br></br>
                        <select name="lockstatus" onChange={this.handleChange} className="inputformlogpintustatus" required>
                            <option value="1"> Hadir</option>
                            <option value="2"> Absen </option>
                            <option value="3"> Sakit </option>
                            <option value="4"> Izin </option>
                            <option value="5"> Forbidden </option>
                        </select>
                    </div>
                    {
                        databenar && 
                        <p className="texthijau">*Data berhasil disimpan</p>
                    }
                    {
                        datasalah &&
                        <p className="textmerah">*Data yang diinput salah</p>
                    }
                    { 
                        (databenar===false && datasalah===false) &&
                        <p className="texthijau">&emsp;</p>
                    }
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
export default withRouter(Editlogpintu);