
pragma solidity 0.5.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WEth is ERC20 {
  string public name = "Wrapped Eth";
  string public symbol = "WETH";
  uint8  public decimals = 18;

  event Deposit(address indexed sender, uint256 amount);
  event Withdrawal(address indexed recipient, uint256 amount);

  function deposit() public payable {
    _mint(msg.sender, msg.value);
    emit Deposit(msg.sender, msg.value);
  }

  function withdraw(uint amount) public {
    require(balanceOf(msg.sender) >= amount);
    address payable recipient = msg.sender;
    _burn(msg.sender, amount);
    recipient.transfer(amount);
    emit Withdrawal(recipient, amount);
  }

  function withdraw(uint amount, address payable recipient) public {
    require(balanceOf(msg.sender) >= amount);
    recipient.transfer(amount);
    _burn(msg.sender, amount);
    emit Withdrawal(recipient, amount);
  }
}