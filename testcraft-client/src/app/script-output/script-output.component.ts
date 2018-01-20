import { Component, OnInit } from '@angular/core';
import { ScriptsService } from '../../services/scripts.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-script-output',
  templateUrl: './script-output.component.html',
  styleUrls: ['./script-output.component.css']
})
export class ScriptOutputComponent implements OnInit {
  output: string;
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    private scriptsService: ScriptsService
  ) { }

  ngOnInit() {
    this.scriptsService.scriptOutput$$
      .takeUntil(this.ngUnsubscribe)
      .subscribe((data: string) => this.output = data);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
