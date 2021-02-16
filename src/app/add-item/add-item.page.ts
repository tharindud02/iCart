import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { CartService } from '../cart.service';
import jsQR from "jsqr";
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage{

  constructor(private alertCtrl: AlertController,private loadingCtrl: LoadingController, private cartService: CartService,private qrScanner: QRScanner,public platform:Platform,public dialog:Dialogs) { }

                                          // qrScan : any;

                                            
                                          // constructor(public platform:Platform,public dialog:Dialogs, private qrScanner: QRScanner,private cartService:CartService,private alertCtrl: AlertController) { }



  startScan(){
// Optionally request the permission early

    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
    if (status.authorized) {  
    // camera permission was granted

    // start scanning
    this.startScanStart();
    // let scanSub = this.qrScanner.scan().subscribe((text: string) => {
    //   console.log('Scanned something', text);
    //   this.qrScanner.show();
    //   this.qrScanner.hide(); // hide camera preview
    //   scanSub.unsubscribe(); // stop scanning
    // });

    } else if (status.denied) {
    // camera permission was permanently denied
    // you must use QRScanner.openSettings() method to guide the user to the settings page
    // then they can grant the permission from there
    } else {
    // permission was denied, but not permanently. You can ask for permission again at a later time.
    }
    })
    .catch((e: any) => console.log('Scan Error is', e));

  }

  scanActive = false;
  scanResult = null;
  @ViewChild('video',{static: false}) video: ElementRef;
  @ViewChild('canvas',{static: false}) canvas: ElementRef;
  
  videoElement: any;
  canvasElement: any;
  canvasContext: any;
  loading:HTMLIonLoadingElement;

 

  
  ngAfterViewInit(){
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  ngOnInit() {
        
  }

  async startScanStart(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video : {facingMode : 'environment'}
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();

    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));
  }

  async scan(){
    // console.log('SCAN');
    if(this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
      if(this.loading){
        await this.loading.dismiss();
        this.loading= null;
        this.scanActive= true;
      }

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
   
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
 
   const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

    const code =jsQR(imageData.data, imageData.width, imageData.height,{
      inversionAttempts: 'dontInvert'
    });
    // console.log('code', code);
        if(code){
          this.scanActive = false;
          this.scanResult = code.data;
          // this.showQrToast();
          this.splitText(this.scanResult);
        }else{
          if(this.scanActive){
            requestAnimationFrame(this.scan.bind(this));
          }
        }
    }else{
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  stopScan(){
    this.scanActive = false;
  }

  reset(){
    this.scanResult = null; 
  }

  // async showQrToast(){
  //   const toast = await this.toastCtrl.create({
  //     message:'Open ${this.scanResult}?',
  //     position: 'top',
  //     buttons: [
  //       {
  //         text:'Open',
  //         handler:() => {
  //           window.open(this.scanResult, '_system','location=yes');
  //         }
  //       }
  //     ]
  //   });
  //   toast.present();
  // }

  private id: any;
  private name: any;
  private price: any;
  private amount: any;
  private expDate: Date;
  private today = new Date();
  private discount: any;
  private weight:any;

  splitText(scanResult){
    // console.log(this.scanResult);
    var textSplited = scanResult.split(",");
    this.id=parseInt(textSplited[0]);
    this.name=textSplited[1];
    this.price=parseInt(textSplited[2]);
    this.amount=parseInt(textSplited[3]);
    this.expDate=textSplited[4];
    this.discount=parseInt(textSplited[5]);
    this.weight = parseInt(textSplited[6]);

    
    if(!(this.id > 0) || this.name == null || !(this.price > 0) || !(this.amount > 0) || this.expDate == null || !(this.discount >= 0) || !(this.weight >= 0)){
      this.AddedItemFail();
    }else{      
    // const data=[ this.id, this.name, this.price, this.amount];
    // console.log('splited Results',textSplited);
    // console.log('Splited Data',data);

    this.expDate = new Date(this.expDate);
    // console.log('str Date',this.expDate);    
    if(this.expDate < this.today){
      console.log('Expired');
      this.ExpiredAlert();
    }else{
      console.log('Not Expired');
      this.cartService.setProduct(this.id, this.name, this.price, this.amount,this.expDate, this.discount, this.weight );
      this.AddedItem();
    }  
  }
}
  
  async ExpiredAlert(){
    let alertExpered = await this.alertCtrl.create({
      message: "This Item is Expired !!!",
      buttons: ['Close']
    });
    alertExpered.present();
    this.reset();
  }

  async AddedItem(){
    let alertExpered = await this.alertCtrl.create({
      message: "Item Added Successfully..",
      buttons: ['Close']
    });
    alertExpered.present();
    this.stopScan();
  }

  async AddedItemFail(){
    let alertExpered = await this.alertCtrl.create({
      message: "Sorry. Invalid Input.!",
      buttons: ['Close']
    });
    alertExpered.present();
  }
}

