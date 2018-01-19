import { Component, OnInit } from '@angular/core';
import { ScriptsService } from '../../services/scripts.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-script-list',
  templateUrl: './script-list.component.html',
  styleUrls: ['./script-list.component.css']
})

export class ScriptListComponent implements OnInit {

  subscription: Subscription;
  scriptList;
  constructor(
    private scriptsService: ScriptsService
  ) { }

  ngOnInit() {
    this.scriptsService.getScripts().subscribe(scriptList => this.scriptList = scriptList);
    // this.scriptsService.getScripts()
    //   .then((res: any) => {
    //     this.scriptList = res.scripts;
    //   })
    //   .catch(err => console.log(err));
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
