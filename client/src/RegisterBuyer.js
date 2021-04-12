import React, {Component} from 'react';
import LandContract from "./artifacts/Land.json";
import getWeb3 from "./getWeb3";

import {FormGroup, FormControl, Button, Spinner} from 'react-bootstrap'

//import Navigation from './Navigation'

class RegisterBuyer extends Component {
    constructor(props){
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            name: '',
            age: '',
            city: '',
            state: '',
            aadharNumber: '',
            panNumber: '',
            isVerified: false, 
        }
    }

    componentDidMount = async () => {
        //For refreshing page only once
        if(!window.location.hash){
            window.location = window.location + '#loaded';
            window.location.reload();
        }

        try{
            //Get network provider and web3 instance
            const web3 = await getWeb3();

            const accounts = await web3.eth.getAccounts();

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LandContract.networks[networkId];
            const instance = new web3.eth.Contract(
                LandContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });

            
        }catch (error) {
            // Catch any errors for any of the above operations.
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }
    };

    RegisterBuyer = async () => {
        await this.state.LandInstance.methods.registerBuyer(
            this.state.name,
            this.state.age,
            this.state.city,
            this.state.state,
            this.state.aadharNumber,
            this.state.panNumber)
            .send({
                from : this.state.account,
                gas : 2100000
            }).then(response => {
                this.props.history.push("/ShowLand");
            });

        //Reload
        window.location.reload(false);
    }

    updateName = event => (
        this.setState({ name : event.target.value })
    )
    updateAge = event => (
        this.setState({ age : event.target.value })
    )
    updateCity = event => (
        this.setState({ city : event.target.value })
    )
    updateState = event => (
        this.setState({ state : event.target.value })
    )
    updateAadhar = event => (
        this.setState({ aadharNumber : event.target.value })
    )
    updatePan = event => (
        this.setState({ panNumber : event.target.value })
    )
    

    render() {
        if (!this.state.web3) {
          return (
            <div>
              <div>
                <h1>
                <Spinner animation="border" variant="warning" />
                </h1>
              </div>
              
            </div>
          );
        }

        return (
            <div className="App">
              
              <div>
                <div>
                  <h1>
                    Buyer Registration
                  </h1>
                </div>
              </div>
                
                   
      
              <div className="form">
                  <FormGroup>
                      <div className="form-label">
                          Enter Name --
                      </div>
                      <div className="form-input">
                          <FormControl
                              input = 'text'
                              value = {this.state.name}
                              onChange = {this.updateName}
                          />
                      </div>
                  </FormGroup>

                  <FormGroup>
                      <div className="form-label">
                          Enter Age --
                      </div>
                      <div className="form-input">
                          <FormControl
                              input = 'text'
                              value = {this.state.age}
                              onChange = {this.updateAge}
                          />
                      </div>
                  </FormGroup>

                  <FormGroup>
                      <div className="form-label">
                          Enter City --
                      </div>
                      <div className="form-input">
                          <FormControl
                              input = 'text'
                              value = {this.state.city}
                              onChange = {this.updateCity}
                          />
                      </div>
                  </FormGroup>

                  <FormGroup>
                      <div className="form-label">
                          Enter State --
                      </div>
                      <div className="form-input">
                          <FormControl
                              input = 'text'
                              value = {this.state.state}
                              onChange = {this.updateState}
                          />
                      </div>
                  </FormGroup>

                  <FormGroup>
                      <div className="form-label">
                          Enter Aadhar No --
                      </div>
                      <div className="form-input">
                          <FormControl
                              input = 'text'
                              value = {this.state.aadharNumber}
                              onChange = {this.updateAadhar}
                          />
                      </div>
                  </FormGroup>

                  <FormGroup>
                      <div className="form-label">
                          Enter Pan no --
                      </div>
                      <div className="form-input">
                          <FormControl
                              input = 'text'
                              value = {this.state.panNumber}
                              onChange = {this.updatePan}
                          />
                      </div>
                  </FormGroup>

                  

                  <Button onClick={this.RegisterBuyer} className="button-vote">
                      Register as Buyer
                  </Button>
              </div>
              
            </div>
        );
        
    }
}

export default RegisterBuyer;
