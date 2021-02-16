import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PriceLimitPage } from './price-limit.page';

describe('PriceLimitPage', () => {
  let component: PriceLimitPage;
  let fixture: ComponentFixture<PriceLimitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceLimitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceLimitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
