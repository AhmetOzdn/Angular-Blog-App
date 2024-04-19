import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getFromAuthModel } from '../models/getFromAuthModel';
import { getImageModel } from '../models/getImageModel';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  getFromAuthUrl = 'https://localhost:7068/api/Users/GetFromAuth'; 
  imagePostUrl ='https://localhost:7068/api/Files/UploadPPFile?bucketName=flepix-blog-files';
  imageGetUrl = "https://localhost:7068/api/Files/GetByUserIdPPFile";
  constructor(private http: HttpClient) {}

  getAuth(): Observable<getFromAuthModel> {
    return this.http.get<getFromAuthModel>(this.getFromAuthUrl);
  }

  uploadImage(selectedFile: File) {
    const formData = new FormData();
    formData.append('formFile', selectedFile, selectedFile.name);
    debugger
    return this.http.post(this.imagePostUrl, formData);
  }

  getImage(){
    return this.http.get<getImageModel>(this.imageGetUrl);
  }
}
