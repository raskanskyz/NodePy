import { Component } from '@angular/core';
import { ScriptsService } from '../services/scripts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private scriptsService: ScriptsService
  ) {

  }
}

