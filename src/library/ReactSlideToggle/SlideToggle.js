/*
  _state_ is internal state for sync and rendering control.
  setState is async and I need sync control because timing is important 
  and because I need to control what is to be re-rendered.
*/

import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
// import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies

const warn = console.warn.bind(console); // eslint-disable-line no-console

// Support browser or node env
const root = typeof window !== 'undefined' ? window : global;
const rAF = root.requestAnimationFrame
  ? root.requestAnimationFrame.bind(root)
  : callback => root.setTimeout(callback, 16);
const cAF = root.cancelAnimationFrame
  ? root.cancelAnimationFrame.bind(root)
  : root.clearInterval.bind(root);

const TOGGLE = {
  EXPANDED: 'EXPANDED',
  COLLAPSED: 'COLLAPSED',
  EXPANDING: 'EXPANDING',
  COLLAPSING: 'COLLAPSING',
};

const easeInOutCubic = t =>
  t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;

const util = {
  isMoving: toggleState =>
    toggleState === TOGGLE.EXPANDING || toggleState === TOGGLE.COLLAPSING,
  clamp: ({ value, max = 1, min = 0 }) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  },
  now: () => new Date().getTime(),
  sanitizeDuration: duration => Math.max(0, parseInt(+duration, 10) || 0),
  interpolate: ({ next, prev }) => {
    /* 
      If the diff in the next rAF is big, it can seem jumpy when reversing the togling
      This is heuristic approach to minimize the diff value by interpolating.
    */
    const diff = Math.abs(next - prev);
    let interpolated = next;
    if (diff > 0.15) {
      /* heuritic value */
      if (next > prev) interpolated -= diff * 0.75; /* heuritic value */
      else interpolated += diff * 0.75; /* heuritic value */
    }
    return interpolated;
  },
};

export default class SlideToggle extends React.Component {
  static defaultProps = {
    duration: 300,
    easeCollapse: easeInOutCubic,
    easeExpand: easeInOutCubic,
  };

  // static propTypes = {
  //   render: PropTypes.func,
  //   duration: PropTypes.number,
  //   irreversible: PropTypes.bool,
  //   whenReversedUseBackwardEase: PropTypes.bool,
  //   noDisplayStyle: PropTypes.bool,
  //   bestPerformance: PropTypes.bool,
  //   interpolateOnReverse: PropTypes.bool,
  //   easeCollapse: PropTypes.func,
  //   easeExpand: PropTypes.func,
  //   collapsed: PropTypes.bool,
  //   onExpanded: PropTypes.func,
  //   onExpanding: PropTypes.func,
  //   onCollapsed: PropTypes.func,
  //   onCollapsing: PropTypes.func,
  // };

  constructor(props) {
    super(props);

    this._state_ = {
      collasibleElement: null,
      toggleState: this.props.collapsed ? TOGGLE.COLLAPSED : TOGGLE.EXPANDED,
    };

    this.state = {
      toggleState: this._state_.toggleState,
      hasReversed: false,
      range: this.props.collapsed ? 0 : 1,
      progress: this.props.collapsed ? 0 : 1,
    };
  }

  render() {
    return this.props.render({
      onToggle: this.onToggle,
      setCollapsibleElement: this.setCollapsibleElement,
      toggleState: this.state.toggleState,
      hasReversed: this.state.hasReversed,
      isMoving: util.isMoving(this.state.toggleState),
      range: this.state.range,
      progress: this.state.progress,
    });
  }

  setCollapsibleElement = element => {
    if (!element) {
      warn('no element in setCollapsibleElement');
      return;
    }
    this._state_.collasibleElement = element;
    this._state_.boxHeight = element.clientHeight;

    if (this._state_.toggleState === TOGGLE.COLLAPSED) {
      this.setCollapsedState({ initialState: true });
    } else if (this._state_.toggleState === TOGGLE.EXPANDED) {
      this.setExpandedState({ initialState: true });
    }
  };

  onToggle = () => {
    if (this.props.irreversible && this.isMoving(this._state_.toggleState)) {
      return;
    }

    const invokeCollapsing = () => {
      if (this.props.onCollapsing) {
        this.props.onCollapsing({
          range: this.state.range,
          progress: this.state.progress,
          hasReversed: this.state.hasReversed,
        });
      }
      this.collapse();
    };
    const invokeExpanding = () => {
      if (this.props.onExpanding) {
        this.props.onExpanding({
          range: this.state.range,
          progress: this.state.progress,
          hasReversed: this.state.hasReversed,
        });
      }
      this.expand();
    };

    const updateInternalState = ({ toggleState, display, hasReversed }) => {
      this._state_.toggleState = toggleState;
      this._state_.hasReversed = !!hasReversed;

      if (display !== undefined && !this.props.noDisplayStyle) {
        this._state_.collasibleElement.style.display = display;
      }

      const now = util.now();

      if (hasReversed) {
        const { startTime } = this._state_;
        const duration = util.sanitizeDuration(this.props.duration);
        const elapsedTime = Math.min(duration, now - startTime);
        const subtract = Math.max(0, duration - elapsedTime);
        this._state_.startTime = now - subtract;
      } else {
        this._state_.boxHeight = this._state_.collasibleElement.clientHeight;
        this._state_.startTime = now;
        this._state_.startDirection = toggleState;
      }

      this.setState({
        toggleState: this._state_.toggleState,
        hasReversed: this._state_.hasReversed,
      });
    };

    if (this._state_.toggleState === TOGGLE.EXPANDED) {
      updateInternalState({ toggleState: TOGGLE.COLLAPSING });
      invokeCollapsing();
    } else if (this._state_.toggleState === TOGGLE.COLLAPSED) {
      updateInternalState({
        toggleState: TOGGLE.EXPANDING,
        display: '',
      });
      invokeExpanding();
    } else if (this._state_.toggleState === TOGGLE.EXPANDING) {
      updateInternalState({
        toggleState: TOGGLE.COLLAPSING,
        hasReversed: true,
      });
      invokeCollapsing();
    } else if (this._state_.toggleState === TOGGLE.COLLAPSING) {
      updateInternalState({
        toggleState: TOGGLE.EXPANDING,
        display: '',
        hasReversed: true,
      });
      invokeExpanding();
    }
  };

  setExpandedState = ({ initialState } = {}) => {
    this._state_.progress = 1;
    this._state_.collasibleElement.style.height = '';
    this._state_.toggleState = TOGGLE.EXPANDED;
    this.setState({
      toggleState: TOGGLE.EXPANDED,
      range: 1,
      progress: this._state_.progress,
    });
    if (!initialState && this.props.onExpanded) {
      this.props.onExpanded({
        hasReversed: this.state.hasReversed,
      });
    }
  };

  expand = () => {
    if (!this._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }
    if (this._state_.toggleState !== TOGGLE.EXPANDING) {
      return;
    }

    const duration = util.sanitizeDuration(this.props.duration);
    if (duration <= 0) {
      this.setExpandedState();
      return;
    }

    const { startTime } = this._state_;
    const elapsedTime = Math.min(duration, util.now() - startTime);

    if (elapsedTime >= duration) {
      this.setExpandedState();
    } else {
      const { startDirection, toggleState, boxHeight } = this._state_;
      const range = util.clamp({ value: elapsedTime / duration });

      let progress;
      if (
        this.props.whenReversedUseBackwardEase &&
        startDirection !== toggleState
      ) {
        progress = 1 - this.props.easeCollapse(1 - range);
      } else {
        progress = this.props.easeExpand(range);
      }

      if (!this.props.bestPerformance) {
        this.setState({
          range,
          progress,
        });
      }

      if (this.props.interpolateOnReverse && this._state_.hasReversed) {
        progress = util.interpolate({
          next: progress,
          prev: this._state_.progress,
        });
      }

      const currentHeightValue = Math.round(boxHeight * progress);
      this._state_.progress = progress;
      this._state_.collasibleElement.style.height = `${currentHeightValue}px`;
      this.nextTick(this.expand);
    }
  };

  setCollapsedState = ({ initialState } = {}) => {
    if (!this.props.noDisplayStyle) {
      this._state_.collasibleElement.style.display = 'none';
    }
    this._state_.progress = 0;
    this._state_.collasibleElement.style.height = '';
    this._state_.toggleState = TOGGLE.COLLAPSED;
    this.setState({
      toggleState: TOGGLE.COLLAPSED,
      range: 0,
      progress: this._state_.progress,
    });
    if (!initialState && this.props.onCollapsed)
      this.props.onCollapsed({
        hasReversed: this.state.hasReversed,
      });
  };

  collapse = () => {
    if (!this._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }
    if (this._state_.toggleState !== TOGGLE.COLLAPSING) {
      return;
    }
    const duration = util.sanitizeDuration(this.props.duration);
    if (duration <= 0) {
      this.setCollapsedState();
      return;
    }

    const { startTime } = this._state_;
    const elapsedTime = Math.min(duration, util.now() - startTime);

    if (elapsedTime >= duration) {
      this.setCollapsedState();
    } else {
      const { startDirection, boxHeight, toggleState } = this._state_;
      const range = 1 - util.clamp({ value: elapsedTime / duration });

      const {
        whenReversedUseBackwardEase,
        easeExpand,
        easeCollapse,
      } = this.props;

      let progress;
      if (whenReversedUseBackwardEase && startDirection !== toggleState) {
        progress = easeExpand(range);
      } else {
        progress = 1 - easeCollapse(1 - range);
      }

      if (!this.props.bestPerformance) {
        this.setState({
          range,
          progress,
        });
      }

      if (this.props.interpolateOnReverse && this._state_.hasReversed) {
        progress = util.interpolate({
          next: progress,
          prev: this._state_.progress,
        });
      }

      const currentHeightValue = Math.round(boxHeight * progress);
      this._state_.progress = progress;
      this._state_.collasibleElement.style.height = `${currentHeightValue}px`;
      this._state_.timeout = this.nextTick(this.collapse);
    }
  };

  nextTick = callback => {
    this._state_.timeout = rAF(callback);
  };

  componentWillUnmount() {
    cAF(this._state_.timeout);
  }
}
