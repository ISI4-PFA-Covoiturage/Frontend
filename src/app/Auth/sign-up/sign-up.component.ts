import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterPayload } from '../register-payload';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 
  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
    this.registerForm = this.formBuilder.group({
      cin: new FormControl('',Validators.required),
      prenom: new FormControl('',Validators.required),
      nom: new FormControl('',Validators.required),
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      tel:new FormControl('',[
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(new RegExp("[0-9 ]{10}"))
      ]),
      sexe:'Sexe',
      date_naiss: new FormControl('',Validators.required),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('',Validators.required)
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });

    this.registerPayload = {
      cin: '',
      prenom: '',
      nom: '',
      email: '',
      tel:'',
      sexe:'',
      date_naiss:new Date(Date.now()),
      password: ''
     // confirmPassword: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.registerPayload.cin = this.registerForm.get('cin').value;
    this.registerPayload.prenom = this.registerForm.get('prenom').value;
    this.registerPayload.nom = this.registerForm.get('nom').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.tel = this.registerForm.get('tel').value;
    this.registerPayload.sexe = this.registerForm.get('sexe').value;
    this.registerPayload.date_naiss = this.registerForm.get('date_naiss').value;
    this.registerPayload.password = this.registerForm.get('password').value;
   // this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword').value;

    this.authService.register(this.registerPayload).subscribe(data => {
      console.log('register succes');
      this.router.navigateByUrl('/signin');
    }, error => {
      console.log('register failed');
    });
  }


}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

