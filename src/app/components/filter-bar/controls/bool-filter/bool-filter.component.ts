import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'bool-filter',
  templateUrl: './bool-filter.component.html',
})
export class BoolFilterComponent implements AfterViewInit {
  get resultControl() {
    return <FormControl>this.parentForm.get(this.controlName);
  }
  @ViewChild(MatCheckbox) checkbox: MatCheckbox;

  @Input() label: string;
  @Input() controlName: string;
  @Input() parentForm: FormGroup;

  constructor() {
  }
  ngAfterViewInit(): void {
    if(this.resultControl.value == null) {
      this.checkbox.indeterminate = true;
    }
  }

  public onCheck() {
    if (this.checkbox.indeterminate) {
      this.resultControl.setValue(true);
      this.checkbox.indeterminate = false;
    } else {
      if (this.checkbox.checked) {
        this.resultControl.setValue(false);
        } else {
          this.resultControl.setValue(null);
          this.checkbox.indeterminate = true;
      }  
    }
  }
}
