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
  public favId: string[] = [];

  constructor(private http: HttpClient) {
    if (!window.localStorage.getItem('favorites')) {
      window.localStorage.setItem('favorites', '[]');
    }else {
      this.favorites = JSON.parse(window.localStorage.getItem('favorites'));
    }
    if (window.localStorage.getItem('favIds')) {
      this.favId = JSON.parse(window.localStorage.getItem('favIds'));
    }
  }

  public getTunes(search?: string): Observable<any> {
    return this.http.get<any>(`/API/v1/itunes?term=${ search }`).pipe(
      map(tunes => {
        this.types = Object.keys(tunes);
        this.types.forEach(type=> {
          tunes[type].forEach((tune, tuneIndex) => {
            if (~this.favId.indexOf(tune.trackId || tune.artistId)) {
              tunes[type][tuneIndex].favorite = true;
            }
          });
        });
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
   tune.favorite = !tune.favorite;
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
   this.favId = this.favorites.map(fav => fav.trackId || fav.artistId);
   window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
   window.localStorage.setItem('favIds', JSON.stringify(this.favId));
 }
}
