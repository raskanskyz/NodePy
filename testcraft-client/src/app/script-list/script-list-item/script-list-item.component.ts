import { Component, OnInit, Input } from '@angular/core';
import { ScriptsService } from '../../../services/scripts.service';

@Component({
  selector: 'app-script-list-item',
  templateUrl: './script-list-item.component.html',
  styleUrls: ['./script-list-item.component.css']
})
export class ScriptListItemComponent implements OnInit {
  @Input() data: string;

  constructor(
    private scriptsService: ScriptsService
  ) { }

  ngOnInit() {
  }

  execteScript(scriptName) {
    this.scriptsService.execteScript(scriptName)
  }

}
