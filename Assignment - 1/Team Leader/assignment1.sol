
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StringExample {
    string public myString;

    constructor() {
        myString = "Trichy";
    }

    function getString() public view returns (string memory) {
        return myString;
    }
}
