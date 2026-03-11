import { Component, inject, OnInit, signal } from '@angular/core';
import { Person } from './person.model';
import { PersonService } from './person.service';
import { PersonListComponent } from "./ui/person-list-component";
import { PersonFormComponent } from "./ui/person-form-component";

@Component({
  selector: 'app-person-component',
  imports: [PersonListComponent, PersonFormComponent],
  template: `
    <h1>People</h1>
    @if(loading()){
      <p>Loading....</p>
    }

    @if(error()){
      <p>error...</p>
    }

    <app-person-form-component (personFormSubmit)="handleFormSubmit($event)" [SelectedPerson]="selectedPerson()"/>
    
    <app-person-list-component [people]="people()" (editPerson)="handleEdit($event)" (deletePerson)="handleDelete($event)"/>
  `,
  styles: ``,
})
export class PersonComponent implements OnInit {
  private personService = inject(PersonService);
  people = signal<Person[]>([]);
  loading = signal<boolean>(true);
  error = signal<any>(null);
  selectedPerson = signal<Person | null>(null);

  async loadPeople() {
    try {
      const peopleData = await this.personService.getPeople();
      this.people.set(peopleData);
      this.loading.set(false);
    }
    catch (ex) {
      console.log(ex);
      this.error.set(ex);
      this.loading.set(false);
    }
  }

  handleEdit(person: Person) {
    this.selectedPerson.set(person);
  }

  async handleDelete(person: Person) {
    this.toggleLoading();
    if (!confirm("Are you sure to delete?")) return;
    try {
      this.personService.deletePerson(person.$id);
      this.people.update((oldData) => (oldData.filter(p => p.$id != person.$id)));
      this.toggleLoading();
    }
    catch (ex) {
      console.log(ex);
      this.error.set(ex);
      this.toggleLoading();
    }
  }

  async handleFormSubmit(person: Person) {
    this.toggleLoading();
    if (person.$id) {
      await this.updatePerson(person);
    }
    else {
      await this.addPerson(person);
    }
  }

  toggleLoading() {
    const loadingVal = !this.loading();
    this.loading.set(loadingVal);
  }

  async addPerson(person: Person) {
    try {
      const createdPerson = await this.personService.addPerson(person);
      this.people.update((oldData) => ([...oldData, createdPerson]));
      this.toggleLoading();
    }
    catch (ex) {
      console.log(ex);
      this.error.set(ex);
      this.toggleLoading();
    }
  }

  async updatePerson(person: Person) {
    try {
      this.toggleLoading();
      this.personService.updatePerson(person);
      this.people.update((oldData) => (oldData.map(p => p.$id === person.$id ? person : p)));
    }
    catch (ex) {
      console.log(ex);
      this.error.set(ex);
      this.toggleLoading();
    }
  }

  async ngOnInit() {
    await this.loadPeople();
  }
}
