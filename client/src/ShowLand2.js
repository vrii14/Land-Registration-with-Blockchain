
import React, {Component} from 'react';
import Land from "./artifacts/Land.json";
import getWeb3 from "./getWeb3";
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { DrizzleProvider } from 'drizzle-react';
import { Table } from 'react-bootstrap';
import {FormGroup, FormControl, Button, Spinner} from 'react-bootstrap'


import {
    LoadingContainer,
    AccountData,
    ContractData,
    ContractForm
} from 'drizzle-react-components'

const drizzleOptions = {
    contracts: [Land]
}


var row = [];
var landOwner = [];
// var requested = false;

class ShowLand extends Component {
    constructor(props){
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            count: 0,
            requested: false,
        }
    }

    requestLand = (seller_address, land_id) => async () => {
       
        console.log(seller_address);
        console.log(land_id);
        // this.setState({requested: true});
        // requested = true;
        await this.state.LandInstance.methods.requestLand(
            seller_address,
            land_id
        ).send({
            from : this.state.account,
            gas : 2100000
        });
        // console.log(this.state.requested);

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
            var registered = await this.state.LandInstance.methods.isBuyer(currentAddress).call();
            console.log(registered);
            this.setState({registered: registered});
            var count = await this.state.LandInstance.methods.getLandsCount().call();
            count = parseInt(count);
            console.log(typeof(count));
            console.log(count);
            
            // for(var i=1; i<count+1;i++){
            //     var address = await this.state.LandInstance.methods.getLandOwner(i).call();
            //     landOwner[i-1] = address;
            //     console.log(landOwner[i-1]);
            // }
            
            //this.setState({count:count});

            var rowsArea = [];
            var rowsLoc = [];
            var rowsSt = [];
            var rowsPrice = [];


            var dict = {}
            for(var i=1; i<count+1;i++){
                var address = await this.state.LandInstance.methods.getLandOwner(i).call();
                dict[i] = address;
                // var requested = await this.state.LandInstance.methods.getRequestStatus(i).call();
               
                // this.setState({requested: requested});
                // console.log(this.state.requested);
            }

            console.log(dict[1]);


            for (var i = 1; i < count+1; i++) {
                // note: we are adding a key prop here to allow react to uniquely identify each
                // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
                rowsArea.push(<ContractData contract="Land" method="getArea" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                rowsLoc.push(<ContractData contract="Land" method="getLocation" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                rowsSt.push(<ContractData contract="Land" method="getStatus" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                rowsPrice.push(<ContractData contract="Land" method="getPrice" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                // var address = await this.state.LandInstance.methods.getLandOwner(i).call();
                // landOwner[i] = address;
            }
            //console.log(landOwner);

            // for(var i=1; i< count+1; i++){
            //     var address = await this.state.LandInstance.methods.getLandOwner(i).call();
                
            //     landOwner[i] = address;
            //     console.log(landOwner[i]);
            // }

            //console.log(rowsArea);
            for (var i = 0; i < count; i++) {
                var requested = await this.state.LandInstance.methods.isRequested(i+1).call();
                console.log(requested);
                var reqStatus = await this.state.LandInstance.methods.isApproved(i+1).call();
                row.push(<tr><td>{i+1}</td><td>{rowsArea[i]}</td><td>{rowsLoc[i]}</td><td>{rowsPrice[i]}</td><td>{reqStatus.toString()}</td>
                <td>
                    <Button onClick={this.requestLand(dict[i+1], i+1)} disabled={requested} className="button-vote">
                         Request Land
                    </Button>
                </td>
                </tr>)

            }
            //console.log(row);

            

                        
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
                    
                    <div>
                        <Button href="/buyerProfile" className="button-vote">
                                View Profile
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
        );
        
    }
}

export default ShowLand;
