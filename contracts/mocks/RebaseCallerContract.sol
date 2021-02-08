// SPDX-License-Identifier: ISC

pragma solidity ^0.6.0;

import "../Orchestrator.sol";


contract RebaseCallerContract {

    function callRebase(address orchestrator) public returns (bool) {
        // Take out a flash loan.
        // Do something funky...
        Orchestrator(orchestrator).rebase(653313740501264965, 653313740501264965);  // should fail
        // pay back flash loan.
        return true;
    }
}
