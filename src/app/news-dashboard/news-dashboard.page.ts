import { EditModalComponent } from './../edit-modal/edit-modal.component';
import { AuthService } from './../services/auth.service';
import { content } from './../classes/content';
import { ApiServiceService } from './../services/api-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController, ModalController, } from '@ionic/angular';
import { Shared } from '../services/Shared/shared';
import { Camera, CameraResultType, CameraSource } from '@capacitor/core';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-news-dashboard',
  templateUrl: './news-dashboard.page.html',
  styleUrls: ['./news-dashboard.page.scss'],
})
export class NewsDashboardPage implements OnInit {

  listContents: content[];
  title: string = "";
  content: string = "";
  token: string;
  id: number;
  count: number;
  submitted: false

  constructor(
    public http: HttpClient,
    public router: Router,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public apiServiceService: ApiServiceService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private modalController: ModalController,
    private shared: Shared,
    public photoService: PhotoService
    
  


    ) { }
   
    // load post from wordoress site using a service 
    loadData(){
      this.apiServiceService.getContent()
      .subscribe( data => {
          console.log(data);
          this.listContents = data;
          
      })
    }


    addPhotoToGallery() {
      this.photoService.addNewToGallery();
    }


    // Get token
    getToken(){

      this.http.post('http://latestgist.atwebpages.com/wp-json/jwt-auth/v1/token', {

        username: "admin",
         password: "Olanipekun_1993"

        }).subscribe((data) => {

          if (data['token']) { // if token is returned
          this.token = data['token'];
          console.log(this.token);
          }
        }); 
      }


  //create post
  sendPost() {
    console.log("i am working")
    let headers = new Headers()
      return this.http.post("http://latestgist.atwebpages.com/wp-json/wp/v2/posts/", {
      title: this.title,
      content: this.content,
      status:'publish'},{
      headers:new HttpHeaders ({
      'content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ` + this.token
    })
  }).subscribe(result =>{
    console.log(result)
  })

}

// LOGOUT
async logoutUser(): Promise<void> {
  this.authService.logoutUser().then(
    () => {
      this.router.navigate(['login-page']);
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

//  edit post modal

async lauchModal(data) {
  const modal = await this.modalController .create({
    component: EditModalComponent,
    cssClass: 'my-custom-class',
    componentProps: { data }
  });
  return await modal.present();
}

  ngOnInit() {
    this.loadData()
    this.getToken()
    // this.ClearFields()
    // this.postData()
  }

  // Camera functionality

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100 
    });
  }


      // to delete post in the site
      deletePost(id) {
      console.log("i am working");
      this.id = id;
      console.log(this.id)
      let headers = new Headers()
        return this.http.delete("http://latestgist.atwebpages.com/wp-json/wp/v2/posts/" + id,{
        headers:new HttpHeaders ({
        'content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ` + this.token
      })
    }).subscribe(output =>{
      console.log(output)
    })

    }
}

  


