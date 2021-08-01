import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsListService } from "src/app/services/contacts-list.service";
import { ContactsService } from "src/app/services/contacts.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('listContainer') listContainer: ElementRef<HTMLElement>;
    public selectedContactParent: number | undefined;

    constructor(private contactService: ContactsService, private ContactsList: ContactsListService) { }

    public selectContact(id: number): void {
        this.selectedContactParent = id;
    }

    public resetContact(value: undefined) {
        this.selectedContactParent = value;
    }

    ngOnInit() {
        for (let i = 0; i <= 30; i++) {
            this.contactService.addContact(new ContactItem(`Ivan${i}`, 'test', '111', 'test@test'));
        }
    }

    public ngAfterViewInit(): void {
        this.ContactsList.addList(this.listContainer);
        this.ContactsList.selectList().nativeElement.style.maxHeight = window.innerHeight - this.listContainer.nativeElement.offsetTop + 'px';
        this.contactService.sortContacts();
    }
}
