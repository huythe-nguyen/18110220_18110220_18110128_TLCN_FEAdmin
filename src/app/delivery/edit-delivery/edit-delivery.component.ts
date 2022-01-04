import { Carts } from 'src/app/models/cart';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';

import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-delivery',
  templateUrl: './edit-delivery.component.html',
  styleUrls: ['./edit-delivery.component.css']
})
export class EditDeliveryComponent implements OnInit {

  doing=false;
  oder: Carts;
  url1='https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/oder/edit'
  @Input("id")
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder,
    private router: Router,) {
      this.oder= new Carts;

     }

  ngOnInit() {
    this.doing=true;
    this.rest.getOne(this.url1,this.editId)
      .then(data =>{
        this.doing=false;
        this.oder =(data as {oder: Carts}).oder;
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  update(){
    this.doing=true;
    console.log(this.oder.note)
    this.rest.put(this.url1,this.editId,this.oder)
      .then(data =>{
          this.doing=false;
          this.modelService.dismissAll();
          this.ngOnInit()
          if(this.oder.state=='cancel'){
            this.router.navigate(['/cancel'])
          }else{
            this.router.navigate(['/dashboard'])
          }
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });

    }

}
