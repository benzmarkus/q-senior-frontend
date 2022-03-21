import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'fb-bool-filter',
  templateUrl: './bool-filter.component.html',
})
export class BoolFilterComponent {
  get resultControl() {
    return <FormControl>this.parentForm.get(this.controlName);
  }

  @Input() label: string;
  @Input() controlName: string;
  @Input() parentForm: FormGroup;

  constructor() {
  }
}
