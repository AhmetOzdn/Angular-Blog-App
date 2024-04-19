import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from './custom-sidenav/custom-sidenav.component';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';

/*Calender*/
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthorEditPageComponent } from './custom-sidenav/ceo/author-edit-page/author-edit-page.component';
import { CategoryEditPageComponent } from './custom-sidenav/content-editing/category-edit-page/category-edit-page.component';
import { CategoryService } from '../services/category.service';
import { AuthorCreatePageComponent } from './custom-sidenav/ceo/author-create-page/author-create-page.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    MatCardModule,
    /*Calender*/
    MatDatepickerModule,
    MatFormField,
    MatInputModule,
    NativeDateModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  //Calender
  selected: Date;

  constructor(private dialogref: MatDialog) {
    this.selected = new Date();
  }

  onDateSelected(event: any): void {
    this.selected = event;

  }
  //Calender
  //admin paneldeki açılır menüyü açıp kapatmak için yazıldı
  collapsed = signal(false);
  sidenavWitdh = computed(() => (this.collapsed() ? '65px' : '300px'));

 


}
