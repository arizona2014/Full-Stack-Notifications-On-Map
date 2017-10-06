import {Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';

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

    typesArray = [];

    constructor(private rd: Renderer2) { }

    ngOnInit() { }

    hasClass(ele,cls) {

        return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));

    }

    removeClass(ele,cls) {

        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');

    }

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

        let form = document.forms["frmFiltre"];
        console.log(this.typesArray);
        console.log(this.stateElem.nativeElement.value);
        console.log(this.dateFrom.nativeElement.value);
        console.log(this.dateTo.nativeElement.value);
        console.log(form);

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
