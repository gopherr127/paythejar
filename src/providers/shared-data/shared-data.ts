import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SharedDataProvider Provider');
  }

}