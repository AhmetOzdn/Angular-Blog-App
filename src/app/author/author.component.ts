import { Component, OnInit, inject } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
})
export class AuthorComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private subjectService: SubjectService,
    private router: Router
  ) {}
  categories: Category[] = [];
  error: string = '';
  model: any = {}; // model ataması yapılacak
  selectedFile: File | null = null;

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveSubject(
    categoryId: number,
    title: string,
    text: string,
    summary: string,
  ) {
    debugger;
    if (!this.selectedFile) {
      alert('Lütfen bir dosya seçin.');
      return;
    }
  
    const postData = new FormData();
    postData.append('categoryId', categoryId.toString());
    postData.append('title', title);
    postData.append('text', text);
    postData.append('summary', summary);
    postData.append('bucketName', 'flepix-blog-subjectfiles');
    postData.append('formFile', this.selectedFile, this.selectedFile.name);

    this.subjectService.uploadSubject(postData).subscribe((subjectdata) => {
      this.router.navigate(['/']);
      console.log(subjectdata);
    });
    console.log(postData);
  }
  
}
