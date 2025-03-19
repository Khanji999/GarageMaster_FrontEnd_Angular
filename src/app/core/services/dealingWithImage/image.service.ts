import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {FileParameter, ImageContro } from "../callAPI/api.service";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  constructor(private imageContro : ImageContro) {}

  uploadImage(file: File): Observable<void> {
  const fileParam: FileParameter = {
      data: file,
      fileName: file.name
    };
    return this.imageContro.upload(fileParam); 
  }

}
