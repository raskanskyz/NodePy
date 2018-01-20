import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScriptsService } from '../../services/scripts.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-script-container',
  templateUrl: './script-container.component.html',
  styleUrls: ['./script-container.component.css']
})
export class ScriptContainerComponent implements OnInit {
  script: string;
  scriptForm: FormGroup;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private scriptsService: ScriptsService
  ) { }

  ngOnInit() {
    this.scriptForm = this.fb.group({
      scriptName: ['', [Validators.required]],
      script: ['', [Validators.required]]
    });
  }

  save(form, isValid) {
    if (!isValid) {
      console.log("invalid")
      return false;
    }
    else {
      const scriptName = form.scriptName;
      const scriptString = form.script;
      this.scriptsService.postScript(scriptName, scriptString)
        .switchMap(() => this.scriptsService.getScripts())
        .takeUntil(this.ngUnsubscribe)
        .subscribe((data: any) => this.scriptsService.scriptList$$.next(data), (err) => console.log("error occured: ", err))
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
