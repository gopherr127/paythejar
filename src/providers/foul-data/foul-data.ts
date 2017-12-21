import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FoulDataProvider {

  private apiUrl = 'https://paythejarapi.azurewebsites.net/api/fouls';
  
    constructor(public http: HttpClient) { }
  
    getFouls(page) {
      return new Promise(resolve => {
        this.http.get(this.apiUrl + '?page=' + page).subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        })
      });
    }
}
