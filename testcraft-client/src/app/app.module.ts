import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ScriptContainerComponent } from './script-container/script-container.component';
import { ScriptListComponent } from './script-list/script-list.component';
import { ScriptsService } from '../services/scripts.service';
import { ScriptListItemComponent } from './script-list/script-list-item/script-list-item.component';
import { ScriptOutputComponent } from './script-output/script-output.component';



@NgModule({
  declarations: [
    AppComponent,
    ScriptContainerComponent,
    ScriptListComponent,
    ScriptListItemComponent,
    ScriptOutputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ScriptsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
