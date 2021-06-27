import { Component } from "@angular/core";
import { ContactData } from "./contact-data.component";

@Component({
    selector: 'create-contact',
    templateUrl: './create-contact-book.component.html',
    styleUrls: ['./create-contact-book.component.scss']
})
export class CreateContactBookComponent {
    public contactData: ContactData = {name: '', surname: '', phone: '', email: ''};

    public submitted: boolean = false;

    public onSubmit(): void {
        this.submitted = true;
    }
}
