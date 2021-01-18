import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email:string
  password:string

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}
  

  async signupUser(): Promise<void> {
    
    console.log(this.email)
    console.log(this.password)
    this.authService.signupUser(this.email, this.password).then(
      () => {
        this.router.navigateByUrl('login-page');
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
  ngOnInit() {

  }
  back() {
    this.router.navigate(["login-page"])
  }


  goToSign(){
    this.router.navigate(["login-page"])
  }


}
