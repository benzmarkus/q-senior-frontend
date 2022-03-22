import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FilterBarComponent } from '@components/filter-bar/filter-bar.component';
import { SecuritiesFilter } from '@models/securitiesFilter';
import { Security } from '@models/security';
import { SecurityService } from '@services/security.service';
import { BehaviorSubject, map, merge, Observable, switchMap, tap } from 'rxjs';
import { indicate } from 'src/app/utils';

const nameof = <T>(name: keyof T) => name;

@Component({
  selector: 'securities-list',
  templateUrl: './securities-list.component.html',
  styleUrls: ['./securities-list.component.scss'],
})
export class SecuritiesListComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[] = ['name', 'type', 'currency'];

  public securities$: Observable<Security[]>;
  public loadingSecurities$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  @ViewChild(FilterBarComponent, { static: true })
  filterBar: FilterBarComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public typesSource: string[];
  public currenciesSource: string[];
  public totalRecords = 0;
  public currentPageIndex = 0;

  constructor(private securityService: SecurityService) {}

  instanceOfSecuritiesFilter(object: any): object is SecuritiesFilter {
    return nameof<SecuritiesFilter>('name') in object;
  }

  ngAfterViewInit(): void {
    this.securities$ = merge(this.filterBar.change, this.paginator.page)
      .pipe(
        switchMap((filterOrPage) => {
          const filter = this.filterBar.getFilter();
          if(this.instanceOfSecuritiesFilter(filterOrPage)) {
            this.paginator.pageIndex = 0;
          }
          filter.skip = this.paginator.pageIndex * this.paginator.pageSize;
          filter.limit = this.paginator.pageSize;
          return this.securityService
            .getSecurities(filter)
            .pipe(indicate(this.loadingSecurities$));
        }),
        tap((data) => {
          const [totalRecords, records] = data;
          this.totalRecords = <number>totalRecords;
        }),
        map(data => {
          const [totalRecords, records] = data;
          return <Security[]>records;
        })
      );
  }

  ngOnInit(): void {
    this.currenciesSource = this.securityService.getCurrencies();
    this.typesSource = this.securityService.getTypes();
  }
}
