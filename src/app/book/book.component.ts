import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import {map, startWith, switchMap} from 'rxjs/operators';
import { shallowEqual } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: any;
  displayedColumns = ['isbn', 'title', 'author'];
  dataSource = new MatTableDataSource();
  userName:string='';
  isAdmin:boolean= false;
  
  stateCtrl = new FormControl();
  filteredStates: Observable<[]>;
  constructor(private api: ApiService,private route: ActivatedRoute) { }
   private _filterStates(value: string) {
    const filterValue = value.toLowerCase();
    console.log(this.api.getBooks());
    console.log(this.books);
    this.applyFilter(filterValue);
    return this.books.filter(book => 
      book.title.toLowerCase().includes(filterValue));
  }





  ngOnInit() {
    this.userName = this.route.snapshot.params['userName'];
    if(this.userName === "ayesha"){
      this.isAdmin = true;
    }
    this.api.getBooks()
    .subscribe(res => {
      console.log(res);
      this.books = res;
      this.dataSource = new MatTableDataSource(this.books);
      this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterStates(value))
    );
    }, err => {
      console.log(err);
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
export class BookDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }
  connect() {
    return this.api.getBooks();
  }

  disconnect() {

  }
}


