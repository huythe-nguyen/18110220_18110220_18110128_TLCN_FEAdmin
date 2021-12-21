import { RestApiService } from 'src/app/services/rest-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/services/data.service';
import { Brand } from 'src/app/models/brand';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  doing=false;
  product: Product;
  url1='http://localhost:3000/api/v1/admin/product/edit'

  brand!: Brand[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/admin/brand/list'
  @Input("id")
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder) {
      this.product= new Product;
     }
     infoproduct = this.fb.group({
      "productName":["",[Validators.required,Validators.minLength(2)]],
      "productCode":["",[Validators.required,Validators.minLength(2),]],
      "size":["",[Validators.required,Validators.min(3),Validators.max(50)]],
      "amount":["",[Validators.required,Validators.min(1)]],
      "price":["",[Validators.required,Validators.min(10000)]],
      "brand":["",[Validators.required]],
      "gender":["",[Validators.required]],
      "colour":["",[Validators.required]],
      "status":["",[Validators.required]],
      "selling":["",[Validators.required]],
      "priceSale":["",[Validators.required]],
      "productImg1":[""],
      "productImg2":[""],
      "productImg3":[""],
      "description":["",[Validators.required]]
     })

  ngOnInit() {
    if(this.editId!==''){
    this.doing=true;
    this.rest.getOne(this.url1,this.editId)
      .then(data =>{
        this.doing=false;
        this.product =(data as {product: Product}).product;
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });
      this.btnDisabled=true;
    this.rest.get(this.url).then(data=>{
        this.brand =( data as {brands: Brand[]}).brands;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  update(){
    this.doing=true;
    this.rest.put(this.url1,this.editId,this.product)
      .then(data =>{
        this.doing=false;
        this.updateFinished.emit('product is update')
        this.modelService.dismissAll();
        window.alert('Cập nhật thành công')
        this.product = new Product();
        this.ngOnInit();
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['lỗi'])
      });

  }

}
