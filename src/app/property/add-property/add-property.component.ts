import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Ipropertybase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/service/alertify.service';
import { HousingService } from 'src/app/service/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild('form') form!: NgForm;
  @ViewChild('staticTabs') staticTabs?: TabsetComponent;
  addPropertyForm!: FormGroup;
  nextClicked!: boolean;
  property = new Property();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private housingService: HousingService,
    private alertify: AlertifyService
  ) {}

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  cityList!: any[];
  propertyView: Ipropertybase = {
    id: 10,
    sellRent: 1,
    name: '',
    propertyType: '',
    price: null,
    furnishingType: '',
    bhk: null,
    builtArea: null,
    city: '',
    readyToMove: 0,
  };

  ngOnInit() {
    this.createPropertyForm();
    this.housingService.getAllCities().subscribe((data) => {
      this.cityList = data;
      console.log(data);
    });
  }

  createPropertyForm() {
    this.addPropertyForm = this.formBuilder.group({
      BasicInfo: this.formBuilder.group({
        sellRent: ['1', Validators.required],
        bhk: [null, Validators.required],
        propertyType: [null, Validators.required],
        furnishingType: [null, Validators.required],
        name: [null, Validators.required],
        city: [null, Validators.required],
      }),
      PricingInfo: this.formBuilder.group({
        price: [null, Validators.required],
        builtArea: [null, Validators.required],
        carpetArea: [null],
        security: [null],
        maintenance: [null],
      }),
      AddressInfo: this.formBuilder.group({
        floorNo: [null],
        totalFloor: [null],
        address: [null, Validators.required],
        landMark: [null],
      }),
      OtherInfo: this.formBuilder.group({
        readyToMove: [null, Validators.required],
        possessionOn: [null],
        ageOfProperty: [null],
        gated: [null],
        mainEntrance: [null],
        description: [null],
      }),
    });
  }
  //#region <Getter Methods>
  //#region <FormGroups>
  get basicInfo() {
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get pricingInfo() {
    return this.addPropertyForm.controls['PricingInfo'] as FormGroup;
  }

  get addressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get otherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }
  //#endregion <FormGroups>
  //#region <FormControls>
  get sellRent() {
    return this.basicInfo.controls['sellRent'] as FormControl;
  }

  get bhk() {
    return this.basicInfo.controls['bhk'] as FormControl;
  }

  get propertyType() {
    return this.basicInfo.controls['propertyType'] as FormControl;
  }

  get furnishingType() {
    return this.basicInfo.controls['furnishingType'] as FormControl;
  }

  get name() {
    return this.basicInfo.controls['name'] as FormControl;
  }

  get city() {
    return this.basicInfo.controls['city'] as FormControl;
  }

  get price() {
    return this.pricingInfo.controls['price'] as FormControl;
  }

  get builtArea() {
    return this.pricingInfo.controls['builtArea'] as FormControl;
  }

  get carpetArea() {
    return this.pricingInfo.controls['carpetArea'] as FormControl;
  }

  get security() {
    return this.pricingInfo.controls['security'] as FormControl;
  }

  get maintenance() {
    return this.pricingInfo.controls['maintenance'] as FormControl;
  }

  get floorNo() {
    return this.addressInfo.controls['floorNo'] as FormControl;
  }

  get totalFloor() {
    return this.addressInfo.controls['totalFloor'] as FormControl;
  }

  get address() {
    return this.addressInfo.controls['address'] as FormControl;
  }

  get landMark() {
    return this.addressInfo.controls['landMark'] as FormControl;
  }

  get readyToMove() {
    return this.otherInfo.controls['readyToMove'] as FormControl;
  }

  get possessionOn() {
    return this.otherInfo.controls['possessionOn'] as FormControl;
  }

  get ageOfProperty() {
    return this.otherInfo.controls['ageOfProperty'] as FormControl;
  }

  get gated() {
    return this.otherInfo.controls['gated'] as FormControl;
  }

  get mainEntrance() {
    return this.otherInfo.controls['mainEntrance'] as FormControl;
  }

  get description() {
    return this.otherInfo.controls['description'] as FormControl;
  }
  //#endregion <FormControls>
  //#endregion <Getter Methods>
  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success(
        'Congrats, your property listed successfully on our website'
      );
      console.log(this.addPropertyForm);

      if (this.sellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.alertify.error(
        'Please review the form and provide all valid entries'
      );
    }
    // console.log('Congrats, Form Submitted');
    // console.log('sellRent=' + this.addPropertyForm.value.BasicInfo.sellRent);
    // console.log(this.addPropertyForm);
  }

  mapProperty(): void {
    this.property.id = this.housingService.generateId();
    this.property.sellRent = +this.sellRent.value;
    this.property.bhk = this.bhk.value;
    this.property.propertyType = this.propertyType.value;
    this.property.name = this.name.value;
    this.property.city = this.city.value;
    this.property.furnishingType = this.furnishingType.value;
    this.property.price = this.price.value;
    this.property.security = this.security.value;
    this.property.maintenance = this.maintenance.value;
    this.property.builtArea = this.builtArea.value;
    this.property.carpetArea = this.carpetArea.value;
    this.property.floorNo = this.floorNo.value;
    this.property.totalFloor = this.totalFloor.value;
    this.property.address = this.address.value;
    this.property.address2 = this.landMark.value;
    this.property.readyToMove = this.readyToMove.value;
    this.property.ageOfProperty = this.ageOfProperty.value;
    this.property.gated = this.gated.value;
    this.property.mainEntrance = this.mainEntrance.value;
    this.property.possessionOn = this.possessionOn.value;
    this.property.description = this.description.value;
    this.property.postedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.staticTabs) {
      if (this.basicInfo.invalid) {
        this.staticTabs.tabs[0].active = true;
        return false;
      }

      if (this.pricingInfo.invalid) {
        this.staticTabs.tabs[1].active = true;
        return false;
      }

      if (this.addressInfo.invalid) {
        this.staticTabs.tabs[2].active = true;
        return false;
      }

      if (this.otherInfo.invalid) {
        this.staticTabs.tabs[3].active = true;
        return false;
      }
    }
    return true;
  }

  selectNextTab(tabId: number, isCurrentTabValid?: boolean) {
    this.nextClicked = true;
    if (isCurrentTabValid && this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }
}
