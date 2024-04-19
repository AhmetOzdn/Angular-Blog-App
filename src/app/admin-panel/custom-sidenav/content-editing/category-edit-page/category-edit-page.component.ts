import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';
import { Category } from '../../../../models/category.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-edit-page',
  standalone: true,
  imports: [],
  templateUrl: './category-edit-page.component.html',
  styleUrl: './category-edit-page.component.css'
})
export class CategoryEditPageComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoryService: CategoryService, private router: Router, private matDialogRef: MatDialogRef<CategoryEditPageComponent>) { }

  ngOnInit(): void {
  }

  //!Save Category
  saveCategory(name: any) {
    this.categoryService.createCategory({ id: 0, name: name.value }).subscribe(data => {
      alert("Kategori başarıyla eklendi.");
      this.closePopUp();
      // Sayfayı yenile
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(["/admin/contentedit"]);
    });
  }

  //!Close Pop Up
  closePopUp() {
    this.matDialogRef.close();
  }

}
