import { Component, Input, OnInit } from "@angular/core";
import { trigger, transition, useAnimation } from "@angular/animations";
import { interval, Subscription } from 'rxjs';

import {
  scaleIn,
  scaleOut
} from "./carousel.animations";

@Component({
  selector: "carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"],
  animations: [
    trigger("slideAnimation", [
      transition("void => scale", [
        useAnimation(scaleIn, { params: { time: "500ms" } })
      ]),
      transition("scale => void", [
        useAnimation(scaleOut, { params: { time: "500ms" } })
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {
  @Input() slides: any[];
  @Input() animationType = "scale";

  currentSlide = 0;
  subscription: Subscription;

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

  ngOnInit() {
    this.preloadImages();
    const source = interval(8000);
    this.subscription = source.subscribe(val => this.onNextClick());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.urlToImage;
    }
  }
}
