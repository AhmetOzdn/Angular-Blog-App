import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { SubjectModel } from '../../models/subject.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-subject-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './subject-details.component.html',
  styleUrl: './subject-details.component.css'
})
export class SubjectDetailsComponent implements OnInit{
  subject!: SubjectModel;

  constructor(private subjectService: SubjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['subjectid'];
      this.subjectService.getSubjectById(id).subscribe(subject => {
        this.subject = subject;
        debugger
      });
    });
  }


}



