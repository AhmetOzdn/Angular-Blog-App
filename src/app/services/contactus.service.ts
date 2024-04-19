import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ContactUsModel} from '../models/contactus.model';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  postUrl = "https://localhost:7068/api/FeedBacks";
  getUrl = "https://localhost:7068/api/FeedBacks?PageIndex=0&PageSize=10";
  
  constructor(private http:HttpClient) { }

  postContactUs(contactus:ContactUsModel):Observable<ContactUsModel>{
   return this.http.post<any>(this.postUrl,contactus);
  }

  getContactUs(): Observable<ContactUsModel[]> {
    return this.http.get<any>(this.getUrl).pipe(
      map((data) =>  data.items as ContactUsModel[])
    );
  }

 




}
