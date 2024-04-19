import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiUrl = "APİ GELİCEK";

  constructor(private http:HttpClient) { }

  uploadPhoto(photo: File) {
    const formData = new FormData();
    formData.append('photo', photo);

    return this.http.post(this.apiUrl, formData);
  }
}
