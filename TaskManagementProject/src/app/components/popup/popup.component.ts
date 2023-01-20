import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('.3s ease-out', style({ opacity: 0 }))
      ])
    ])
  ]

})
export class PopupComponent {
  showComponent = true;
  @Input() msg: string = "";
  @Input() typeMsg: string = "";
  IconType : string = "";


  ngOnInit() {
    switch (this.typeMsg) {
      case "Error":
        this.IconType ='error';
        break;

      case "Wzarning":
        this.IconType ='warning';
        break;

      default:
        this.IconType ='done';
        break;
    }
    setTimeout(() => {
      this.showComponent = false;
    }, 3000);
  }
}
