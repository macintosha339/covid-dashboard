/* eslint-disable class-methods-use-this */

export default class CovidService {
  async getResource(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}`
        + ` , received ${response.status}`);
    }

    const body = await response.json();
    return body;
  }

  async getAllCases() {
    const response = await this.getResource('https://api.covid19api.com/summary');

    return response;
  }

  async getAllCountriesPopulationAndFlags() {
    const response = await this.getResource('https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code');

    return response;
  }

  getHistoryCountryCases(countryCode) {
    return this.getResource(`https://api.covid19api.com/total/country/${countryCode}`);
  }

  getHistoryGlobalCases() {
    return this.getResource('https://covid19-api.org/api/timeline');
  }
}
