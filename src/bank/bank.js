const Bank = () => {
  const getBankBalance = () => Number(document.getElementById('bank-balance').innerHTML);
  const getLoanBalance = () => Number(document.getElementById('loan-balance').innerHTML);

  let bankBalance = getBankBalance();
  let loanBalance = getLoanBalance();

  const setBankBalance = () => { document.getElementById('bank-balance').innerHTML = bankBalance; };
  const setLoanBalance = () => { document.getElementById('loan-balance').innerHTML = loanBalance; };

  const hideLoanBalance = () => {
    if (loanBalance > 0) {
      document.getElementById('loan-balance-paragraph').style.display = '';
    } else {
      document.getElementById('loan-balance-paragraph').style.display = 'none';
    }
  };

  const getLoanButton = () => {
    const loanButton = document.getElementById('loan-button');
    if (loanBalance > 0) {
      loanButton.setAttribute('onclick', 'Bank().payLoan()');
      loanButton.innerHTML = 'Pay loan!';
    } else {
      loanButton.setAttribute('onclick', 'Bank().getLoan()');
      loanButton.innerHTML = 'Get loan!';
    }
  };

  const addBankBalance = (amount) => {
    bankBalance += amount;
    setBankBalance();
  };

  const addLoanBalance = (amount) => {
    loanBalance += amount;
    setLoanBalance();
  };

  const addLoanAndBalance = (amount) => {
    // Update bank and loan balance
    addBankBalance(amount);
    addLoanBalance(amount);
    // update shown buttons
    getLoanButton();
    hideLoanBalance();
  };

  const getLoan = () => {
    const amount = Number(prompt(`Enter the amount of loan: \nMax amount of loan is ${bankBalance * 2}`));
    if (amount === null || amount === '' || Number.isNaN(amount)) {
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
    if (amount === null || amount === '' || Number.isNaN(amount) || amount <= 0) {
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
    const amount = Work().getWorkBalance();
    if (amount < 0) {
      return false;
    }
    if (loanBalance > 0) {
      // minimum loanpayback between loanBalance and minimum payment from salary
      const loanPayment = Math.min(loanBalance, Number((amount * 0.1).toFixed(2)));
      addLoanAndBalance(-loanPayment);
    }
    addBankBalance(amount);
    Work().resetBalance();
    return true;
  };

  const moveToLoan = () => {
    const amount = Work.getWorkBalance();
    if (amount < 0) {
      return false;
    }
    if (amount > loanBalance) {
      addBankBalance(amount - loanBalance);
    }
    const payback = Math.min(loanBalance, amount);
    addLoanAndBalance(-payback);
    Work.resetBalance();
    return true;
  };

  getLoanButton();
  hideLoanBalance();

  return {
    getBankBalance,
    getLoanBalance,
    getLoan,
    payLoan,
    moveToBank,
    moveToLoan
  };
};

Bank();
