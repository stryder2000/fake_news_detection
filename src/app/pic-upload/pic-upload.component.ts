import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms'

@Component({
  selector: 'app-pic-upload',
  templateUrl: './pic-upload.component.html',
  styleUrls: ['./pic-upload.component.css']
})
export class PicUploadComponent implements OnInit {

  constructor() { }
  isLoading = false;
  form =  new FormGroup({
    'image':new FormControl(null,{
      validators: [Validators.required],
    }),
  });
  imagePreview="";
  ngOnInit(): void {
  }
  onImagePicked(event:Event){
    const file = (event!.target as HTMLInputElement)!.files![0];
    this.form.patchValue({image:file}); // unlike set_value patchValue is used to set only one value
    this.form.get('image')!.updateValueAndValidity(); // check for the validity if the file is image or not
    // console.log(file);
    // console.log(this.form);
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string ;
    };
    reader.readAsDataURL(file);

  }
  onCheckImage(){}


}
