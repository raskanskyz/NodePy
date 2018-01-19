import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ScriptsService {
  apiRoot: string = `http://localhost:8080/api`;
  private subject = new Subject<any>();

  constructor(
    private http: HttpClient
  ) {
  }

  postScript(scriptName: string, scriptString: string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}/postScript`;
      this.http.post(apiURL, { scriptName: scriptName, script: scriptString })
        .toPromise()
        .then(res => {
          return this.getScripts()
        })
        .then((data: any) => {
          this.subject.next({ scriptsList: data });
          resolve(data);
        })
        .catch((err) => console.log(err));
    });
    return promise;
  }

  // getScripts() {
  //   let promise = new Promise((resolve, reject) => {
  //     let apiURL = `${this.apiRoot}/getScripts`;
  //     this.http.get(apiURL)
  //       .toPromise()
  //       .then((res: any) => {
  //         this.subject.next({ currentSciptList: res });
  //         resolve(res);
  //       })
  //       .catch(err => reject(err));
  //   });
  //   return promise;
  // }

  getScripts(): Observable<any> {
    return this.subject.asObservable();
  }

  execteScript(scriptName) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}/executeScript/${scriptName}`;
      this.http.get(apiURL)
        .toPromise()
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
    return promise;
  }
}
