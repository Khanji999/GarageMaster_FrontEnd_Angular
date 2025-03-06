import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'; 
import { Client, LoginDTO } from '../services/callAPI/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private client: Client, private router: Router) { }

  login(userName: string, password: string): Observable<boolean> {
    const loginData: LoginDTO = new LoginDTO({ userName, password });
    return new Observable<boolean>((observer) => {
      this.client.login(loginData).subscribe(
        (response: any) => {
          console.log(response);
          
          var token = response.result;
          if (token) {
            localStorage.setItem("token", token);
            console.log("Login successful, token stored:", token);
            observer.next(true); 
            observer.complete();
            this.router.navigate(['/dashboard']);
          } else {
            console.error("Login failed: No token received");
            observer.next(false); 
            observer.complete();
          }
        },
        (error) => {
          console.error("Login failed", error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  isLoggedIn() {
    var token =  localStorage.getItem('token');
    if(token == null || token ==""){
      return false
    }
    try {
      const payloadBase64 = token.split('.')[1]; // Extract payload
      const decodedPayload = JSON.parse(atob(payloadBase64)); // Decode Base64
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedPayload.exp < currentTime) {
          localStorage.removeItem('token'); // Delete expired token
          return false;
      }

      return true;
  } catch (error) {
      localStorage.removeItem('token'); // Delete invalid token
      return false;
  }
  }
}
