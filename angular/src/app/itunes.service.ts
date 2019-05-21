import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItunesService {
  public types: string[];
  public favorites: any[] = [];

  constructor(private http: HttpClient) {
    if (!window.localStorage.getItem('favorites')) {
      window.localStorage.setItem('favorites', '[]');
    }else {
      this.favorites = JSON.parse(window.localStorage.getItem('favorites'));
    }
  }

  public getTunes(search?: string): Observable<any> {
    return this.http.get<any>(`/API/v1/itunes?term=${ search }`).pipe(
      map(tunes => {
        this.types = Object.keys(tunes);
        return tunes;
      }),
      catchError(e => { 
        console.log('error at getTunes > ', e);
        return of({});
      })
    );
  }

 public toggleFavorite(tune): void {
   let index = -1;
   this.favorites.some((favTune, favIndex) => {
     if (favTune.trackId && favTune.trackId === tune.trackId) {
       index = favIndex;
       return true;
     } else if (favTune.artistId && favTune.artistId === tune.artistId) {
        index = favIndex;
       return true;
     }
   });
   if (!~index) {
     this.favorites.push(tune);
   }else {
     this.favorites.splice(index, 1);
   }
   window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
 }
}
