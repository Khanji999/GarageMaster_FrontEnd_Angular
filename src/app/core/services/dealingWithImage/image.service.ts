import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {  Client, FileParameter } from "../callAPI/api.service";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  constructor(private client: Client) {}

  uploadImage(file: File): Observable<void> {
  const fileParam: FileParameter = {
      data: file,
      fileName: file.name
    };
    return this.client.upload(fileParam); 
  }

}
