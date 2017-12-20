import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PeopleDataProvider {

  private apiUrl = 'https://paythejarapi.azurewebsites.net/api/appusers';
  
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
