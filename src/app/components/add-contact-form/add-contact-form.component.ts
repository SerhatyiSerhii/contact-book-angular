import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsService } from "src/app/services/contacts.service";
import { ContactFormComponent } from "src/app/components/contact-form/contact-form.component";

@Component({
    selector: 'add-contact-form',
    templateUrl: './add-contact-form.component.html',
    styleUrls: ['./add-contact-form.component.scss']
})

export class AddContactFormComponent extends ContactFormComponent implements OnInit {

    @Input() public visible: boolean;
    @Output() public formClosed: EventEmitter<void> = new EventEmitter<void>();

    @ViewChildren('i') inputs: QueryList<ElementRef>;

    constructor(private contactsService: ContactsService) {
        super();
    }

    public ngOnChanges(): void {
        if (this.visible) {
            this.inputs.first.nativeElement.focus();
        }
    }

    public ngOnInit(): void {
        this.createFormGroup();
    }

    public createContact(): void {
        const map = new Map();

        for (let field of this.contactFields) {
            map.set(field, this.getFormControl(field.name).value?.trim());
        }

        const [name, surname, phone, email] = map.values();

        this.contactsService.addContact(new ContactItem(name, surname, phone, email));

        this.closeAddContactForm();
    }

    public cancelContactCreation(): void {
        this.closeAddContactForm();
    }

    private closeAddContactForm(): void {
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