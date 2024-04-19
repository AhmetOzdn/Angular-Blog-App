import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthoryModel } from '../../../../models/authority.model';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-author-create-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './author-create-page.component.html',
  styleUrl: './author-create-page.component.css'
})
export class AuthorCreatePageComponent {
  // Authority: AuthoryModel[] = [];
  // constructor(private adminService:AdminService,private router:Router){}

  // saveAuthory(name:any){
  //   this.adminService.createAuthory({name:name.value}).subscribe(data => {
  //     this.router.navigate(["/admin/contentedit"]);
  //     console.log(data);
  //   })
  // }

}
