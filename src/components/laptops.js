const data = [
  {
    id: 0,
    name: 'Laptop1',
    price: 100,
    description: 'Not so good laptops',
    features: [
      'First feature1',
      'second1',
      'third1'
    ],
    image: 'https://www.gigantti.fi/image/dv_web_D180001002572241/208108/hp-pavilion-15-eh0832no-156-kannettava-sininen.jpg?$fullsize$'
  },
  {
    id: 1,
    name: 'Laptop2',
    price: 200,
    description: 'Meh...',
    features: [
      'First feature2',
      'second2',
      'third2'
    ],
    image: 'imagelink'
  },
  {
    id: 2,
    name: 'Laptop3',
    price: 300,
    description: 'Ok',
    features: [
      'First feature3',
      'second3',
      'third3'
    ],
    image: 'imagelink'
  },
  {
    id: 3,
    name: 'Laptop4',
    price: 400,
    description: 'Like apple, but banana',
    features: [
      'First feature4'
    ],
    image: 'imagelink'
  },
  {
    id: 4,
    name: 'Laptop5',
    price: 500,
    description: 'Like apple, but better',
    features: [],
    image: 'imagelink'
  }
];

let chosenLaptop = data[0];

const setLaptopInfo = () => {
  const setImage = () => {
    setAttributeById('info-image', 'src', chosenLaptop.image);
  };

  const setName = () => {
    setInnerHTMLById('info-name', chosenLaptop.name);
  };

  const setDescription = () => {
    setInnerHTMLById('info-description', chosenLaptop.description);
  };

  const setPrice = () => {
    setInnerHTMLById('info-price-span', chosenLaptop.price);
  };

  const setBuyButton = () => {
    setAttributeById('info-buy', 'onclick', 'Bank().buyLaptop()');
  };

  const updateInformation = () => {
    setImage();
    setDescription();
    setName();
    setPrice();
  };

  updateInformation();
  setBuyButton();
};

const Laptops = () => {
  const selectOptions = getElementById('select-options');
  selectOptions.setAttribute('onchange', 'Laptops().choose()');

  const chosenOptionIndex = () => {
    const selectedOptionIndex = selectOptions.selectedIndex;
    return selectedOptionIndex === -1 ? 0 : selectedOptionIndex;
  };

  chosenLaptop = data[chosenOptionIndex()];

  const creteOption = (laptop, index) => {
    const option = document.createElement('option');
    if (index === 0) {
      option.setAttribute('selected', '');
    }
    option.text = laptop.name;
    selectOptions.options.add(option, laptop.id);
  };

  const addOptions = () => {
    data.forEach((laptop, index) => creteOption(laptop, index));
  };

  const updateOptions = () => {
    clearChildNodes(selectOptions);
    addOptions();
  };

  const featureTable = getElementById('feature-table');

  const addRowHeadingData = (text) => {
    createRowElement(text, 'th', featureTable);
  };

  const addRowData = (feature) => {
    createRowElement(feature, 'td', featureTable);
  };

  const addRows = () => {
    const { features: laptopFeatures } = chosenLaptop;
    if (!laptopFeatures || (laptopFeatures.length < 1)) {
      addRowHeadingData('No features');
      return;
    }
    addRowHeadingData('Features!');
    laptopFeatures.forEach(feature => addRowData(feature));
  };

  const updateFeatureList = () => {
    clearChildNodes(featureTable);
    addRows();
  };

  if (selectOptions.options.length !== data.length) {
    updateOptions();
  }
  updateFeatureList();
  setLaptopInfo();

  return {
    choose: chosenOptionIndex
  };
};
Laptops();
