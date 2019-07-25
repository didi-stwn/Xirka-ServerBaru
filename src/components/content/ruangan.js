import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import {Route,Link,withRouter} from "react-router-dom";
import Daftarruangan from './daftarruangan';
import Editruangan from './editruangan';
import "@fortawesome/fontawesome-free/css/all.min.css";

class Ruangan extends Component{
    constructor(props) {
      super(props);
      this.state = {
        isidata: [],
        editID:'',
      };
    }

    deleteData(e,f,g){
      var yes = window.confirm("Apakah anda yakin ingin menghapus data berikut: Terminal ID = " +e+", Nama Ruangan= "+f+", Instansi= "+g+" ?");
      if (yes === true){
        let he= new Headers()
        let token = this.props.token
        he.append ('x-access-token', token)
        fetch('http://192.168.2.7:3000/terminal/'+e, {
          method: 'delete',
          headers: he 
        })
        window.location.reload();
      }
    }

    editData(e){
      this.setState({editID:e})
    }

    componentDidMount(){
      let he= new Headers()
      let token = this.props.token
      he.append ('x-access-token', token)
      fetch('http://192.168.2.7:3000/terminal', {
        method: 'GET',
        headers: he
      })
      .then(response=>response.json())
      .then(data => this.setState({isidata: data}))
    }

    
  
    render(){
      sessionStorage.removeItem("login");
      const {isidata} = this.state;
      var x=1;
      function no(i){
        var m=0
        var hasil=m+i
        return  hasil
      }
      const dataadmin = {
        columns: [
          {
            label: 'No',
            field: 'no',
            sort: 'asc',
          },
          {
            label: 'Terminal ID',
            field: 'terminalid',
            sort: 'asc',
          },
          {
            label: 'Nama Ruangan',
            field: 'namaruangan',
            sort: 'asc',
          },
          {
            label: 'Instansi',
            field: 'instansi',
            sort: 'asc',
          },
          {
            label: 'Keterangan',
            field: 'keterangan'
          }
        ],
        rows: isidata.map(isi=>{
          return {
            no:no(x++),
            terminalid:isi.terminal_id,
            namaruangan:isi.room,
            instansi: isi.instansi,
            keterangan:<div className="editdelete"> <Link to="/ruangan/edit" onClick={() => this.editData(isi.terminal_id)}><i className="fa fa-pencil"></i></Link> | <a className="mousepointer" onClick={() => this.deleteData(isi.terminal_id,isi.room,isi.instansi)}> <i className="fa fa-trash"></i></a> </div>
          }
        })
      };
      var y=1;
      const dataclient = {
        columns: [
          {
            label: 'No',
            field: 'no',
            sort: 'asc',
          },
          {
            label: 'Terminal ID',
            field: 'terminalid',
            sort: 'asc',
          },
          {
            label: 'Nama Ruangan',
            field: 'namaruangan',
            sort: 'asc',
          },
          {
            label: 'Instansi',
            field: 'instansi',
            sort: 'asc',
          }
        ],
        rows: isidata.map(isi=>{
          return {
            no:no(y++),
            terminalid:isi.terminal_id,
            namaruangan:isi.room,
            instansi: isi.instansi,
          }
        })
      };
      const {editID}= this.state;
      if (sessionStorage.message==="admin"){
        return (
          <div>
            <div>
              <Route path="/ruangan/daftar" render={ () => <Daftarruangan token={this.props.token} /> } />
              <Route path="/ruangan/edit" render={ () => <Editruangan token={this.props.token} editID={editID}/> } />
            </div>
             
            <div className="box-footer">
                <div className="kotakdaftarruangan">
                    <Link to="/ruangan/daftar">
                      <div className="daftar">
                        <i className="fa fa-plus"></i> 
                        <span> Ruangan </span>
                      </div>
                    </Link>
                </div>
                <div className="isitabel">
                    <MDBDataTable
                    responsive
                    striped
                    bordered
                    hover
                    data={dataadmin}
                    /> 
                </div>  
            </div>
          </div>       
        );        
      }
      else{
        return (
          <div>
            <div className="box-footer">
              <div className="isitabel">
                <MDBDataTable
                responsive
                striped
                bordered
                hover
                data={dataclient}
                /> 
              </div>  
            </div>
          </div>       
        );
      }
    }
}
export default withRouter(Ruangan);