import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {

    typesArray = [];

    constructor() { }

    ngOnInit() {
    }

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

    selectType(evt) {
        if(evt.srcElement.checked){
            this.typesArray.push(evt.srcElement.value);
        } else {
            var index = this.typesArray.indexOf(evt.srcElement.value);
            if (index > -1) {
                this.typesArray.splice(index, 1);
            }
        }
        console.log(this.typesArray);
    }

    filter_Click(){
        let form = document.forms["frmFiltre"];
        console.log(form);
        //let cat = this.serializeObj(form);
        //console.log(serialized);

    }

}
