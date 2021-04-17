import React, { Component } from 'react';
import { Line, Bar } from "react-chartjs-2";
import LandContract from "../artifacts/Land.json";
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import { DrizzleProvider } from 'drizzle-react';
import { Spinner } from 'react-bootstrap';
import {
  LoadingContainer,
  AccountData,
  ContractData,
  ContractForm
} from 'drizzle-react-components';

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

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "../variables/charts";


const drizzleOptions = {
  contracts: [Land]
}


var verified;
var row = [];


class SDash extends Component {
  constructor(props) {
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
    if (!window.location.hash) {
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

      const currentAddress = await web3.currentProvider.selectedAddress;
      console.log(currentAddress);
      this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });
      verified = await this.state.LandInstance.methods.isVerified(currentAddress).call();
      console.log(verified);
      this.setState({ verified: verified });
      var registered = await this.state.LandInstance.methods.isSeller(currentAddress).call();
      console.log(registered);
      this.setState({ registered: registered });

      var count = await this.state.LandInstance.methods.getLandsCount().call();
      count = parseInt(count);
      console.log(typeof (count));
      console.log(count);
      //this.setState({count:count});

      var rowsArea = [];
      var rowsLoc = [];
      var rowsSt = [];
      var rowsPrice = [];

      for (var i = 1; i < count + 1; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rowsArea.push(<ContractData contract="Land" method="getArea" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsLoc.push(<ContractData contract="Land" method="getLocation" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsSt.push(<ContractData contract="Land" method="getStatus" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
        rowsPrice.push(<ContractData contract="Land" method="getPrice" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);

      }

      console.log(rowsArea);
      for (var i = 0; i < count; i++) {
        row.push(<tr><td>{i + 1}</td><td>{rowsArea[i]}</td><td>{rowsLoc[i]}</td><td>{rowsPrice[i]}</td><td>{rowsSt[i]}</td></tr>)

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

          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Total Requests for land</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" /> 10
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Daily Transactions</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    3-5
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Successful Transactions</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> 120
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Card>
                <CardHeader>
                  <h5 className="title">Wish to Add Land !</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">

                    <Button href="/AddLand" disabled={!this.state.verified} className="btn-fill" color="primary">
                      Add Land
                </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <CardHeader>
                  <h5 className="title">Profile</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">

                    <Button href="/sellerProfile" className="btn-fill" color="primary">
                      View Profile
                </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <CardHeader>
                  <h5 className="title">Requests</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">

                    <Button href="/ApproveRequest" disabled={!this.state.verified} className="btn-fill" color="primary">
                      View all Land Requests
                        </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <DrizzleProvider options={drizzleOptions}>
            <LoadingContainer>
              <Row>
                <Col lg="12" md="12">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Lands Info</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table className="tablesorter" responsive color="black">
                        <thead className="text-primary">
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
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </LoadingContainer>
          </DrizzleProvider>
        </div>
      </>

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

export default SDash;