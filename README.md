React version of jQuery.slideToggle. JavaScript animation where height is set on every requestAnimationFrame. The toggle direction can be reversed during the animation.

## demo

https://codepen.io/kunukn/full/wpepGz/

## setup

* git clone or download
* npm install
* npm start

## cdn

https://unpkg.com/react-slide-toggle/

## npm 

https://www.npmjs.com/package/react-slide-toggle

## usage example

Look in App component for inspiration


```js
import { SlideToggle } from 'react-slide-toggle';
import BezierEasing from 'bezier-easing';

const bezierEaseInOutQuart = BezierEasing(0.77, 0, 0.175, 1);

// Component usage example
<SlideToggle
  duration={280 /* default 300 */}
  easeCollapse={bezierEaseInOutQuart /* default cubicInOut */ }
  easeExpand={bezierEaseInOutQuart /* default cubicInOut */ }
  collapsed={false /* default falsy */ }
  irreversible={false /* default falsy */ }
  noDisplayStyle={false /* default falsy */ }
  whenReversedUseBackwardEase={false /* default falsy */ }
  onExpanded={()=>{ /* optional event hook */ }}
  onExpanding={()=>{ /* optional event hook */ }}
  onCollapsed={()=>{ /* optional event hook */ }}
  onCollapsing={()=>{ /* optional event hook */ }}
  render={({ 
    onToggle, 
    setCollasibleElement, 
    toggleState, 
    isMoving, 
    hasReversed,
    range,
  }) => (
    <div className="slide-toggle">
      <div className="slide-toggle__header">
        <button className="slide-toggle__button" onClick={onToggle}>
          toggle
        </button>
      </div>
      <div className="slide-toggle__box" ref={setCollasibleElement}>
        <div className="slide-toggle__box-inner" 
             style={{ opacity: Math.max(.5, range) }}
         >
          Lorem Ipsum.
        </div>
      </div>
    </div>
  )}
/>
```

## size

* minified file ~7Kb
* gzip-size ~2Kb


## provide your own markup

The component provides the functionality. 
Minimum requirement is to bind the collapsible element with `setCollasibleElement`. 
Use the `onToggle` function to toggle the collapsible element.


## provide your own easing functions

Look for examples in the App component

```js
import eases from 'eases';
import BezierEasing from 'bezier-easing';
```

To minimize the component size, no default easing library has been added.

You can see examples of JS-easing library usage here

* eases        https://codepen.io/kunukn/full/mpVJOm/
* BezierEasing https://codepen.io/kunukn/full/YYNqyj/
