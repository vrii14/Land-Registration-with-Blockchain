import React, { Component } from 'react';
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import "../index.css";
import { FormControl } from "react-bootstrap";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { DrizzleProvider } from 'drizzle-react';
import { Spinner } from 'react-bootstrap';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";

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
    constructor(props) {
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
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }

        try {
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

           // buyerTable.push(<div><p>Name: {buyer[0]}</p><p>Age: {buyer[1]}</p><p>City: {buyer[2]}</p><p>State: {buyer[3]}</p><p>Aadhar Number: {buyer[4]}</p><p>Pan Number: {buyer[5]}</p></div>);
            buyerTable.push(<><Row>
                <Col md="12">
                  <FormGroup>
                    <label>Name</label>
                    <Input
                      disabled
                      type="text"
                      value={buyer[0]}
                    />
                  </FormGroup>
                </Col>

              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Age</label>
                    <Input
                      disabled
                      type="text"
                      value={buyer[1]}
                    />
                  </FormGroup>
                </Col>
                
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>City</label>
                    <Input
                      disabled
                      type="text"
                      value={buyer[2]}
                    />
                  </FormGroup>
                </Col>
                
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>State</label>
                    <Input
                      disabled
                      type="text"
                      value={buyer[3]}
                    />
                  </FormGroup>
                </Col>
                
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Aadhar Number</label>
                    <Input
                    disabled
                    type="text"
                    value={buyer[4]}  
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Pan Number</label>
                    <Input
                    disabled
                    type="text"
                    value={buyer[5]}  
                    />
                  </FormGroup>
                </Col>
              </Row>
             </>);

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

        return (
            <div className="content">
                <DrizzleProvider options={drizzleOptions}>
                    <LoadingContainer>
                        <Row>
                            <Col md="8">
                                <Card>
                                    <CardHeader>
                                        <h5 className="title">Buyer Profile</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            {buyerTable}
                                        </Form>
                                    </CardBody>
                                    <CardFooter>

                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                    </LoadingContainer>
                </DrizzleProvider>
            </div>
        );

    }
}

export default buyerProfile;