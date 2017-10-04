import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.css']
})
export class FunctionsComponent implements OnInit {

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

    addActiveClass(ele) {

        ele.className += "link-active";

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
            this.addActiveClass(otherElement);
            eleContent.style.display = "none";
            otherContent.style.display = "block";
        } else {
            this.addActiveClass(ele);
            this.removeClass(otherElement, "link-active");
            eleContent.style.display = "block";
            otherContent.style.display = "none";
        }

    }

}
