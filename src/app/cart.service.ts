import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalController, AlertController } from '@ionic/angular';



export interface Product{
  id: any;
  name: string;
  price: number;
  amount: number;
  expiryDate: Date;
  discount: number;
  discountedPrice: number;
  weigth: number;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {

  data: Product[] =[
    // {id:1,name:"Tharindu",price:500,amount:1,expiryDate:new Date('2020-04-30'),discount:5,discountedPrice:0}
  ];
        
        private cartItemCount= new BehaviorSubject(0);
        private Total=0;
        private LimitPrice=0;
        private discountPrice=0;
    

        constructor(private modalCtrl: ModalController,private alertCtrl: AlertController) { }

        getProduct(){
          return this.data;
        }

        getCartItemCount(){
          return this.cartItemCount;
        }

        getTotal(){
          return this.Total;
        }

        getPriceLimit(){
          return this.LimitPrice;
        }

        getDiscountPrice(){
          return this.discountPrice;
        }

        removeProduct(product){
          // alert('Product :' + product.name);
          
          for(let p of this.data){
            if(product.id == p.id){
            
              this.data.splice(this.data.findIndex(x => x==product), 1);
              p.amount = 0;
              // product.splice(index, 1);
              this.cartItemCount.next(this.cartItemCount.value - 1);
              this.setTotal();

              
              // alert("P id :" + p.id +" <br> Product id :" + product.id);
              // let index = product.id;
              // this.cartItemCount.next(this.cartItemCount.value - 1);
              // console.log('index', index);
              // this.data.splice(index, 1);
              // p.amount = 1;
              // this.setTotal();
              // console.log('Data',this.data);
            }
          }
        }

       async decreaseItems(product){
          for(let p of this.data){
            if(product.id == p.id){
              if(p.amount <= 1){
                let alertDecrease = await this.alertCtrl.create({
                  message: "Only One item in the Cart...!!!",
                  buttons: ['Close']
                });
                alertDecrease.present();
              }else{
                p.amount -= 1;
                this.setTotal(); 
              }
            }
          }
        }
        
        setTotal(){
          this.discountItems();
          this.Total = this.data.reduce((i,j) => i + j.discountedPrice, 0);
          // console.log('Total', this.Total);
          // console.log('Total', this.Total);
          // console.log('discount P', this.discountPrice);
          this.checkLimit();
          // console.log('Total',this.Total);
        }


        setPriceLimit(limit){
          this.LimitPrice = limit;
        }
      
        setProduct(idP,nameP,priceP,amountP,expDateP,discountP,weightP){
         let added = false;        
         for(let p of this.data){
              // console.log('Scan id', idP,'Product ID',p.id);
                if(p.id === idP){
                  p.amount += 1;
                  added = true;
                  // this.discountItems(parseInt(idP), parseInt(priceP),parseInt(discountP),parseInt(amountP));
                  this.setTotal(); 
                  // console.log('Data',this.data);
                  // console.log('Equal Product', p);
                  // console.log('product amount', p.amount);
                   // console.log('Already In the cart', this.data);
                  break;
                }
              }
              if(!added){
                  //  console.log('Pushing data');
                   this.data.push({id:idP,name:nameP,price:parseInt(priceP),amount:parseInt(amountP),expiryDate:expDateP,discount:parseInt(discountP),discountedPrice:0,weigth:parseInt(weightP)});
                   this.cartItemCount.next(this.data.length); 
                   this.setTotal();   
                 // console.log('Product Length',this.data.length);
                  //  console.log('Data',this.data);
                } 
        }

        async checkLimit(){
          if(this.LimitPrice == 0){
            // console.log('Limit Not Set !!!');
          }else if(this.LimitPrice < this.Total){
            // console.log('Limit Exeeded !!!');
            let alertCheckLimit = await this.alertCtrl.create({
              message: "Out of the Limit!!!",
              buttons: ['Close']
            });
            alertCheckLimit.present();
          }
        }

        discountItems() {
          for(let p of this.data){
            p.discountedPrice = (p.price - p.price * (p.discount / 100))*p.amount;
          }
        console.log('Data',this.data);
        }


        close(){
          this.modalCtrl.dismiss();
        }

}
