import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
//import from DataOrang class
import { DataOrang } from './dataorang.service';
import { HttpClient } from '@angular/common/http';

//Reactive Extensions JavaScript - functions that makes use of Observable sequences 
//to manage asynchronous and event based reactive programming 
//that utilises asynchronous logic to manage real-time updates 
//using automated data streams
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  orangList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(//invoked when class initialized
  private platform: Platform, 
  private sqlite: SQLite, 
  private httpClient: HttpClient,
  private sqlPorter: SQLitePorter,
  ) { 
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'orangasal.db',/*developer set db name */
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getDummyData();
      });
    });
  }//end constructor
  
   // Render fake data
   getDummyData() {
    this.httpClient.get(
      'assets/dummy.sql', /* assets/dummy.sql */
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getOrang();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }//end getDummyData

  dbState() {//ready or not
    return this.isDbReady.asObservable();
  }
 
  fetchOrangs(): Observable<DataOrang[]> {
    return this.orangList.asObservable();
  }

   // Get list
   getOrang(){
    return this.storage.executeSql('SELECT * FROM orangasal', []).then(res => {
      let items: DataOrang[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            nokp: res.rows.item(i).nokp,  
            nama: res.rows.item(i).nama,  
            pendapatan: res.rows.item(i).pendapatan,  
           });
        }
      }
      this.orangList.next(items);
    });
  }//end getOrang

  addOrang(nokp, nama,pendapatan) {
    let data = [nokp, nama,pendapatan];
    return this.storage.executeSql('INSERT INTO orangasal (nokp, nama,pendapatan) VALUES (?,?,?)', data)
    .then(res => {
      this.getOrang();
    });
  }//addOrang
  
}
