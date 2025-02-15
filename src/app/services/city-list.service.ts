import { Injectable } from '@angular/core';
import { City } from '../models/ciltyList.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CityListService {
  private cityListSubject = new BehaviorSubject<City[] | undefined>(undefined);
  public cityList = this.cityListSubject.asObservable();

  private currentCitySelectedSubject = new BehaviorSubject<City>({
    id: 0,
    cityname: 'All Location',
  });
  public currentCitySelected = this.currentCitySelectedSubject.asObservable();

  private APIURL = 'https://localhost:7271/api/City';

  constructor(private http: HttpClient) {}

  private AddCities(cities: City[]) {
    this.cityListSubject.next(cities);
  }

  public ChangeCity(city: City) {
    this.currentCitySelectedSubject.next(city);
  }

  public AddCityFromAPI() {
    this.http.get<City[]>(this.APIURL).subscribe((data) => {
      this.AddCities(data);
    });
  }
}
