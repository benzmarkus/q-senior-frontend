import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FilterBarComponent } from '@components/filter-bar/filter-bar.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Security } from '@models/security';
import { SecurityService } from '@services/security.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { indicate } from 'src/app/utils';

@Component({
  selector: 'securities-list',
  templateUrl: './securities-list.component.html',
  styleUrls: ['./securities-list.component.scss']
})
export class SecuritiesListComponent implements OnInit, AfterViewInit  {
  public displayedColumns: string[] = ["name", "type", "currency"];

  public securities = new MatTableDataSource();
  public loadingSecurities$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @ViewChild(FilterBarComponent, {static: true}) filterBar: FilterBarComponent;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public typesSource: string[];
  public currenciesSource: string[];

  constructor(private securityService: SecurityService) { }
  ngAfterViewInit(): void {
    this.securities.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.dir(this.paginator);
    this.currenciesSource = this.securityService.getCurrencies();
    this.typesSource = this.securityService.getTypes();
    // this.securities$ = 
    this.filterBar.change.pipe(switchMap(x => this.securityService.getSecurities(x).pipe(indicate(this.loadingSecurities$)))).subscribe(data => {
      this.securities.data = data;
    });
  }

  doPaging(page) {
    console.dir(page);
  }
}
