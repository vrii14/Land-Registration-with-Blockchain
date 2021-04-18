import React, { Component } from 'react';
import { Line, Bar } from "react-chartjs-2";
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import { DrizzleProvider } from 'drizzle-react';
import { Spinner  } from 'react-bootstrap';
import {  Link} from 'react-router-dom';
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
var rowsIpfs = []
var url;

class viewImage extends Component {
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
      id: '',
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
      
      
      for (var i = 1; i < count + 1; i++) {
        var landImg = await this.state.LandInstance.methods.getImage(i).call();
       
        url = "https://ipfs.io/ipfs/" + landImg;
        console.log(url)
        rowsIpfs.push(url);
      }
      console.log(rowsIpfs[4]);
      

      // alert(url);<img src={url} alt="" width="50em" height="40em"/> 
      for (var i = 0; i < count; i++) {
        row.push(<p>hello</p>)

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
            </LoadingContainer>
          </DrizzleProvider>
        </div>
      </>

    );

  }
}

export default viewImage;