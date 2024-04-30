import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-kvvk',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kvvk.component.html',
  styleUrl: './kvvk.component.css',
})
export class KvvkComponent {
  modalVisible: boolean = true;
  constructor( private cookieService: CookieService,) {
     // Eğer daha önce bilgilendirme kabul edilmişse, modalı görünür yapma
     const bilgilendirmeKabulu = this.cookieService.get('Bilgilendirme Kabulu');
     if (bilgilendirmeKabulu === 'True') {
       this.modalVisible = false;
     }
  }

  // Modalı kapatma metodunu tanımla
  closeModal(): void {
    debugger
    this.modalVisible = false;
    if(this.modalVisible === false){
      this.cookieService.set('Bilgilendirme Kabulu','True');
    };
    
  }
}
