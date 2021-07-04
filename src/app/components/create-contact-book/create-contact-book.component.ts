import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";

@Component({
    selector: 'create-contact',
    templateUrl: './create-contact-book.component.html',
    styleUrls: ['./create-contact-book.component.scss']
})
export class CreateContactBookComponent implements OnInit {

    @Output()
    public create: EventEmitter<ContactItem> = new EventEmitter<ContactItem>();

    public pattern = '^(?=.*[0-9])[- +()0-9]+$';
    public addContactWarning = "Enter a phone number or an email address"

    public submitted: boolean = true;

    public addContactCheck() {
        if (this.name.value == '') {
            return 'Name field is mandatory';
        } else if (this.surname.value == '') {
            return 'Surname field is mandatory';
        } else if (this.phone.value == '' && this.email.value == '') {
            return 'Enter a phone number or an email address';
        } else {
            return '';
        }
    }

    public onSubmit(): void {
        this.submitted = false;
    }

    public addContact(): void {
        const newContact = new ContactItem(this.name.value?.trim(), this.surname.value?.trim(), this.phone.value?.trim(), this.email.value?.trim());

        this.create.emit(newContact);

        this.submitted = true;

        this.name.setValue('Mr/Mrs');
        this.surname.setValue('Smith');
        this.phone.setValue('');
        this.email.setValue('');
    }

    public checkEmptyString(): boolean {
        if ((this.contactForm.controls.phone.value?.trim() == '' && this.contactForm.controls.email.value?.trim() == '') || this.contactForm.controls.name.value?.trim() == '' || this.contactForm.controls.surname.value?.trim() == '' || this.contactForm.controls.phone.invalid || this.contactForm.controls.email.invalid) {
            return true;
        }

        return false;
    }

    contactForm!: FormGroup;

    ngOnInit(): void {
        this.contactForm = new FormGroup({
            name: new FormControl('Mr/Mrs', [
                Validators.required
            ]),
            surname: new FormControl('Smith', [
                Validators.required
            ]),
            phone: new FormControl('', [
                Validators.pattern(this.pattern)
            ]),
            email: new FormControl('')
        });
    }

    get name() {
        return this.contactForm.get('name')!;
    }

    get surname() {
        return this.contactForm.get('surname')!;
    }

    get phone() {
        return this.contactForm.get('phone')!;
    }

    get email() {
        return this.contactForm.get('email')!;
    }
}
