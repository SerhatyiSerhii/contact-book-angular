import { Component } from "@angular/core";

@Component({
    selector: 'create-contact',
    templateUrl: './create-contact.component.html',
    styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent {

    public publicVisible: boolean = false;

    public toggleForm(): void {
        this.publicVisible = !this.publicVisible;
    }
}
