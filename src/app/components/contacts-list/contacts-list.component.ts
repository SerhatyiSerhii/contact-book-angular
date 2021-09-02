import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { switchMap } from "rxjs/operators";
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
        this.contactsService.getContacts().subscribe((data: ContactItem[]) => {
            this.contactList = data;
        });

        this.contactsService.getContactsListUpdated().pipe(switchMap(() => {
            return this.contactsService.getContacts();
        })).subscribe((data: ContactItem[]) => {
            this.contactList = data;
        });
    }

    public onClick(contact: ContactItem): void {
        this.idSelected.emit(contact.id);
    }
}