import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-styled-button',
  templateUrl: './styled-button.component.html',
  styleUrls: ['./styled-button.component.css']
})
export class StyledButtonComponent {
  @Input() public Text: string = '';
  @Input() public RouterLink: string = '';
  @Input() public customStyle: string = '';

  clicked(router: string){
    alert(`Tem que ir pra essa rota ${router}`)
  }
}
