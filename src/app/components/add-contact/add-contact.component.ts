import { Component, ElementRef, ViewChild, Renderer2, HostListener } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";

@Component({
    selector: 'add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['.//add-contact.component.scss']
})

export class AddContactComponent {

    @ViewChild('newContact') public newContact: ElementRef;

    public isFormVisible: boolean = false;
    public showFormVisible: boolean = false;
    public visible: boolean = false;
    public pattern: string = '^(?=.*[0-9])[- +()0-9]+$';
    public checkForm: FormGroup;

    constructor(private renderer: Renderer2, private contactsService: ContactsService) { }

    @HostListener('click')
    public onClick(): void {
        if (this.isFormVisible) {
            this.showFormVisible = true;
            setTimeout(() => {
                this.visible = true;
            })
        } else {
            this.visible = false;

            this.renderer.listen(this.newContact.nativeElement, 'transitionend', () => {
                this.showFormVisible = false;
            })
        }
    }

    public showForm(): void {
        this.isFormVisible = !this.isFormVisible;

        this.checkForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            surname: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.pattern(this.pattern)]),
            email: new FormControl('')
        });
    }

    public createContact(): void {
        const newContact = new ContactItem(this.getFormControl('name').value?.trim(), this.getFormControl('surname').value?.trim(), this.getFormControl('phone').value?.trim(), this.getFormControl('email').value?.trim());

        this.contactsService.addContact(newContact);

        this.isFormVisible = false;
    }

    public checkFormValidity(): boolean {
        return ((this.getFormControl('phone').value?.trim() == '' && this.getFormControl('email').value?.trim() == '') || this.getFormControl('phone').invalid || this.getFormControl('email').invalid)
    }

    public getFormControl(formControl: string): AbstractControl {
        return this.checkForm.get(formControl)!;
    }

    public checkAbstractControlValidity(abstractControl: AbstractControl): boolean {
        return abstractControl.invalid && (abstractControl.touched || abstractControl.dirty);
    }
}