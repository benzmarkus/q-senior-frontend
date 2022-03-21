import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'fb-string-filter',
  templateUrl: './string-filter.component.html',
})
export class StringFilterComponent {
  @Input() label: string;
  @Input() controlName: string;
  @Input() parentForm: FormGroup;
  @Input() placeholderText: string;

  constructor() {
  }
}
