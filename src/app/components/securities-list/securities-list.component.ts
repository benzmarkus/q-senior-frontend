import { Component, OnInit, ViewChild } from '@angular/core';
import { Security } from "../../models/security";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { indicate } from "../../utils";
import { SecurityService } from "../../services/security.service";
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { FilterBarComponent } from '@components/filter-bar/filter-bar.component';

@Component({
  selector: 'securities-list',
  templateUrl: './securities-list.component.html',
  styleUrls: ['./securities-list.component.scss']
})
export class SecuritiesListComponent implements OnInit {
  public displayedColumns: string[] = ["name", "type", "currency"];

  public securities$: Observable<Security[]>;
  public loadingSecurities$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @ViewChild(FilterBarComponent, {static: true}) filterBar: FilterBarComponent;

  public typesSource: string[];
  public currenciesSource: string[];

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.currenciesSource = this.securityService.getCurrencies();
    this.typesSource = this.securityService.getTypes();
    this.securities$ = this.filterBar.change.pipe(switchMap(x => this.securityService.getSecurities(x).pipe(indicate(this.loadingSecurities$))));
  }

}
