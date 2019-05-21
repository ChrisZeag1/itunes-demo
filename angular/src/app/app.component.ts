import { Component } from '@angular/core';
import { Subject, Observable} from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { ItunesService } from './itunes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public searchSub$: Subject<string>= new Subject<string>();
  public results$: Observable<any>;

  constructor(private itunesService: ItunesService) {}

    private ngOnInit() {
    // updates first time it loads
    this.results$ = this.itunesService.getTunes('');
    this.searchSub$.pipe(
      debounceTime(800),
    )
    .subscribe(searchString => {
      this.results$ = this.itunesService.getTunes(searchString);
    });
  }

  public toggleFav(tune: any): void {
    this.itunesService.toggleFavorite(tune);
  }

  public search(event: string): void {
    this.searchSub$.next(event);
  }

}
