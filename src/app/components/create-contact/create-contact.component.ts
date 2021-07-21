import { Component } from "@angular/core";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";
import { ShowContactService } from "src/app/services/show-contact.service";

@Component({
    selector: 'create-contact',
    templateUrl: './create-contact.component.html',
    styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent {

    constructor(private showContactService: ShowContactService, private contactService: ContactsService) { }

    public get contactDetailsParent(): ContactItem | undefined {
        return this.showContactService.getContact();
    }

    public contactsListParent: ContactItem[] = this.contactService.getContacts();
}
