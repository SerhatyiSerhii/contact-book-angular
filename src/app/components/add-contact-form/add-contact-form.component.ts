import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, ViewChildren } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";
import { ContactFormComponent } from "src/app/components/contact-form/contact-form.component";

@Component({
    selector: 'add-contact-form',
    templateUrl: './add-contact-form.component.html',
    styleUrls: ['./add-contact-form.component.scss']
})

export class AddContactFormComponent extends ContactFormComponent implements OnInit, OnChanges {

    @Input() public visible: boolean;
    @Output() public formClosed: EventEmitter<void> = new EventEmitter<void>();

    @ViewChildren('input') inputs: QueryList<ElementRef>;

    constructor(private contactsService: ContactsService) {
        super();
    }

    public ngOnInit(): void {
        this.createFormGroup();
    }

    public ngOnChanges(): void {
        if (this.visible) {
            this.inputs.first.nativeElement.focus();
        }
    }

    public createContact(): void {
        const map = new Map();

        for (let field of this.contactFields) {
            map.set(field, this.getFormControl(field.name).value?.trim());
        }

        const [name, surname, phone, email] = map.values();

        this.contactsService.addContact(new ContactItem(name, surname, phone, email)).subscribe(() => {
            this.closeAddContactForm();
        });
    }

    public closeAddContactForm(): void {
        this.formClosed.emit();

        this.createFormGroup();
    }

    private createFormGroup(): void {
        this.updateForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            surname: new FormControl('', [Validators.required]),
            phone: new FormControl('', [Validators.pattern(this.pattern)]),
            email: new FormControl('', [Validators.email])
        });
    }
}