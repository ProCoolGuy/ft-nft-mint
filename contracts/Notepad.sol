//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../erc/token/ERC20/ERC20.sol";
import "../erc/access/Ownable.sol";

contract Notepad is ERC20, Ownable {
    constructor() ERC20("Notepad", "NPD") {
        _mint(msg.sender, 100 * (10**18));
    }

    function mint(address _to, uint256 amount) external onlyOwner {
        _mint(_to, amount * (10**18));

        // address payable a;
        // a.transfer(100);
    }
}
