import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  FirstName:string='';
  SecondName:string='';
  EmailId:string='';
  password:string='';
  profession:string='';
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      'firstName':[null, Validators.required],
      'secondName':[null, Validators.required],
      'email':[null, Validators.required],
      'username':[null, Validators.required],
      'password':[null, Validators.required]
      });
  }

  onRegister(form:NgForm) {
    this.api.postUser(form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['books']);
        }, (err) => {
          console.log(err);
        });
  }

}
