import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV } from '@app/env';

@Injectable()
export class JarDataProvider {

  private apiUrl = ENV.apiUrl + '/jars';

  constructor(public http: HttpClient) { }

  getJars(page) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '?page=' + page).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      })
    });
  }
}