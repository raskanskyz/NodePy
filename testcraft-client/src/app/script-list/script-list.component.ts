import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScriptsService } from '../../services/scripts.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-script-list',
  templateUrl: './script-list.component.html',
  styleUrls: ['./script-list.component.css']
})

export class ScriptListComponent implements OnInit, AfterViewInit {
  scriptList;
  isDisplayPlaceholder: boolean = true;
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    private scriptsService: ScriptsService
  ) { }

  ngOnInit() {
    this.scriptsService.getScripts()
      .takeUntil(this.ngUnsubscribe)
      .subscribe((data: any) => {
        this.scriptList = data.scripts;
        this.isDisplayPlaceholder = !this.scriptList.length;
      },
      (err) => console.log("error occured: ", err));
  }

  ngAfterViewInit() {
    this.scriptsService.scriptList$$
      .takeUntil(this.ngUnsubscribe)
      .subscribe((data: any) => {
        this.scriptList = data.scripts;
        this.isDisplayPlaceholder = !this.scriptList.length;
      },
      (err) => console.log("error occured: ", err));
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
