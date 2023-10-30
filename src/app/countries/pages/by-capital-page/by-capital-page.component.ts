import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit  {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: CountriesService){}


  ngOnInit(): void {
    this.countries = this.countriesService.cachStore.byCapital.countries
    this.initialValue = this.countriesService.cachStore.byCapital.term

  }


  searchByCapital( capital: string ):void {

    this.isLoading = true


  this.countriesService.searchCapital(capital)
  .subscribe( countries =>{
    this.countries = countries;
    this.isLoading = false;
  })
  }

}