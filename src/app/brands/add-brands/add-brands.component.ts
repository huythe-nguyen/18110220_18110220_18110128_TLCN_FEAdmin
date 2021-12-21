import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { RestApiService } from 'src/app/services/rest-api.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {  AngularFirestore} from "@angular/fire/firestore";
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseService } from 'src/app/services/firebase.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.css']
})
export class AddBrandsComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: string;
  selectedFile: FileList | null;
  forma: FormGroup;
  tests: Observable<any[]>;
  saving=false;
  brand: Brand;
  url1='http://localhost:3000/api/v1/admin/brand/add'
  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder, private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private fs: FirebaseService){
      this.brand= new Brand;
      this.forma = fb.group ({
        categoria: ['ImageBrand'],
      })
     }

     infoBrand = this.fb.group({
      "nameBrand":["",
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])],
    "codeBrand":["",[Validators.required,Validators.minLength(2),]],
      "description":["",[Validators.required,Validators.minLength(20)]],
      "imgs":["",[Validators.required]],
      "state":["",[Validators.required]],
     })
     get f(){
       return this.infoBrand.controls
     }
  ngOnInit() {
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  save(){
    this.saving=true;

    this.rest.post(this.url1,this.brand)
      .then(data =>{
        this.saving=false;
        this.data.success('Thành Công');
      }).catch(error =>{
        this.saving =false;
        this.data.error(('Thất bại'))
      });

  }
  detectFiles(event) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    const myTest = this.afs.collection('Brand').ref.doc();
    console.log(myTest.id)

    const file = this.selectedFile
    const filePath = `${myTest.id}/name1`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then( (url) => {
          this.downloadURL = url;
          this.brand.imgs=url
          myTest.set({
            categoria: this.forma.value.categoria,
            imagenes : this.downloadURL,
            myId : myTest.id
          })

          console.log( this.downloadURL )
        }).catch(err=> { console.log(err) });
      })
    )
    .subscribe()
  }

  mostrarImagenes() {
    this.tests = this.fs.getTests();
  }
}
