import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  public results: string[];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ["suriya_e@protossgroup.com", [Validators.required, Validators.email]],
      name: ["Suriya Eiamerb", Validators.required],
      phone: ["0655941964", Validators.required],
      address: ["SQL", Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value, null, 4)
    );

    this.httpClient
      .post("https://script.google.com/macros/s/AKfycbzFx4rDH-py3F-vmPQErbllXTN4wWQZq73tZ2IcrDMlI2bR4NE/exec?path=/register",
        {
          "email": "suriya_e@protossgroup.com",
          "fullName": "Suriya Eiamerb",
          "telephoneNumber": "0655941964",
          "course": "SQL"
        })
      .subscribe(
        response => {
          this.registerForm = response['registerForm'];
        });

    this.httpClient
      .get('https://script.google.com/macros/s/AKfycbzFx4rDH-py3F-vmPQErbllXTN4wWQZq73tZ2IcrDMlI2bR4NE/exec?path=/register')
      .subscribe(response => {

        this.registerForm = response['registerForm'];
      });

  }

}
