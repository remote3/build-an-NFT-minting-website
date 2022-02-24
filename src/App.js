import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./config";

function App() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState([]);
  
  async function connectAccounts() {
      if (window.ethereum)
      {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
          }
        );
        
        setAccount(accounts);
      }
  }

  useEffect(() => 
  {
    connectAccounts();
  }, []);


  async function mintNFT() {

    if (window.ethereum)
    {
      setLoading(true)

      // Connect web3
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      // Sign transaction, use provider to read from ethereum network
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
 
      try {
          const tx =  await contract.mint();
          const txReceipt = await tx.wait();
          console.log("Transaction hash = ", txReceipt);
  
          setLoading(false)
          alert('Yayy! minted a GoldenMan')
      } 
      catch (e) 
      {
        setLoading(false)
        console.log(e)
      }
    
    }

  }
  
    return (
    loading ?

      <div className="App">
        <h1>Minting</h1>
      </div >

      : <div className="App">
        <h1>Mint my NFT</h1>
        <button onClick={mintNFT}>Mint an NFt</button>
      </div >
  );
}

export default App;