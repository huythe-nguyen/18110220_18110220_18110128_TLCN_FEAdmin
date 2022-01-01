import { MessageComponent } from '../../message/message.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem, Carts } from 'src/app/models/cart';



@Component({
  selector: 'app-detail-cart',
  templateUrl: './detail-cart.component.html',
  styleUrls: ['./detail-cart.component.css']
})
export class DetailCartComponent implements OnInit {
  doing= false;
  cart: Carts;
  itemCart: CartItem;
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/cart/detail'
  @Input("id")
  Id!: string;

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder,) {
      this.cart= new Carts;

     }
  ngOnInit() {
    this.doing=true;
    this.rest.getOne(this.url,this.Id)
      .then(data =>{
        this.doing=false;
        this.cart =(data as {cart: Carts}).cart;
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title', size: "1000px" });
  }
}
