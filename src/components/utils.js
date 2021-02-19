const clearChildNodes = (parent) => {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.childNodes[0]);
  }
};

const createRowElement = (text, type, table) => {
  const row = document.createElement('tr');
  const dataRow = document.createElement(type);
  dataRow.innerHTML = text;
  row.appendChild(dataRow);
  table.appendChild(row);
};

const getElementById = id => document.getElementById(id);

const setAttributeById = (id, attribute, attributeValue) => {
  getElementById(id).setAttribute(attribute, attributeValue);
};

const createButton = (parent, onClickFunction, buttonText) => {
  const button = document.createElement('button');
  button.setAttribute('onclick', onClickFunction);
  button.innerHTML = buttonText;
  parent.appendChild(button);
};

const checkNotValidArgument = (variable) => {
  return variable == null || variable === undefined || variable === '' || Number.isNaN(variable);
};
