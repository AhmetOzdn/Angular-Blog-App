import { CUSTOM_ELEMENTS_SCHEMA,Component,Inject,OnInit,} from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { popUpClaimModel } from '../../../../models/popUpClaimModel';
import { CommonModule } from '@angular/common';
import { UserDetailModel } from '../../../../models/User.Detail.Model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-edit-page',
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
  templateUrl: './author-edit-page.component.html',
  styleUrl: './author-edit-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthorEditPageComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<AuthorEditPageComponent>,
    private buildr: FormBuilder,
  ) {}
  claims: popUpClaimModel[] = [];
  authorities: UserDetailModel[] = [];
  inputData: any;

  //Get Operation Claims
  ngOnInit(): void {
    this.loadDatas();
  }

  loadDatas() {
    //Ana Componentten aldığımız bilgiler burada bu componet'e aktarılıyor
    this.inputData = this.data;
    // console.log(this.inputData); // Ana Componentten aldığımız bilgiler burada bu componet'e aktarılıyormu diye kontrol etim

    this.adminService.getAuthory().subscribe((authority) => {
      this.authorities = authority;
    });

    this.adminService.getPopUpClaim().subscribe((claim) => {
      this.claims = claim;
    });
  }

  //Form Bilgilerini burada çekiyoruz
  popUpForm = this.buildr.group({
    // claim:this.buildr.control(''), input değerini burada alıyorduk html den
    operationClaimId: this.buildr.control(''),

  });

  savePopUpData(userId: number) {
    const data = {
      userId: userId,
      operationClaimId: this.popUpForm.value.operationClaimId,
    };
  
    this.adminService.saveClaim(data).subscribe({
      next: (res) => {
        alert('Yetki ekleme işlemi başarıyla tamamlandı!');
        this.closePopUp();
        // console.log(res);
  
        // Sayfanın yenilenmesi
        this.reloadPage(); // Örnek bir fonksiyon adı
      },
      error: (err) => {
        alert('Yetki ekleme işlemi başarısız oldu!');
        // console.log('Yetki ekleme hatası', err);
      },
    });
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

  deleteClaim(userOperationClaimId:number){
    this.adminService.deleteClaim(userOperationClaimId).subscribe({
      next:(res) => {
        alert('Yetki silme işlemi başarılyla tamamlandı!');
        this.reloadPage();
        // console.log('Yetki silme işlemi başarılı :' , res);
      },
      error:(err) => {
        alert('Yetki silme işlemi başarısız oldu!');
        // console.log('Yetki ekleme hatası', err);
      }
    })
  }
}
