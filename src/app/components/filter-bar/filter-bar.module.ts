import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { BoolFilterComponent } from './controls/bool-filter/bool-filter.component';
import { FilterComponent } from './controls/filter.component';
import { StringFilterComponent } from './controls/string-filter/string-filter.component';
import { StringsFilterComponent } from './controls/strings-filter/strings-filter.component';
import { FilterBarComponent } from './filter-bar.component';


@NgModule({
  declarations: [FilterBarComponent, StringsFilterComponent, BoolFilterComponent, StringFilterComponent, FilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
  ],
  exports: [FilterBarComponent, FilterComponent],
})
export class FilterBarModule {}
