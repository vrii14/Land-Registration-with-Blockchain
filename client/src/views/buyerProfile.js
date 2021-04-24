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

var buyer;
var buyerTable = [];
var verification = [];

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
            
            var buyer_verify = await this.state.LandInstance.methods.isVerified(currentAddress).call();
            this.setState({verified: buyer_verify});     
            var not_verify = await this.state.LandInstance.methods.isRejected(currentAddress).call();
            if(buyer_verify){
              verification.push(<p id = "verified">Verified <i class="fas fa-user-check"></i></p>);
            }else if(not_verify){
              verification.push(<p  id = "rejected">Rejected <i class="fas fa-user-times"></i></p>);
            }else{
              verification.push(<p id = "unknown">Not Yet Verified <i class="fas fa-user-cog"></i></p>);
            }

            buyer = await this.state.LandInstance.methods.getBuyerDetails(currentAddress).call();
            console.log(buyer);
            console.log(buyer[0]);

            buyerTable.push(<>
            <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Your Wallet Address: </label>
                    <Input
                      disabled
                      type="text"
                      value={currentAddress}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
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
                      value={buyer[5]}
                    />
                  </FormGroup>
                </Col>

              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Email Address </label>
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
                    <label>City</label>
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
                    <label>Aadhar Number</label>
                    <Input
                      disabled
                      type="text"
                      value={buyer[6]}
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
                    value={buyer[2]}  
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Your Aadhar Document</label>
                    <div class="post-meta"><span class="timestamp"> <a href={`https://ipfs.io/ipfs/${buyer[3]}`} target="_blank">Here</a></span></div>
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
                                        <h5 className="title">{verification}</h5>

                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            {buyerTable}
                                        </Form>
                                        <Button href="/admin/updateBuyer"  className="btn-fill" disabled={!this.state.verified} color="primary">
                                            Edit Profile
                                      </Button>
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