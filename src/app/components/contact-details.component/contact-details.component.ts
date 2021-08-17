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

export class ContactDetailsComponent extends ContactFormComponent implements OnChanges{

    @Input() public selectedContactId: number;
    @Output() public resetContact: EventEmitter<void> = new EventEmitter<void>();
    public contactDetails = [
        { key: 'fullName', value: 'Full name' },
        { key: 'phone', value: 'Phone' },
        { key: 'email', value: 'Email' }
    ];

    public contactEdit: boolean;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedContactId) {
            this.contactEdit = false;
        }
    }

    constructor(public contactsService: ContactsService) {
        super();

        this.updateForm = new FormGroup({
            fullName: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.pattern(this.pattern)),
            email: new FormControl('', Validators.email)
        });

        this.contactEdit = false;
    }

    public get contactId(): ContactItem {
        return this.contactsService.getContactById(this.selectedContactId);
    }

    public getContactDetail(detail: string): string | number | boolean {
        if (detail == 'fullName') {
            return this.contactId.name + ' ' + this.contactId.surname;
        }

        const key = detail as keyof ContactItem;

        return this.contactId[key]!;

    }

    public reset(): void {
        this.resetContact.emit();
    }

    public deleteContact(): void {
        this.contactsService.deleteContact(this.contactId);

        this.reset();
    }

    public toggleFavorite(): void {
        this.contactId.favorite = !this.contactId.favorite
    }

    public editContact(): void {
        this.contactEdit = !this.contactEdit;


        const { phone, email } = this.contactId;
        const fullName = this.contactId.name + ' ' + this.contactId.surname;
        const editFields = [fullName, phone, email];

        for (let i = 0; i < editFields.length; i++) {
            Object.values(this.updateForm.controls)[i].setValue(editFields[i]);
        }
    }

    public updateContact(): void {
        const fullName = this.updateForm.get('fullName')!.value.split(' ').slice(0, 2);

        if (fullName.length > 1) {
            this.contactId!.surname = fullName[1];
        }

        if (fullName.length == 1) {
            this.contactId!.surname = '';
        }

        this.contactId!.name = fullName[0];

        this.contactId!.phone = this.updateForm.controls.phone.value;
        this.contactId!.email = this.updateForm.controls.email.value;

        this.contactEdit = !this.contactEdit;

        this.contactsService.sortContacts();
    }

    public cancelUpdateContact(): void {
        this.contactEdit = !this.contactEdit;
    }
}