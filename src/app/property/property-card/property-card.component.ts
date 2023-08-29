import { Component, Input } from "@angular/core";
import { Ipropertybase } from "src/app/model/ipropertybase";

@Component(
    {
        selector: 'app-property-card',
        templateUrl: 'property-card.component.html',
        styleUrls: ['property-card.component.css']
    }
)
export class PropertyCardComponent{
    @Input() data! : Ipropertybase;
    @Input() hideIcons: boolean = false;
}