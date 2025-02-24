import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Client, LoginDTO } from '../services/callAPI/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private client: Client, private router: Router) { }

  login(userName: string, password: string): void {
    const loginData: LoginDTO = new LoginDTO({ userName, password });
    this.client.login(loginData).subscribe(
      (response: any) => {
        const token = response.result;
        if (token) {
          localStorage.setItem("token", token);
          console.log("Login successful, token stored:", token);      
          this.router.navigate(['/dashboard']);
        } else {
          console.error("Login failed: No token received");
        }
      },
      (error) => {
        console.error("Login failed", error);
      }
    );
  }
  
  isLoggedIn(){
    return localStorage.getItem('token')!= null?true : false;
  }
}
