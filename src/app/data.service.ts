import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    // location of GeoJSON file in server
    private _url = 'assets/data/bikes.json';
    private markers: any;
    constructor(public http: Http) { }

    // Function that returns all markers from MongoDB
    getMarkers() {

        return this.http.get('http://localhost:3000/api/markers')
            .map(result => this.markers = result.json());

    }

    // Function that returns filtered markers from MongoDB
    filterMarkers(criteria) {

        return this.http.post('http://localhost:3000/api/find', {criteria : criteria})
            .map(result => this.markers = result.json());

    }

    // Function that insert a marker into MongoDB
    saveMarker(newMarker: any) {
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/api/markers', JSON.stringify(newMarker), options)
            .map(result => {
                this.markers = result.json();
            });

    }

    // Function that recuperates parking JSON
    getBikes() {
      return this.http.get(this._url).map(result => result.json());
    }

}
