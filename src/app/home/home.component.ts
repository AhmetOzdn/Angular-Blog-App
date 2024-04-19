import { Component} from '@angular/core';
import { SubjectPageComponent } from '../subject-page/subject-page.component';
import { CategoriesComponent } from '../categories/categories.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SubjectPageComponent,CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {



}
