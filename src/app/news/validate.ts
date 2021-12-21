
import { FormBuilder, Validators } from '@angular/forms';


export class Validate {
  fb!:FormBuilder;

  infoNew = this.fb.group({
    "title":["",[Validators.required,Validators.minLength(2)]],
    "codeTitle":["",[Validators.required,Validators.minLength(2),]],
    "description":["",[Validators.required,Validators.min(3),Validators.max(50)]],
    "imgs":["", [Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
    "starDay":["",[Validators.required]],
    "endDay":["",[Validators.required]],
    "state":["",[Validators.required]],
  })

}
