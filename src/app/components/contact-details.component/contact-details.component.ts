import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";
import { ContactFormComponent } from "src/app/components/contact-form/contact-form.component";
import { ContactsService } from "src/app/services/contacts.service";


@Component({
    selector: 'contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss']
})

export class ContactDetailsComponent extends ContactFormComponent implements OnChanges {

    @Input() public selectedContactId: number;
    @Output() public resetContact: EventEmitter<void> = new EventEmitter<void>();
    public contactEdit: boolean = false;
    private contact: ContactItem;

    constructor(private contactsService: ContactsService) {
        super();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedContactId) {
            this.contactEdit = false;

            this.getContact();
        }
    }

    public ngOnInit(): void {
        this.updateForm = new FormGroup({
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.pattern(this.pattern)),
            email: new FormControl('', Validators.email)
        });
    }

    public getContact(): void {
        this.contact = this.contactsService.getContactById(this.selectedContactId);
    }

    public getContactDetail(detail: string): string | number | boolean {

        const key = detail as keyof ContactItem;

        return this.contact[key];
    }

    public reset(): void {
        this.resetContact.emit();
    }

    public deleteContact(): void {
        this.contactsService.deleteContact(this.contact.id);

        this.reset();
    }

    public toggleFavorite(): void {
        this.contact.favorite = !this.contact.favorite
    }

    public editContact(): void {
        this.contactEdit = !this.contactEdit;

        for (let control in this.updateForm.controls) {

            const key = control as keyof ContactItem;

            this.updateForm.controls[control].setValue(this.contact[key]);
        }
    }

    public updateContact(): void {
        const updatedContact = new ContactItem(
            this.updateForm.controls.name.value,
            this.updateForm.controls.surname.value,
            this.updateForm.controls.phone.value,
            this.updateForm.controls.email.value,
            this.contact.id
        );

        this.contactsService.updateContact(updatedContact);

        this.getContact();

        this.contactEdit = false;

        this.contactsService.sortContacts();
    }

    public cancelUpdateContact(): void {
        this.contactEdit = false;
    }
}