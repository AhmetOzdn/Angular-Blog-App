import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { getFromAuthModel } from '../../models/getFromAuthModel';
import { getImageModel } from '../../models/getImageModel';
import { ImageComponent } from '../../image/image.component';
export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    RouterLink,
    CommonModule,
    RouterLinkActive,
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css',
})
export class CustomSidenavComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  getFromAuth!: getFromAuthModel;
  getImage!: getImageModel;
  ngOnInit(): void {
    //Kullanıcı bilgilerini getirmek için
    this.accountService.getAuth().subscribe({
      next: (data) => {
        this.getFromAuth = data;
        // console.log('Get From Auth Başarılı ! :', data);
      },
      error: (err) => {
        // console.log('Get From Auth Başarısız ! :', err);
      },
    });

    //Resim bilgisini getirmek için
    this.accountService.getImage().subscribe({
      next: (response) => {
        this.getImage = response;
        // console.log('Get Image İşlemi Başarılı ! :', response);
      },
      error: (err) => {
        // console.log('Get Image İşlemi Başarısız ! :', err);
      },
    });
  }

  
  /* Burası Sidebar'ın küçültüldüğünde yazıların da aynı oranda kaydırılmasını sağlar */
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Ceo', route: 'ceo' },
    { icon: 'edit', label: 'Content Edit', route: 'contentedit' },
    // { icon: 'analytics', label: 'Analytics', route: 'analytics' }, şimdilik kapalı kalıcak
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
}
