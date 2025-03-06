import { Injectable } from '@angular/core';
import { Client, UserDTO } from '../callAPI/api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private client: Client) {} // Inject the generated client

  getUsers(): Observable<UserDTO[]> {
    return this.client.getAll40().pipe(
      map((response: any) => {
        console.log(response); 
        return response.result; 
      })
    );
  }
}

