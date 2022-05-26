import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Chart from 'react-apexcharts';

import './styles.css';
import { convert, getSymboles } from '../../services';

const options = {
  chart: {},
  colors: ['#34a853', '#4fb36a', '#b9e1c4', '#d6eddc', '#eaf6ee'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
  grid: {
    borderColor: '#8b9fa359',
    borderWidth: 1,
    clipMarkers: false,
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      '01 Jan',
      '02 Jan',
      '03 Jan',
      '04 Jan',
      '05 Jan',
      '06 Jan',
      '07 Jan',
    ],
  },
};
const series = [
  {
    name: 'Series 1',
    data: [45, 52, 38, 45, 19, 23, 2],
  },
];

const Converter = () => {
  const [filter, setFilter] = React.useState<'1Y' | '1M'>('1M');
  const [from, setFrom] = React.useState('EUR');
  const [to, setTo] = React.useState('USD');
  const [fromAmount, setFromAmount] = React.useState(1);
  const [toAmount, setToAmount] = React.useState(0);
  const [amountToConvert, setAmountToConvert] = React.useState(fromAmount);
  const [fieldToConvert, setFieldToConvert] = React.useState<'from' | 'to'>(
    'from'
  );
  const [currencies, setCurrencies] = React.useState({});

  React.useEffect(() => {
    getSymboles().then((data) => setCurrencies(data.symbols ?? []));
  }, []);

  React.useEffect(() => {
    convert(from, to, amountToConvert).then((data) =>
      fieldToConvert === 'from'
        ? setToAmount(data.result)
        : setFromAmount(data.result)
    );
  }, [amountToConvert, from, to]);

  return (
    <div className="converter-container">
      <div className="operating-side">
        <span>1 United States Dollar equals </span>
        <span>0.96 Euro</span>
        <span>May 12, 13:16 UTC - Disclaimer</span>
        <form action="">
          <div className="convert-from">
            <Form.Control
              type="number"
              value={fromAmount}
              onChange={(e) => {
                setFromAmount(
                  e.target.value !== '' ? parseFloat(e.target.value) : 0
                );
                setFieldToConvert('from');
                setAmountToConvert(
                  e.target.value !== '' ? parseFloat(e.target.value) : 0
                );
              }}
            />
            <Form.Select
              aria-label="Default select example"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              <option>Open this select menu</option>
              {Object.keys(currencies).map((currency) => (
                <option key={`from-${currency}`} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="convert-from">
            <Form.Control
              type="number"
              value={toAmount}
              onChange={(e) => {
                setToAmount(
                  e.target.value !== '' ? parseFloat(e.target.value) : 0
                );
                setFieldToConvert('to');
                setAmountToConvert(
                  e.target.value !== '' ? parseFloat(e.target.value) : 0
                );
              }}
            />
            <Form.Select
              aria-label="Default select example"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              <option>Open this select menu</option>
              {Object.keys(currencies).map((currency) => (
                <option key={`to-${currency}`} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </div>
        </form>
      </div>
      <div className="chart-side">
        <div className="filter-switcher">
          <Button
            className={`filter-button ${filter === '1M' && 'active'}`}
            onClick={() => setFilter('1M')}
          >
            1M
          </Button>
          <Button
            className={`filter-button ${filter === '1Y' && 'active'}`}
            onClick={() => setFilter('1Y')}
          >
            1Y
          </Button>
        </div>
        <Chart options={options} series={series} type="area" />
      </div>
    </div>
  );
};

export default Converter;
