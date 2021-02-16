import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { CartService } from '../cart.service';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { PriceLimitPage } from '../price-limit/price-limit.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    
  product = [];
  cartItemCount: BehaviorSubject<number>;
  route: any;
  priceLimit=0;
  Total=0;

  constructor(private cartService: CartService, private modalCtrl: ModalController) {}

  
  ngOnInit(){
    this.product = this.cartService.getProduct();
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  
  getTotal(){
    this.Total=this.cartService.getTotal();
    return this.Total;
  }
  getPriceLimit() {
    this.priceLimit =  this.cartService.getPriceLimit();
    return this.priceLimit;
  }

  async openCart(){
    let modalOpenCart= await this.modalCtrl.create({
      component: CartModalPage,
      cssClass : 'cart-modal'
    });
    modalOpenCart.present();
  }

  async setPriceLimit(){
    let modalPriceLimit= await this.modalCtrl.create({
      component: PriceLimitPage,
      cssClass : 'price-limit'
    });
    modalPriceLimit.present();
  }

}
