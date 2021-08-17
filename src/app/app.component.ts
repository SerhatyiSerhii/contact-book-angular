import { Component, OnInit } from "@angular/core";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedContactParent: number | void;

    constructor(private contactService: ContactsService) { }

    public selectContact(id: number): void {
        this.selectedContactParent = id;
    }

    public ngOnInit(): void {
        for (let i = 0; i <= 30; i++) {
            this.contactService.addContact(new ContactItem(`Ivan${i}`, 'test', '111', 'test@test'));
        }

        this.contactService.sortContacts();
    }
}
