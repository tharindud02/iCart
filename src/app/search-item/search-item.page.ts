import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, combineLatest, empty } from 'rxjs';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.page.html',
  styleUrls: ['./search-item.page.scss'],
})
export class SearchItemPage implements OnInit {

  searchName:string;

  startAt = new Subject();
  endAt = new Subject();

  itemName;
  tableHeadTags = false;
  text;

  startobs= this.startAt.asObservable();
  endobs = this.endAt.asObservable();


  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    combineLatest(this.startobs,this.endobs).subscribe((value)=> {
      this.firequery(value[0],value[1]).subscribe((name) => {
        this.itemName = name;
        // console.log(this.itemName);
      })
    });
      
  }



  search($event){
    // console.log(this.itemName);
    let q = $event.target.value;
    this.text = q;
    this.startAt.next(q);
    this.endAt.next(q + "\uf8ff");
  }

  firequery(start ,end){
    // console.log('Start:',start, 'End', end);
    if(this.text == start && end == "\uf8ff"){
      console.log('Empty');
      this.tableHeadTags = false;
    }else{
      this.tableHeadTags = true;
      return this.firestore.collection('items', ref => ref.limit(10).orderBy('name').startAt(start).endAt(end)).valueChanges();
    } 
    return this.firestore.collection('Empty').valueChanges();   
   }
}
