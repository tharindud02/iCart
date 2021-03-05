import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { fireConfig } from './firebase';
import { CartModalPageModule } from './cart-modal/cart-modal.module';
import { PriceLimitPageModule } from './price-limit/price-limit.module';
import { CheckoutPageModule } from './checkout/checkout.module';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { AngularFirestore,AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    FormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(fireConfig),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    CartModalPageModule,
    PriceLimitPageModule,
    CheckoutPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    QRScanner,
    GooglePlus,
    Dialogs
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
