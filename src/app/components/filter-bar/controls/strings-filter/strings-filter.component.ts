import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'strings-filter',
  templateUrl: './strings-filter.component.html'
})
export class StringsFilterComponent implements OnInit {
  get resultControl() {
    return <FormControl>this.parentForm.get(this.controlName);
  }

  @Input() label: string;
  @Input() controlName: string;
  @Input() mode: string;
  @Input() source: any[] | null;
  @Input() parentForm: FormGroup;
  @Input() placeholderText: string;
  @ViewChild('chipsInput') chipsInput: ElementRef<HTMLInputElement>;
  filteredValues: Observable<string[]>;
  results$ = new BehaviorSubject<string[]>(null);
  placeholderControl = new FormControl();

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {
    this.filteredValues = this.placeholderControl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) =>
        value ? this._filter(value) : this.source.slice()
      )
    );
  }
  ngOnInit(): void {
    this.results$.subscribe((x) => {
      this.resultControl.setValue(x);
    });
    if (!this.source) {
      this.source = [];
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    this.addToResult(value);
    // Clear the input value
    event.chipInput!.clear();
    this.placeholderControl.setValue(null);
  }

  public remove(value: string) {
    if (!value || value.trim() == '') {
      return;
    }
    const newResult = this.results$.value?.slice(0) ?? [];
    const index = newResult.indexOf(value);
    if (index >= 0) {
      newResult.splice(index, 1);
      if (newResult.length == 0) {
        this.results$.next(null);
      } else {
        this.results$.next(newResult);
      }
    }
  }

  private addToResult(value: string) {
    if (!value || value.trim() == '') {
      return;
    }
    const newResult = this.results$.value?.slice(0) ?? [];
    newResult.push(value);
    this.results$.next(newResult);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.addToResult(event.option.viewValue);
    this.chipsInput.nativeElement.value = '';
    this.placeholderControl.setValue(null);
  }

  private _filter(search: string): string[] {
    const filterValue = search.toLowerCase();
    const result = this.source.filter((sourceItem) =>
      sourceItem.toLowerCase().includes(filterValue)
    );
    return result;
  }
}
