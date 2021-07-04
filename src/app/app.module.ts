import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { CreateContactBookComponent } from './components/create-contact-book/create-contact-book.component';
import { CreateThreeJS } from './components/threeJS/threeJS.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateContactBookComponent,
    ContactsListComponent,
    CreateThreeJS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
