import { Component, OnInit } from '@angular/core';
import { SubjectDetailsListModel } from '../models/subject-details-list-model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubjectService } from '../services/subject.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubjectModel } from '../models/subject.model';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
@Component({
  selector: 'app-subject-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NgxPaginationModule],
  templateUrl: './subject-page.component.html',
  styleUrl: './subject-page.component.css',
})
export class SubjectPageComponent implements OnInit {
  subjects: SubjectDetailsListModel[] = [];
  page: number = 1;
  itemsPerPage: number = 10; // her sayfada kaç adet subject görüntülenecek onu burada söylüyoruz
  totalSubject: any;
  constructor(
    private subjectService: SubjectService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    // //? Kategori Filitreleme işlemi
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.subjectService
          .getListFromSubjectWithCategoryId(params['categoryId'])
          .subscribe((subjects) => {
              this.subjects = subjects.items;
          });
      } else {
        this.loadSubjects();
      }
    });
  }


  loadSubjects(): any {
    this.subjectService.getSubjects().subscribe(
      (data) => {
        this.subjects = data;
        this.totalSubject = data.length;
      },
      (error) => {
        console.error('Subjects get hatası :', error);
      }
    );
  }
}
