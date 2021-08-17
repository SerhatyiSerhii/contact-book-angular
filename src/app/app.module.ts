import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddContactFormComponent } from './components/add-contact-form/add-contact-form.component';
import { ContactDetailsComponent } from './components/contact-details.component/contact-details.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { CreateContactComponent } from './components/create-contact/create-contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CreateContactComponent,
    ContactsListComponent,
    AddContactFormComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
