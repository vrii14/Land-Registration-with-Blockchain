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


const drizzleOptions = {
    contracts: [Land]
}


var landTable = [];
var completed = true;

class TransactionInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            verified: '',
        }
    }

    landTransfer = (landId, newOwner) => async () => {
        
        await this.state.LandInstance.methods.LandOwnershipTransfer(
            landId, newOwner
        ).send({
            from : this.state.account,
            gas : 2100000
        });
        //Reload
        console.log(newOwner);
        console.log(completed);
        // this.setState({completed:false});
        completed = false;
        console.log(completed);

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
            
            var verified = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
            //console.log(verified);
            this.setState({ verified: verified });
            
            var count = await this.state.LandInstance.methods.getLandsCount().call();
            count = parseInt(count);
            var rowsArea = [];
            var rowsCity = [];
            var rowsState = [];
            var rowsPrice = [];
            var rowsPID = [];
            var rowsSurvey = [];


            for (var i = 1; i < count + 1; i++) {
                rowsArea.push(<ContractData contract="Land" method="getArea" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                rowsCity.push(<ContractData contract="Land" method="getCity" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                rowsState.push(<ContractData contract="Land" method="getState" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                rowsPrice.push(<ContractData contract="Land" method="getPrice" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                rowsPID.push(<ContractData contract="Land" method="getPID" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
                rowsSurvey.push(<ContractData contract="Land" method="getSurveyNumber" methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />);
              }
            for (var i = 0; i < count; i++) {
                var request = await this.state.LandInstance.methods.getRequestDetails(i+1).call();
                var approved = await this.state.LandInstance.methods.isApproved(i+1).call();
                // console.log(approved);
                // console.log(request[3]);
                var disabled = request[3]&&completed;
                console.log("Disabled: ", disabled);
                console.log("request[3]: ", request[3]);
                console.log("completed: ", completed);

                var owner = await this.state.LandInstance.methods.getLandOwner(i+1).call();
                landTable.push(<tr><td>{i+1}</td><td>{owner}</td><td>{rowsArea[i]}</td><td>{rowsCity[i]}</td><td>{rowsState[i]}</td><td>{rowsPrice[i]}</td><td>{rowsPID[i]}</td><td>{rowsSurvey[i]}</td>
                <td>
                     <Button onClick={this.landTransfer(i+1, request[1])} disabled={!disabled} className="button-vote">
                          Verify Transaction
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
                                        <CardTitle tag="h6">Lands Info</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table className="tablesorter" responsive color="black">
                                            <thead className="text-primary">
                                                <tr>
                                                <th>#</th>
                                                <th>Owner ID</th>
                                                <th>Area</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Price</th>
                                                <th>Property PID</th>
                                                <th>Survey Number</th>
                                                <th>Verify Land Transfer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {landTable}
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

export default TransactionInfo;
