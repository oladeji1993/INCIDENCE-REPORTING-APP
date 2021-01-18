import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  email:string
  password:string
  user: any

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}
  
  async loginUser(form): Promise<void> {
    this.authService.loginUser(form.value.email, form.value.password).then(
      () => {
        this.router.navigate(['news-dashboard']);
      },
      async error => {
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        await alert.present();
      }
    );
  }
  
  ClearFields() {

    this.email = " ";
    this.password = " ";
  }
  

  
  ngOnInit() {
    this.ClearFields()
  }

  // async goToHome(form):Promise<void>{
  
  // }
  goToSign(){
    this.router.navigate(['signup']);
  }

  goToReset(){
    this.router.navigate(['forgot-password']);
  }

}
