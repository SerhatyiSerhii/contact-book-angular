import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";


@Component({
    selector: 'contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss']
})

export class ContactsListComponent implements OnInit {

    @Output() idSelected: EventEmitter<number> = new EventEmitter<number>();
    public contactList: ContactItem[];

    constructor(private contactsService: ContactsService) { }

    public ngOnInit(): void {
        this.contactsService.getContacts().then((data: ContactItem[]) => {
            this.contactList = data;
            this.contactsService.sortContacts();
        });

        this.contactsService.getContactsListUpdated().subscribe(() => {
            this.contactsService.getContacts().then((data: ContactItem[]) => {
                this.contactList = data;
                this.contactsService.sortContacts();
            });
        });
    }

    public onClick(contact: ContactItem): void {
        this.idSelected.emit(contact.id);
    }
}