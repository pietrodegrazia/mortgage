import { getCurrency } from 'locale-currency';

const LocalizedCurrency = ({ value, locale }) => {
  const formatter = Intl.NumberFormat(locale, { style: 'currency', currency: getCurrency(locale)})
  return formatter.format(value)
};

export default LocalizedCurrency;