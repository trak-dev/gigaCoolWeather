import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey: string = "&units=metric&lang=fr&appid=4ba144aa4c9a4960b0d479e1dfd914a1"
  baseUrl: string = "api.openweathermap.org/data/2.5/weather?q="

  constructor(private _http: HttpClient,) { }

  getWeather(city: string) {
    return new Promise((resolve, reject) => {
        this._http
          .get(`http://${this.baseUrl}${city}${this.apiKey}`)
          .subscribe(
            (data: any) => {
                resolve(data);
            },
            (error) => {
              console.error(error);
              reject(error);
            }
          );
      });
    };
  }
