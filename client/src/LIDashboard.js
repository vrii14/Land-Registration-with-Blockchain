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
var sellerTable = [];
var buyerTable = [];

class LIDashboard extends Component {
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


            var sellersCount = await this.state.LandInstance.methods.getSellersCount().call();
            console.log(typeof(sellersCount));
            var buyersCount = await this.state.LandInstance.methods.getBuyersCount().call();
            console.log(typeof(buyersCount));

            var sellersMap = [];
            var buyersMap = [];
            sellersMap = await this.state.LandInstance.methods.getSeller().call();
            console.log(sellersMap);
            buyersMap = await this.state.LandInstance.methods.getBuyer().call();
            console.log(buyersMap);


            if(0x8B1CFEeCe1DFe91eef626357c29C0e19C989131e == currentAddress){
                this.setState({verified: true});
            }else{
                this.setState({verified: false});              
            }
            
            for(let i = 0; i<sellersCount; i++){
                var seller = await this.state.LandInstance.methods.getSellerDetails(sellersMap[i]).call();
                console.log(seller);
                sellerTable.push(<tr><td>{i+1}</td><td>{seller[0]}</td><td>{seller[1]}</td><td>{seller[2]}</td><td>{seller[3]}</td><td>{seller[4]}</td></tr>)
            }
            for(let i = 0; i<buyersCount; i++){
                var buyer = await this.state.LandInstance.methods.getBuyerDetails(buyersMap[i]).call();
                console.log(buyer);
                buyerTable.push(<tr><td>{i+1}</td><td>{buyer[0]}</td><td>{buyer[1]}</td><td>{buyer[2]}</td><td>{buyer[3]}</td><td>{buyer[4]}</td><td>{buyer[5]}</td></tr>)

            }
            // await new Promise(r => setTimeout(r, 5000));
            // console.log(accounts[1]);
        }catch (error) {
            // Catch any errors for any of the above operations.
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }
    };

    // sleep = (ms) => {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // };

    
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

        if (!this.state.verified) {
            return (
              <div>
                <div>
                  <h1>
                  You are not verified to view this page
                  </h1>
                </div>
                
              </div>
            );
          }

        return (
            <DrizzleProvider options={drizzleOptions}>
            <LoadingContainer>
                <div >
                    <h5>Sellers Info</h5>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Aadhar Number</th>
                                <th>Pan Number</th>
                                <th>Owned Lands</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellerTable}
                        </tbody>
                        
                    </Table>
                    <h5>Buyers Info</h5>

                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Aadhar Number</th>
                                <th>Pan Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buyerTable}
                        </tbody>
                        
                    </Table>

                </div>
            </LoadingContainer>
            </DrizzleProvider>
        );
        
    }
}

export default LIDashboard;
