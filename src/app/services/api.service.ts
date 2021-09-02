import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContactItem } from "../models/contac-item";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(private http: HttpClient) {}

    public getContacts(): Observable<ContactItem[]> {
        return this.http.get<ContactItem[]>('http://localhost:8080/contact');
    }

    public getContactById(id: number): Observable<ContactItem> {
        return this.http.get<ContactItem>(`http://localhost:8080/contact/${id}`);
    }

    public addContact(contact: ContactItem): Observable<ContactItem> {
        return this.http.post<ContactItem>('http://localhost:8080/contact', {contact: contact});
    }

    public updateContact(id: number, contact: ContactItem): Observable<ContactItem> {
        return this.http.put<ContactItem>(`http://localhost:8080/contact/${id}`, {contact: contact});
    }

    public deleteContact(id: number): Observable<ContactItem> {
        return this.http.delete<ContactItem>(`http://localhost:8080/contact/${id}`);
    }
}