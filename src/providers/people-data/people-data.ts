import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@env';

@Injectable()
export class PeopleDataProvider {

  private apiUrl = ENV.apiUrl + '/appusers';
  
  constructor(public http: HttpClient) { }

  getPeople(page) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '?page=' + page).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    });
  }
}
