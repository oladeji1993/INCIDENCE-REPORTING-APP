import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsDashboardPage } from './news-dashboard.page';

describe('NewsDashboardPage', () => {
  let component: NewsDashboardPage;
  let fixture: ComponentFixture<NewsDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
