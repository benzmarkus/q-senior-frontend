import { AfterContentInit, Component, ContentChildren, EventEmitter, Output, QueryList } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecuritiesFilter } from '@models/securitiesFilter';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { FilterComponent } from './controls/filter.component';

@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements AfterContentInit {
  @Output()
  change = new EventEmitter<SecuritiesFilter>();

  @ContentChildren(FilterComponent) filters: QueryList<FilterComponent>;

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngAfterContentInit(): void {
    var formDefinition = {};
    this.filters.forEach(filter => {
      formDefinition[filter.controlName] = filter.type == "string" ? [null] : [false];
    });
    this.form = this.formBuilder.group(formDefinition);
    this.onChanges();
  }

  onChanges(): void {
    this.form.valueChanges.pipe(debounce(() => interval(700))).subscribe(() => {
      if (this.form.invalid) {
        return;
      }
      this.change.next(this.form.value);
    });
  }
}
