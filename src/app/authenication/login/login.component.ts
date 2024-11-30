import { Component, inject, OnInit } from '@angular/core';
import { AuthserviceService } from '../service/authservice.service';
import { User } from '../../models/User';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  authService = inject(AuthserviceService)
  router = inject(Router);
  email: string = '';
  password: string = '';
  loginEmail: string = '';
  loginPassword: string = '';
  firstName: string = '';
  lastName: string = '';

  isLoggedIn = false;
 

  ngOnInit() {
    console.log('Initial Email:', this.email);
    console.log('Initial Password:', this.password);
    if(this.isLoggedIn){
      //navigate to search
      this.router.navigate(['/search']); 
    
    }
  }


  activeSection: string = 'login';
  setActiveSection(section: string) {
    this.activeSection = section;
    if (section === 'login' || section === 'registration') {
      this.email = '';
      this.password = '';
    }
  }
  

  register() {
    const user: User = {
      id: 0,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }
    console.log(`Registering user:`, user);


    this.authService.registerUser(user).subscribe(
      (response: any) => {
        console.log('Status:', response.status);
        console.log('Message:', response.message);
        // reset the user 

      },
      (error: any) => {
        console.error('Registration error:', error);
      }
    );

  }
  login() {

    this.authService.login(this.loginEmail, this.loginPassword).subscribe(
      (response: any) => {
        console.log(response)
        if(response.status == true){
          this.isLoggedIn = true;
          this.router.navigate(['/search']);
        }
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
}
