import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import the base url constant from contants.ts
import { BASE_URL_2, baseUrl ,LOCALBASEURL} from '../constant/BusConstant';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse, Bus, City } from '../models/Locations';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) {}

  getLocations() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(baseUrl +"states");
  }
  getCities(stateId : number) : Observable<any[]> {
    return this.http.get<any[]>(`${LOCALBASEURL}cities/${stateId}`);
  }


  searchBus(source: number, target: number, travelDate: string): Observable<Bus[]> {
    const url = `${LOCALBASEURL}search-buses?sourceCityId=${source}&destinationCityId=${target}&travelDate=${travelDate}`;
    return this.http.get<Bus[]>(url);
  }
       
}
