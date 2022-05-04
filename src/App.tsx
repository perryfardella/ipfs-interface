import React, { useState } from 'react';
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import './App.css';

let ipfs: IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",

    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }



const App = () => {
  
  return (
    <div className="App">
      <header className="App-header">
        {!ipfs && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}
      </header>
    </div>
  );
}

export default App;
