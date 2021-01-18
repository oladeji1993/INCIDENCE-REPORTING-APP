import { AuthService } from './../services/auth.service';
import { ApiServiceService } from './../services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {

  heading;
  body;
  token;
  data;

  constructor(
    private navParams: NavParams,
    public apiServiceService: ApiServiceService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    public http: HttpClient,
  ) {

    const data = navParams.get('data');
    console.log("Below data is available at edit modal")
    console.log(data);
    if(data) {
      this.data = data;
      this.heading = data.title.rendered;
      let div = document.createElement('div');
      div.innerHTML = data.content.rendered;
      this.body = div.innerText;
    }

  }

  Test() {
    console.log(this.heading)
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

  ngOnInit() {}


  submitPost() {
    console.log("i am working")
    let headers = new Headers()
      return this.http.put("http://latestgist.atwebpages.com/wp-json/wp/v2/posts/", {
      title: this.data.title.rendered,
      content: this.data.content.rendered,
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

}
