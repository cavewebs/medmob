import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
 
  validResults = [];
 
  constructor(private apiService: ApiService, private plt: Platform) { }
 
  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadData(true);
    });
  }
 
  loadData(refresh = false, refresher?) {
    this.apiService.getValidResults(refresh).subscribe(res => {
      this.validResults = res;
      if (refresher) {
        refresher.target.complete();
      }
    });
  }
 
}
