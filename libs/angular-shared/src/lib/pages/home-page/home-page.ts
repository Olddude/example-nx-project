import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header-component/header-component';
import { FooterComponent } from '../../components/footer-component/footer-component';

@Component({
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  selector: 'lib-home-page',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class HomePage {}
