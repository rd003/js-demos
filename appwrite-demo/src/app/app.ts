import { Component } from '@angular/core';
import { PersonComponent } from "./person/person-component";

@Component({
  selector: 'app-root',
  imports: [PersonComponent],
  template: `
    <app-person-component/>
  `,
  styles: [],
})
export class App {
}
