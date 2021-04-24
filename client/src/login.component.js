import React, { Component } from "react";
import './index.css';
import history from './history';
import { Redirect } from 'react-router-dom';
import getWeb3 from "./getWeb3"
import LandContract from "./artifacts/Land.json"
import { Button } from "reactstrap";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            role: null,
            redirect: null,
            registered: '',
            verified: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount = async () => {
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }

        try {
            //Get network provider and web3 instance
            const web3 = await getWeb3();

            const accounts = await web3.eth.getAccounts();

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LandContract.networks[networkId];
            const instance = new web3.eth.Contract(
                LandContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            const currentAddress = await web3.currentProvider.selectedAddress;
            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });
            var registered = await this.state.LandInstance.methods.isRegistered(currentAddress).call();
            console.log(registered);
            this.setState({ registered: registered });
            var verified = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
            console.log(verified);
            this.setState({ verified: verified });
            // verified = verified.toString();
            // console.log(verified);

        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    handleInputChange(event) {
        this.setState({
            role: event.target.value,
            redirect: "/Register" + event.target.value
        });
    }
    submit() {
        this.props.history.push(this.state.redirect);
        window.location.reload(false);

    }

    render() {
        if (this.state.registered || this.state.verified) {
            return (

                <div className="bodyC">
                    <div className="img-wrapper">
                        <img src="https://i.pinimg.com/originals/71/6e/00/716e00537e8526347390d64ec900107d.png" className="logo" />
                        <div className="wine-text-container">
                            <div className="site-title wood-text">Land Registry</div>
                        </div>
                    </div>
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <div>
                                <div>
                                    <h1>
                                        You have already registered.
                                        </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="bodyC">
                 <a href ="/Help" className="faq" style={{borderRadius: "10%", textDecoration: "none", fontWeight: "bolder"}} >
                 <h3 style={{color: "wheat"}}>Help?</h3>
                                    </a>
                <div className="img-wrapper">
                    <img src="https://i.pinimg.com/originals/71/6e/00/716e00537e8526347390d64ec900107d.png" className="logo" />
                    <div className="wine-text-container">
                        <div className="site-title wood-text">Land Registry</div>
                    </div>
                </div>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <div>
                            <h1 style={{ letterSpacing: "3px", fontWeight: 500, color: "black" }}>Welcome !</h1>
                            <h4 style={{ letterSpacing: "2px", color: 'black' }}>Making the Most of Digital Era!</h4>
                            <hr
                                style={{
                                    color: "#696969",
                                    height: 1
                                }}
                            />

                            <div class="form-group" style={{ color: "black" }}>
                                <label class="control-label" for="Company" style={{ fontSize: "18px", padding: "2px" }}>Select Role</label>
                                <select id="Company" class="form-control" name="Company" onChange={this.handleInputChange}>
                                    <option selected="true" disabled="disabled">Select Role</option>
                                    <option value="Buyer">Buyer</option>
                                    <option value="Seller">Seller</option>
                                </select>
                            </div>

                            <div>
                                <button onClick={() => this.submit()} className="btn btn-primary btn-block" style={{ marginBottom: "10px", marginTop: "10px" }}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}