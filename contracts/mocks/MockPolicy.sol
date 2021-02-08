// SPDX-License-Identifier: ISC

pragma solidity ^0.6.0;

import "./Mock.sol";


contract MockUFragmentsPolicy is Mock {

    function rebase()
        external
        returns (uint256)
    {
        emit FunctionCalled("UFragmentsPolicy", "rebase", msg.sender);
        return 0;
    }
}
