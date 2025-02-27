// import { Injectable } from '@angular/core';
// import { Client, MenuDTO } from '../callAPI/api.service';  // Import the necessary classes
// import { Observable, of } from 'rxjs';   // Import Observable and of for returning the data
// import { catchError } from 'rxjs/operators';  // Import catchError to handle errors

// @Injectable({
//   providedIn: 'root'
// })
// export class MenuItemsService {

//   constructor(private client: Client) { }

//   // Method to get menu items and return them as an observable
//   getMenuItems(): Observable<MenuDTO[]> {
//     return new Observable<MenuDTO[]>((observer) => {
//       this.client.getMenu().subscribe(
//         (response: any) => {
//           observer.next(response);  
//           console.log(response);
//           observer.complete(); 
//         },
//         (error) => {
//           console.error('Error fetching menu items:', error);  
//           observer.error(error);  
//         }
//       );
//     }).pipe(
//       catchError((error) => {
//         console.error('Error in observable stream:', error);  
//         return of([]); 
//       })
//     );
//   }
// }
