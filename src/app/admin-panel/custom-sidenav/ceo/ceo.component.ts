import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthorEditPageComponent } from './author-edit-page/author-edit-page.component';
import { AdminService } from '../../../services/admin.service';
import { UserDetailModel } from '../../../models/User.Detail.Model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { AuthService } from '../../../services/auth-.service';




@Component({
  selector: 'app-ceo',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatPaginatorModule,MatTableModule,FormsModule, MatFormFieldModule, MatInputModule,MatSortModule],
  templateUrl: './ceo.component.html',
  styleUrl: './ceo.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CeoComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastname', 'email', 'claim','delete'];
  authorities: UserDetailModel[] = [];
  dataSource: MatTableDataSource<UserDetailModel> = new MatTableDataSource<UserDetailModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private matDialog: MatDialog,
    private adminService: AdminService,
  ) {}

  //Get Operation Claims
  ngOnInit(): void {
    this.loadAuthory();
  }
  
  //?Tablo Bilgileri
  loadAuthory(){
    this.adminService.getAuthory().subscribe((claims) => {
      this.authorities = claims;
      this.dataSource.data = this.authorities; // sayfalama yapısı için
      this.dataSource.paginator = this.paginator; // sayfalama yapısı için
      this.dataSource.sort = this.sort; // arama yapmak için 
      // console.log(this.authorities);
    });
  }


  //? Filtreleme İşlemi
  filterChange(data:Event){
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

   //! Delete
   deleteAuthory(id: any): void {
    this.adminService.deleteAuthory(id).subscribe(
      () => {
        // Başarıyla silindiyse yapılacak işlemler
        console.log('Yetkili başarıyla silindi.');
        this.loadAuthory();  
      
      },
      (error) => {
        // Hata durumunda yapılacak işlemler
        console.error('Yetkili silme hatası:', error);
      }
    );
  }

 

  //!Customer-Edit Pop-up
  openAuthorEditPage(author: UserDetailModel): void {
    this.matDialog.open(AuthorEditPageComponent, {
      width: '60%',
      height: 'auto',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName,
        email: author.email,
        rolesAndClaims: author.rolesAndClaims,
      },
    });
  }
}
