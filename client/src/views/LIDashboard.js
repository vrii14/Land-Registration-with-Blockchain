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

var completed = true;

class LIDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
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
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Land.networks[networkId];
            const instance = new web3.eth.Contract(
                Land.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });
             
            var verified = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
            this.setState({ verified: verified });

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
                  <h5 className="title">Sellers Information</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">

                    <Button href="/LI/SellerInfo" className="btn-fill" color="primary">
                      Verify Sellers
                </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <CardHeader>
                  <h5 className="title">Buyers Information</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">

                    <Button href="/LI/BuyerInfo" className="btn-fill" color="primary">
                        Verify Buyers
                </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card>
                <CardHeader>
                  <h5 className="title">Land Transfer Requests</h5>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">

                    <Button href="/LI/TransactionInfo"  className="btn-fill" color="primary">
                      Approve Land Transactions
                        </Button>
                  </div>
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

export default LIDashboard;
