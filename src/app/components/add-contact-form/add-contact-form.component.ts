import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";
import { ContactsListService } from "src/app/services/contacts-list.service";
import { ContactsService } from "src/app/services/contacts.service";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { ContactFormService } from "src/app/models/contact-form";

@Component({
    selector: 'add-contact-form',
    templateUrl: './add-contact-form.component.html',
    styleUrls: ['./add-contact-form.component.scss'],
    animations: [
        trigger('addContactForm', [
            state('show', style({
                height: '270px'
            })),
            state('hide', style({
                height: 0
            })),
            transition('show <=> hide', animate('500ms ease'))
        ])
    ]
})

export class AddContactFormComponent extends ContactFormService {

    public visible: boolean = false;
    public showFormVisible: boolean = false;
    public animationAllowed: boolean = true;

    constructor(private contactsService: ContactsService, private contactsList: ContactsListService) {
        super();
     }

    public get stateName(): string {
        return this.visible ? 'show' : 'hide';
    }

    private contactsListResize(): void {
        const contactList = this.contactsList.selectList().nativeElement;

        const resizeListHeight = () => {
            contactList.style.maxHeight = window.innerHeight - contactList.offsetTop + 'px';

            if (this.animationAllowed) {
                window.requestAnimationFrame(resizeListHeight);
            }
        }

        window.requestAnimationFrame(resizeListHeight);
    }

    public animateAddContactForm(): void {
        this.animationAllowed = true;
    }

    public hideAddContactForm(event: any): void {
        if (!this.visible && event.fromState == 'show') {
            this.showFormVisible = !this.showFormVisible;
        }

        if (event.toState == 'show' || event.toState == 'void') {
            this.animationAllowed = !this.animationAllowed;
        }
    }

    public animateFormDisplay(): void {
        setTimeout(() => {
            this.contactsListResize();
        });

        if (!this.visible) {

            this.updateForm = new FormGroup({
                name: new FormControl('', [Validators.required]),
                surname: new FormControl('', [Validators.required]),
                phone: new FormControl('', [Validators.pattern(this.pattern)]),
                email: new FormControl('', [Validators.email])
            });

            this.showFormVisible = !this.showFormVisible;

            setTimeout(() => {
                this.visible = !this.visible;
            });
        } else {
            this.visible = !this.visible;
        }

    }

    public createContact(): void {
        const map = new Map();

        for (let field of this.contactFields) {
            map.set(field, this.getFormControl(field).value?.trim());
        }

        const [name, surname, phone, email] = map.values();

        this.contactsService.addContact(new ContactItem(name, surname, phone, email));

        this.animateFormDisplay();

        this.contactsService.sortContacts();
    }

    public cancelContactCreation(): void {
        this.animateFormDisplay();
    }

    public ngAfterViewInit(): void {
        window.addEventListener('resize', () => {
            const contactList = this.contactsList.selectList().nativeElement;
            contactList.style.maxHeight = window.innerHeight - contactList.offsetTop + 'px';
        });
    }
}