import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";
import { ContactFormComponent } from "src/app/components/contact-form/contact-form.component";

@Component({
    selector: 'add-contact-form',
    templateUrl: './add-contact-form.component.html',
    styleUrls: ['./add-contact-form.component.scss']
})

export class AddContactFormComponent extends ContactFormComponent {

    @Input() public visible: boolean;
    @Output() public createdContact: EventEmitter<boolean> = new EventEmitter<boolean>();
    public showFormVisible: boolean = false;
    public animationAllowed: boolean = true;

    constructor(private contactsService: ContactsService) {
        super();

        this.updateForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            surname: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.pattern(this.pattern)]),
            email: new FormControl('', [Validators.email])
        });
    }

    public animateFormDisplay(): void {
        this.createdContact.emit(false);
        this.updateForm.reset();
    }

    public createContact(): void {
        const map = new Map();

        for (let field of this.contactFields) {
            map.set(field, this.getFormControl(field.name).value?.trim());
        }

        const [name, surname, phone, email] = map.values();

        this.contactsService.addContact(new ContactItem(name, surname, phone, email));

        this.animateFormDisplay();

        this.contactsService.sortContacts();
    }

    public cancelContactCreation(): void {
        this.animateFormDisplay();
    }
}