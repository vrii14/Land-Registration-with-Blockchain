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

var requestTable = [];

class ApproveRequest extends Component {
    constructor(props){
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            registered: '',
            approved: '',
        }
    }
    approveRequest = (reqId) => async () => {
        
        await this.state.LandInstance.methods.approveRequest(
            reqId
        ).send({
            from : this.state.account,
            gas : 2100000
        });
        //Reload
        window.location.reload(false);

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
            
            const currentAddress = await web3.currentProvider.selectedAddress;
            console.log(currentAddress);
            var registered = await this.state.LandInstance.methods.isSeller(currentAddress).call();
            console.log(registered);
            this.setState({registered: registered});
            var requestsCount = await this.state.LandInstance.methods.getRequestsCount().call();
            console.log(requestsCount);
            // var requestsMap = [];
            // requestsMap = await this.state.LandInstance.methods.getAllRequests().call();

            for(let i = 1; i<requestsCount+1; i++){
                var request = await this.state.LandInstance.methods.getRequestDetails(i).call();
                // console.log(request);
                // console.log(request[0].toLowerCase());
                // console.log(currentAddress);
                var approved = await this.state.LandInstance.methods.isApproved(i).call();
                console.log(approved);
                if(currentAddress == request[0].toLowerCase()){
                    requestTable.push(<tr><td>{i}</td><td>{request[1]}</td><td>{request[2]}</td><td>{request[3].toString()}</td>
                    <td>
                     <Button onClick={this.approveRequest(i)} disabled={approved} className="button-vote">
                          Approve Request
                    </Button>
                    </td></tr>)
                }
                // console.log(request[1]);
            }
            // console.log(requestTable);

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
                    <h5>Requests Info</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Buyer ID</th>
                                <th>Land ID</th>
                                <th>Request Status</th>
                            </tr>
                        </thead> 
                        <tbody>
                            {requestTable}
                        </tbody> 
                    </Table>
                </div>
            </LoadingContainer>
            </DrizzleProvider>
        );
        
    }
}

export default ApproveRequest;
