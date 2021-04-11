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

class LIDashboard extends Component {
    constructor(props){
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            buyers: 0,
            sellers: 0,
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
            const deployedNetwork = Land.networks[networkId];
            const instance = new web3.eth.Contract(
                Land.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });

            var buyers = await this.state.LandInstance.methods.getBuyersCount().call();
            //this.setState({buyers:buyers});
            //console.log(this.state.buyers);
            console.log(buyers);

            var sellers = await this.state.LandInstance.methods.getSellersCount().call();
            console.log(sellers);
            
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
                <div>
                    <h5>Land Info</h5>
                    <AccountData accountIndex={0} units={"ether"} precision={2} />
                    <h5>Current greeting:</h5> 
                    <ContractData contract="Land" method="getLandsCount" /> 
                    <br />
                     

                </div>
            </LoadingContainer>
            </DrizzleProvider>
        );
        
    }
}

export default LIDashboard;
