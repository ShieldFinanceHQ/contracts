// SPDX-License-Identifier: ISC

pragma solidity ^0.6.0;

import "../Orchestrator.sol";


contract ConstructorRebaseCallerContract {
    constructor(address orchestrator) public {
        // Take out a flash loan.
        // Do something funky...
        Orchestrator(orchestrator).rebase(653313740501264965, 653313740501264965);  // should fail
        // pay back flash loan.
    }
}
