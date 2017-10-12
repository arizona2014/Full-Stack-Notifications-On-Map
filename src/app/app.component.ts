import { Component } from '@angular/core';
import { MapComponent } from "./map/map.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'app';
    public _addingMarkers : boolean = false;
    public _marketPlaced : boolean = false;
    public _newMakerCoords : any = {};

    changeFunctions(event) {
        this._addingMarkers  = event.adding;
        this._marketPlaced  = event.marker;
        this._newMakerCoords = event.newMarkerCoords;
    }

    changeMap(event) {
        this._addingMarkers  = event.adding;
        this._marketPlaced  = event.marker;
        this._newMakerCoords = event.newMarkerCoords;
    }


}
