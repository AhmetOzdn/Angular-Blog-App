import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../image/image.component';
import { AccountService } from '../services/account.service';
import { getFromAuthModel } from '../models/getFromAuthModel';
import { getImageModel } from '../models/getImageModel';
import { SubjectService } from '../services/subject.service';
import { SubjectDetailsListModel } from '../models/subject-details-list-model';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ImageComponent, NgxPaginationModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private subjectService: SubjectService
  ) {}
  subjects: SubjectDetailsListModel[] = [];
  getFromAuth!: getFromAuthModel;
  getImage!: getImageModel;
  //?Pagination
  page: number = 1;
  itemsPerPage: number = 5; // her sayfada kaç adet subject görüntülenecek onu burada söylüyoruz
  totalSubject: any;
  
  isAuthor: boolean = false;

  ngOnInit(): void {
    //?Kullanıcı bilgilerini getirmek için
    this.loadUserInformation();
    //?Resim bilgisini getirmek için
    this.loadGetImage();
    //?Author Subjectleri
    this.loadAuthorSubjects();
    //?Author sorgusu
     this.isLoginAuthor();
  }

  //*Author Subjectleri
  loadAuthorSubjects() {
    this.subjectService.GetListFromAuth().subscribe({
      next: (data) => {
       this.subjects = data;
        // console.log('Yazarın Konuları Başarıyla geldi :',data);
      },
      error: (err) => {
        // console.log('Yazarın Konuları get hatası :',err);
      },
    });
  }
  //*Author sorgusu
  isLoginAuthor() {
    this.accountService.getAuthWithClaim().subscribe((data) => {
      this.isAuthor = data.rolesAndClaims.some(
        (item) => item.name === 'Author'
      );
    });
  }

  //*Resim bilgisini getirmek için
  loadGetImage() {
    this.accountService.getImage().subscribe({
      next: (response) => {
        this.getImage = response;
        // console.log('Get Image İşlemi Başarılı ! :', response);
      },
      error: (err) => {
        // console.log('Get Image İşlemi Başarısız ! :', err);
      },
    });
  }

  //*Kullanıcı bilgilerini getirmek için
  loadUserInformation(){
    this.accountService.getAuth().subscribe({
      next: (data) => {
        this.getFromAuth = data;
        // console.log('Get From Auth Başarılı ! :', data);
      },
      error: (err) => {
        // console.log('Get From Auth Başarısız ! :', err);
      },
    });
  }

  
}
