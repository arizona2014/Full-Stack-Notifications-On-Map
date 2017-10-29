import {Component, OnInit, NgZone, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { MapsAPILoader } from "@agm/core";
import { DataService } from "../data.service";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    @Input('addingMarkers') addingMarkers:any;
    @Input('markerPlaced') markerPlaced:any;
    @Input('newMarker') newMarker:any;
    @Input('filterMarkers') filterMarkers:any;
    @Output()
    changeMap:EventEmitter<any> = new EventEmitter<any>();

    public latitude: number;
    public longitude: number;
    public zoom: number;
    public icon: string;
    public markers: Array<any>;

    //Map component constructor
    constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private dataService: DataService ) {

        this.dataService.getMarkers()
            .subscribe( (res) => {
                this.markers = res.data;
            });

    }

    ngOnChanges(changes: SimpleChanges) {

        const filteredMarkers: any = changes.filterMarkers.currentValue;
        this.markers = filteredMarkers;

    }

    // Map component initialization callback function
    ngOnInit() {

        this.zoom = 15;
        this.latitude = 46.005947239114626;
        this.longitude = 24.790892606250054;
        this.icon = "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-64.png";
        this.setCurrentPosition();
        this.mapsAPILoader.load().then(() => { });

    }

    // function to set current position on page load
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

    clickedMarker(label: string, index: number){ }

    addMarker($event: any) {

        if(this.addingMarkers){

            this.newMarker = {
                lat: $event.coords.lat,
                lng: $event.coords.lng,
                label: 'New marker'
            };

            this.markers.push(this.newMarker);
            this.addingMarkers = false;
            this.markerPlaced  = true;
            this.changeMap.emit({"adding" : this.addingMarkers, "marker": this.markerPlaced, 'newMarkerCoords': this.newMarker });

        }

    }

    markerDragEnd(m: any, $event: MouseEvent) {


    }

}
