const Bank = () => {
    const getBankBalance = () => Number(document.getElementById('bank-balance').innerHTML);
    const setBankBalance = () => document.getElementById('bank-balance').innerHTML = bankBalance;

    const getLoanBalance = () => Number(document.getElementById('loan-balance').innerHTML);
    const setLoanBalance = () => document.getElementById('loan-balance').innerHTML = loanBalance;

    const hideLoanBalance = () => {
        if (loanBalance > 0) {
            document.getElementById('loan-balance-paragraph').style.display = '';
        } else {
            document.getElementById('loan-balance-paragraph').style.display = 'none';
        }
    }

    const getLoanButton = () => {
        loanButton = document.getElementById('loan-button');
        if (loanBalance > 0) {
            loanButton.setAttribute('onclick', 'Bank().payLoan()');
            loanButton.innerHTML = 'Pay loan!';
        } else {
            loanButton.setAttribute('onclick', 'Bank().getLoan()');
            loanButton.innerHTML = 'Get loan!';
        }
    }

    const addBankBalance = (amount) => {
        bankBalance += amount;
        setBankBalance();
    }

    const addLoanBalance = (amount) => {
        loanBalance += amount;
        setLoanBalance();
    }

    const getLoan = () => {
        const amount = Number(prompt(`Enter the amount of loan: \nMax amount of loan is ${bankBalance * 2}`));
        if (amount == null || amount == "" || isNaN(amount)) {
            console.log('no loan I see');
            return;
        }
        // see if the loan is smaller that 0 and bigger that 2*bankbaBance
        if (amount <= 0 || amount > 2 * bankBalance) {
            console.log('loan out of range');
            return
        }
        setLoan(amount);
    }

    const payLoan = () => {
        const amount = Number(prompt('Repayment of loan. Amount: '));
        if (amount == null || amount == "" || isNaN(amount) || amount <= 0) {
            return;
        }
        /**
         * mimimun of what
         *  we want to payback,
         *  what we are able to pay back
         *  and what we should payback
         */
        const payment = Math.min(amount, bankBalance, loanBalance);
        setLoan(-payment)
    }

    const setLoan = (amount) => {
        // Update bank and loan balance
        addBankBalance(amount);
        addLoanBalance(amount);
        // update shown buttons
        getLoanButton();
        hideLoanBalance();
    }

    const moveToBank = () => {
        const amount = Work().getWorkBalance();
        if (amount < 0) {
            return false;
        }
        if (loanBalance > 0) {
            const loanPayment = Number((amount * 0.1).toFixed(2));
            if (loanPayment < loanBalance) {
                setLoan(-loanPayment);
            } else {
                setLoan(-loanBalance);
            }
        }
        addBankBalance(amount);
        Work().resetBalance();
        return true;
    }

    let bankBalance = getBankBalance();
    let loanBalance = getLoanBalance();

    getLoanButton();
    hideLoanBalance();

    return {
        getBankBalance,
        getLoanBalance,
        getLoan,
        payLoan,
        moveToBank,
    };
}

Bank();