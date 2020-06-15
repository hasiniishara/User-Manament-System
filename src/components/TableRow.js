import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.onChangeStates = this.onChangeStates.bind(this);
        this.state = {
            states:'pending'
        }
    }

    onChangeStates(e){
        this.setState({
            states:'accept'
        });

    }
    delete() {
        axios.get('http://localhost:4000/business/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }

    accept(e){
        e.preventDefault();
        const obj = {
            states: this.state.states
        };

        axios.post('http://localhost:4000/business/update/'+ this.props.match.params.id, obj).then(res => console.log(res.data));
        this.props.history.push('/index');



         //this.props.obj._id.states= 'accept';
            //states: this.state.states
        
       // axios.post('http://localhost:4000/business/add', this.props.obj._id.states).then(res => console.log(res.data)).catch((error) => { console.log(error)});

    }


    render(){
        return (
            <tr>
                <td>
                    {this.props.obj.person_name}
                </td>

                <td>
                    {this.props.obj.business_name}
                </td>

                <td>
                    {this.props.obj.business_nic_number}
                </td>
                <td>
                    {this.props.obj.states}
                </td>
                <td>
                <button onClick={this.accept} className="btn btn-danger" value={this.state.states}>Accept</button>
                </td>

                <td>
                    <Link to={"/edit/"+ this.props.obj._id} className="btn btn-primary">Edit</Link>
                </td>

                <td>
                <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;