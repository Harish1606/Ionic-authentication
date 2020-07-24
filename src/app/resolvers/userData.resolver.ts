import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service'; 

@Injectable({
    providedIn:'root'
})

export class UserDataResolver{
    constructor(private authService:AuthService){}

    resolve(){
        console.log('Calls a home route');
        return this.authService.getUserData();
    }
}