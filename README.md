## about
React version of jQuery.slideToggle. JavaScript animation where height is set on every requestAnimationFrame. 
The toggle direction can be reversed during the movement.

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

## info

Default easing is cubicInOut. You can reverse the toggle before the movement completes. Ease in-out works best visually when reverse toggling is to be used.

This should be A11Y friendly, you can test the tabindex by tabbing. The collapsed items should be skipped due to usage of display:none (inert functionality)

JS animation is used for best animation control and possibility of adding interpolation or using advanged easing configuration which you can't with CSS alone. This triggers browser reflows on every requestAnimationFrame. If you have a very long page this might not be the best option to use.

## usage example

Look in App component for inspiration. Apply the styling as needed.


```js
// Component example, simple
import { SlideToggle } from 'react-slide-toggle';

<SlideToggle
  render={({onToggle, setCollapsibleElement}) => (
    <div className="box">
      <button className="btn" onClick={onToggle}> toggle </button>
      <div className="box-content" ref={setCollapsibleElement}>
          Collapsible content
      </div>
    </div>
  )}
/>
```


```js
// Component usage example with all options
import { SlideToggle } from 'react-slide-toggle';
import BezierEasing from 'bezier-easing'; // optional

const bezierEaseInOutQuart = BezierEasing(0.77, 0, 0.175, 1);

<SlideToggle
  duration={280 /* default 300 */}
  easeCollapse={bezierEaseInOutQuart /* default cubicInOut */ }
  easeExpand={bezierEaseInOutQuart /* default cubicInOut */ }
  collapsed={false /* default falsy */ }
  irreversible={false /* default falsy */ }
  noDisplayStyle={false /* default falsy */ }
  bestPerformance={false /* default falsy */ }
  whenReversedUseBackwardEase={false /* default falsy */ }
  interpolateOnReverse={false /* default falsy */ }
  onExpanded={({hasReversed}) => { /* optional event hook */ }}
  onExpanding={({range, progress, hasReversed}) => { /* optional event hook */ }}
  onCollapsed={({hasReversed}) => { /* optional event hook */ }}
  onCollapsing={({range, progress, hasReversed}) => { /* optional event hook */ }}
  render={({ 
    onToggle, 
    setCollapsibleElement, 
    toggleState, 
    isMoving, 
    hasReversed,
    range /* linear value between [0 and 1] */ ,
    progress /* easing result value between [0 and 1] */ ,
  }) => {
    
    /* optional logic here */

    /* 
      markup example 
      where setCollapsibleElement, onToggle and progress are used 
    */
    return <div className="slide-toggle">
      <div className="slide-toggle__header">
        <button className="slide-toggle__button" onClick={onToggle}>
          toggle
        </button>
      </div>
      <div className="slide-toggle__box" ref={setCollapsibleElement}>
        <div className="slide-toggle__box-inner" 
             style={{ opacity: Math.max(.5, progress) }}
         >
          Collapsible content
        </div>
      </div>
    </div>
  }}
/>
```

## properties

* duration - movement duration in milli seconds
* easeCollapse - function which generates a value between [0 and 1]
* easeExpand - function which generates a value between [0 and 1]
* collapsed - start in collapsed mode
* irreversible - you can't reverse direction during movement
* noDisplayStyle - skip adding display:none on collapsed
* bestPerformance - don't apply setState for every frame update. Disables range and progress update
* whenReversedUseBackwardEase - play backwards on reverse toggling
* interpolateOnReverse - avoid jumpy height changes when easeCollapse and easeExpand gives far different height position on reverse toggling.
* onExpanded - event hook
* onExpanding - event hook
* onCollapsed - event hook
* onCollapsing - event hook
* render - render callback

## size

* minified file ~7Kb
* gzip-size ~2Kb


## provide your own markup

The component provides the functionality. 
Minimum requirement is to bind the collapsible element with `setCollapsibleElement`. 
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
