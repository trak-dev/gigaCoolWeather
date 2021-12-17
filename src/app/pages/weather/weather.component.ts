import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import * as moment from 'moment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: any;
  now: string = "";
  day: string = "";
  search: string= "";

  constructor(private _weather: WeatherService) { }

  ngOnInit(): void {
    this._weather.getWeather("paris").then((data: any) => {
      this.weather = data;
      console.log(this.weather);
      this.now = moment().locale("fr").format("D MMMM yyyy");
      this.day= moment().locale("fr").format("dddd")
      this.weather.main.temp = parseInt(this.weather.main.temp);
      this.weather.sys.sunset = moment.unix(this.weather.sys.sunset).format("HH:mm:ss");
      this.weather.wind.speed = parseInt(this.weather.wind.speed) * 10;
    })
  }

  editUser (event: any) {
    if (event.code === "Enter") {
      if (this.search !== "") {
        this._weather.getWeather(this.search).then((data: any) => {
          this.weather = data;
          console.log(this.weather);
          this.now = moment().locale("fr").format("D MMMM yyyy");
          this.day= moment().locale("fr").format("dddd")
          this.weather.main.temp = parseInt(this.weather.main.temp);
          this.weather.sys.sunset = moment.unix(this.weather.sys.sunset).format("HH:mm:ss");
          this.weather.wind.speed = parseInt(this.weather.wind.speed) * 10;
        }).catch(error => {
          console.error(error.message);
          alert(error.statusText);
        })
      }
    }
  }

}
