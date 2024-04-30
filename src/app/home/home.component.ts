import { Component, OnInit} from '@angular/core';
import { SubjectPageComponent } from '../subject-page/subject-page.component';
import { CategoriesComponent } from '../categories/categories.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KvvkComponent } from '../kvvk/kvvk.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SubjectPageComponent,CategoriesComponent,RouterOutlet,CommonModule,KvvkComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  
}
