import CovidService from './ServiceComponent';

const covidStat = new CovidService();

const covidStatState = [];

const globalState = {};

const countriesStat = covidStat.getAllCases().then((body) => body.Countries);

const newConfirmed = covidStat.getAllCases().then((body) => body.Global.NewConfirmed);

const newDeaths = covidStat.getAllCases().then((body) => body.Global.NewDeaths);

const newRecovered = covidStat.getAllCases().then((body) => body.Global.NewRecovered);

const totalConfirmed = covidStat.getAllCases().then((body) => body.Global.TotalConfirmed);

const totalDeaths = covidStat.getAllCases().then((body) => body.Global.TotalDeaths);

const totalRecovered = covidStat.getAllCases().then((body) => body.Global.TotalRecovered);

const countryFlag = covidStat.getAllCountriesPopulationAndFlags().then((body) => {
  const flags = body.map((item) => item.flag);
  return flags;
});

const countryPopulation = covidStat.getAllCountriesPopulationAndFlags().then((body) => {
  const population = body.map((item) => item.population);
  return population;
});

globalState.newConfirmed = newConfirmed;
globalState.newDeaths = newDeaths;
globalState.newRecovered = newRecovered;
globalState.totalConfirmed = totalConfirmed;
globalState.totalDeaths = totalDeaths;
globalState.totalRecovered = totalRecovered;

covidStatState.push(countriesStat);
covidStatState.push(countryFlag);
covidStatState.push(countryPopulation);
covidStatState.push(globalState);
console.log(covidStatState);

export default covidStatState;
