import { MessageComponent } from '../../message/message.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reviews } from '../../models/review';
import { Product } from 'src/app/models/product';
import { Employee } from 'src/app/models/employee';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  doing=false;
  review: Reviews;
  product: Product;
  employee: Employee;
  url = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/product/review'
  url1='https://shopgiay-be-tlcn.herokuapp.com/api/v1/review/adminreview'
  url2='https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/product/edit'
  url3 = 'https://shopgiay-be-tlcn.herokuapp.com/api/v1/users/detail'
  @Input("id")
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService) {
      this.review= new Reviews;

     }

    //  info = this.fb.group({
    //   "timeSucess":["",[Validators.required]],
    //   "codeOder":["",[Validators.required,Validators.minLength(2)]]
    // })
  ngOnInit() {
    this.doing=true;
    this.rest.getOne(this.url,this.editId)
      .then(data =>{
        this.doing=false;
        this.review =(data as {data: Reviews}).data;
        this.rest.getOne(this.url2,this.review.product)
        .then(data =>{
          this.product =(data as {product: Product}).product;
        })
        console.log(this.review.user)
        this.rest.getOne(this.url3,this.review.user.id)
        .then(data =>{
          this.employee =(data as {employee: Employee}).employee;
        })
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
    this.rest.post1(this.url1,this.editId,this.review)
      .then(data =>{
          this.doing=false;
          this.modelService.dismissAll();
          this.notificationService.success('successfully')
          this.ngOnInit()
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });

    }

}
