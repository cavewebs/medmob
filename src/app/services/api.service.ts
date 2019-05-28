import { OfflineManagerService } from './offline-manager.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NetworkService, ConnectionStatus } from './network.service';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { tap, map, catchError } from "rxjs/operators";
 
const API_STORAGE_KEY = 'mYStOrAgEkEY';
const API_URL = 'http://localhost/apimedic/api/v1';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  constructor(private http: HttpClient, private networkService: NetworkService, private storage: Storage, private offlineManager: OfflineManagerService) { }
 
  getUsers(forceRefresh: boolean = false): Observable<any[]> {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      return from(this.getLocalData('users'));
    } else {
      // Just to get some "random" data
      let page = Math.floor(Math.random() * Math.floor(6));
      
      // Return real API data and store it locally
      return this.http.get(`${API_URL}/results?per_page=10&page=${page}`).pipe(
        map(res => res['data']),
        tap(res => {
          this.setLocalData('users', res);
        })
      )
    }
  }
 
   getInvalidResults(forceRefresh: boolean = false): Observable<any[]> {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
      // Return the cached data from Storage
      return from(this.getLocalData('invalidResults'));
    } else {
      let page = 1;
      return this.http.get(`${API_URL}/results/valid?per_page=10&page=${page}`).pipe(
        map(res => res['data']),
        tap(res => {
          this.setLocalData('invalidResults', res);
        })
      )
    }
  }
 
  
 
  // Save result of API requests
  private setLocalData(key, data) {
    this.storage.set(`${API_STORAGE_KEY}-${key}`, data);
  }
 
  // Get cached API result
  private getLocalData(key) {
    return this.storage.get(`${API_STORAGE_KEY}-${key}`);
  }
}