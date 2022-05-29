import React from 'react';
import { getSymboles } from '../services';

const useGetCurrencies = () => {
  const [currencies, setCurrencies] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    getSymboles()
      .finally(() => {
        setIsLoading(false);
      })
      .then((data) => setCurrencies(data.symbols ?? []));
  }, []);

  return { currencies, isLoading };
};

export default useGetCurrencies;
