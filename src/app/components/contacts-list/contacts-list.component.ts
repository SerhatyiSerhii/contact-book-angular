import { Component, Input } from "@angular/core";
import { ContactItem } from "src/app/models/contac-item";
import { ShowContactService } from "src/app/services/show-contact.service";

@Component({
    selector: 'contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss']
})

export class ContactsListComponent {

    @Input() public contactList: ContactItem[];

    constructor(private showContactService: ShowContactService) {}

    onClick(contact: ContactItem) {
        this.showContactService.setContact(contact);
        this.showContactService.setNoEdit();
    }
}