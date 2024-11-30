export interface State {
  stateId: number;
  stateName: string;
}

export interface City {
  cityId: number;
  cityName: string;
  stateId: number;
}

export interface Bus {
  busId: number;
  busName: string;
  fromCity: number;
  toCity: number;
  travelDate: string;
  departureTime: string;
  arrivalTime: string;
  fare: string;
  seatsAvailable: number;
  busType: string;
  createdAt: string;
  updatedAt: string;
  fromCityName:string,
  toCityName:string
}



export interface ApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: State[];
}
