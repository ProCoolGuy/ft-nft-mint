// src/app.js
import "./App.css";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { useState } from "react";
import TokenArtifact from "./artifacts/contracts/Notepad.sol/Notepad.json";
const tokenAddress = "0x6FE0bA7c554B3134871F92B5A4BcB53eC294Ad36";

function App() {
  const [tokenData, setTokenData] = useState({});
  const [amount, setAmount] = useState();
  const [userAccountId, setUserAccountId] = useState();
  const [amountForMint, setAmountForMint] = useState();
  const [userAccountIdForMint, setUserAccountIdForMint] = useState();
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  async function _intializeContract(init) {
    // We first initialize ethers by creating a provider using window.ethereum
    // When, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    const contract = new ethers.Contract(tokenAddress, TokenArtifact.abi, init);

    return contract;
  }
  async function _getTokenData() {
    const contract = await _intializeContract(signer);
    const name = await contract.name();
    const symbol = await contract.symbol();
    const tokenData = { name, symbol };
    setTokenData(tokenData);
  }
  async function sendToken() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const contract = await _intializeContract(signer);
      const transaction = await contract.transfer(userAccountId, amount);
      await transaction.wait();
      console.log(`${amount} Token has been sent to ${userAccountId}`);
    }
  }

  async function mintToken() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const contract = await _intializeContract(signer);
      const transaction = await contract.mint(
        userAccountIdForMint,
        amountForMint
      );
      await transaction.wait();
      console.log(
        `${amountForMint} Token has been minted to ${userAccountIdForMint}`
      );
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const contract = await _intializeContract(signer);
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const balance = await contract.balanceOf(account);
      console.log("NDP Balance: ", balance.toString());
    }
  }
  return (
    <div className="App">
      <Link to="/toNft">To NFT EXAMPLE</Link>
      <header className="App-header">
        <button onClick={_getTokenData}>get token data</button>
        <h1>{tokenData.name}</h1>
        <h1>{tokenData.symbol}</h1>
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendToken}>Send Token</button>
        <input
          onChange={(e) => setUserAccountId(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={mintToken}>Mint</button>
        <input
          onChange={(e) => setUserAccountIdForMint(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmountForMint(e.target.value)}
          placeholder="Amount"
        />
      </header>
    </div>
  );
}
export default App;
