// USD to CAD 10
// 10 USD is worth 15 CAD. You can spend these in the following countries:

const axios = require( "axios" );

const getExchangeRate = ( from, to ) => {
  return axios.get( "http://openexchangerates.org/api/latest.json?app_id=6fa190f2359f4311854b2a68723828c9" )
    .then( ( response ) => {
      return response.data.rates[ to ];
    } );
};

const getCountries = ( currencyCode ) => {
  return axios.get( `https://restcountries.eu/rest/v2/currency/${currencyCode}` ).then( ( response ) => {
    return response.data.map( ( country ) => country.name );
  } );
};

const convertCurrency = ( from, to, amount ) => {

  let countries;
  return getCountries( to ).then( ( tempCountries ) => {
    countries = tempCountries;
    return getExchangeRate( from, to ).then( ( rate ) => {
      const exchangedAmount = amount * rate;
      return `${amount} ${from} is worth ${exchangedAmount} ${to}. You can spend these in the following countries: ${countries.join( ", " )}`;
    } );
  } );

};

const convertCurrencyAlt = async ( from, to, amount ) => {

  const countries = await getCountries( to );
  const rate = await getExchangeRate(from, to );

  const exchangedAmount = amount * rate;
  return `${amount} ${from} is worth ${exchangedAmount} ${to}. You can spend these in the following countries: ${countries.join( ", " )}`;

};

convertCurrencyAlt( "USD", "INR", 10 ).then( ( message ) => {
  console.log( message );
} );