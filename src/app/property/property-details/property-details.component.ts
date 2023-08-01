import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  public id!: number;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
  }

  onSelectNext() {
    this.id += 1;
    this.router.navigate(
      ['property-detail', this.id]
      // {
      //   // relativeTo: this.route,
      // }
    );
  }
}
