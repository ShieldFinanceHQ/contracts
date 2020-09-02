// SPDX-License-Identifier: ISC

pragma solidity ^0.6.0;

import "./Mock.sol";


contract MockPolicy is Mock {

    function rebase(uint256 _storedCurrentRate, uint256 _storedTargetRate)
        external
        returns (uint256)
    {
        // prevent compiler warnings about unused vars
        _storedCurrentRate;
        _storedTargetRate;
        emit FunctionCalled("Policy", "rebase", msg.sender);
        return 0;
    }

    function setOrchestrator(address _orchestrator)
        external
        pure
    {
        _orchestrator;
    }
}
