import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
declare var M: any;

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss']
})
export class CollapsibleComponent implements OnInit {
  @Input()
  public headers: string[] = [];
  @Input()
  public data: any[] = []; 
  private arrows: {[header: string ]: boolean} = {};
  @Output()
  public favEvent: EventEmitter<any> = new EventEmitter<any>();
  public toggleFav: {[id: string ]: boolean} = {};

  constructor() { }

  public ngOnInit() {}

  private changeArrow(header: string): void {
    this.arrows[header] = !this.arrows[header];
  }

  private getArrowIcon(header): string {
    if (!this.arrows[header]) {
      return 'keyboard_arrow_down';
    }
    return 'keyboard_arrow_right';
  }

  public emitFav(tune): void {
    this.favEvent.emit(tune);
  }

   private getStarIcon(tune): string {
    if (!tune.favorite) {
      return 'star_border';
    }
    return 'star';
  }


  public ngAfterViewInit(): void {
      const elems = document.querySelectorAll('.collapsible');
      M.Collapsible.init(elems, {});
  }

}
