let bankBalance = 0;
let loanBalance = 0;
const Bank = () => {
  const setBankBalance = () => { document.getElementById('bank-balance').innerHTML = bankBalance; };
  const setLoanBalance = () => { document.getElementById('loan-balance').innerHTML = loanBalance; };

  const hideLoanBalance = () => {
    if (loanBalance > 0) {
      document.getElementById('loan-balance-paragraph').style.display = '';
    } else {
      document.getElementById('loan-balance-paragraph').style.display = 'none';
    }
  };

  const setLoanButton = (onClickFunction, buttonText) => {
    const bankLoanButton = document.getElementById('loan-button');
    bankLoanButton.setAttribute('onclick', onClickFunction);
    bankLoanButton.innerHTML = buttonText;
  };

  const clearChildNodes = (parent) => {
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.childNodes[0]);
    }
  };

  const createLoanPaybackButton = (parent) => {
    if (parent.hasChildNodes()) {
      return;
    }
    const button = document.createElement('button');
    button.setAttribute('onclick', 'Bank().moveToLoan()');
    button.innerHTML = 'Payback loan';
    parent.appendChild(button);
  };

  const getLoanButton = () => {
    const workLoanButtonContainer = document.getElementById('work-loan-button-container');
    if (loanBalance > 0) {
      setLoanButton('Bank().payLoan()', 'Pay loan!');
      createLoanPaybackButton(workLoanButtonContainer);
    } else {
      setLoanButton('Bank().getLoan()', 'Get loan!');
      clearChildNodes(workLoanButtonContainer);
    }
  };

  const addBankBalance = (amount) => {
    bankBalance += amount;
    setBankBalance();
  };

  const addLoanBalance = (amount) => {
    loanBalance += amount;
    setLoanBalance();
    // update shown buttons
    getLoanButton();
    hideLoanBalance();
  };

  const addLoanAndBalance = (amount) => {
    // Update bank and loan balance
    addBankBalance(amount);
    addLoanBalance(amount);
  };

  const checkNotValidArgument = (variable) => {
    return variable == null || variable === undefined || variable === '' || Number.isNaN(variable);
  };

  const getLoan = () => {
    if (loanBalance > 0) {
      console.log('Already have a loan');
      return;
    }
    const amount = Number(prompt(`Enter the amount of loan: \nMax amount of loan is ${bankBalance * 2}`));
    if (checkNotValidArgument(amount)) {
      console.log('no loan I see');
      return;
    }
    // see if the loan is smaller that 0 and bigger that 2*bankbaBance
    if (amount <= 0 || amount > 2 * bankBalance) {
      console.log('loan out of range');
      return;
    }
    addLoanAndBalance(amount);
  };

  const payLoan = () => {
    const amount = Number(prompt('Repayment of the loan.\nEnter repayment amount: '));
    if (checkNotValidArgument(amount) || amount <= 0) {
      return;
    }
    /**
     * mimimun of what
     *  we want to payback,
     *  what we are able to pay back
     *  and what we should payback
     */
    const payment = Math.min(amount, bankBalance, loanBalance);
    addLoanAndBalance(-payment);
  };

  const moveToBank = () => {
    if (workBalance < 0) {
      return false;
    }
    if (loanBalance > 0) {
      // Payback 10% of work balance to loan
      const loanPayment = Math.min(loanBalance, Number((workBalance * 0.1).toFixed(2)));
      addLoanAndBalance(-loanPayment);
    }
    addBankBalance(workBalance);
    Work().resetBalance();
    return true;
  };

  const moveToLoan = () => {
    if (workBalance < 0 || loanBalance < 0) {
      return false;
    }
    if (workBalance > loanBalance) {
      addBankBalance(workBalance - loanBalance);
    }
    const payback = Math.min(loanBalance, workBalance);
    addLoanBalance(-payback);
    Work().resetBalance();
    return true;
  };

  const buyLaptop = () => {
    const price = chosenLaptop.price;
    if (price <= bankBalance) {
      addBankBalance(-price);
      alert(`${chosenLaptop.name} bought`);
    } else {
      alert('Not enough money in the bank');
    }
  };

  getLoanButton();
  hideLoanBalance();

  return {
    getLoan,
    payLoan,
    moveToBank,
    moveToLoan,
    buyLaptop
  };
};

Bank();
