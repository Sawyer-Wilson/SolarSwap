import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            sellerID: '',
            firstName: '',
            lastName: '',
            email: '', 
            energyListed: false
        }
        this.changeID = this.changeID.bind(this)
        this.changeFirstName = this.changeFirstName.bind(this)
        this.changeLastName = this.changeLastName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.listEnergy = this.listEnergy.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    changeFirstName(event){
        this.setState({
            firstName:event.target.value
        })
    }

    changeLastName(event){
        this.setState({
            lastName:event.target.value
        })
    }

    changeEmail(event){
        this.setState({
            email:event.target.value
        })
    }

    changeID(event){
        this.setState({
            sellerID:event.target.value
        })
    }

    listEnergy(event){
        this.setState({
            energyListed:event.target.value
        })
    }

    onSubmit(event){
        event.preventDefault()

        const registered = {
            sellerID: this.state.sellerID,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            energyListed: this.state.energyListed
        }

        axios.post('/sellers/', registered)
            .then(res => console.log(res.data))

            this.setState({
                sellerID: '',
                firstName: '', 
                lastName: '',
                email: '', 
                energyListed: false
            })

    }

    render(){
        return ( 
            <div>
                <div className= 'container'>
                    <div className='form-div'>
                        <form onSubmit={this.onSubmit}>
                            <input type= 'text'
                            placeholder= 'ID'
                            onChange={this.changeID}
                            value={this.state.sellerID}
                            className='form-control form-group'
                            />

                            <input type= 'text'
                            placeholder='First Name'
                            onChange={this.changeFirstName}
                            value={this.state.firstName}
                            className='form-control form-group'/>

                            <input type= 'text'
                            placeholder='Last Name'
                            onChange={this.changeLastName}
                            value={this.state.lastName}
                            className='form-control form-group'/>

                            <input type= 'text'
                            placeholder='Email'
                            onChange={this.changeEmail}
                            value={this.state.email}
                            className='form-control form-group'/>

                            <input type= 'text'
                            placeholder='List energy?'
                            onChange={this.changeEnergyListed}
                            value={this.state.listEnergy}
                            className='form-control form-group'/>
                            
                            <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;