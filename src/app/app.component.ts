import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{

  bitcoinData = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let observable = this.http.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    observable.subscribe((response) => {
      //Daten werden aus JSON file in Array gespeichert
      for(let key in response.bpi) 
        if(response.bpi.hasOwnProperty(key))
          this.bitcoinData.push(response.bpi[key]);
    })
  }

  // Lädt Seite neu
  reloadButton() {
    location.reload();
  }


}
