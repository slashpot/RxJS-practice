import { fromEvent } from "rxjs";
import { map, concatAll, takeUntil } from "rxjs/operators";

const draggable = document.getElementById("drag");
const body = document.body;

const mousedown = fromEvent(draggable, "mousedown");
const mousemove = fromEvent(body, "mousemove");
const mouseup = fromEvent(body, "mouseup");

const drag = mousedown.pipe(
  map(() => mousemove.pipe(takeUntil(mouseup))),
  concatAll(),
  map(event => ({ x: event.clientX, y: event.clientY }))
);

drag.subscribe(pos => {
  draggable.style.left = pos.x + "px";
  draggable.style.top = pos.y + "px";
});
