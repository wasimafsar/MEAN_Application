import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;


  constructor(private apiService : ApiService,
    private router:Router) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.apiService.authenticateUser(user).subscribe(data => {
      if(data){
        if(data.success){
          alert("Login Successful");
          var userName = data.data.userName;
          this.router.navigate(['books',userName]);
        }
        else{
          alert("Login Unsucessful");
        }
      } 
    });
  }

      onsignupSubmit(){
        this.router.navigate(['sign-up']);
      }
      
    
  

}
