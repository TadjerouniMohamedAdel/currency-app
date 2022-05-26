import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Chart from 'react-apexcharts';

import './styles.css';

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
  const [from, setFrom] = React.useState('EURO');
  const [to, setTo] = React.useState('USD');
  const [fromAmount, setFromAmount] = React.useState(1);
  const [toAmount, setToAmount] = React.useState(0.6);

  return (
    <div className="converter-container">
      <div className="operating-side">
        <span>1 United States Dollar equals </span>
        <span>0.96 Euro</span>
        <span>May 12, 13:16 UTC - Disclaimer</span>
        <form action="">
          <div className="convert-from">
            <Form.Control
              type="text"
              value={fromAmount}
              onChange={(e) => setFromAmount(parseFloat(e.target.value))}
            />
            <Form.Select
              aria-label="Default select example"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              <option>Open this select menu</option>
              <option value="USD">USD</option>
              <option value="EURO">EURO</option>
            </Form.Select>
          </div>
          <div className="convert-from">
            <Form.Control
              type="text"
              value={toAmount}
              onChange={(e) => setToAmount(parseFloat(e.target.value))}
            />
            <Form.Select
              aria-label="Default select example"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              <option>Open this select menu</option>
              <option value="USD">USD</option>
              <option value="EURO">EURO</option>
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
