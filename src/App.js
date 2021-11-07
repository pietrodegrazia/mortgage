import React, { useState } from 'react';

import './App.css';

import Table from './Table';
import Chart from './Chart';
import calculate from './calculations';
import LocalizedString from './LocalizedString';
import LocalizedCurrency from './LocalizedCurrency';
import LocaleSelector from './LocaleSelector';

const defaultOverpayment = { month: '1', year: '0', amount: '0' };
const defaultLocale = navigator.language || navigator.userLanguage || 'en-US';

const App = () => {
  const [initial, setInitial] = useState('200000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('25');
  const [monthlyOverpayment, setMonthlyOverpayment] = useState('0');
  const [overpayments, setOverpayments] = useState([defaultOverpayment]);
  const [locale, setLocale] = useState(defaultLocale);

  const updateOverpayment = index => ({ target }) =>
    setOverpayments(
      overpayments.map((overpayment, i) =>
        i === index
          ? { ...overpayment, [target.name]: target.value }
          : overpayment
      )
    );

  const { monthlyPayment, payments } = calculate(
    +initial,
    +years,
    +rate,
    +monthlyOverpayment,
    overpayments
  );

  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <div className="navbar-brand">{<LocalizedString id="app_name" locale={locale}/>}</div>
          <LocaleSelector
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
          />
        </div>
      </nav>
      <div className="container-fluid">
        <div className="col-md-8 col-sm-12">
          <div className="col-sm-4">
            <div>
              <h2>{<LocalizedString id="initial_payment" locale={locale}/>}</h2>
              <label>{<LocalizedString id="mortgage_amount" locale={locale}/>}</label>
              <input
                maxLength={7}
                value={initial}
                onChange={e => setInitial(e.target.value)}
              />
            </div>
            <div>
              <label>{<LocalizedString id="mortgage_years" locale={locale}/>}</label>
              <input
                type="number"
                maxLength={2}
                value={years}
                onChange={e => setYears(e.target.value)}
              />
            </div>
            <div>
              <label>{<LocalizedString id="mortgage_rate" locale={locale}/>}</label>
              <input
                type="number"
                step={0.1}
                value={rate}
                onChange={e => setRate(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-8">
            <div>
              <h2>{<LocalizedString id="overpayment" locale={locale}/>}</h2>
              <label>{<LocalizedString id="monthly" locale={locale}/>}</label>
              <input
                type="number"
                maxLength={5}
                value={monthlyOverpayment}
                onChange={e => setMonthlyOverpayment(e.target.value)}
              />
            </div>
            <div>
              <label>{<LocalizedString id="overpayment_year" locale={locale}/>}</label>
              <label>{<LocalizedString id="overpayment_month" locale={locale}/>}</label>
              <label>{<LocalizedString id="overpayment_amount" locale={locale}/>}</label>
            </div>
            {overpayments.map(({ year, month, amount }, i) => (
              <div key={i}>
                <input
                  type="number"
                  min="0"
                  max={years}
                  value={year}
                  name="year"
                  onChange={updateOverpayment(i)}
                />
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  name="month"
                  onChange={updateOverpayment(i)}
                />
                <input
                  type="text"
                  value={amount}
                  name="amount"
                  onChange={updateOverpayment(i)}
                />

                {i === overpayments.length - 1 ? (
                  <button
                    className="btn btn-xs"
                    onClick={() =>
                      setOverpayments([...overpayments, defaultOverpayment])
                    }
                  >
                    +
                  </button>
                ) : (
                  <button
                    className="btn btn-xs"
                    onClick={() =>
                      setOverpayments(overpayments.filter((_, j) => j !== i))
                    }
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="col-sm-12">
            <h2>
              {<LocalizedString id="monthly_payment" locale={locale}/>}
              <span className="money">
                {<LocalizedCurrency value={(+monthlyOverpayment + monthlyPayment)} locale={locale}/>}
              </span>
            </h2>
            <Chart payments={payments} locale={locale} />
          </div>
        </div>
        <Table className="col-sm-4" payments={payments} locale={locale} />
      </div>
    </div>
  );
};

export default App;