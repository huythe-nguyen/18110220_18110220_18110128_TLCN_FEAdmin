import { Discounts } from './../models/discount';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  discount!: Discounts[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/discount'
  url1='http://localhost:3000/api/v1/discount/count'
  deleteId!:string;
  confirmMessage='';
  key='';
  size=10;
  lenght:number
  page=1;
  confirmDeleteNew(confirmDialog: TemplateRef<any>, id: string, name: string){
    this.confirmMessage = `Bạn thật sự muốn xóa bai viet ${name}` ;
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
LoadPagesize(event: PageEvent) {
  if (event.pageSize != 0 || event.pageIndex >=0) {
    this.size = event.pageSize
    this.page = event.pageIndex + 1
    console.log(this.page)
  }
  this.ngOnInit()
}
  constructor(private rest:RestApiService,
    private data: DataService,
    private modalService: NgbModal) {
     }

  ngOnInit() {
    this.btnDisabled=true;
    if(this.key==''){
    this.rest.gets(this.url,this.page, this.size).then(data=>{
        this.discount =( data as {discount: Discounts[]}).discount;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }else{
      this.rest.search(this.url,this.key,this.size).then(data=>{
        this.discount =( data as {discount: Discounts[]}).discount;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }
    this.rest.get(this.url1).then(data => {
      let value = data as { counts: number}
      this.lenght= value.counts
      console.log(value.counts)
      this.btnDisabled = false;
    })
      .catch(error => {
        this.data.error(error['message']);
      })
  }
  Search(){
    if(this.key==''){
      this.ngOnInit();
    }else{
      this.discount = this.discount.filter(res=>{
        return res.code.toLocaleLowerCase().match(this.key.toLocaleLowerCase())
      })
    }
  }
  delete(){
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
  finishAndAlert( message: string){
    this.data.success(message);
    this.ngOnInit();
  }
}
