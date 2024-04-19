import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../image/image.component';
import { AccountService } from '../services/account.service';
import { getFromAuthModel } from '../models/getFromAuthModel';
import { error } from 'console';
import { getImageModel } from '../models/getImageModel';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  getFromAuth!: getFromAuthModel;
  getImage!: getImageModel;

  ngOnInit(): void {
    //Kullanıcı bilgilerini getirmek için
    this.accountService.getAuth().subscribe({
      next: (data) => {
        this.getFromAuth = data;
        console.log('Get From Auth Başarılı ! :', data);
      },
      error: (err) => {
        console.log('Get From Auth Başarısız ! :', err);
      },
    });

    //Resim bilgisini getirmek için
    this.accountService.getImage().subscribe({
      next: (response) => {
        this.getImage = response;
        console.log('Get Image İşlemi Başarılı ! :', response);
      },
      error: (err) => {
        console.log('Get Image İşlemi Başarısız ! :', err);
      },
    });
  }



  
}
