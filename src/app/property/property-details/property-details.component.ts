import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/service/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  public id!: number;
  property = new Property();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.route.data.subscribe((data) => {
      this.property = data['prp'];
    });
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.housingService.getProperty(this.id).subscribe(
        (data) => {
          if (data) {
            this.property = data as Property;
          }
        },
        (error) => this.router.navigate(['/'])
      );
    });

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
    ];

    this.galleryImages = [
      {
        small: 'assets/images/house1_1.webp',
        medium: 'assets/images/house1_1.webp',
        big: 'assets/images/house1_1.webp'
      },
      {
        small: 'assets/images/house1_2.webp',
        medium: 'assets/images/house1_2.webp',
        big: 'assets/images/house1_2.webp'
      },
      {
        small: 'assets/images/house1_3.webp',
        medium: 'assets/images/house1_3.webp',
        big: 'assets/images/house1_3.webp'
      },
      {
        small: 'assets/images/house1_4.webp',
        medium: 'assets/images/house1_4.webp',
        big: 'assets/images/house1_4.webp'
      },
      {
        small: 'assets/images/house1_5.webp',
        medium: 'assets/images/house1_5.webp',
        big: 'assets/images/house1_5.webp'
      },
    ];
  }
}
