import React from 'react';
import Land from './artifacts/Land.json';
import Login from "./login.component";
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { DrizzleProvider } from 'drizzle-react';

import {
    LoadingContainer,
    AccountData,
    ContractData,
    ContractForm
} from 'drizzle-react-components'

const drizzleOptions = {
    contracts: [Land]
}

var rows = [];
for (var i = 1; i < 5; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(<ContractData contract="Land" method="getArea" methodArgs={[i, { from: "0xe0786c396EEf88a42782cfd63D2329cA14b62C4C"}]} />);
}

function App() {
    return (
    //     <DrizzleProvider options={drizzleOptions}>
    //     <LoadingContainer>
    //     <div>
    //         <h5>Your Account:</h5>
    //         <AccountData accountIndex={0} units={"ether"} precision={2} />
    //         <h5>Current greeting:</h5>
    //         <ContractData contract="Land" method="getLandsCount" />
    //         <br/>
    //          {rows.map((row,index)=>{
    //      	return <li key={index}>{row}</li>
    //  		})}
            
    //     </div>
    // </LoadingContainer>
    // </DrizzleProvider>
    <></>
    );
}
export default App;
