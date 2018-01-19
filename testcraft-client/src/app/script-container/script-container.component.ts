import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScriptsService } from '../../services/scripts.service';

@Component({
  selector: 'app-script-container',
  templateUrl: './script-container.component.html',
  styleUrls: ['./script-container.component.css']
})
export class ScriptContainerComponent implements OnInit {
  script: string;
  scriptForm: FormGroup;
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
        .then(res => this.scriptsService.getScripts())
        .then(scriptList => scriptList)
        .catch(err => err);
    }
  }

}
