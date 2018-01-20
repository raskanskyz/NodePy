import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

@Injectable()
export class ScriptsService {
  apiRoot: string = `http://localhost:8080/api`;
  scriptList$$ = new ReplaySubject(1);
  scriptOutput$$ = new ReplaySubject(1);

  constructor(
    private http: HttpClient
  ) {
  }

  postScript(scriptName: string, scriptString: string): Observable<any> {
    let apiURL = `${this.apiRoot}/postScript`;
    return this.http.post(apiURL, { scriptName: scriptName, script: scriptString });
  }

  getScripts(): Observable<any> {
    let apiURL = `${this.apiRoot}/getScripts`;
    return this.http.get(apiURL);
  }

  execteScript(scriptName): Observable<any> {
    let apiURL = `${this.apiRoot}/executeScript/${scriptName}`;
    return this.http.get(apiURL);
  }

  deleteScript(scriptName): Observable<any> {
    let apiURL = `${this.apiRoot}/deleteScript/${scriptName}`;
    return this.http.delete(apiURL);
  }
}
