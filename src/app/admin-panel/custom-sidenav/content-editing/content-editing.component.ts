import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryEditPageComponent } from './category-edit-page/category-edit-page.component';
import { CommonModule } from '@angular/common';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
@Component({
  selector: 'app-content-editing',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatPaginatorModule,MatTableModule,FormsModule, MatFormFieldModule, MatInputModule,MatSortModule],
  templateUrl: './content-editing.component.html',
  styleUrl: './content-editing.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContentEditingComponent implements OnInit {
  constructor(private matDialog: MatDialog,private categoryService:CategoryService){}
  //? Tablo İçin Gerekli Olan Elemanlar
  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'delete'];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  //! Get
  ngOnInit(): void {
  this.loadCategories();
  }
 
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        this.dataSource.data = this.categories;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        // console.error('Kategori alma hatası:', error);
      }
    );
  }

  //? Filtreleme İşlemi
  filterChange(data:Event){
    const value=(data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  //POP-UP
  openCreateCategoryPage() {
    this.matDialog.open(CategoryEditPageComponent,{
      width: '25%',
      height: 'auto',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }


  // Delete
  deleteCategory(id: any): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        // Başarıyla silindiyse yapılacak işlemler
        // alert('Kategori başarıyla silindi.');
        // Ürünleri tekrar yükle
        this.reloadPage() ;
        this.loadCategories();
      },
      (error) => {
        // Hata durumunda yapılacak işlemler
        // console.error('Kategori silme hatası:', error);
      }
    );
  }


reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 500); 
  }
  

  


}
