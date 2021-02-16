import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-price-limit',
  templateUrl: './price-limit.page.html',
  styleUrls: ['./price-limit.page.scss'],
})
export class PriceLimitPage implements OnInit {
  priceLimit:number;
  constructor( private cartService: CartService,private alertCtrl: AlertController) { }

  ngOnInit() {

  }


  async setLimit(){
    if(this.priceLimit > 0){
    this.cartService.setPriceLimit(this.priceLimit);
    this.cartService.close();
    }else{
        let alertPriceLimit = await this.alertCtrl.create({
          message: "Please Set Price Limit. !!!",
          buttons: ['Close']
        });
        alertPriceLimit.present();
    }
  }

  close(){
    this.cartService.close();
  }
}
