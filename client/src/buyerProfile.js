import React, {Component} from 'react'
import Land from "./artifacts/Land.json"
import getWeb3 from "./getWeb3"

import {FormGroup, FormControl, Button} from 'react-bootstrap'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { DrizzleProvider } from 'drizzle-react';
import { Table, Spinner } from 'react-bootstrap';

import {
    LoadingContainer,
    AccountData,
    ContractData,
    ContractForm
} from 'drizzle-react-components'

const drizzleOptions = {
    contracts: [Land]
}

// var buyers = 0;
// var sellers = 0;
var buyer;
var buyerTable = [];

class buyerProfile extends Component {
    constructor(props){
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            buyers: 0,
            sellers: 0,
            verified: '',
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

            const currentAddress = await web3.currentProvider.selectedAddress;
            console.log(currentAddress);
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Land.networks[networkId];
            const instance = new web3.eth.Contract(
                Land.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });

            
            buyer = await this.state.LandInstance.methods.getBuyerDetails(currentAddress).call();
            console.log(buyer);
            console.log(buyer[0]);

            buyerTable.push(<div><p>Name: {buyer[0]}</p><p>Age: {buyer[1]}</p><p>City: {buyer[2]}</p><p>State: {buyer[3]}</p><p>Aadhar Number: {buyer[4]}</p><p>Pan Number: {buyer[5]}</p></div>);
                

        }catch (error) {
            // Catch any errors for any of the above operations.
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }
    };

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
            <DrizzleProvider options={drizzleOptions}>
            <LoadingContainer>
                
                <div >
                    <h5>Buyer Profile</h5>
                
                        {buyerTable}
        
                </div>
            </LoadingContainer>
            </DrizzleProvider>
        );

    }    
}

export default buyerProfile;