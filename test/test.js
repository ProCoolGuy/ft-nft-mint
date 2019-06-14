const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Notepad", function () {
  it("Hello", async function () {
    const Notepad = await ethers.getContractFactory("Notepad");
    const notepad = await Notepad.deploy();
    await notepad.deployed();

    expect(await notepad.totalSupply()).to.equal(100);

    // const mintNDP = await notepad.mint("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();
  });
});
