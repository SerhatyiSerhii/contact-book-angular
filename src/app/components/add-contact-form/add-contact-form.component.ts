import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";
import { ContactFormComponent } from "src/app/components/contact-form/contact-form.component";

@Component({
    selector: 'add-contact-form',
    templateUrl: './add-contact-form.component.html',
    styleUrls: ['./add-contact-form.component.scss']
})

export class AddContactFormComponent extends ContactFormComponent implements OnInit {

    @Input() public visible: boolean;
    @Output() public closingEmitter: EventEmitter<void> = new EventEmitter<void>();

    constructor(private contactsService: ContactsService) {
        super();
    }

    private createFormGroup(): void {
        this.updateForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            surname: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.pattern(this.pattern)]),
            email: new FormControl('', [Validators.email])
        });
    }

    public ngOnInit(): void {
        this.createFormGroup();
    }

    private closeAddContactForm(): void {
        this.closingEmitter.emit();

        this.createFormGroup();
    }

    public createContact(): void {
        const map = new Map();

        for (let field of this.contactFields) {
            map.set(field, this.getFormControl(field.name).value?.trim());
        }

        const [name, surname, phone, email] = map.values();

        this.contactsService.addContact(new ContactItem(name, surname, phone, email));

        this.closeAddContactForm();

        this.contactsService.sortContacts();
    }

    public cancelContactCreation(): void {
        this.closeAddContactForm();
    }
}