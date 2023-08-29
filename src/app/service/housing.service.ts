import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Ipropertybase } from '../model/ipropertybase';
import { Iproperty } from '../model/iproperty';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5253/api/city');
  }

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map((propertiesArray) => {
        return propertiesArray.find((p) => p.id === id) as Property;
      })
    );
  }

  getAllProperties(sellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<Property> = [];
        const localProperties = JSON.parse(
          localStorage.getItem('newProperty')!
        );
        if (localProperties) {
          for (const id in localProperties) {
            if (sellRent) {
              if (
                localProperties.hasOwnProperty(id) &&
                localProperties[id].sellRent === sellRent
              ) {
                propertiesArray.push(localProperties[id]);
              }
            } else {
              propertiesArray.push(localProperties[id]);
            }
          }
        }
        for (const id in data) {
          if (sellRent) {
            if (data.hasOwnProperty(id) && data[id].sellRent === sellRent) {
              propertiesArray.push(data[id]);
            }
          } else {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );
    return this.http.get<Property[]>('data/properties.json');
  }

  addProperty(property: Property) {
    let newProperty = [property];
    if (localStorage.getItem('newProperty')) {
      newProperty = [
        property,
        ...JSON.parse(localStorage.getItem('newProperty')!),
      ];
    }
    localStorage.setItem('newProperty', JSON.stringify(newProperty));
  }

  generateId() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(localStorage.getItem('PID')! + 1));
      return +localStorage.getItem('PID')!;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
