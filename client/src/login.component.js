import React, { Component } from "react";
import './index.css';
import history from './history';
import { Redirect } from 'react-router-dom';


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            role: null,
            redirect: null,
            flag: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        this.setState({
            role: event.target.value,
            redirect: "/Register" + event.target.value
        });
    }
    submit() {
        this.setState({
            flag: "true"
        });
    }

    render() {
        if (this.state.flag) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h1 style={{letterSpacing: "3px",fontWeight:500}}>Welcome !</h1>
                <h4 style={{letterSpacing: "2px"}}>Making the Most of Digital Era!</h4>
                <hr
                    style={{
                        color: "#696969",
                        height: 1
                    }}
                />

                <div class="form-group">
                    <label class="control-label" for="Company" style={{fontSize:"18px", padding:"2px"}}>Select Role</label>
                    <select id="Company" class="form-control" name="Company" onChange={this.handleInputChange}>
                        <option selected="true" disabled="disabled">Select Role</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                    </select>
                </div>

                <div>
                <button onClick={() => this.submit()} className="btn btn-primary btn-block" style={{marginBottom:"10px",marginTop:"10px"}}>Register</button>
                <button type="submit" className="btn btn-outline-primary btn-block" >Login</button>
                </div>
            </div>
        );
    }
}