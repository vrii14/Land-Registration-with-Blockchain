import React, { Component } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { DrizzleProvider } from 'drizzle-react';
import { Spinner } from 'react-bootstrap'
import {
  LoadingContainer,
  AccountData,
  ContractData,
  ContractForm
} from 'drizzle-react-components'
import "../index.css";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";



const drizzleOptions = {
  contracts: [Land]
}


var row = [];
var landOwner = [];

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      LandInstance: undefined,
      account: null,
      web3: null,
      count: 0,
      requested: false,
    }
  }


  makePayment = (seller_address, amount, land_id) => async () => {
    // alert(amount);

    amount = amount*0.0000057;
    alert(amount);
    await this.state.LandInstance.methods.payment(
      seller_address,
      land_id
    ).send({
      from: this.state.account,
      value: this.state.web3.utils.toWei(amount.toString(), "ether"),
      gas: 2100000
    }).then(response => {
      this.props.history.push("#");
    });
    //Reload
    window.location.reload(false);

  }

  componentDidMount = async () => {
    //For refreshing page only once
    if (!window.location.hash) {
      console.log(window.location.hash);
      window.location = window.location + '#loaded';
      window.location.reload();
    }

    try {
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
      this.setState({ registered: registered });
      var count = await this.state.LandInstance.methods.getLandsCount().call();
      count = parseInt(count);
      console.log(typeof (count));
      console.log(count);



      var dict = {}
      for (var i = 1; i < count + 1; i++) {
        var address = await this.state.LandInstance.methods.getLandOwner(i).call();
        dict[i] = address;
      }

      for (var i = 0; i < count; i++) {
        var paid = await this.state.LandInstance.methods.isPaid(i + 1).call();
        var price = await this.state.LandInstance.methods.getPrice(i + 1).call();
        row.push(<tr><td>{i + 1}</td><td>{dict[i + 1]}</td><td>{price}</td>
          <td>
            <Button onClick={this.makePayment(dict[i + 1], price, i+1)} 
            disabled={paid} className="btn btn-success">
              Make Payment
            </Button>
          </td>
        </tr>)

      }
      console.log(row);




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

    if (!this.state.registered) {
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
      <>
        <div className="content">
          <DrizzleProvider options={drizzleOptions}>
            <LoadingContainer>
              <Row>
                <Col lg="12" md="12">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Payment for Lands<span className="duration">₹ 1 = 0.0000057 Ether</span></CardTitle>

                    </CardHeader>
                    <CardBody>
                      <Table className="tablesorter" responsive color="black">
                        <thead className="text-primary">
                          <tr>
                            <th>#</th>
                            <th>Land Owner</th>
                            <th>Price ( in ₹ )</th>
                            <th>Make Payment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </LoadingContainer>
          </DrizzleProvider>
        </div>
      </>

    );
  }
}


export default Dashboard;
