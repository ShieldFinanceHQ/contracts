// SPDX-License-Identifier: ISC

pragma solidity ^0.6.0;

import "./Mock.sol";
import "../lib/UInt256LibUpgradeable.sol";

contract UInt256LibMock is Mock {
    function toInt256Safe(uint256 a)
        external
        returns (int256)
    {
        int256 result = UInt256LibUpgradeable.toInt256Safe(a);
        emit ReturnValueInt256(result);
        return result;
    }
}
