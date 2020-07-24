import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  
  displayUserData:any;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.userData$.subscribe((res:any)=>{
      this.displayUserData=res;
    })
  }
  logoutAction(){
    this.authService.logout();
  }
}
