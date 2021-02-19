let bankBalance = 0;
let loanBalance = 0;

let hasLaptop = false;
let firstLoan = false;

const Bank = () => {
  const setBankBalance = () => { setInnerHTMLById('bank-balance', bankBalance); };

  const setLoanBalance = () => {
    const loanbalanceParagraph = getElementById('loan-balance-paragraph');
    clearChildNodes(loanbalanceParagraph);
    if (loanBalance > 0) {
      createSpan(loanbalanceParagraph, 'Loan: ');
      createSpan(loanbalanceParagraph, loanBalance, 'balance', 'loan-balance');
      createSpan(loanbalanceParagraph, '€');
    }
  };

  const canNotGetSecondLoan = () => firstLoan && !hasLaptop;

  const getLoanButton = () => {
    const bankLoanButtonsContainer = getElementById('bank-buttons-container');
    const workLoanButtonContainer = getElementById('work-loan-button-container');
    clearChildNodes(bankLoanButtonsContainer);
    clearChildNodes(workLoanButtonContainer);
    if (loanBalance > 0) {
      // Loan payback buttons
      createButton(bankLoanButtonsContainer, 'Bank().payLoan()', 'Pay loan!');
      createButton(workLoanButtonContainer, 'Bank().moveToLoan()', 'Payback loan');
    } else if (!canNotGetSecondLoan()) {
      // get loan button for first loan or when we already have a laptop
      if (bankBalance > 0) {
        createButton(bankLoanButtonsContainer, 'Bank().getLoan()', 'Get loan!');
      }
    }
  };

  const addBankBalance = (amount) => {
    bankBalance += amount;
    setBankBalance();
    getLoanButton();
  };

  const addLoanBalance = (amount) => {
    loanBalance += amount;
    setLoanBalance();
    // update shown buttons
    getLoanButton();
  };

  const addLoanAndBalance = (amount) => {
    // Update bank and loan balance
    addBankBalance(amount);
    addLoanBalance(amount);
  };

  const getLoan = () => {
    if (canNotGetSecondLoan()) {
      console.log('Buy a laptop to get second loan');
      return;
    }
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
    firstLoan = true;
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
      hasLaptop = true;
    } else {
      alert('Not enough money in the bank');
    }
    getLoanButton();
  };

  getLoanButton();
  setLoanBalance();

  return {
    getLoan,
    payLoan,
    moveToBank,
    moveToLoan,
    buyLaptop
  };
};

Bank();
