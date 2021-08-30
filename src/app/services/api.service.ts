import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContactItem } from "../models/contac-item";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(private http: HttpClient) {}

    public getContacts(): Promise<ContactItem[]> {
        return this.http.get<ContactItem[]>('http://localhost:8080/contact').toPromise();
    }

    public getContactById(id: number) {
        return this.http.get<ContactItem>(`http://localhost:8080/contact/${id}`).toPromise();
    }

    public addContact(contact: ContactItem): Observable<ContactItem> {

        const newContact = {
            "contact": contact
        }

        return this.http.post<ContactItem>('http://localhost:8080/contact', newContact);
    }

    public updateContact(id: number, contact: ContactItem): Observable<ContactItem> {

        const updatedContact = {
            "contact": contact
        }

        return this.http.put<ContactItem>(`http://localhost:8080/contact/${id}`, updatedContact);
    }

    public deleteContact(id: number): Observable<ContactItem> {
        return this.http.delete<ContactItem>(`http://localhost:8080/contact/${id}`);
    }
}