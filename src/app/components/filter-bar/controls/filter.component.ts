import { Component, Input } from '@angular/core';

@Component({
  selector: 'fb-filter',
  template: ''
})
export class FilterComponent {
  @Input() public label: string;
  @Input() public controlName: string;
  @Input() public placeholderText: string;
  @Input() public source: any[] | null;
  @Input() public type: "string" | "bool";
  @Input() public mode: "single" | "multiple";

  constructor() {
  }
}
