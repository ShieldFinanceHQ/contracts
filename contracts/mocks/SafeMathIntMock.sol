// SPDX-License-Identifier: ISC

pragma solidity ^0.6.0;

import "./Mock.sol";
import "../lib/SafeMathIntUpgradeable.sol";

contract SafeMathIntMock is Mock {
    function mul(int256 a, int256 b)
        external
        returns (int256)
    {
        int256 result = SafeMathIntUpgradeable.mul(a, b);
        emit ReturnValueInt256(result);
        return result;
    }

    function div(int256 a, int256 b)
        external
        returns (int256)
    {
        int256 result = SafeMathIntUpgradeable.div(a, b);
        emit ReturnValueInt256(result);
        return result;
    }

    function sub(int256 a, int256 b)
        external
        returns (int256)
    {
        int256 result = SafeMathIntUpgradeable.sub(a, b);
        emit ReturnValueInt256(result);
        return result;
    }

    function add(int256 a, int256 b)
        external
        returns (int256)
    {
        int256 result = SafeMathIntUpgradeable.add(a, b);
        emit ReturnValueInt256(result);
        return result;
    }

    function abs(int256 a)
        external
        returns (int256)
    {
        int256 result = SafeMathIntUpgradeable.abs(a);
        emit ReturnValueInt256(result);
        return result;
    }
}
