import { Component } from "@angular/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public selectedContactParent: number;

    constructor() { }

    public selectContact(id: number): void {
        this.selectedContactParent = id;
    }

    public resetContact(): void {
        this.selectContact(null);
    }
}
