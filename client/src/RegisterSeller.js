import React, {Component} from 'react'
import LandContract from "./artifacts/Land.json"
import getWeb3 from "./getWeb3"

import {FormGroup, FormControl, Button, Spinner} from 'react-bootstrap'

//import Navigation from './Navigation'

class RegisterSeller extends Component {
    constructor(props){
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            name: '',
            age: '',
            aadharNumber: '',
            panNumber: '',
            landsOwned: '',
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

    registerSeller = async () => {
        if (this.state.name == '' || this.state.age == '' || this.state.aadharNumber == '' || this.state.panNumber == '' || this.state.landsOwned == '') {
            alert("All the fields are compulsory!");
        } else if(this.state.aadharNumber.length != 12){
            alert("Aadhar Number should be 12 digits long!");
        } else if(this.state.panNumber.length != 10){
            alert("Pan Number should be a 10 digit unique number!");
        } else if (!Number(this.state.age)) {
            alert("Your age must be a number");
        } else{
            await this.state.LandInstance.methods.registerSeller(
                this.state.name,
                this.state.age,
                this.state.aadharNumber,
                this.state.panNumber,
                this.state.landsOwned)
                .send({
                    from : this.state.account,
                    gas : 2100000
                }).then(response => {
                    this.props.history.push("/SellerDashboard");
                });
    
            //Reload
            window.location.reload(false);
        }
    }

    updateName = event => (
        this.setState({ name : event.target.value })
    )
    updateAge = event => (
        this.setState({ age : event.target.value })
    )
    updateAadhar = event => (
        this.setState({ aadharNumber : event.target.value })
    )
    updatePan = event => (
        this.setState({ panNumber : event.target.value })
    )
    updateOwnedLands = event => (
        this.setState({ landsOwned : event.target.value })
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
                    Seller Registration
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

                  <FormGroup>
                      <div className="form-label">
                          Enter Owned Lands --
                      </div>
                      <div className="form-input">
                          <FormControl
                              input = 'text'
                              value = {this.state.landsOwned}
                              onChange = {this.updateOwnedLands}
                          />
                      </div>
                  </FormGroup>

                  <Button onClick={this.registerSeller} className="button-vote">
                      Register as Seller
                  </Button>
              </div>
              
            </div>
        );
        
    }
}

export default RegisterSeller;
