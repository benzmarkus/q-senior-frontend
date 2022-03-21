import { Component, Input, Output, EventEmitter, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { SecuritiesFilter } from 'src/app/models/securitiesFilter';
import { FilterComponent } from './filter-controls/filter.component';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit, AfterContentInit {
  @Input() typesSource: string[];
  @Input() currenciesSource: string[];
  @Output()
  change = new EventEmitter<SecuritiesFilter>();

  @ContentChildren(FilterComponent) filters: QueryList<FilterComponent>;

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null],
      types: [null],
      currencies: [null],
      isPrivate: [false],
    });
  }
  ngAfterContentInit(): void {
    console.dir(this.filters);
  }

  ngOnInit(): void {
    
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
