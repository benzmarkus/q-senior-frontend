import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterBarComponent } from './filter-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BoolFilterComponent } from './filter-controls/bool-filter.component';
import { StringsFilterComponent } from './filter-controls/strings-filter.component';
import { StringFilterComponent } from './filter-controls/string-filter.component';
import { FilterComponent } from './filter-controls/filter.component';


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
    MatAutocompleteModule
  ],
  exports: [FilterBarComponent, FilterComponent],
})
export class FilterBarModule {}
