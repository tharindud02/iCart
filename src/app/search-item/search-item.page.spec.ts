import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchItemPage } from './search-item.page';

describe('SearchItemPage', () => {
  let component: SearchItemPage;
  let fixture: ComponentFixture<SearchItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
