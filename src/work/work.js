const Work = () => {
  const getWorkBalance = () => Number(document.getElementById('work-balance').innerHTML);

  let workBalance = getWorkBalance();

  const setBalance = () => { document.getElementById('work-balance').innerHTML = workBalance; };

  const setWorkButton = () => {
    const workButton = document.getElementById('work-button');
    workButton.setAttribute('onclick', 'Work().work()');
  };

  const setBankButton = () => {
    const bankButton = document.getElementById('bank-button');
    bankButton.setAttribute('onclick', 'Bank().moveToBank()');
  };

  const addWorkBalance = (amount) => {
    workBalance += amount;
    setBalance();
  };

  const work = () => addWorkBalance(100);

  const resetBalance = () => {
    workBalance = 0;
    setBalance();
  };

  setWorkButton();
  setBankButton();

  return {
    work,
    getWorkBalance,
    resetBalance
  };
};
Work();
