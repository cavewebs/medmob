import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
 
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
 
  results = [];
 
  constructor(private apiService: ApiService, private plt: Platform) { }
 
  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadData(true);
    });
  }
 
  loadData(refresh = false, refresher?) {
    this.apiService.getInvalidResults(refresh).subscribe(res => {
      this.results = res;
      if (refresher) {
        refresher.target.complete();
      }
    });
  }
 
}
