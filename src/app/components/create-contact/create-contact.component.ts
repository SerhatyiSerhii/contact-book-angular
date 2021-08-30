import { Component } from "@angular/core";

@Component({
    selector: 'create-contact',
    templateUrl: './create-contact.component.html',
    styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent {

    public visible: boolean = false;

    public toggleForm(): void {
        this.visible = !this.visible;
    }

    public cancelContactCreation(): void {
        this.visible = false;
    }
}
