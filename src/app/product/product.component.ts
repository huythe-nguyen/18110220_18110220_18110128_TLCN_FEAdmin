import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  product!: Product[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/admin/product'

  deleteId!:string;
  confirmMessage='';
  key='';
  size=5;
  sizes=5;
  page=1;
  pages=1;

  confirmDeleteProduct(confirmDialog: TemplateRef<any>, id: string, productCode: string){
    this.confirmMessage = `Bạn thật sự muốn xóa sản phẩm này ${productCode}` ;
    this.deleteId =id;
    this.modalService.open(confirmDialog, {ariaDescribedBy: 'modal-basic-title'}).result.then((result)=>{
      this.deleteId='';
    },(err)=>{

    })
  }
  search(keys: string){
    if (keys!==''){
      this.key=keys;
      this.ngOnInit();
    }
  }
Loadpage(pages:number){
  console.log(pages)
    if(pages>0){
      this.page = pages;
      this.pages=pages
      this.ngOnInit()
    }
}
Loadsize(sizes:number){
  console.log(sizes)
  if(sizes>4){
    this.size=sizes;
    this.sizes=sizes;
    this.ngOnInit();
  }
}
  constructor(private rest:RestApiService,
    private data: DataService,
    private modalService: NgbModal) {
     }

  ngOnInit() {
    this.btnDisabled=true;
    if(this.key==''){
      this.rest.gets(this.url,this.page, this.size).then(data=>{
        this.product =( data as {product: Product[]}).product;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }else{
      this.rest.search(this.url,this.key).then(data=>{
        this.product =( data as {product: Product[]}).product;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }
  }

  Search(){
    if(this.key==''){
      this.ngOnInit();
    }else{
      this.product = this.product.filter(res=>{
        return res.productCode.toLocaleLowerCase().match(this.key.toLocaleLowerCase())
      })
    }
  }
  finishAndAlert( message: string){
    this.data.success(message);
    this.ngOnInit();
  }
  deleteProduct(){
    if (this.deleteId!==''){
      this.rest.delete(this.url,this.deleteId).then(data =>{
        this.modalService.dismissAll();
        this.ngOnInit();
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }
  }

}
