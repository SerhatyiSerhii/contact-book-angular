import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiService } from "../models/api-interface";
import { ContactItem } from "../models/contac-item";

@Injectable({
    providedIn: 'root'
})

export class ApiService implements IApiService {
    private baseUrl: string = 'http://localhost:8080';

    private get contactsUrl(): string {
        return this.baseUrl + '/contact';
    }

    constructor(private http: HttpClient) { }

    public getContacts(): Observable<ContactItem[]> {
        return this.http.get<ContactItem[]>(this.contactsUrl);
    }

    public getContactById(id: number): Observable<ContactItem> {
        return this.http.get<ContactItem>(`${this.contactsUrl}/${id}`);
    }

    public addContact(contact: ContactItem): Observable<ContactItem> {
        return this.http.post<ContactItem>(this.contactsUrl, { contact });
    }

    public updateContact(id: number, contact: ContactItem): Observable<ContactItem> {
        return this.http.put<ContactItem>(`${this.contactsUrl}/${id}`, { contact });
    }

    public deleteContact(id: number): Observable<void> {
        return this.http.delete<void>(`${this.contactsUrl}/${id}`);
    }
}