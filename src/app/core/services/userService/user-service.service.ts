import { Injectable } from '@angular/core';
import {  UserContro, UserDTO } from '../callAPI/api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  constructor(private userContro: UserContro) {}

  getUsers(): Observable<UserDTO[]> {
    return this.userContro.getAll().pipe(
      map((response: any) => {
        return response.result; 
      })
    );
  }
}

