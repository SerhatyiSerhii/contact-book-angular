import { Component, Input } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";
import { ShowContactService } from "src/app/services/show-contact.service";


@Component({
    selector: 'contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss']
})

export class ContactDetailsComponent {

    @Input() public contactDetails: ContactItem;
    public pattern: string = '^(?=.*[0-9])[- +()0-9]+$';
    public updateForm: FormGroup;

    constructor(private showContactService: ShowContactService, private contactsService: ContactsService) { }

    public reset(): void {
        this.showContactService.resetContact();
    }

    public deleteContact(): void {
        const contactsServiceArr = this.contactsService.getContacts();

        const contact = this.showContactService.getContact();

        this.contactsService.deleteContact(contactsServiceArr.indexOf(contact!));

        this.reset();
    }

    public makeFavorite(): void {
        const contact = this.showContactService.getContact();

        if (contact!.favorite) {
            contact!.favorite = false;
        } else {
            contact!.favorite = true;
        }
    }

    public editContact(): void {

        const contact = this.showContactService.getContact();

        contact!.edit = true;

        this.updateForm = new FormGroup({
            updateName: new FormControl(contact?.name, [Validators.required]),
            updateSurname: new FormControl(contact?.surname, [Validators.required]),
            updatePhone: new FormControl(contact?.phone, [Validators.pattern(this.pattern)]),
            updateEmail: new FormControl(contact?.email)
        });
    }

    public updateContact(): void {
        this.showContactService.getContact()!.name = this.updateForm.controls.updateName.value;
        this.showContactService.getContact()!.surname = this.updateForm.controls.updateSurname.value;
        this.showContactService.getContact()!.phone = this.updateForm.controls.updatePhone.value;
        this.showContactService.getContact()!.email = this.updateForm.controls.updateEmail.value;

        this.showContactService.getContact()!.edit = false;
    }

    public cancelUpdateContact(): void {
        this.showContactService.getContact()!.edit = false;
    }

    public checkFormValidity(): boolean {
        return ((this.getFormControl('updatePhone').value?.trim() == '' && this.getFormControl('updateEmail').value?.trim() == '') || this.getFormControl('updatePhone').invalid || this.getFormControl('updateEmail').invalid)
    }

    public getFormControl(formControl: string): AbstractControl {
        return this.updateForm.get(formControl)!;
    }

    public checkAbstractControlValidity(abstractControl: AbstractControl): boolean {
        return abstractControl.invalid && (abstractControl.touched || abstractControl.dirty);
    }

    public showBtnTitle(): string {
        if (this.getFormControl('updateName').value == '') {
            return 'Enter new name';
        }
        if (this.getFormControl('updateSurname').value == '') {
            return 'Enter new surname';
        }
        if (this.getFormControl('updatePhone').value == '' && this.getFormControl('updateEmail').value == '') {
            return 'Enter new phone number or new email address';
        }

        if (this.getFormControl('updatePhone').invalid) {
            return 'Phone number is invalid'
        }

        if (this.getFormControl('updateEmail').invalid) {
            return 'Email address is invalid'
        }

        return '';
    }
}