import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAgentDataComponent } from './load-agent-data.component';

describe('LoadAgentDataComponent', () => {
  let component: LoadAgentDataComponent;
  let fixture: ComponentFixture<LoadAgentDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadAgentDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadAgentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
