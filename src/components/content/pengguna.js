import React,{Component} from 'react';
import { MDBDataTable } from 'mdbreact';
import {Route, Link,withRouter,Switch} from "react-router-dom";
import Daftarpengguna from './daftarpengguna';
import Editpengguna from './editpengguna';
import "@fortawesome/fontawesome-free/css/all.min.css";


class Pengguna extends Component{
    
    constructor(props) {
      super(props);
      this.state = {
      isidata: [],
      editID:'',
      };
    }

    deleteData(e,f,g,h){
      let key=String(e)
      var yes = window.confirm("Apakah anda yakin ingin menghapus data berikut: Scard ID = " +e+", NIP/NIM= "+f+", Nama= "+g+", Instansi= "+h+" ?");
      if (yes === true){
        let he= new Headers()
        let token = this.props.token
        he.append ('x-access-token', token)
        fetch('http://192.168.2.7:3000/card/'+key, {
          method: 'delete',
          headers: he 
        })
        .then(response=>{
          if (response.ok){
            window.alert("Data berhasil dihapus")
          }
          else{
            window.alert("Data tidak berhasil dihapus")
          }
        })
      }
    }

    editData(e){
      this.setState({editID:e})
    }
            
    componentDidMount(){
      let he= new Headers()
      let token = this.props.token
      he.append ('x-access-token', token)
      fetch('http://192.168.2.7:3000/card', {
        method: 'GET',
        headers: he
      })
      .then(response=>response.json())
      .then(data => this.setState({isidata: data}))    
    }
    refresh(){
      let he= new Headers()
      let token = this.props.token
      he.append ('x-access-token', token)
      fetch('http://192.168.2.7:3000/card', {
        method: 'GET',
        headers: he
      })
      .then(response=>response.json())
      .then(data => this.setState({isidata: data}))    
    }

  render(){
    sessionStorage.removeItem("login");
    var x=1;
    function no(i){
      var m=0
      var hasil=m+i
      return  hasil
    }
    
    let token = this.props.token
    const dataadmin = {
      columns: [
        {
          label: 'No',
          field: 'no',
          sort: 'asc',
        },
        {
          label: 'Scard ID',
          field: 'scardid',
          sort: 'asc',
        },
        {
          label: 'NIP/NIM',
          field: 'nipnim',
          sort: 'asc',
        },
        {
          label: 'Nama',
          field: 'nama',
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
      rows: this.state.isidata.map(isi=>{
        return {
          no:no(x++),
          scardid: isi.card_id,
          nipnim:isi.nim,
          nama:isi.name,
          instansi: isi.instansi,
          keterangan:<div className="editdelete"> <Link to="/pengguna/edit" onClick={() => this.editData(isi.card_id)}><i className="fa fa-pencil"></i></Link> | <a className="mousepointer" onClick={() => this.deleteData(isi.card_id,isi.card_id,isi.name,isi.instansi)}> <i className="fa fa-trash"></i></a> </div>
        }
      })
    };
    var y = 1;
    const dataclient = {
      columns: [
        {
          label: 'No',
          field: 'no',
          sort: 'asc',
        },
        {
          label: 'Scard ID',
          field: 'scardid',
          sort: 'asc',
        },
        {
          label: 'NIP/NIM',
          field: 'nipnim',
          sort: 'asc',
        },
        {
          label: 'Nama',
          field: 'nama',
          sort: 'asc',
        },
        {
          label: 'Instansi',
          field: 'instansi',
          sort: 'asc',
        }
      ],
      rows: this.state.isidata.map(isi=>{
        return {
          no:no(y++),
          scardid: isi.card_id,
          nipnim:isi.nim,
          nama:isi.name,
          instansi: isi.instansi,
        }
      })
    };
    const {editID}= this.state;
    if (sessionStorage.message==="admin"){
      return (              
        <div>
            <div>
              <Switch>
                <Route path="/pengguna/daftar" render={ () => <Daftarpengguna token={this.props.token} /> } />
                <Route path="/pengguna/edit" render={ () => <Editpengguna token={this.props.token} editID={editID}/> } />
              </Switch>
            </div>
           
             <div className="box-footer">  
                <div className="kotakdaftarruangan">
                  <Link to="/pengguna/daftar">
                    <div className="daftar">
                      <i className="fa fa-plus"></i> 
                      <span> Pengguna </span>
                    </div>
                  </Link>
                  <span>
                    <a onClick={() => this.refresh()}>
                      <div className="daftar2">
                        <i className="fa fa-refresh"></i>
                      </div>
                    </a>
                  </span>
                </div>
                <div className="isitabel">
                    <MDBDataTable
                    responsive
                    striped
                    bordered
                    small
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
              small
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

export default withRouter(Pengguna);
