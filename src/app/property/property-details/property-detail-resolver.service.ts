import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/service/housing.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyDetailResolverService implements Resolve<Property> {
  constructor(private router: Router, private housingService: HousingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Property | Observable<Property> | Promise<Property> {
    const id = route.params['id'];
    return this.housingService.getProperty(+id).pipe(
      catchError((error) => {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
