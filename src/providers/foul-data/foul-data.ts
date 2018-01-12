import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV } from '@app/env';

@Injectable()
export class FoulDataProvider {

  private apiUrl = ENV.apiUrl + '/fouls';
  
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
