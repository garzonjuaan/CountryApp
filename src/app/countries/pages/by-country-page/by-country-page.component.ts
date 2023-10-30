import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';



  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.countries = this.countriesService.cachStore.byCountries.countries
    this.initialValue = this.countriesService.cachStore.byCountries.term
  }


  searchByCountry( country: string ):void {

  this.isLoading = true

  this.countriesService.searchCountry(country)
  .subscribe( countries =>{
    this.countries = countries;
    this.isLoading = false
  })
  }

}
