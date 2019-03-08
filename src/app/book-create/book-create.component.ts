import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';

const uri = '/api/upload/';
@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  uploader:FileUploader = new FileUploader({url:uri});
  bookForm: FormGroup;
  isbn:string='';
  title:string='';
  description:string='';
  author:string='';
  publisher:string='';
  published_year:string='';
  price:string='';
  img:string='';
  imgName: string = '';
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
      this.imgName = JSON.parse(response).originalname;
  }
   }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'isbn' : [null, Validators.required],
      'title' : [null, Validators.required],
      'description' : [null, Validators.required],
      'author' : [null, Validators.required],
      'publisher' : [null, Validators.required],
      'price':[null,Validators.required],
      'published_year' : [null, Validators.required],
      'img' : [null, Validators.required]
    });
  }


  onFormSubmit(form:NgForm) {
    this.api.postBook(form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        });
  }

}
