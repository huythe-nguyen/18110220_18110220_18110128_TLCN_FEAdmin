import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { News } from 'src/app/models/news';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  saving=false;
  news: News;
  url1='http://localhost:3000/api/v1/admin/new/add'
  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder) {
      this.news= new News;
     }
     infoNew = this.fb.group({
      "title":["",[Validators.required,Validators.minLength(2)]],
      "codeTitle":["",[Validators.required,Validators.minLength(2),]],
      "description":["",[Validators.required,Validators.min(3),Validators.max(50)]],
      "imgs":["", [Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
      "starDay":["",[Validators.required]],
      "endDay":["",[Validators.required]],
      "state":["",[Validators.required]],
    })
  ngOnInit() {
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  save(){
    this.saving=true;
    console.log(this.news.starDay)
    this.rest.post(this.url1,this.news)
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
