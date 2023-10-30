
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region-type';

@Injectable({providedIn: 'root'})
export class CountriesService {


  private apiUrl: string = "https://restcountries.com/v3.1"


  public cachStore:CacheStore = {
    byCapital: { term: '', countries: []},
    byCountries: { term: '', countries: []},
    byRegion: { region: '', countries: []},
  }



  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage(){
    localStorage.setItem('cachStore', JSON.stringify(this.cachStore))
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cachStore')) return;

    this.cachStore = JSON.parse(localStorage.getItem('cachStore')!)
  }


  private getCountryRequest(url:string): Observable<Country[]>{
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of ([])),
    )
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null>{
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
    .pipe(
      map( countries => countries.length > 0 ? countries[0]: null),
      catchError( () => of (null))
    )
  }

  searchCapital(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`
     return this.getCountryRequest(url)
     .pipe(
      tap( countries => this.cachStore.byCapital = {term, countries} ),
      tap(() => this.saveToLocalStorage())
     )
    }

  searchCountry(term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${term}`
     return this.getCountryRequest(url)
     .pipe(
      tap( countries => this.cachStore.byCountries = {term,countries}),
      tap(() => this.saveToLocalStorage())
     )
  }

  searchRegion(region: Region): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${region}`
     return this.getCountryRequest(url)
     .pipe(
      tap( countries => this.cachStore.byRegion = {region,countries}),
      tap(() => this.saveToLocalStorage())
     )

  }
}
