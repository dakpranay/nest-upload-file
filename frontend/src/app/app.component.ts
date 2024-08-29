import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      file: ['', Validators.required],
    });
  }

  createFormData(formValue: any): FormData {
    const formData = new FormData();
    for (const key in formValue) {
      formData.append(key, formValue[key]);
    }
    return formData;
  }

  onSubmit() {
    if (this.userForm.valid) {
      let apiUrl = 'http://localhost:3000/user';
      const formData = this.createFormData(this.userForm.value);
      // Post the form data to the API
      this.http.post(apiUrl, formData).subscribe(
        (response) => {
          console.log('Data posted successfully', response);
        },
        (error) => {
          console.error('Error posting data', error);
        }
      );

      this.userForm.reset();
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.userForm.patchValue({
        file: file,
      });
    }
  }
}
