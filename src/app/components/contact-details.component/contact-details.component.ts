import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";
import { ContactFormService } from "src/app/models/contact-form";
import { ContactsService } from "src/app/services/contacts.service";


@Component({
    selector: 'contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss']
})

export class ContactDetailsComponent extends ContactFormService {

    @Input() selectedContactId: number | undefined;
    @Output() resetContact: EventEmitter<undefined> = new EventEmitter<undefined>();

    constructor(public contactsService: ContactsService) {
        super();
    }

    public get contactId(): ContactItem | undefined {
        return this.contactsService.getContactById(this.selectedContactId!);
    }

    public reset(): void {
        this.resetContact.emit(undefined);
    }

    public deleteContact(): void {
        this.contactsService.deleteContact(this.contactId!);

        this.reset();
    }

    public makeFavorite(): void {
        this.contactId!.favorite = !this.contactId!.favorite
    }

    public editContact(): void {
        this.contactsService.setEdit();

        this.updateForm = new FormGroup({
            name: new FormControl(this.contactId?.name, [Validators.required]),
            surname: new FormControl(this.contactId?.surname, [Validators.required]),
            phone: new FormControl(this.contactId?.phone, [Validators.pattern(this.pattern)]),
            email: new FormControl(this.contactId?.email, [Validators.email])
        });
    }

    public updateContact(): void {
        this.contactId!.name = this.updateForm.controls.name.value;
        this.contactId!.surname = this.updateForm.controls.surname.value;
        this.contactId!.phone = this.updateForm.controls.phone.value;
        this.contactId!.email = this.updateForm.controls.email.value;

        this.contactsService.setNoEdit();
    }

    public cancelUpdateContact(): void {
        this.contactsService.setNoEdit();
    }
}