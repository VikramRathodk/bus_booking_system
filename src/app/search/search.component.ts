import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../service/master.service';
import { catchError, map, Observable, of } from 'rxjs';
import { NgFor, AsyncPipe } from '@angular/common';
import { ApiResponse, Bus, City, State } from '../models/Locations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    AsyncPipe, FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent implements OnInit {
  location$: Observable<ApiResponse> = new Observable();
  locationState$: Observable<State[]> = new Observable();
  cities$: Observable<City[]> = new Observable();
  masterService = inject(MasterService);

  searchBus$ : Observable<Bus[]> = new Observable();

  
  searchObject = {
    fromLocation: -1,
    toLocation: -1,
    travelDate: ''
  };
  selectedStateId: number = -1;


  ngOnInit(): void {
    this.getStates();
  }

  getStates() {
    this.locationState$ = this.masterService.getLocations().pipe(
      map((response: ApiResponse) => response.data),
      catchError((error) => {
        console.error(error);
        return of([
          { stateId: -1, stateName: 'Select State' },
        ]);
      })
    );
  }

  onStateChange(stateId: number) {
    this.selectedStateId = stateId;
    this.getCitiesByState(stateId);
  }
  getCitiesByState(stateId: number) {
    console.log('State ID:', stateId);
    this.cities$ = this.masterService.getCities(stateId);
  }

  searchBus() {
  
    console.log('Search Object:', this.searchObject);
    const { fromLocation, toLocation, travelDate } = this.searchObject;
  
    this.masterService.searchBus(fromLocation, toLocation, travelDate).subscribe(
      (busList) => {
        console.log('Bus list is:', busList); 
        this.searchBus$ = of(busList);
      },
      (error) => {
        console.error('Error fetching bus list:', error); 
      }
    );
    

  }
  

}
