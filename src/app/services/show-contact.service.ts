import { ContactItem } from "../models/contac-item";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ShowContactService {
    private contactItem: ContactItem | undefined;

    public setNoEdit() {
        this.contactItem!.edit = false;
    }

    public getContact(): ContactItem | undefined {
        return this.contactItem;
    }

    public setContact(contact: ContactItem): void {
        this.contactItem = contact;
    }

    public resetContact(): void {
        this.contactItem = undefined;
    }
}