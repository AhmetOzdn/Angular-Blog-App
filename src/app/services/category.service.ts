import { Injectable } from '@angular/core';
import { Observable,map} from 'rxjs';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  getCategoryUrl ='https://localhost:7068/api/Categories?PageIndex=0&PageSize=100';
  postCategoryUrl = 'https://localhost:7068/api/Categories';
  deleteCategoryUrl = 'https://localhost:7068/api/Categories';
  constructor(private http:HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(this.getCategoryUrl).pipe(
      map((data) =>  data.items as Category[])
    );
  }

  createCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(this.postCategoryUrl,category);
  }

  deleteCategory(id: number): Observable<Category> {
    const deleteUrl = `${this.deleteCategoryUrl}/${id}`;
    return this.http.delete<Category>(deleteUrl);
  }
  
}
