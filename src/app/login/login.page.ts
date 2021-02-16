import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string =""
  password: string =""

constructor( public afAuth: AngularFireAuth, public alert: AlertController, public router: Router) { }


  ngOnInit() {
  }

  
async login(){
    const{username,password} = this
    try{
       const res = await this.afAuth.signInWithEmailAndPassword(username,password)
       if(res.operationType=="signIn"){
         this.router.navigate(['/login'])   
       }
       console.log(res)
       this.showAlert("Success!!!","Welcome ")
       this.router.navigate(['/home'])    
    }catch(error){
     this.showAlert("Error",error.message)
      console.dir(error)
    }
}

async showAlert(header: string , message: string){
 const alert =await this.alert.create({
   header,
   message,
   buttons:["Ok"]
 })
 await alert.present()
}


}
