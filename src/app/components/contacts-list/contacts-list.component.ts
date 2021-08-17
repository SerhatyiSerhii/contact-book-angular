import { Component, EventEmitter, Output } from "@angular/core";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";


@Component({
    selector: 'contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss']
})

export class ContactsListComponent {

    @Output() selectId: EventEmitter<number> = new EventEmitter<number>()

    constructor(private contactsService: ContactsService) { }

    public get contactList() {
        return this.contactsService.getContacts();
    }

    onClick(contact: ContactItem) {
        this.selectId.emit(contact.id);
    }
}