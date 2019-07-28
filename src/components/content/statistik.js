import React,{Component} from 'react';
import Chart from 'react-google-charts';
import {Link,withRouter} from 'react-router-dom';

class Statistik extends Component{
    render(){
        return(
            <div>
                Statistik
            </div>
        )
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       isidata: [],
    //       ruang: '',
    //       startDate: '',
    //       endDate:'',
    //       status: '',
    //       ruanganoption: [],
    //     };
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //   }

    //   componentDidMount(){
    //     let h = new Headers();
    //     h.append ('Authorization', 'Basic YWRtaW46YmFuZHVuZzEyMw==')
    //     fetch('https://192.168.2.7/smartlock/api/v1/smartlockview.json?limit='+this.props.limit, {
    //     method: 'GET',
    //     headers: h
    //     })
    //     .then(response=>response.json())
    //     .then(data => this.setState({ruanganoption: data.results}))      
    //   }
    
    //   handleChange(e) {
    //     const { name, value } = e.target;
    //     this.setState({ [name]: value });
    //   }
      
    //   handleSubmit(e){
    //     e.preventDefault();
    
    //     const {ruang,startDate,endDate,status} = this.state
    //     var inputruang
    //     var starttime
    //     var endtime
    //     var inputstatus
    //     var filter
    
    //     if ((ruang==='')||(ruang==='semua')){
    //       inputruang=''
    //     }
    //     else {
    //       inputruang ='&term_id='+ruang
    //     }
    
    //     if ((status==='')||(status==='semua')){
    //       inputstatus=''
    //     }
    //     else {
    //       inputstatus='&lockstatus='+status
    //     }

    //     if (startDate===''){
    //         starttime=''
    //       }
    //       else {
    //         starttime='&startdatetime='+startDate.substring(0,4)+startDate.substring(5,7)+startDate.substring(8,10)+'T000000+07:00'
    //       }
      
    //       if (endDate===''){
    //         endtime=''
    //       }
    //       else {
    //         endtime='&enddatetime='+endDate.substring(0,4)+endDate.substring(5,7)+endDate.substring(8,10)+'T000000+07:00'
    //       }
      
    //       if ((endDate==='')||(startDate==='')){
    //         if ((startDate==='')&&(endDate!=='')){
    //           starttime=''
    //           endtime='&year='+endDate.substring(0,4)+'&month='+endDate.substring(5,7)+'&day='+endDate.substring(8,10)
    //         }
    //         else if ((endDate==='')&&(startDate!=='')){
    //           starttime='&year='+startDate.substring(0,4)+'&month='+startDate.substring(5,7)+'&day='+startDate.substring(8,10)
    //           endtime=''
    //         }
    //         else {
    //           starttime=''
    //           endtime=''
    //         }
    //       }
      
    //       if (((endDate!=='')&&(startDate!==''))&&(('&year='+startDate.substring(0,4)+'&month='+startDate.substring(5,7)+'&day='+startDate.substring(8,10))===('&year='+endDate.substring(0,4)+'&month='+endDate.substring(5,7)+'&day='+endDate.substring(8,10)))){
    //         starttime='&year='+startDate.substring(0,4)+'&month='+startDate.substring(5,7)+'&day='+startDate.substring(8,10)
    //         endtime=''
    //       }
    
    //     filter = inputruang+starttime+endtime+inputstatus;
        
    //     let h = new Headers();
    //     h.append ('Authorization', 'Basic YWRtaW46YmFuZHVuZzEyMw==')
    //     fetch('https://192.168.2.7/smartlock/api/v1/smartlockview.json?limit='+this.props.limit+filter, {
    //     method: 'GET',
    //     headers: h
    //     })
    //     .then(response=>response.json())
    //     .then(data =>this.setState({isidata: data.results}))
    //   }

    // render(){
    //     sessionStorage.removeItem("login");
    //     const {isidata}=this.state
    //     var checkin = 0;
    //     var checkout = 0;
    //     var pengguna = [];
    //     var deteksipengguna = 0;
    //     var ruangan = [];
    //     var deteksiruangan = 0;
    //     var grafikcheckin= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    //     var grafikcheckout= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]        
        
    //     for (var i=0; i<isidata.length; i++){
    //         if (isidata[i].lockstatus===0){
    //             checkin = checkin + 1
    //         }
    //         else if (isidata[i].lockstatus===1) {
    //             checkout = checkout + 1
    //         }
    //         for (var j=0; j<=pengguna.length; j++){
    //             if (isidata[i].scard_id === pengguna[j]){
    //                 deteksipengguna = deteksipengguna +1;
    //             }
    //         }
    //         for (j=0; j<=ruangan.length; j++){
    //             if (isidata[i].term_id === ruangan[j]){
    //                 deteksiruangan = deteksiruangan +1;
    //             }
    //         }
    //         if (deteksipengguna===0){
    //             pengguna.push(isidata[i].scard_id)
    //         }
    //         if (deteksiruangan===0){
    //             ruangan.push(isidata[i].term_id)
    //         }
    //         deteksipengguna = 0;
    //         deteksiruangan = 0;
    //         var date = new Date (isidata[i].checked_tm)
    //         var jam = date.getHours()
    //         for (var k=0; k<24; k++){
    //             if ((jam===k)&&(isidata[i].lockstatus===0)){
    //                 grafikcheckin[k] = grafikcheckin[k] + 1;
    //             }

    //             if ((jam===k)&&(isidata[i].lockstatus===1)){
    //                 grafikcheckout[k] = grafikcheckout[k] + 1;
    //             }
    //         }
    //     }

    //     const {ruanganoption} = this.state
    //     var ruangoption = [];
    //     var deteksiruangoption = 0;
    //     for (i=0; i<ruanganoption.length; i++){
    //         for (j=0; j<=ruangoption.length; j++){
    //             if (ruanganoption[i].term_id === ruangoption[j]){
    //                 deteksiruangoption = deteksiruangoption +1;
    //             }
    //         }
    //         if (deteksiruangoption===0){
    //             ruangoption.push(ruanganoption[i].term_id)
    //         }
    //         deteksiruangoption = 0;
    //     }
    

    //     const datagrafik = [
    //         ['Jumlah', ' Check In', 'Check Out'],
    //         ['0 AM', grafikcheckin[0], grafikcheckout[0]],
    //         ['1 AM', grafikcheckin[1], grafikcheckout[1]],
    //         ['2 AM', grafikcheckin[2], grafikcheckout[2]],
    //         ['3 AM', grafikcheckin[3], grafikcheckout[3]],
    //         ['4 AM', grafikcheckin[4], grafikcheckout[4]],
    //         ['5 AM', grafikcheckin[5], grafikcheckout[5]],
    //         ['6 AM', grafikcheckin[6], grafikcheckout[6]],
    //         ['7 AM', grafikcheckin[7], grafikcheckout[7]],
    //         ['8 AM', grafikcheckin[8], grafikcheckout[8]],
    //         ['9 AM', grafikcheckin[9], grafikcheckout[9]],
    //         ['10 AM', grafikcheckin[10], grafikcheckout[10]],
    //         ['11 AM', grafikcheckin[11], grafikcheckout[11]],
    //         ['12 PM', grafikcheckin[12], grafikcheckout[12]],
    //         ['1 PM', grafikcheckin[13], grafikcheckout[13]],
    //         ['2 PM', grafikcheckin[14], grafikcheckout[14]],
    //         ['3 PM', grafikcheckin[15], grafikcheckout[15]],
    //         ['4 PM', grafikcheckin[16], grafikcheckout[16]],
    //         ['5 PM', grafikcheckin[17], grafikcheckout[17]],
    //         ['6 PM', grafikcheckin[18], grafikcheckout[18]],
    //         ['7 PM', grafikcheckin[19], grafikcheckout[19]],
    //         ['8 PM', grafikcheckin[20], grafikcheckout[20]],
    //         ['9 PM', grafikcheckin[21], grafikcheckout[21]],
    //         ['10 PM', grafikcheckin[22], grafikcheckout[22]],
    //         ['11 PM', grafikcheckin[23], grafikcheckout[23]],
    //         ]
    //     return (
    //         <div>
    //             <div className="kotakinput">
    //                 <form className="kotakforminput" onSubmit={this.handleSubmit}>
                        
    //                     <label>Ruang </label>
    //                     <select name="ruang" className="kotakpicker" onChange={this.handleChange}>
    //                         <option value="semua"> Semua </option>
                            // {ruangoption.map(isi =>(
                            //     <option key={isi}>{isi}</option>
                            // ))}
    //                     </select>
    //                     <br></br>

    //                     <label>Start </label>
    //                     <input name="startDate" className="kotakdatepickerstart" type="date" onChange={this.handleChange}></input>
    //                     <br></br>

    //                     <label>End </label>
    //                     <input name="endDate" className="kotakdatepickerend" type="date" onChange={this.handleChange}></input>
    //                     <br></br>

    //                     <label>Status </label>
    //                     <select name="status" className="kotakpicker" onChange={this.handleChange}>
    //                         <option value="semua"> Semua </option>
    //                         <option value="0"> Check In </option>
    //                         <option value="1"> Check Out </option>
    //                     </select>

    //                     <button type="submit" className="kkotakinput">
    //                         <span>Go </span>
    //                         <i className="fa fa-chevron-right"></i>
    //                     </button>
    //                 </form>
    //             </div>
    //             <div className="kotakcheckin">
    //                 <span className="kotakangkastat" >{checkin}</span>
    //                 <span className="kotakhalamanstat">CHECK IN</span>
    //                 <Link to="/logpintu">
    //                     <div className="kkotakstat"> 
    //                         <span> View More </span> 
    //                         <i className="fa fa-chevron-right"></i>
    //                     </div>
    //                 </Link>
    //             </div>
    //             <div className="kotakcheckout">
    //                 <span className="kotakangkastat" >{checkout}</span>
    //                 <span className="kotakhalamanstat">CHECK OUT</span>
    //                 <Link to="/logpintu">
    //                     <div className="kkotakstat"> 
    //                         <span> View More </span> 
    //                         <i className="fa fa-chevron-right"></i>
    //                     </div>
    //                 </Link>
    //             </div>
    //             <div className="kotakpengguna">
    //                 <span className="kotakangkastat" >{pengguna.length}</span>
    //                 <span className="kotakhalamanstat">PENGGUNA</span>
    //                 <Link to="/pengguna">
    //                     <div className="kkotakstat"> 
    //                         <span> View More </span> 
    //                         <i className="fa fa-chevron-right"></i>
    //                     </div>
    //                 </Link>
    //             </div>
    //             <div className="kotakruangan">
    //                 <span className="kotakangkastat" >{ruangan.length}</span>
    //                 <span className="kotakhalamanstat">RUANGAN</span>
    //                 <Link to="/ruangan">
    //                     <div className="kkotakstat"> 
    //                         <span> View More </span> 
    //                         <i className="fa fa-chevron-right"></i>
    //                     </div>
    //                 </Link>
    //             </div>
    //             <div className="kotakgrafik">
    //                 <div className="kotakisigrafik">
    //                     <div className="kotakisigrafik2">
    //                         <Chart 
    //                         width="1053px"
    //                         height="290px"
    //                         chartType="ColumnChart"
    //                         loader={
    //                                 <div className="loadinggrafik"> 
    //                                     <i className="fa fa-spinner fa-pulse" style={{fontSize:"550%", color:"#E43A34"}}> </i>
    //                                 </div>
    //                                 }
    //                         data={datagrafik}
    //                         options={{
    //                             legend: { position: 'top-right'},
    //                             title: 'Statistik Check In dan Check Out',
    //                             hAxis: {title: 'Waktu'},
    //                             vAxis: {title: 'Jumlah'},
    //                             }}
    //                         legendToggle
    //                         />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
            
    //     )
    // } 
}

export default withRouter(Statistik);