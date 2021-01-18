import { EditModalComponent } from './edit-modal/edit-modal.component';
import { firebaseConfig } from './credentials';
import { ApiServiceService } from './services/api-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { Shared } from './services/Shared/shared';






@NgModule({
  declarations: [AppComponent, EditModalComponent],
  entryComponents: [EditModalComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, IonicModule.forRoot(), 
    AppRoutingModule,AngularFireAuthModule,],  
  providers: [
    StatusBar,
    ApiServiceService,
    SplashScreen,
    Shared,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
