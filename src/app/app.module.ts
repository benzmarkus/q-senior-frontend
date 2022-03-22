import { NgModule } from '@angular/core';
import { MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterBarModule } from './components/filter-bar/filter-bar.module';
import { FilterableTableComponent } from './components/filterable-table/filterable-table.component';
import { SecuritiesListComponent } from './components/securities-list/securities-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterableTableComponent,
    SecuritiesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FilterBarModule,
    MatPaginatorModule
  ],
  providers: [
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
