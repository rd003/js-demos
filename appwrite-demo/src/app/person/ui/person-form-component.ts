import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Person } from '../person.model';

@Component({
  selector: 'app-person-form-component',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="personForm" (ngSubmit)="onFormSubmit()" style="display: flex;gap:10px;margin-bottom:10px">
        <input type="hidden" formControlName="$id">

        <input type="text" formControlName="FirstName" placeholder="First Name">
        
        <input type="text" formControlName="LastName" placeholder="Last Name">
        
        <button type="submit" [disabled]="personForm.invalid">Save</button>

        <button type="button">Cancel</button>
    </form>
  `,
  styles: ``,
})
export class PersonFormComponent {
  fb = inject(FormBuilder);
  @Output() personFormSubmit = new EventEmitter<Person>();
  @Input() set SelectedPerson(person: Person | null) {
    if (person) {
      this.personForm.patchValue(person);
    }
  }
  personForm = this.fb.group({
    $id: [''],
    FirstName: ['', [Validators.required, Validators.maxLength(40)]],
    LastName: ['', [Validators.required, Validators.maxLength(40)]],
  });

  onFormSubmit() {
    this.personFormSubmit.emit(this.personForm.value as Person);
    this.personForm.reset();
  }
}