/* eslint-disable max-len */
import CovidService from './ServiceComponent';

const covidStatState = () => {
  const service = new CovidService();

  async function updateStatisctic() {
    const state = { current: 0 };
    const countriesStat = [];
    let flagsArray;
    let countriesArray;
    await service
      .getAllCountriesPopulationAndFlags()
      .then((response) => {
        const populationArray = response.map((item) => item.population);
        const population = populationArray.reduce((cur, next) => cur += next);
        flagsArray = response.map((item) => item.flag);
        countriesArray = response.map((item) => item.name);
        state.population = population;
        for (let i = 0; i < countriesArray.length; i++) {
          const obj = {
            flag: flagsArray[i],
            country: countriesArray[i],
            population: populationArray[i],
          };
          countriesStat.push(obj);
        }
      })
      .then(async () => {
        await service
          .getAllCases()
          .then((response) => {
            state.countriesStat = [];
            const sortedArrayOfCoyntries = countriesStat.filter((item) => response.Countries.some((elem) => item.country === elem.Country));
            const sortedArrayOfStat = response.Countries.filter((item) => sortedArrayOfCoyntries.some((elem) => item.Country === elem.country));
            for (let i = 0; i < sortedArrayOfStat.length; i++) {
              const obj = {
                id: i,
                flag: sortedArrayOfCoyntries[i].flag,
                country: sortedArrayOfCoyntries[i].country,
                population: sortedArrayOfCoyntries[i].population,
                TotalConfirmed: sortedArrayOfStat[i].TotalConfirmed,
                TotalDeaths: sortedArrayOfStat[i].TotalDeaths,
                TotalRecovered: sortedArrayOfStat[i].TotalRecovered,
                NewConfirmed: sortedArrayOfStat[i].NewConfirmed,
                NewDeaths: sortedArrayOfStat[i].NewDeaths,
                NewRecovered: sortedArrayOfStat[i].NewRecovered,
                GlobalCasesPer100Thousand: Math.ceil(sortedArrayOfStat[i].TotalConfirmed / (sortedArrayOfCoyntries[i].population / 100000)),
                GlobalRecoveredPer100Thousand: Math.ceil(sortedArrayOfStat[i].TotalRecovered / (sortedArrayOfCoyntries[i].population / 100000)),
                GlobalDeathesPer100Thousand: Math.ceil(sortedArrayOfStat[i].TotalDeaths / (sortedArrayOfCoyntries[i].population / 100000)),
                NewGlobalCasesPer100Thousand: Math.ceil(sortedArrayOfStat[i].NewConfirmed / (sortedArrayOfCoyntries[i].population / 100000)),
                NewGlobalRecoveredPer100Thousand: Math.ceil(sortedArrayOfStat[i].NewRecovered / (sortedArrayOfCoyntries[i].population / 100000)),
                NewGlobalDeathsPer100Thousand: Math.ceil(sortedArrayOfStat[i].NewDeaths / (sortedArrayOfCoyntries[i].population / 100000)),
              };
              state.countriesStat.push(obj);
            }

            const globalCasesPer100Thousand = Math.ceil(response.Global.TotalConfirmed / (state.population / 100000));
            const globalRecoveredPer100Thousand = Math.ceil(response.Global.TotalRecovered / (state.population / 100000));
            const globalDeathsPer100Thousand = Math.ceil(response.Global.TotalDeaths / (state.population / 100000));
            const newGlobalCasesPer100Thousand = Math.ceil(response.Global.NewConfirmed / (state.population / 100000));
            const newGlobalRecoveredPer100Thousand = Math.ceil(response.Global.NewRecovered / (state.population / 100000));
            const newGlobalDeathsPer100Thousand = Math.ceil(response.Global.NewDeaths / (state.population / 100000));
            const obj = {
              GlobalCases: response.Global.TotalConfirmed,
              GlobalRecovered: response.Global.TotalRecovered,
              GlobalDeaths: response.Global.TotalDeaths,
              NewGlobalCases: response.Global.NewConfirmed,
              NewGlobalRecovered: response.Global.NewRecovered,
              NewGlobalDeaths: response.Global.NewDeaths,
              GlobalCasesPer100Thousand: globalCasesPer100Thousand,
              GlobalRecoveredPer100Thousand: globalRecoveredPer100Thousand,
              GlobalDeathsPer100Thousand: globalDeathsPer100Thousand,
              NewGlobalCasesPer100Thousand: newGlobalCasesPer100Thousand,
              NewGlobalRecoveredPer100Thousand: newGlobalRecoveredPer100Thousand,
              NewGlobalDeathsPer100Thousand: newGlobalDeathsPer100Thousand,
            };
            state.globalStat = obj;
          });
      });
    return state;
  }
  return updateStatisctic();
};
export default covidStatState;
