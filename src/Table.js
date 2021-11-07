import React from 'react';

import LocalizedString from './LocalizedString';

const Table = ({ payments, locale, className }) => {
  let output = payments
    .filter((year, i) => i > 0 && (year.balance > 0 || year.interestYearly > 0))
    .reduce(
      (acc, year, index) => ({
        interestTotal: acc.interestTotal + year.interestYearly,
        overpaymentTotal: acc.overpaymentTotal + year.overpayment,
        rows: [
          ...acc.rows,
          [
            year.partial ? year.partial + 'm' : index + 1,
            Math.round(year.interestYearly || 0),
            Math.round(year.overpayment),
            Math.round(year.balance)
          ]
        ]
      }),
      { interestTotal: 0, overpaymentTotal: 0, rows: [] }
    );

  return (
    <table className={className}>
      <thead>
        <tr>
          <th>{<LocalizedString id="mortgage_years" locale={locale}/>}</th>
          <th>{<LocalizedString id="mortgage_interest" locale={locale}/>}</th>
          <th>{<LocalizedString id="overpayment" locale={locale}/>}</th>
          <th>{<LocalizedString id="mortgage_balance" locale={locale}/>}</th>
        </tr>
      </thead>
      <tbody>
        {output.rows.map((row, index) => (
          <tr key={index}>
            {row.map((d, i) => (
              <td key={i}>{d.toLocaleString(locale)}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>
            {Math.round(output.interestTotal).toLocaleString(locale)}
          </td>
          <td>{Math.round(output.overpaymentTotal).toLocaleString(locale)}</td>
          <td />
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;