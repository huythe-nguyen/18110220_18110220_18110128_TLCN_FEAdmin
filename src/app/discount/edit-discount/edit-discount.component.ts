import { Discounts } from '../../models/discount';
import { MessageComponent } from '../../message/message.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { News } from 'src/app/models/news';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand';


@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent implements OnInit {

  doing = false;
  discount: Discounts;
  url1 = 'http://localhost:3000/api/v1/discount/edit'
  brands!: Brand[];
  btnDisabled = false;
  url2 = 'http://localhost:3000/api/v1/admin/brand/list'
  @Input("id")
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService,
    private fb: FormBuilder,) {
    this.discount = new Discounts;

  }
  infoNew = this.fb.group({
    "name": ["", [Validators.required, Validators.minLength(2)]],
    "code": ["", [Validators.required, Validators.minLength(2),]],
    "description": ["", [Validators.required, Validators.min(3), Validators.max(50)]],
    "brand": ["", [Validators.required]],
    "amount": ["", [Validators.required]],
    "discount": ["", [Validators.required]],
    "starDay": ["", [Validators.required]],
    "endDay": ["", [Validators.required]],
    "state": ["", [Validators.required]],
  })
  ngOnInit() {
    this.doing = true;
    this.rest.getOne(this.url1, this.editId)
      .then(data => {
        this.doing = false;
        this.discount = (data as { discount: Discounts }).discount;
      }).catch(error => {
        this.doing = false;
        this.data.error(error['message'])
      });
    this.rest.get(this.url2).then(data => {
      this.brands = (data as { brands: Brand[] }).brands;
      this.btnDisabled = false;
    })
      .catch(error => {
        this.data.error(error['message']);
      })
  }
  open(content: TemplateRef<any>) {
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' });
  }
  update() {
    this.doing = true;
    this.rest.put(this.url1, this.editId, this.discount)
      .then(data => {
        this.doing = false;
        this.updateFinished.emit('discount is update')
        this.modelService.dismissAll();
      }).catch(error => {
        this.doing = false;
        this.data.error(error['message'])
      });

  }

}
