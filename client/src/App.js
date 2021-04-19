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
    rows.push(<ContractData contract="Land" method="getArea" methodArgs={[i, { from: "0xe0786c396EEf88a42782cfd63D2329cA14b62C4C"}]} />);
}

function App() {
    return (
    <></>
    );
}
export default App;
