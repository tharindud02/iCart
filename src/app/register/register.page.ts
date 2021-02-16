import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string=""
  username: string =""
  password: string =""
  cpassword: string =""

  constructor(public afAuth: AngularFireAuth,public alert: AlertController,public router: Router) { }

  ngOnInit() {
  }

  async register(){
    const{name,username,password,cpassword} = this
    if(password != cpassword){
      this.showAlert("Error","Password don't match")
      return console.error("Password Don't match")
    }
    try{
    const res = await this.afAuth.createUserWithEmailAndPassword(username,password)
    // console.log(res)
    this.showAlert("Success!!!","Welcome "+res.user.displayName)
    this.router.navigate(['/login'])    
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
