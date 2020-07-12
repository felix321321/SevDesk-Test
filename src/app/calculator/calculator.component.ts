import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  amountForm: any 
  amount: any
  selected: 0;
  result: any = 0;
  exchangeData = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { 
    // Erstellt Form für Übertragung von Umtauschmenge
    this.amountForm = this.formBuilder.group({
      amount: ''
    });
  }

  ngOnInit(): void {
    let observable = this.http.get('https://api.coingecko.com/api/v3/exchange_rates');
      observable.subscribe((response) => {
        //Daten werden aus JSON file in Array gespeichert
          this.exchangeData.push(response.rates.eur.value);
          this.exchangeData.push(response.rates.usd.value);
          this.exchangeData.push(response.rates.aud.value);
          this.exchangeData.push(response.rates.nzd.value);
          this.exchangeData.push(response.rates.gbp.value);
      }) 
  }

  // Rechnet Variablen zusammen
  umrechnen() {
    this.amount = this.amountForm.value.amount;
    this.result = this.amount / this.exchangeData[this.selected];
  }

}
