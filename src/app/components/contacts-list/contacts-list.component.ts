import { Component, Input } from "@angular/core";
import { ContactItem } from "src/app/models/contac-item";

@Component({
    selector: 'contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss']
})

export class ContactsListComponent {

    @Input()
    public list: ContactItem[];

    toggleFriend(contact: ContactItem): void {
        contact.bestFriend = !contact.bestFriend
    }
}