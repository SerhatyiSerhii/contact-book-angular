import { ElementRef, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ContactsListService {
    private contactsList: ElementRef<HTMLElement>;

    public addList(list: ElementRef<HTMLElement>): void {
        this.contactsList = list;
    }

    public selectList(): any {
        return this.contactsList;
    }
}