import { Component, OnInit, Input } from '@angular/core';
import { ScriptsService } from '../../../services/scripts.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-script-list-item',
  templateUrl: './script-list-item.component.html',
  styleUrls: ['./script-list-item.component.css']
})
export class ScriptListItemComponent implements OnInit {
  @Input() data: string;
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    private scriptsService: ScriptsService
  ) { }

  ngOnInit() {
  }

  execteScript(scriptName) {
    this.scriptsService.execteScript(scriptName)
      .map(res => res.result.output)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => this.scriptsService.scriptOutput$$.next(data));
  }

  deleteScript(scriptName) {
    this.scriptsService.deleteScript(scriptName)
      .switchMap(() => this.scriptsService.getScripts())
      .takeUntil(this.ngUnsubscribe)
      .subscribe(scriptList => this.scriptsService.scriptList$$.next(scriptList));
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
