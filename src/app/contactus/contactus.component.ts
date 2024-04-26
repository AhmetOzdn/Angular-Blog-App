import { Component } from '@angular/core';
import { ContactusService } from '../services/contactus.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContactUsModel } from '../models/contactus.model';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css',
})
export class ContactusComponent {
  model: any = {}; // model ataması yapılacak
  constructor(private contactUsService: ContactusService) {}

  postContactUs(name: string, emailAddress: string, message: string) {
    const contactus = new ContactUsModel(name, emailAddress, message);
    this.contactUsService.postContactUs(contactus).subscribe(
      () => {
        alert('Talebinizi aldık en kısa sürede size geri dönüş yapacağız.');
        // console.log('Talebiniz başarıyla gönderildi.');
        this.reloadPage();
      },
      (error) => {
        // console.error('post  hatası:', error);
      }
    );
  }

   // Sayfanın yenilenmesi için örnek bir fonksiyon
   reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 200); 
  }
}
