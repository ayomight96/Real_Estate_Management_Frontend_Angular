import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/service/housing.service';
import { IProperty } from '../IProperty.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  sellRent = 1;
  properties: Array<IProperty> = [];

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}
  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.sellRent = 2;
    }
    this.housingService.getAllProperties(this.sellRent).subscribe(
      (data) => {
        this.properties = data;
        console.log(data);
        console.log(this.route.snapshot.url.toString());
      },
      (error) => {
        console.log('httperror:');
        console.log(error);
      }
    );
  }
}
