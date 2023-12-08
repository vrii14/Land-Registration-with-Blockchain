import {
  LoadingContainer
} from '@drizzle/react-components';
import { DrizzleProvider } from '@drizzle/react-plugin';
import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import {
  Button,
  Card, CardBody,
  CardFooter, CardHeader, Col, Form, FormGroup, Input,
  Row
} from "reactstrap";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import "../index.css";


const drizzleOptions = {
  contracts: [Land]
}

var buyer;
var buyerTable = [];
var verification = [];

class updateBuyer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      LandInstance: undefined,
      account: null,
      web3: null,
      address: '',
      buyers: 0,
      sellers: 0,
      name: '',
      age: '',
      city: '',
      email: '',
      aadharNumber: '',
      panNumber: '',
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
      this.setState({ address: currentAddress });
      var buyer_verify = await this.state.LandInstance.methods.isVerified(currentAddress).call();

      var not_verify = await this.state.LandInstance.methods.isRejected(currentAddress).call();
      if (buyer_verify) {
        verification.push(<p id="verified">Verified <i class="fas fa-user-check"></i></p>);
      } else if (not_verify) {
        verification.push(<p id="rejected">Rejected <i class="fas fa-user-times"></i></p>);
      } else {
        verification.push(<p id="unknown">Not Yet Verified <i class="fas fa-user-cog"></i></p>);
      }

      buyer = await this.state.LandInstance.methods.getBuyerDetails(currentAddress).call();
      console.log(buyer);
      console.log(buyer[0]);
      this.setState({ name: buyer[0], age: buyer[5], city: buyer[1], email: buyer[4], aadharNumber: buyer[6], panNumber: buyer[2] });
      buyerTable.push(
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
      );

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  updateBuyer = async () => {
    if (this.state.name === '' || this.state.age === '' || this.state.city === '' || this.state.email === '' || this.state.aadharNumber === '' || this.state.panNumber === '') {
      alert("All the fields are compulsory!");
    } else if (this.state.aadharNumber.length != 12) {
      alert("Aadhar Number should be 12 digits long!");
    } else if (this.state.panNumber.length != 10) {
      alert("Pan Number should be a 10 digit unique number!");
    } else if (!Number(this.state.age)) {
      alert("Your age must be a number");
    }
    else {
      await this.state.LandInstance.methods.updateBuyer(
        this.state.name,
        this.state.age,
        this.state.city,
        this.state.aadharNumber,
        this.state.email,
        this.state.panNumber
      )
        .send({
          from: this.state.address,
          gas: 2100000
        }).then(response => {
          this.props.history.push("/admin/buyerProfile");
        });

      //Reload
      window.location.reload(false);
    }
  }

  updateName = event => (
    this.setState({ name: event.target.value })
  )
  updateAge = event => (
    this.setState({ age: event.target.value })
  )
  updateCity = event => (
    this.setState({ city: event.target.value })
  )
  updateEmail = event => (
    this.setState({ email: event.target.value })
  )
  updateAadhar = event => (
    this.setState({ aadharNumber: event.target.value })
  )
  updatePan = event => (
    this.setState({ panNumber: event.target.value })
  )

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
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Name</label>
                            <Input
                              type="text"
                              value={this.state.name}
                              onChange={this.updateName}
                            />
                          </FormGroup>
                        </Col>

                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Age</label>
                            <Input
                              type="text"
                              value={this.state.age}
                              onChange={this.updateAge}
                            />
                          </FormGroup>
                        </Col>

                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Email Address </label>
                            <Input
                              type="text"
                              value={this.state.email}
                              onChange={this.updateEmail}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>City</label>
                            <Input
                              type="text"
                              value={this.state.city}
                              onChange={this.updateCity}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Aadhar Number</label>
                            <Input
                              type="text"
                              value={this.state.aadharNumber}
                              onChange={this.updateAadhar}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Pan Number</label>
                            <Input
                              type="text"
                              value={this.state.panNumber}
                              onChange={this.updatePan}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button onClick={this.updateBuyer} className="btn-fill" color="primary">
                      Update
                    </Button>
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

export default updateBuyer;