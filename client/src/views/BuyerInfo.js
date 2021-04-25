import React, { Component } from 'react';
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import { Line, Bar } from "react-chartjs-2";
import '../index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { DrizzleProvider } from 'drizzle-react';
import { Spinner } from 'react-bootstrap'
import {
    LoadingContainer,
    AccountData,
    ContractData,
    ContractForm
} from 'drizzle-react-components'

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip,
} from "reactstrap";

import { emailjs } from 'emailjs-com';
const drizzleOptions = {
    contracts: [Land]
}

// var buyers = 0;
// var sellers = 0;
var buyerTable = [];
var completed = true;

function sendMail(email, name){
    // alert(typeof(name));

    var tempParams = {
        from_name: email,
        to_name: name,
        function: 'request and buy any land/property',
    };
    
    window.emailjs.send('service_vrxa1ak', 'template_zhc8m9h', tempParams)
    .then(function(res){
        alert("Mail sent successfully");
    })
}

class BuyerInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            buyers: 0,
            verified: '',
        }
    }

  
    verifyBuyer = (item) => async () => {
        //console.log("Hello");
        //console.log(item);

        await this.state.LandInstance.methods.verifyBuyer(
            item
        ).send({
            from: this.state.account,
            gas: 2100000
        });

        //Reload
        window.location.reload(false);

    }
    
    NotverifyBuyer = (item, email, name) => async() => {
        // alert('Before mail');
        sendMail(email, name);
        // alert('After mail');

        await new Promise(resolve => setTimeout(resolve, 10000));

        await this.state.LandInstance.methods.rejectBuyer(
            item
        ).send({
            from: this.state.account,
            gas: 2100000
        });

        window.location.reload(false);
    }

    componentDidMount = async () => {
        //For refreshing page only once
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }

        try {
            //Get network provider and web3 instance
            const web3 = await getWeb3();

            const accounts = await web3.eth.getAccounts();

            const currentAddress = await web3.currentProvider.selectedAddress;
            //console.log(currentAddress);
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Land.networks[networkId];
            const instance = new web3.eth.Contract(
                Land.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });


            var buyersCount = await this.state.LandInstance.methods.getBuyersCount().call();
            console.log(buyersCount);
           

            var buyersMap = [];
            buyersMap = await this.state.LandInstance.methods.getBuyer().call();
            //console.log(buyersMap);

            var verified = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
            //console.log(verified);
            this.setState({ verified: verified });

            for (let i = 0; i < buyersCount; i++) {
                // var i =3;
                var buyer = await this.state.LandInstance.methods.getBuyerDetails(buyersMap[i]).call();

                var buyer_verify = await this.state.LandInstance.methods.isVerified(buyersMap[i]).call();
                console.log(buyer_verify);
                buyer.verified = buyer_verify;
                
                var not_verify = await this.state.LandInstance.methods.isRejected(buyersMap[i]).call();
                console.log(not_verify);
                buyerTable.push(<tr><td>{i + 1}</td><td>{buyersMap[i]}</td><td>{buyer[0]}</td><td>{buyer[5]}</td><td>{buyer[4]}</td><td>{buyer[1]}</td><td>{buyer[6]}</td><td>{buyer[2]}</td><td><a href={`https://ipfs.io/ipfs/${buyer[3]}`} target="_blank">Click Here</a></td>
                    <td>{buyer.verified.toString()}</td>
                    <td>
                        <Button onClick={this.verifyBuyer(buyersMap[i])} disabled={buyer_verify || not_verify} className="button-vote">
                            Verify
                    </Button>
                    </td>
                    <td>
                        <Button onClick={this.NotverifyBuyer(buyersMap[i], buyer[4], buyer[0])} disabled={buyer_verify || not_verify} className="btn btn-danger">
                           Reject
                    </Button>
                    </td>
                </tr>)

            }

        } catch (error) {
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
                            <Spinner animation="border" variant="primary" />
                        </h1>
                    </div>

                </div>
            );
        }

        if (!this.state.verified) {
            return (
                <div className="content">
                    <div>
                        <Row>
                            <Col xs="6">
                                <Card className="card-chart">
                                    <CardBody>
                                        <h1>
                                            You are not verified to view this page
                                        </h1>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                </div>
            );
        }

        return (
            <DrizzleProvider options={drizzleOptions}>
                <LoadingContainer>
                    <div className="content">
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h5">Buyers Info</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table className="tablesorter" responsive color="black">
                                            <thead className="text-primary">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Account Address</th>
                                                    <th>Name</th>
                                                    <th>Age</th>
                                                    <th>Email</th>
                                                    <th>City</th>
                                                    <th>Aadhar Number</th>
                                                    <th>Pan Number</th>
                                                    <th>Aadhar Card Document</th>
                                                    <th>Verification Status</th>
                                                    <th>Verify Buyer</th>
                                                    <th>Reject Buyer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {buyerTable}
                                            </tbody>

                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </LoadingContainer>
            </DrizzleProvider>
        );

    }
}

export default BuyerInfo;
