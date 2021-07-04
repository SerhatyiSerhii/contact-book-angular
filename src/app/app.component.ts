import { Component } from '@angular/core';
import { ContactItem } from './models/contac-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact-book-angular';

  public contacList: ContactItem[] = [];

  public addContact(contact: ContactItem): void {
    this.contacList.push(contact);
  }
}
