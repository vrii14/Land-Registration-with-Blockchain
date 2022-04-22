import {
    LoadingContainer
} from '@drizzle/react-components';
import { DrizzleProvider } from '@drizzle/react-plugin';
import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
// reactstrap components
import {
    Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table
} from "reactstrap";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import '../index.css';


const drizzleOptions = {
    contracts: [Land]
}


var sellersCount;
var sellersMap = [];
var sellerTable = [];

class SellerInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            sellers: 0,
            verified: '',
            not_verified: '',
        }
    }

    verifySeller = (item) => async () => {
        //console.log("Hello");
        //console.log(item);

        await this.state.LandInstance.methods.verifySeller(
            item
        ).send({
            from: this.state.account,
            gas: 2100000
        });

        //Reload
        window.location.reload(false);

    }

    NotverifySeller = (item) => async () => {

        await this.state.LandInstance.methods.rejectSeller(
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


            sellersCount = await this.state.LandInstance.methods.getSellersCount().call();
            console.log(sellersCount);



            sellersMap = await this.state.LandInstance.methods.getSeller().call();

            var verified = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
            //console.log(verified);
            this.setState({ verified: verified });


            for (let i = 0; i < sellersCount; i++) {
                var seller = await this.state.LandInstance.methods.getSellerDetails(sellersMap[i]).call();
                console.log(seller);
                var seller_verify = await this.state.LandInstance.methods.isVerified(sellersMap[i]).call();
                console.log(seller_verify);
                seller.verified = seller_verify;

                //seller.push(seller_verify);
                var not_verify = await this.state.LandInstance.methods.isRejected(sellersMap[i]).call();
                console.log(not_verify);



                sellerTable.push(<tr><td>{i + 1}</td><td>{sellersMap[i]}</td><td>{seller[0]}</td><td>{seller[1]}</td><td>{seller[2]}</td><td>{seller[3]}</td><td>{seller[4]}</td><td><a href={`https://ipfs.io/ipfs/${seller[5]}`} target="_blank">Click Here</a></td>
                    <td>{seller.verified.toString()}</td>
                    <td>
                        <Button onClick={this.verifySeller(sellersMap[i])} disabled={seller_verify || not_verify} className="button-vote">
                            Verify
                        </Button>
                    </td>
                    <td>
                        <Button onClick={this.NotverifySeller(sellersMap[i])} disabled={seller_verify || not_verify} className="btn btn-danger">
                            Reject
                        </Button>
                    </td></tr>)
                console.log(seller[5]);


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
                                        <CardTitle tag="h4">Sellers Info</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table sclassName="tablesorter" responsive color="black">
                                            <thead className="text-primary">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Account Address</th>
                                                    <th>Name</th>
                                                    <th>Age</th>
                                                    <th>Aadhar Number</th>
                                                    <th>Pan Number</th>
                                                    <th>Owned Lands</th>
                                                    <th>Aadhar Card Document</th>
                                                    <th>Verification Status</th>
                                                    <th>Verify Seller</th>
                                                    <th>Reject Seller</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sellerTable}
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

export default SellerInfo;
