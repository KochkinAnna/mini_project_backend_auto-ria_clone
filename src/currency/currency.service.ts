import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyService {
  constructor(private httpService: HttpService) {}

  async getExchangeRate(
    baseCurrency: string,
    targetCurrency: string,
  ): Promise<number> {
    const response = await this.httpService
      .get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
      .toPromise();

    const exchangeRates = response.data;

    console.log('baseCurrency, targetCurrency:', baseCurrency, targetCurrency);
    console.log('exchangeRates:', exchangeRates);

    const baseRate = exchangeRates.find(
      (rate) => rate.ccy === baseCurrency,
    );
    const targetRate = exchangeRates.find(
      (rate) => rate.ccy === targetCurrency,
    );

    if (baseRate === undefined || targetRate === undefined) {
      throw new Error('Invalid currency');
    }

    const baseRateValue = parseFloat(baseRate.buy);
    const targetRateValue = parseFloat(targetRate.buy);

    return targetRateValue / baseRateValue;
  }
}
