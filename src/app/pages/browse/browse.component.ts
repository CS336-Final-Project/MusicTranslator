import { Component } from '@angular/core';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent {

}
