import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{

  bitcoinData = [];
  bitcoinDetails = [];
  currentView: number = 1;

  constructor(private http: HttpClient) {}

  ngOnInit() {
      let observable = this.http.get('https://api.coindesk.com/v1/bpi/currentprice.json');
      observable.subscribe((response) => {
        //Daten werden aus JSON file in Array gespeichert
       for(let key in response.bpi) 
        if(response.bpi.hasOwnProperty(key))
           this.bitcoinData.push(response.bpi[key]);
      }) 
      let detailObserver = this.http.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin&per_page=100&page=1&sparkline=false');
      detailObserver.subscribe((detailObserver) => {
       //Daten werden aus JSON file in Array gespeichert
        for(let key in detailObserver) 
           if(detailObserver.hasOwnProperty(key))
             this.bitcoinDetails.push(detailObserver[key]); 
        })
    }  
  


  // Lädt Seite neu
  reloadButton() {
    location.reload(true);
  }

  // Ändert momentane Seite
  changeView(i: number) {
    this.currentView = i;
  }


}
