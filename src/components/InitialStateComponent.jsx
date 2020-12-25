import CovidService from './ServiceComponent';

const covidStatState = () => {
  const service = new CovidService();

  async function updateStatisctic() {
    const state = {};
    let covidData;
    let globalStat;
    let populationCount = 0;
    let ind = 0;
    await service
      .getAllCases()
      .then(({ Global, Countries }) => {
        globalStat = Global;
        covidData = Countries;
      })
      .then(async () => {
        await service
          .getAllCountriesPopulationAndFlags()
          .then((countriesStat) => {
            covidData.forEach((elem) => {
              countriesStat.forEach((item) => {
                if (elem.CountryCode === item.alpha2Code) {
                  Object.assign(elem, item);
                  ['alpha2Code', 'name', 'Slug', 'Date', 'Premium'].forEach((i) => delete elem[i]);
                  elem.id = ind++;
                  elem.GlobalCasesPer100Thousand = Math.ceil(elem.TotalConfirmed / (elem.population / 100000));
                  elem.GlobalRecoveredPer100Thousand = Math.ceil(elem.TotalRecovered / (elem.population / 100000));
                  elem.GlobalDeathesPer100Thousand = Math.ceil(elem.TotalDeaths / (elem.population / 100000));
                  elem.NewGlobalCasesPer100Thousand = Math.ceil(elem.NewConfirmed / (elem.population / 100000));
                  elem.NewGlobalRecoveredPer100Thousand = Math.ceil(elem.NewRecovered / (elem.population / 100000));
                  elem.NewGlobalDeathsPer100Thousand = Math.ceil(elem.NewDeaths / (elem.population / 100000));

                  populationCount += item.population;
                }
              });
            });

            const globalCasesPer100Thousand = Math.ceil(globalStat.TotalConfirmed / (populationCount / 100000));
            const globalRecoveredPer100Thousand = Math.ceil(globalStat.TotalRecovered / (populationCount / 100000));
            const globalDeathsPer100Thousand = Math.ceil(globalStat.TotalDeaths / (populationCount / 100000));
            const newGlobalCasesPer100Thousand = Math.ceil(globalStat.NewConfirmed / (populationCount / 100000));
            const newGlobalRecoveredPer100Thousand = Math.ceil(globalStat.NewRecovered / (populationCount / 100000));
            const newGlobalDeathsPer100Thousand = Math.ceil(globalStat.NewDeaths / (populationCount / 100000));
            const globalCovidData = {
              GlobalCases: globalStat.TotalConfirmed,
              GlobalRecovered: globalStat.TotalRecovered,
              GlobalDeaths: globalStat.TotalDeaths,
              NewGlobalCases: globalStat.NewConfirmed,
              NewGlobalRecovered: globalStat.NewRecovered,
              NewGlobalDeaths: globalStat.NewDeaths,
              GlobalCasesPer100Thousand: globalCasesPer100Thousand,
              GlobalRecoveredPer100Thousand: globalRecoveredPer100Thousand,
              GlobalDeathsPer100Thousand: globalDeathsPer100Thousand,
              NewGlobalCasesPer100Thousand: newGlobalCasesPer100Thousand,
              NewGlobalRecoveredPer100Thousand: newGlobalRecoveredPer100Thousand,
              NewGlobalDeathsPer100Thousand: newGlobalDeathsPer100Thousand,
            };

            state.countriesStat = covidData;
            state.globalStat = globalCovidData;
          });
      });
    return state;
  }
  return updateStatisctic();
};

export default covidStatState;
