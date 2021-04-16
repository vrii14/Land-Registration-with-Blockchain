import React, {Component} from 'react'
import Land from "./artifacts/Land.json"
import getWeb3 from "./getWeb3"
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { DrizzleProvider } from 'drizzle-react';
import { Table } from 'react-bootstrap';
import {FormGroup, FormControl} from 'react-bootstrap'
import { Button, Spinner} from 'react-bootstrap'

import {
  LoadingContainer,
  AccountData,
  ContractData,
  ContractForm
} from 'drizzle-react-components'

const drizzleOptions = {
  contracts: [Land]
}

var verified;
var row = [];


class SellerDashboard extends Component {
    constructor(props){
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            flag: null, 
            verified: '',
            registered: '',
            count: 0,
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
            
            const currentAddress = await web3.currentProvider.selectedAddress;
            console.log(currentAddress);
            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });
            verified = await this.state.LandInstance.methods.isVerified(currentAddress).call();
            console.log(verified);
            this.setState({verified: verified});
            var registered = await this.state.LandInstance.methods.isSeller(currentAddress).call();
            console.log(registered);
            this.setState({registered: registered});
            
            var count = await this.state.LandInstance.methods.getLandsCount().call();
            count = parseInt(count);
            console.log(typeof(count));
            console.log(count);
            //this.setState({count:count});

            var rowsArea = [];
            var rowsLoc = [];
            var rowsSt = [];
            var rowsPrice = [];

            for (var i = 1; i < count+1; i++) {
                // note: we are adding a key prop here to allow react to uniquely identify each
                // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
                rowsArea.push(<ContractData contract="Land" method="getArea" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                rowsLoc.push(<ContractData contract="Land" method="getLocation" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                rowsSt.push(<ContractData contract="Land" method="getStatus" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                rowsPrice.push(<ContractData contract="Land" method="getPrice" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                
            }

            console.log(rowsArea);
            for (var i = 0; i < count; i++) {
                row.push(<tr><td>{i+1}</td><td>{rowsArea[i]}</td><td>{rowsLoc[i]}</td><td>{rowsPrice[i]}</td><td>{rowsSt[i]}</td></tr>)

            }
            console.log(row);

            
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

        if (!this.state.registered) {
          return (
            <div>
              <div>
                <h1>
                You are not authorized to view this page.
                </h1>
              </div>
              
            </div>
          );
        }
        
        return (
          <DrizzleProvider options={drizzleOptions}>
            <LoadingContainer>
                 <div>
                    
                    <div className="form">
                        <Button href="/sellerProfile" className="button-vote">
                                View Profile
                        </Button>
                        <Button href="/AddLand" disabled={!this.state.verified} className="button-vote">
                              Add Land
                        </Button>
                    </div>
                <h5>Land Info</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Area</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {row}
                        </tbody>
                        
                    </Table>

        </div>

        
    </LoadingContainer>
    </DrizzleProvider>
            // <div className="App">  
            //   <div>
            //     <div>
            //       <h1>
            //         Seller Dashboard
            //       </h1>
            //     </div>
            //   </div>
                
            //   <div className="form">
            //       <Button href="/AddLand" disabled={!this.state.verified} className="button-vote">
            //           Add Land
            //       </Button>
            //   </div>
              
            // </div>
        );
        
    }
}

export default SellerDashboard;