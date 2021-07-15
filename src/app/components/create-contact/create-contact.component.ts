import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";

@Component({
    selector: 'create-contact',
    templateUrl: './create-contact.component.html',
    styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

    public contactForm: FormGroup;
    public pattern: string = '^(?=.*[0-9])[- +()0-9]+$';

    @ViewChild('respect') public respect: ElementRef;
    @ViewChild('audio') public audio: ElementRef;

    constructor(private contacsService: ContactsService) {}

    public getFormControl(formControl: string): AbstractControl {
        return this.contactForm.get(formControl)!;
    }

    public showBtnTitle(): string {
        if (this.getFormControl('name').value == '') {
            return 'Name field is mandatory';
        }
        if (this.getFormControl('surname').value == '') {
            return 'Surname field is mandatory';
        }
        if (this.getFormControl('phone').value == '' && this.getFormControl('email').value == '') {
            return 'Enter a phone number or an email address';
        }

        return '';
    }

    public addContact(): void {
        this.audio.nativeElement.setAttribute('src', '../../../assets/sounds/add-contact.sound.wav');

        this.audio.nativeElement.addEventListener('canplay', () => {
            this.audio.nativeElement.play();
        });

        const newContact = new ContactItem(this.getFormControl('name').value?.trim(), this.getFormControl('surname').value?.trim(), this.getFormControl('phone').value?.trim(), this.getFormControl('email').value?.trim());

        this.contacsService.addContact(newContact);

        this.contactForm.reset();
        this.getFormControl('name').setValue('');
        this.getFormControl('surname').setValue('');
        this.getFormControl('phone').setValue('');
        this.getFormControl('email').setValue('');
    }

    public checkEmptyString(): boolean {
        return (this.getFormControl('phone').value?.trim() == '' && this.getFormControl('email').value?.trim() == '') || this.getFormControl('name').value?.trim() == '' || this.getFormControl('surname').value?.trim() == '' || this.getFormControl('phone').invalid || this.getFormControl('email').invalid;
    }

    public checkAbstractControlValidity(abstractControl: AbstractControl): boolean {
        return abstractControl.invalid && (abstractControl.touched || abstractControl.dirty);
    }

    public ngOnInit(): void {
        this.contactForm = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.maxLength(15)
            ]),
            surname: new FormControl('', [
                Validators.required,
                Validators.maxLength(15)
            ]),
            phone: new FormControl('', [
                Validators.pattern(this.pattern)
            ]),
            email: new FormControl('')
        });
    }
}
