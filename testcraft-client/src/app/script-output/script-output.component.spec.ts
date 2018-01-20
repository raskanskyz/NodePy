import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptOutputComponent } from './script-output.component';

describe('ScriptOutputComponent', () => {
  let component: ScriptOutputComponent;
  let fixture: ComponentFixture<ScriptOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
