import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";


@Component({
    selector: 'contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss']
})

export class ContactsListComponent implements OnInit {

    @Output() selectId: EventEmitter<number> = new EventEmitter<number>();
    public contactList: ContactItem[];

    constructor(private contactsService: ContactsService) { }

    public ngOnInit(): void {
        this.contactList = this.contactsService.getContacts()

        this.contactsService.getContactsListUpdated().subscribe(() => {
            this.contactList = this.contactsService.getContacts();
        });
    }

    public onClick(contact: ContactItem): void {
        this.selectId.emit(contact.id);
    }
}