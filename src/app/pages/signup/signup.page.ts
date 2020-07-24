import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/app/config/auth-constants';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public postData={
    email:'',
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

  signupAction(){
    if(this.validateInputs()){
      this.authService.signup(this.postData).subscribe((res:any)=>{
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
