import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthoryModel } from '../models/authority.model';
import { Observable, map } from 'rxjs';
import { UserDetailModel } from '../models/User.Detail.Model';
import { popUpClaimModel } from '../models/popUpClaimModel';
import { claimUpdateModel } from '../models/claimupdate.model';
import { operationClaimsModel } from '../models/operation.claims.model';
import { UserOperationClaimsModel } from '../models/userOperationClaims.model';
import { RolesAndClaimsModel } from '../models/RolesAndClaimsModel';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  postOperationClaims = 'https://localhost:7068/api/OperationClaims';
  getOperationClaims ='https://localhost:7068/api/Users/GetListDetail?PageIndex=0&PageSize=10';
  deleteOperationClaims = 'https://localhost:7068/api/Users';
  getPopUpClaimUrl = "https://localhost:7068/api/OperationClaims?PageIndex=0&PageSize=10";
  updateClaimUrl = "https://localhost:7068/api/UserOperationClaims";
  postUserClaimUrl ="https://localhost:7068/api/UserOperationClaims";
  deleteUserOperationClaim= "https://localhost:7068/api/UserOperationClaims";
  constructor(private http: HttpClient) {}

  createAuthory(authory: any): Observable<any> {
    return this.http.get<AuthoryModel>(this.postOperationClaims, authory);
  }

  getAuthory(): Observable<UserDetailModel[]> {
    return this.http
      .get<any>(this.getOperationClaims)
      .pipe(map((data) => data.items as UserDetailModel[]));
  }

  getAuthoryFromPagination(page:number,limit:number):Observable<any>{
    return this.http.get<any>(`https://localhost:7068/api/Users/GetListDetail?PageIndex=${page.toString()}&PageSize=${limit.toString()}`)
  }
  
  //PopUp Get
  getPopUpClaim():Observable<popUpClaimModel[]>{
    return this.http.get<any>(this.getPopUpClaimUrl).pipe(map((data) => data.items as popUpClaimModel[]));
  }

  deleteAuthory(id: number): Observable<UserDetailModel> {
    const deleteUrl = `${this.deleteOperationClaims}/${id}`;
    return this.http.delete<UserDetailModel>(deleteUrl);
  }

  saveClaim(claim: any): Observable<UserOperationClaimsModel> {
    return this.http.post<UserOperationClaimsModel>(this.postUserClaimUrl,claim);
  }

  deleteClaim(id: number): Observable<RolesAndClaimsModel> {
    const deleteUrl = `${this.deleteUserOperationClaim}/${id}`;
    return this.http.delete<RolesAndClaimsModel>(deleteUrl);
  }

  getClaim():Observable<UserOperationClaimsModel[]>{
    return this.http.get<any>(this.getPopUpClaimUrl).pipe(map((data) => data.items as UserOperationClaimsModel[]));
  }


}
