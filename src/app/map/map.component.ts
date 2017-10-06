import {Component, OnInit, NgZone} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MapsAPILoader} from "@agm/core";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    public latitude: number;
    public longitude: number;
    public zoom: number;
    public icon: string;

    public map;
    public marker;
    public markers = [];

    constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

        this.markers = [

            { lat: 48.89494145305041, lng: 2.0857715606689453, draggable: true, label: 'First marker', icon: 'https://maps.google.com/mapfiles/kml/shapes/library_maps.png' },
            { lat: 48.89756531781301, lng: 2.0825958251953125, draggable: true, label: 'Second marker', icon: 'https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png' }

        ];

    }

    ngOnInit() {

        //set google maps defaults
        this.zoom = 15;
        this.latitude = 46.005947239114626;
        this.longitude = 24.790892606250054;
        this.icon = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-64.png";

        //set current position
        this.setCurrentPosition();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {

        });

    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.icon = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-64.png";
                this.zoom = 15;
            });
        }
    }

    clickedMarker(label: string, index: number){
        //console.log(`clicked the marker ${label} with the index ${index}`);
    }


    addMarker($event: any) {
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            label: 'New marker'
        });
    }

    markerDragEnd(m: any, $event: MouseEvent) {
        //console.log('dragEnd', m, $event);
    }


}
