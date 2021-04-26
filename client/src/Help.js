import React, { Component } from "react";
import './help.css';
import './index.css';
import Faq from "react-faq-component";
import "../node_modules/video-react/dist/video-react.css";
import ReactPlayer from 'react-player';
// import video from "../src/assets/img/video.mkv";

const data = {
    title: "FAQ (How the System works)",
    rows: [
        {
            title: "What are the prerequisites for using the system?",
            content: "You need Metamask Browser Extension added and Ganache for running the system on a local Ethereum Blockchain.",
        },
        {
            title: "How can I understand the working of the system?",
            content:
                "You can watch the demo video uploaded above on this page.",
        },
        {
            title: "Where can I find this project source code?",
            content: <p>You can find it in this Github Repository <a href="https://github.com/vrii14/SE-Project" >here.</a></p>,
        },
        {
            title: "What do I register for?",
            content: "If you own a land and want to sell it, Register as a Buyer and if you want to buy a land, Register as a Buyer.",
        },
        {
            title: "Why can't I request for a Land Property after registering as Buyer?",
            content: "Your account profile and documents will first be verified by the Land Inspector and then you can request a Land.",
        },
        {
            title: "Why can't I add a Land Property after registering as Seller?",
            content: "Same answer as above!",
        },
        {
            title: "Who has created this project?",
            content: "This is a team project built by Mrunal Kotkar, Divya Kharode and Vrinda Ahuja. You can reach out to us in case of any queries!",
        },
    ],
};

const styles = {
    bgColor: 'dark',
    titleTextColor: "black",
    rowTitleColor: "grey",
    rowContentPaddingBottom: '10px',
    transitionDuration: "0.5s",
    timingFunc: "ease",
    //rowContentColor: 'grey',
    //arrowColor: "black",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

export default function Help() {
    return (
        <>
            <div id="container" >
                <div id="topSection">
                    <div id="searchSection">
                    </div>
                </div>
            </div>

            <div className="container">
                <h1>Demo</h1>
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/6VLaAa8GNDc" allowfullscreen="true"></iframe>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <Faq
                        data={data}
                        styles={styles}
                        config={config}
                    />
                </div>
            </div>
        </>
    );
}