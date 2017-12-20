import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Jar } from '../../jar/jar';

@Injectable()
export class JarDataProvider {

  private apiUrl = 'https://paythejarapi.azurewebsites.net/api/jars';

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