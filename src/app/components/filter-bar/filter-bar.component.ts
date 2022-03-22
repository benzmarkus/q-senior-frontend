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

  public getFilter() {
    return <SecuritiesFilter>this.form.value;
  }

  ngAfterContentInit(): void {
    const formDefinition = {};
    this.filters.forEach(filter => {
      formDefinition[filter.controlName] = [null];
    });
    this.form = this.formBuilder.group(formDefinition);
    this.onChanges();
  }

  onChanges(): void {
    this.form.valueChanges.pipe(debounce(() => interval(700))).subscribe(() => {
      if (this.form.invalid) {
        return;
      }
      var result = this.form.value;
      for(const prop in result) {
        const value = result[prop];
        if (typeof(value) === "string" && value.trim() === "") {
          result[prop] = null;
        }
      }
      this.change.next(result);
    });
  }
}
