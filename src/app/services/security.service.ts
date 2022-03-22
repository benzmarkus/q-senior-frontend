import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

import { SECURITIES } from '../mocks/securities-mock';
import { SecuritiesFilter } from '../models/securitiesFilter';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor() { }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  getTypes() {
    return SECURITIES.map(x => x.type).filter(this.onlyUnique);
  }
  getCurrencies() {
    return SECURITIES.map(x => x.currency).filter(this.onlyUnique);
  }

  /**
   * Get Securities server request mock
   * */
  getSecurities(securityFilter?: SecuritiesFilter) {
    const filteredSecurities = this.filterSecurities(securityFilter);
    const totalRecords = filteredSecurities.length;
    const skip = securityFilter?.skip ?? undefined;
    let limit = securityFilter?.limit ?? undefined;
    if (limit >= 0 && skip >= 0) {
      limit = skip + limit;
    }
    return of([totalRecords, filteredSecurities.slice(skip, limit)]).pipe(delay(1000));
  }

  private filterSecurities(securityFilter: SecuritiesFilter) {
    if (!securityFilter) return SECURITIES;

    return SECURITIES.filter(s =>
      (!securityFilter.name || s.name.includes(securityFilter.name))
      && (!securityFilter.types || securityFilter.types.some(type => s.type === type))
      && (!securityFilter.currencies || securityFilter.currencies.some(currency => s.currency == currency))
      && (securityFilter.isPrivate == undefined || securityFilter.isPrivate === s.isPrivate)
    );
  }
}
