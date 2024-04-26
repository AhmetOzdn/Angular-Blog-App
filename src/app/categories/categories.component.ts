import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  displayAll = true //? tüm kategorilere active klasını eklemek için kullanılıyor
  selectedCategory :Category | null = null;
  categoryService = inject(CategoryService);
  subjectService = inject(SubjectService);

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }


  selectCategory(category?:Category){
    if(category){
      this.selectedCategory = category;
      this.displayAll = false;
    }else{
      this.selectedCategory = null;
      this.displayAll= true;
    }
  }
}
