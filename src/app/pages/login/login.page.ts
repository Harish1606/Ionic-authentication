import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public postData={
    username:'',
    password:''
  };

  constructor(private router:Router,
              private authService:AuthService,
              private storageService:StorageService,
              private toastService:ToastService) { }

  ngOnInit() {
  }

  validateInputs(){
    let username=this.postData.username.trim();
    let password=this.postData.password.trim();
    return(this.postData.username && this.postData.password && username.length>2 && password.length>0);
  }

  loginAction(){
    if(this.validateInputs()){
      this.authService.login(this.postData).subscribe((res:any)=>{
        if(res.userData){
          this.storageService.store(AuthConstants.AUTH,res.userData);
          this.router.navigate(['home']);
        }
        else{
          this.toastService.presentToast('Incorrect username or password');
        }
      },
      (error:any)=>{
        this.toastService.presentToast('Network connection error');
      })
    }
    else{
      this.toastService.presentToast("Please give some information");
    }
  }

}
