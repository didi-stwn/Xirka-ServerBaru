import React,{Component} from 'react';

export default class Pengguna extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isidata: [],
        };
      }
      
      componentDidMount(){
        let jwt='QazcBPmrz64aFbob4ygc6An5LX4s5ogYdzsIhDPPhwF5B27DwWO5HAXyMffXVtKl'
        fetch('https://192.168.2.7/smartlock/api/v1/smartlockview.json', {
          method: 'GET',
          headers: {
            crsftoken: 'Bearer ' + jwt
          }
        })
        .then(response=>response.json())
        .then(isidata=>this.setState({isidata}))
    }

    render(){
        const {isidata} = this.state;
        return (
            <div>
                {
                    isidata.map (item =>
                    <li> {item.results.card_id}</li>)
                }
            </div>
        )
    }
}