import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../person.model';

@Component({
  selector: 'app-person-list-component',
  imports: [],
  template: `
    <ul>
      @for (person of people; track person.$id) {
        <li>
           {{person.FirstName}} |
           {{person.LastName}} |
           <button type="button" (click)="editPerson.emit(person)">Edit</button>
           <button type="button" (click)="deletePerson.emit(person)">Delete</button>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class PersonListComponent {
  @Input() people!: Person[];
  @Output() editPerson = new EventEmitter<Person>();
  @Output() deletePerson = new EventEmitter<Person>();
}
