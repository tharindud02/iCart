import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  product = [];
  Total = 0;
  discountPrice;

  constructor(private CartService: CartService,private modalCtrl: ModalController,private alertCtrl: AlertController, private router: Router ) { }

  ngOnInit() {
    this.product = this.CartService.getProduct();
  }

  removeCartItem(product){
    this.CartService.removeProduct(product);
  }

  decrementQty(product){
    this.CartService.decreaseItems(product);
  }
  
  async checkout(){
    this.Total = this.CartService.getTotal();
     if(this.Total === 0){
      let alert = await this.alertCtrl.create({
        message: "Total Price can't be zero",
        buttons: ['Close']
      });
      alert.present();
    } else{
       this.close(); 
       this.router.navigateByUrl('/checkout');
    }
  }
  getDiscountPrice(){
   this.discountPrice = this.CartService.getDiscountPrice();
   return this.discountPrice;
  }

  getTotal(){
    this.Total = this.CartService.getTotal();
    return this.Total;
  }
  close(){
    this.CartService.close();
  }
}
