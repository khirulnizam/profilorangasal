import { Component } from '@angular/core';
//additional sqlite
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/dborang.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private db: DbService,//from dborang.service
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
	) {
    
  }
  mainForm: FormGroup;//hold data from formgroup
  Data:any[] = []//hold resultsets of records

  ngOnInit(){//on screen init
    this.db.dbState().subscribe((res) => {
      if(res){
        //fetch data from database sqlite if there are records
        this.db.fetchOrangs().subscribe(item => {
          this.Data = item
        })
      }
    });
    this.mainForm = this.formBuilder.group({
      nokp: [''],//reset data form
      nama: [''],
      pendapatan: [''],
    })
  }//end ngOnInit

  tambahOrang(){//this is function to add new record of the form to the db-sqlite
    if(this.mainForm.value.nokp!=null || this.mainForm.value.nokp!=""){
      this.db.addOrang(
        this.mainForm.value.nokp,
        this.mainForm.value.nama,
        this.mainForm.value.pendapatan
      ).then((res) => {
        this.mainForm.reset();
      })
    }else{
      alert("NoKP tak boleh kosong");
    }
  }//end tambahOrang

  padamOrang(){
    
  }//end padamOrang

}
