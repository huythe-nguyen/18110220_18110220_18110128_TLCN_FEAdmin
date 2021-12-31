import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { News } from 'src/app/models/news';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Discounts } from 'src/app/models/discount';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {
  saving=false;
  discount: Discounts;
  url1='http://localhost:3000/api/v1/discount/add'
  brands!: Brand[];
  btnDisabled= false;
  url2='http://localhost:3000/api/v1/admin/brand/list'
  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder) {
      this.discount= new Discounts;
     }
     infoNew = this.fb.group({
      "name":["",[Validators.required,Validators.minLength(2)]],
      "code":["",[Validators.required,Validators.minLength(2),]],
      "description":["",[Validators.required,Validators.min(3),Validators.max(50)]],
      "brand":["", [Validators.required]],
      "amount":["", [Validators.required]],
      "discount":["", [Validators.required]],
      "starDay":["",[Validators.required]],
      "endDay":["",[Validators.required]],
      "state":["",[Validators.required]],
    })
  ngOnInit() {
    this.btnDisabled=true;
  this.rest.get(this.url2).then(data=>{
      this.brands =( data as {brands: Brand[]}).brands;
      this.btnDisabled=false;
    })
    .catch(error=>{
      this.data.error(error['message']);
    })
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  save(){
    this.saving=true;
    console.log(this.discount)
    this.rest.post(this.url1,this.discount)
      .then(data =>{
        this.saving=false;
        this.data.success('new is saved');
        
        this.ngOnInit()
      }).catch(error =>{
        this.saving =false;
        this.data.error('mã bài viết đã tồn tại')
      });

  }

}
