const myHeaders = new Headers();
myHeaders.append('apikey', process.env.REACT_APP_API_KEY!);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

export const getSymboles = () =>
  fetch('https://api.apilayer.com/exchangerates_data/symbols', requestOptions)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);

export const convert = (from: string, to: string, amount: number) =>
  fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);

export const convert2 = (from: string, to: string, amount: number) =>
  fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
