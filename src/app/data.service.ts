import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

    constructor(public http: Http) { }

    markers: any;

    getMarkers(){

        return this.http.get('http://localhost:3000/api/markers')
            .map(result => this.markers = result.json());

    }

    saveMarker(newMarker: any){

        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:3000/api/markers', JSON.stringify(newMarker), options)
            .map(result => {
                this.markers = result.json();
            });

    }

}
