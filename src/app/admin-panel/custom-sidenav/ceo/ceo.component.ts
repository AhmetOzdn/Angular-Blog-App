import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  NO_ERRORS_SCHEMA,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthorCreatePageComponent } from './author-create-page/author-create-page.component';
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
    private adminService: AdminService
  ) {}

  //Get Operation Claims
  ngOnInit(): void {
    this.getAuthory();
  }

 

  getAuthory(): void {
    this.adminService.getAuthory().subscribe((claims) => {
      this.authorities = claims;
      this.dataSource.data = this.authorities;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.authorities);
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
        // Ürünleri tekrar yükle
        this.getAuthory();
      },
      (error) => {
        // Hata durumunda yapılacak işlemler
        console.error('Yetkili silme hatası:', error);
      }
    );
  }

  //!author pop-up'ını açmak için kullandık
  openAuthorCreatePage() {
    this.matDialog.open(AuthorCreatePageComponent);
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
