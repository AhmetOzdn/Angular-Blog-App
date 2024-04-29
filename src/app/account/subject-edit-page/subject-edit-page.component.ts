import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-subject-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './subject-edit-page.component.html',
  styleUrl: './subject-edit-page.component.css',
})
export class SubjectEditPageComponent implements OnInit {
  constructor(
    private matDialogRef: MatDialogRef<SubjectEditPageComponent>,
    @Inject(MAT_DIALOG_DATA) public subject: any,
    private buildr: FormBuilder,
  ) {}
  inputSubject: any;
  //Get Operation Claims
  ngOnInit(): void {
    this.loadDatas();
  }

  loadDatas() {
    //Ana Componentten aldığımız bilgiler burada bu componet'e aktarılıyor
    this.inputSubject = this.subject;
  }

  popUpForm = this.buildr.group({
    // claim:this.buildr.control(''), input değerini burada alıyorduk html den
    operationClaimId: this.buildr.control(''),

  });

  savePopUpData(userId: number) {
    const data = {
      userId: userId,
      operationClaimId: this.popUpForm.value.operationClaimId,
    };

  //   this.subjectService.updateSubject(data).subscribe({
  //     next: (res) => {
  //       alert('Yetki ekleme işlemi başarıyla tamamlandı!');
  //       this.closePopUp();
  //       // console.log(res);

  //       // Sayfanın yenilenmesi
  //       this.reloadPage(); // Örnek bir fonksiyon adı
  //     },
  //     error: (err) => {
  //       alert('Yetki ekleme işlemi başarısız oldu!');
  //       // console.log('Yetki ekleme hatası', err);
  //     },
  //   });
   }

  // Sayfanın yenilenmesi için örnek bir fonksiyon
  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  //Close Pop Up
  closePopUp() {
    this.matDialogRef.close();
  }
}
