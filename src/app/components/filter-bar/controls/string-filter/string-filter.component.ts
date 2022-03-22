import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'string-filter',
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
