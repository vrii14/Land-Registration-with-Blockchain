import React from 'react';
import Land from './artifacts/Land.json';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { DrizzleProvider } from 'drizzle-react';
import { Table } from 'react-bootstrap';

import {
    LoadingContainer,
    AccountData,
    ContractData,
    ContractForm
} from 'drizzle-react-components'

const drizzleOptions = {
    contracts: [Land]
}

var rowsArea = [];
var rowsLoc = [];
var rowsSt = [];
var row = [];

function LandOwner(id) {
    return (<ContractData contract="Land" method="getLandOwner" methodArgs={[id, { from: "0xe0786c396EEf88a42782cfd63D2329cA14b62C4C" }]} />
    )
}

for (var i = 1; i < 4; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rowsArea.push(<ContractData contract="Land" method="getArea" methodArgs={[i, { from: "0xe0786c396EEf88a42782cfd63D2329cA14b62C4C" }]} />);
    rowsLoc.push(<ContractData contract="Land" method="getLocation" methodArgs={[i, { from: "0xe0786c396EEf88a42782cfd63D2329cA14b62C4C" }]} />);
    rowsSt.push(<ContractData contract="Land" method="getStatus" methodArgs={[i, { from: "0xe0786c396EEf88a42782cfd63D2329cA14b62C4C" }]} />);

}
var count = <ContractData contract="Land" method="getLandsCount" />
console.log(count)

for (var i = 0; i < 1; i++) {
    row.push(<tr><td>{i+1}</td><td>{rowsArea[i]}</td><td>{rowsLoc[i]}</td><td>{rowsSt[i]}</td></tr>)
}


function ShowLand() {
    return (
        <DrizzleProvider options={drizzleOptions}>
            <LoadingContainer>
                <div>
                    <h5>Land Info</h5>
                    {/* <AccountData accountIndex={0} units={"ether"} precision={2} />*/}
                    {/* <ContractData contract="Land" method="getLandsCount" /> */}
                    <br />
                    {/* {rowsArea.map((row,index)=>{
         	return <li key={index}>{row}</li>
     		})} */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Area</th>
                                <th>Location</th>
                                {/* <th>Land Owner</th> */}
                                <th>Status</th>
                                <th>{count}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {row}
                        </tbody>                        
                    </Table>
        </div>
    </LoadingContainer>
    </DrizzleProvider>   
    );
}
export default ShowLand;
