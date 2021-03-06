import { AbstractControl, FormGroup } from "@angular/forms";
import { ContactItem } from "src/app/models/contac-item";

export abstract class ContactFormComponent {
    public updateForm: FormGroup;
    protected pattern: string = '^(?=.*[0-9])[- +()0-9]+$';
    public contactFields: {
        name: keyof ContactItem;
        title: string;
    }[] = [
            { name: 'name', title: 'Name' },
            { name: 'surname', title: 'Surname' },
            { name: 'phone', title: 'Phone' },
            { name: 'email', title: 'Email' }
        ];

    protected getFormControl(formControl: string): AbstractControl {
        return this.updateForm.get(formControl)!;
    }

    public isFormInvalid(): boolean {
        return ((this.getFormControl('phone').value?.trim() === '' && this.getFormControl('email').value?.trim() === '')
            || this.getFormControl('phone').invalid
            || this.getFormControl('email').invalid
        )
    }

    public isAbstractControlInvalid(formControl: string): boolean {
        const abstractControl = this.getFormControl(formControl);

        return abstractControl.invalid && (abstractControl.touched || abstractControl.dirty);
    }

    public showBtnTitle(): string {
        if (this.getFormControl('name').value === '') {
            return 'Enter new name';
        }
        if (this.getFormControl('surname').value === '') {
            return 'Enter new surname';
        }
        if (this.getFormControl('phone').value === '' && this.getFormControl('email').value === '') {
            return 'Enter new phone number or new email address';
        }

        if (this.getFormControl('phone').invalid) {
            return 'Phone number is invalid'
        }

        if (this.getFormControl('email').invalid) {
            return 'Email address is invalid'
        }

        return '';
    }
}