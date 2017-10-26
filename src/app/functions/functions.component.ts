import { Component, OnInit, ViewChild, ElementRef, Renderer2, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from "../data.service";

@Component({
    selector: 'app-functions',
    templateUrl: './functions.component.html',
    styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {

    @ViewChild('state1') el1: ElementRef;
    @ViewChild('state2') el2: ElementRef;
    @ViewChild('state3') el3: ElementRef;
    @ViewChild('state') stateElem: ElementRef;
    @ViewChild('dateTo') dateTo: ElementRef;
    @ViewChild('dateFrom') dateFrom: ElementRef;
    @ViewChild('firstName') firstName: ElementRef;
    @ViewChild('lastName') lastName: ElementRef;
    @ViewChild('email') email: ElementRef;
    @ViewChild('phone') phone: ElementRef;
    @ViewChild('category') category: ElementRef;
    @ViewChild('description') description: ElementRef;

    @Input('addingMarkers') addingMarkers:any;
    @Input('markerPlaced') markerPlaced:any;
    @Input('newMarker') newMarker:any;
    @Output()
    changeFunctions:EventEmitter<any> = new EventEmitter<any>();

    canAddMarker : boolean = false;
    typesArray = [];

    // Constructor for Functions class
    constructor(private rd: Renderer2, private dataService: DataService) { }

    ngOnInit() { }

    // Helper function for finding if an element has certain css class
    hasClass(ele,cls) {

        return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));

    }

    // Helper function for removeing certain css class
    removeClass(ele,cls) {

        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');

    }

    // Helper function for adding certain css class
    addClass (ele, cls) {

        ele.className += " " + cls;

    }

    selectType(evt) {

        if(evt.srcElement.checked){

            this.typesArray.push(evt.srcElement.value);

        } else {

            var index = this.typesArray.indexOf(evt.srcElement.value);
            if (index > -1) {
                this.typesArray.splice(index, 1);
            }

        }

    }

    filter_Click(){

        var filterString = { 'types' : this.typesArray, 'state' : this.stateElem.nativeElement.value, 'dateFrom': this.dateFrom.nativeElement.value, 'dateTo': this.dateTo.nativeElement.value }
        this.dataService.filterMarkers(filterString).subscribe(res => {

            this.changeFunctions.emit({"adding" : this.addingMarkers, "marker": this.markerPlaced, 'newMarkerCoords': this.newMarker  });

        });

    }

    BTN_AddMarker_Click(){

        this.addingMarkers = true;
        this.canAddMarker = true;
        this.changeFunctions.emit({"adding" : this.addingMarkers, "marker": this.markerPlaced, 'newMarkerCoords': this.newMarker });

    }

    BTN_SendIncident_Click(){

        var err = false;
        var msg;
        msg = document.getElementById('addMessage');
        msg.innerText = ( msg.innerText !== "" ) ? "" : 'There seems to be an error ';

        if( this.firstName.nativeElement.value === "" || this.lastName.nativeElement.value === "" || this.email.nativeElement.value === "" || this.description.nativeElement.value  === "" || this.category.nativeElement.value  === "" ){
            err = true;
        }

        if(  this.email.nativeElement.validity.valid === false ){
            err = true;
        }

        if(!err){

            let creationDate = Date.now();
            this.addingMarkers = false;
            this.markerPlaced = false;
            this.canAddMarker = false;
            this.newMarker.firstName = this.firstName.nativeElement.value;
            this.newMarker.lastName = this.lastName.nativeElement.value;
            this.newMarker.email =  this.email.nativeElement.value;
            this.newMarker.phone = this.phone.nativeElement.value;
            this.newMarker.category = this.category.nativeElement.value;
            this.newMarker.description = this.description.nativeElement.value;
            this.newMarker.draggable = false;
            this.newMarker.created = creationDate;
            this.newMarker.status = 'Unsolved';

            switch(this.newMarker.category){
                 case "1":
                    this.newMarker.icon = '../../assets/images/dealGreen.png';
                    break;
                 case "2":
                    this.newMarker.icon = '../../assets/images/wastesGreen.png';
                    break;
                 case "3":
                    this.newMarker.icon = '../../assets/images/buildingGreen.png';
                    break;
                 case "4":
                    this.newMarker.icon = '../../assets/images/bulbGreen.png';
                    break;
                 case "5":
                    this.newMarker.icon = '../../assets/images/parkingGreen.png';
                    break;
                 case "6":
                    this.newMarker.icon = '../../assets/images/homelessGreen.png';
                    break;
                 case "7":
                    this.newMarker.icon = '../../assets/images/garbageGreen.png';
                    break;
                 case "8":
                    this.newMarker.icon = '../../assets/images/treeGreen.png';
                    break;
                 case "9":
                    this.newMarker.icon = '../../assets/images/roadGreen.png';
                    break;
                 case "10":
                    this.newMarker.icon = '../../assets/images/saveGreen.png';
                    break;
                 case "11":
                    this.newMarker.icon = '../../assets/images/trafficLightGreen.png';
                    break;
                 case "12":
                    this.newMarker.icon = '../../assets/images/audioGreen.png';
                    break;
                 case "13":
                    this.newMarker.icon = '../../assets/images/questionGreen.png';
                    break;
                 case "14":
                    this.newMarker.icon = '../../assets/images/waterGreen.png';
                    break;
                 case "15":
                    this.newMarker.icon = '../../assets/images/transportGreen.png';
                    break;
                 case "16":
                    this.newMarker.icon = '../../assets/images/carGreen.png';
                    break;
            }


            this.dataService.saveMarker(this.newMarker).subscribe(res => {

                this.firstName.nativeElement.value = '';
                this.lastName.nativeElement.value = '';
                this.email.nativeElement.value = '';
                this.phone.nativeElement.value = '';
                this.category.nativeElement.value = '';
                this.description.nativeElement.value = '';

                this.changeFunctions.emit({"adding" : this.addingMarkers, "marker": this.markerPlaced, 'newMarkerCoords': this.newMarker  });
                msg.style.display = 'none';
            });

        } else {

            msg.style.display = 'block';

        }

    }

    BTN_CancelSendIncident_Click(){

        this.addingMarkers = false;
        this.markerPlaced = false;
        this.canAddMarker = false;
        this.changeFunctions.emit({"adding" : this.addingMarkers, "marker": this.markerPlaced, 'newMarkerCoords': this.newMarker  });

    }

    toggleCheckState(evt){

        switch(evt.srcElement.id){

            case 'CheckState1':
                this.stateElem.nativeElement.value  = "O";
                this.el1.nativeElement.checked = true;
                this.el2.nativeElement.checked = false;
                this.el3.nativeElement.checked = false;
                break;
            case 'CheckState2':
                this.stateElem.nativeElement.value = "C";
                this.el1.nativeElement.checked = false;
                this.el2.nativeElement.checked = true;
                this.el3.nativeElement.checked = false;
                break;
            case 'CheckState3':
                this.stateElem.nativeElement.value = "A";
                this.el1.nativeElement.checked = false;
                this.el2.nativeElement.checked = false;
                this.el3.nativeElement.checked = true;
                break;

        }

    }

    toggleMainTabs(evt) {

        var ele = evt.currentTarget;
        var eleContent;
        var otherElement;
        var otherContent;

        if(ele.id === "BTN_pointer") {

            eleContent = document.getElementById("DIV_pointer");
            otherElement = document.getElementById("BTN_filters");
            otherContent = document.getElementById("DIV_filters");

        } else {

            eleContent = document.getElementById("DIV_filters");
            otherElement = document.getElementById("BTN_pointer");
            otherContent = document.getElementById("DIV_pointer");

        }

        if(this.hasClass(ele, 'link-active')){

            this.removeClass(ele, "link-active");
            this.addClass(otherElement, "link-active");
            eleContent.style.display = "none";
            otherContent.style.display = "block";

        } else {

            this.addClass(ele, 'link-active');
            this.removeClass(otherElement, "link-active");
            eleContent.style.display = "block";
            otherContent.style.display = "none";

        }

    }

    toggleType(evt){

        var ele = evt.currentTarget.children[1];
        var other = evt.currentTarget.parentNode.children[1];
        if(this.hasClass(ele, 'ms-choice-div-open')){

            this.removeClass(ele, "ms-choice-div-open");
            this.addClass(ele, "ms-choice-div");
            this.removeClass(other, "ms-drop-open");
            this.addClass(other, "ms-drop");

        } else {

            this.removeClass(ele, "ms-choice-div");
            this.addClass(ele, "ms-choice-div-open");
            this.removeClass(other, "ms-drop");
            this.addClass(other, "ms-drop-open");

        }

    }

    toggleState(evt){

        var ele = evt.currentTarget.children[1];
        var other = evt.currentTarget.parentNode.children[1];
        if(this.hasClass(ele, 'ms-choice-div-open')){

            this.removeClass(ele, "ms-choice-div-open");
            this.addClass(ele, "ms-choice-div");
            this.removeClass(other, "ms-drop-open");
            this.addClass(other, "ms-drop");

        } else {

            this.removeClass(ele, "ms-choice-div");
            this.addClass(ele, "ms-choice-div-open");
            this.removeClass(other, "ms-drop");
            this.addClass(other, "ms-drop-open");

        }

    }

}
