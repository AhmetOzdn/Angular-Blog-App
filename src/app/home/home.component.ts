import { Component, OnInit} from '@angular/core';
import { SubjectPageComponent } from '../subject-page/subject-page.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SubjectPageComponent,CategoriesComponent,RouterOutlet,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    
  }
  
}
