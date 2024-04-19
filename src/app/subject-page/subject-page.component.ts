import { Component, OnInit } from '@angular/core';
import { SubjectDetailsListModel } from '../models/subject-details-list-model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-subject-page',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './subject-page.component.html',
  styleUrl: './subject-page.component.css'
})
export class SubjectPageComponent implements OnInit {
  
  subjects: SubjectDetailsListModel[] = [];
  constructor(private subjectService: SubjectService,private activatedRoute:ActivatedRoute) {}


 ngOnInit() {
   this.subjectService.getSubjects().subscribe((subjects) => {
     this.subjects = subjects;
    //  console.log(subjects); //Subject Listesi Döndümü Diye Kontrol Ettik 
     this.activatedRoute.params.subscribe(params =>{
       console.log(params["subjectid"]);
    })
   });
 }

 loadSubjects(): any {
  this.subjectService.getSubjects().subscribe(
    (data) => {
      this.subjects = data;
    },
    (error) => {
      console.error('Subjects get hatası :', error);
    }
  );
}
}


