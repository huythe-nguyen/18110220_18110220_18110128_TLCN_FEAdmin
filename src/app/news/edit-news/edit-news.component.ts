import { MessageComponent } from './../../message/message.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { News } from 'src/app/models/news';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  doing=false;
  news: News;
  url1='http://localhost:3000/api/v1/admin/new/edit'
  @Input("id")
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder,) {
      this.news= new News;

     }
     infoNew = this.fb.group({
      "title":["",[Validators.required,Validators.minLength(2)]],
      "codeTitle":["",[Validators.required,Validators.minLength(2),]],
      "description":["",[Validators.required,Validators.min(3),Validators.max(50)]],
      "imgs":[""],
      "starDay":[""],
      "endDay":[""],
      "state":["",[Validators.required]],
    })
  ngOnInit() {
    this.doing=true;
    this.rest.getOne(this.url1,this.editId)
      .then(data =>{
        this.doing=false;
        this.news =(data as {news: News}).news;
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
    console.log(this.news.endDay)
    this.rest.put(this.url1,this.editId,this.news)
      .then(data =>{
        this.doing=false;
        this.updateFinished.emit('News is update')
        this.modelService.dismissAll();
        this.news = new News();
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });

  }

}
