import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { SecuritiesFilter } from 'src/app/models/securitiesFilter';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
  @Input() typesSource: string[];
  @Input() currenciesSource: string[];
  @Output()
  change = new EventEmitter<SecuritiesFilter>();

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null],
      types: [null],
      currencies: [null],
      isPrivate: [false],
    });
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
