/* eslint-disable no-unused-vars */
// Global functions

const createElement = (type) => document.createElement(type);

const getElementById = id => document.getElementById(id);

const setAttributeById = (id, attribute, attributeValue) => {
  getElementById(id).setAttribute(attribute, attributeValue);
};

const setInnerHTMLById = (id, value) => {
  getElementById(id).innerHTML = value;
};

const createRowElement = (text, type, table) => {
  const row = createElement('tr');
  const dataRow = createElement(type);
  dataRow.innerHTML = text;
  row.appendChild(dataRow);
  table.appendChild(row);
};

const createSpan = (parent, text, className, id) => {
  const span = createElement('span');
  span.innerHTML = text;
  if (className) {
    span.className = className;
  }
  if (id) {
    span.id = id;
  }
  parent.appendChild(span);
};

const createButton = (parent, onClickFunction, buttonText) => {
  const button = createElement('button');
  button.setAttribute('onclick', onClickFunction);
  button.innerHTML = buttonText;
  parent.appendChild(button);
};

const clearChildNodes = (parent) => {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.childNodes[0]);
  }
};
