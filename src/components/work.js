let workBalance = 0;
const Work = () => {
  const setBalance = () => { setInnerHTMLById('work-balance', workBalance); };

  const setWorkButton = () => {
    setAttributeById('work-button', 'onclick', 'Work().work()');
  };

  const setBankButton = () => {
    setAttributeById('bank-button', 'onclick', 'Bank().moveToBank()');
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
    resetBalance
  };
};
Work();
