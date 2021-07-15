import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";

@Component({
    selector: 'contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss']
})

export class ContactsListComponent implements OnInit {

    @ViewChild('editorPane') public editorPane: ElementRef;
    public get list(): ContactItem[] {
        return this.contactsService.getContacts();
    };
    public contactName: HTMLInputElement;
    public contactPhone: HTMLInputElement;
    public contactEmail: HTMLInputElement;
    public nameInput: SVGTextPathElement;
    public phoneInput: SVGTextPathElement;
    public emailInput: SVGTextPathElement;
    public pattern:string = '^(?=.*[0-9])[- +()0-9]+$';
    public checkerForm: FormGroup;
    public position: HTMLElement = document.documentElement;

    constructor(private contactsService: ContactsService) {}



    public ngOnInit(): void {
        this.checkerForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.pattern(this.pattern)]),
            email: new FormControl('')
        });
    }

    public deleteListItem(position: number): void {
        this.list.splice(position, 1);
    }

    public calcelCorrectData(): void {
        const removeBtns = document.querySelectorAll('.remove');
        const editBtns = document.querySelectorAll('.edit');

        removeBtns.forEach((button) => {
            button.removeAttribute('disabled');
        });

        editBtns.forEach((button) => {
            button.removeAttribute('disabled');
        });

        this.editorPane.nativeElement.classList.remove('visible');

        this.checkerForm.reset();

        this.position.removeEventListener('mousemove', this.mouseMoveHandler);
    }

    public checkFormValidity(): boolean {
        return ((this.getFormControl('phone').value?.trim() == '' && this.getFormControl('email').value?.trim() == '') || this.getFormControl('phone').invalid || this.getFormControl('email').invalid)
    }

    public mouseMoveHandler = (event: MouseEvent) => {
        this.position.style.setProperty('--x', event.clientX + 'px');
    }

    public correctContactData(element: HTMLElement): void {
        this.position.addEventListener('mousemove', this.mouseMoveHandler);

        const removeBtns = document.querySelectorAll('.remove');
        const editBtns = document.querySelectorAll('.edit');

        removeBtns.forEach((button) => {
            button.removeAttribute('disabled');
        });

        editBtns.forEach((button) => {
            button.removeAttribute('disabled');
        });

        this.editorPane.nativeElement.classList.toggle('visible');

        if (this.editorPane.nativeElement.classList.contains('visible')) {
            removeBtns.forEach((button) => {
                button.setAttribute('disabled', 'disabled');
            });

            editBtns.forEach((button) => {
                button.setAttribute('disabled', 'disabled');
            });
        }

        this.contactName = this.editorPane.nativeElement.querySelectorAll('input')[0];
        this.nameInput = element.querySelectorAll('textPath')[0];

        this.contactPhone = this.editorPane.nativeElement.querySelectorAll('input')[1];
        this.phoneInput = element.querySelectorAll('textPath')[2];

        this.contactEmail = this.editorPane.nativeElement.querySelectorAll('input')[2];
        this.emailInput = element.querySelectorAll('textPath')[1];

        this.contactName.value = this.nameInput.textContent!.trim();

        this.checkerForm.controls.name.setValue(this.contactName.value);

        this.contactPhone.value = this.phoneInput.textContent!.trim();

        this.checkerForm.controls.phone.setValue(this.contactPhone.value);

        this.contactEmail.value = this.emailInput.textContent!.trim();

        this.checkerForm.controls.email.setValue(this.contactEmail.value);
    }

    public updateContact(): void {
        this.nameInput.textContent = this.contactName.value;
        this.phoneInput.textContent = this.contactPhone.value;
        this.emailInput.textContent = this.contactEmail.value;

        this.editorPane.nativeElement.classList.remove('visible');

        const removeBtns = document.querySelectorAll('.remove');
        const editBtns = document.querySelectorAll('.edit');

        removeBtns.forEach((button) => {
            button.removeAttribute('disabled');
        });

        editBtns.forEach((button) => {
            button.removeAttribute('disabled');
        });

        this.checkerForm.reset();

        this.position.removeEventListener('mousemove', this.mouseMoveHandler);
    }

    public getFormControl(formControl: string): AbstractControl {
        return this.checkerForm.get(formControl)!;
    }

    public checkAbstractControlValidity(abstractControl: AbstractControl): boolean {
        return abstractControl.invalid && (abstractControl.touched || abstractControl.dirty);
    }
}