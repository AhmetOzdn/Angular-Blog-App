import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css',
})
export class ImageComponent {
  selectedFile: File | null = null;

  constructor(private accountService: AccountService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    debugger
    if (!this.selectedFile) {
      alert('Lütfen bir dosya seçin.');
      return;
    }

    this.accountService.uploadImage(this.selectedFile).subscribe(
      (response) => {
        console.log('Resim yüklendi:', response);
      },
      (error) => {
        console.error('Resim yüklenemedi:', error);
      }
    );
  }
}
