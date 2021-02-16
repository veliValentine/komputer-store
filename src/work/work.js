const Work = () => {
    const getWorkBalance = () => Number(document.getElementById('work-balance').innerHTML);
    const setBalance = () => document.getElementById('work-balance').innerHTML = workBalance;

    const work = () => addWorkBalance(100);

    const addWorkBalance = (amount) => {
        if (amount < 0) {
            setBalance();
            return;
        }
        workBalance += amount;
        setBalance();
    }

    const resetBalance = () => {
        workBalance = 0;
        setBalance();
    }

    const moveToBank = () => {
        if (Bank().moveToBank(workBalance)) {
            resetBalance();
        }
    }

    let workBalance = getWorkBalance();

    const workButton = document.getElementById('work-button');
    workButton.setAttribute('onclick', 'Work().work()');

    const bankButton = document.getElementById('bank-button');
    bankButton.setAttribute('onclick', 'Work().moveToBank()');
    return {
        work,
        resetBalance,
        moveToBank,
    }
}
Work();