(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactSlideToggle"] = factory(require("React"));
	else
		root["ReactSlideToggle"] = factory(root["React"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SlideToggle = __webpack_require__(2);

Object.defineProperty(exports, 'SlideToggle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SlideToggle).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 _state_ is for minimizing potential expensive re-renderings.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Don't update the state for every requestAnimationFrame.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// eslint-disable-line import/no-extraneous-dependencies
// import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies

// const log = console.log.bind(console);
var warn = console.warn.bind(console); // eslint-disable-line no-console

var rAF = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (callback) {
  return window.setTimeout(callback, 16);
};
var cAF = window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : window.clearInterval.bind(window);

var TOGGLE = {
  EXPANDED: 'EXPANDED',
  COLLAPSED: 'COLLAPSED',
  EXPANDING: 'EXPANDING',
  COLLAPSING: 'COLLAPSING'
};

var easeInOutCubic = function easeInOutCubic(t) {
  return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
};

var util = {
  isMoving: function isMoving(toggleState) {
    return toggleState === TOGGLE.EXPANDING || toggleState === TOGGLE.COLLAPSING;
  },
  clamp: function clamp(_ref) {
    var value = _ref.value,
        _ref$max = _ref.max,
        max = _ref$max === undefined ? 1 : _ref$max,
        _ref$min = _ref.min,
        min = _ref$min === undefined ? 0 : _ref$min;

    if (value > max) return max;
    if (value < min) return min;
    return value;
  },
  now: function now() {
    return new Date().getTime();
  },
  sanitizeDuration: function sanitizeDuration(duration) {
    return Math.max(parseInt(duration, 10) || 1, 1);
  }
};

var SlideToggle = function (_React$Component) {
  _inherits(SlideToggle, _React$Component);

  // static propTypes = {
  //   render: PropTypes.func,
  //   duration: PropTypes.number,
  //   irreversible: PropTypes.bool,
  //   whenReversedUseBackwardEase: PropTypes.bool,
  //   easeCollapse: PropTypes.func,
  //   easeExpand: PropTypes.func,
  //   collapsed: PropTypes.bool,
  //   onExpanded: PropTypes.func,
  //   onExpanding: PropTypes.func,
  //   onCollapsed: PropTypes.func,
  //   onCollapsing: PropTypes.func,
  // };

  function SlideToggle(props) {
    _classCallCheck(this, SlideToggle);

    var _this = _possibleConstructorReturn(this, (SlideToggle.__proto__ || Object.getPrototypeOf(SlideToggle)).call(this, props));

    _this.updateBoxHeight = function () {
      if (_this._state_.collasibleElement) {
        // obs: clientHeight triggers reflow in browser.
        _this._state_.boxHeight = _this._state_.collasibleElement.clientHeight;
        _this.setState({ boxHeight: _this._state_.boxHeight });
      }
    };

    _this.setCollapsibleElement = function (element) {
      if (!element) {
        warn('no element in setCollapsibleElement');
        return;
      }
      _this._state_.collasibleElement = element;
      _this.updateBoxHeight();

      if (_this._state_.toggleState === TOGGLE.COLLAPSED) {
        _this.setCollapsedState({ initialState: true });
      } else if (_this._state_.toggleState === TOGGLE.EXPANDED) {
        _this.setExpandedState({ initialState: true });
      }
    };

    _this.onToggle = function () {
      if (_this.props.irreversible && _this.isMoving(_this._state_.toggleState)) {
        return;
      }

      var updateInternalState = function updateInternalState(_ref2) {
        var toggleState = _ref2.toggleState,
            display = _ref2.display,
            hasReversed = _ref2.hasReversed;

        _this._state_.toggleState = toggleState;
        _this._state_.hasReversed = !!hasReversed;

        if (display !== undefined) {
          _this._state_.collasibleElement.style.display = display;
        }
        var now = util.now();
        if (hasReversed) {
          var _this$_state_ = _this._state_,
              duration = _this$_state_.duration,
              startTime = _this$_state_.startTime;

          var elapsedTime = Math.min(duration, now - startTime);
          var subtract = Math.max(0, duration - elapsedTime);
          _this._state_.startTime = now - subtract;
        } else {
          _this._state_.boxHeight = _this._state_.collasibleElement.clientHeight;
          _this._state_.startTime = now;
          _this._state_.startDirection = toggleState;
        }

        _this.setState({
          toggleState: _this._state_.toggleState,
          hasReversed: _this._state_.hasReversed,
          boxHeight: _this._state_.boxHeight
        });
      };

      if (_this._state_.toggleState === TOGGLE.EXPANDED) {
        updateInternalState({ toggleState: TOGGLE.COLLAPSING });
        if (_this.props.onCollapsing) _this.props.onCollapsing();

        _this.collapse();
      } else if (_this._state_.toggleState === TOGGLE.COLLAPSED) {
        updateInternalState({
          toggleState: TOGGLE.EXPANDING,
          display: ''
        });
        if (_this.props.onExpanding) _this.props.onExpanding();

        _this.expand();
      } else if (_this._state_.toggleState === TOGGLE.EXPANDING) {
        updateInternalState({
          toggleState: TOGGLE.COLLAPSING,
          hasReversed: true
        });
        if (_this.props.onCollapsing) _this.props.onCollapsing();

        _this.collapse();
      } else if (_this._state_.toggleState === TOGGLE.COLLAPSING) {
        updateInternalState({
          toggleState: TOGGLE.EXPANDING,
          display: '',
          hasReversed: true
        });
        if (_this.props.onExpanding) _this.props.onExpanding();

        _this.expand();
      }
    };

    _this.setExpandedState = function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          initialState = _ref3.initialState;

      _this._state_.collasibleElement.style.height = '';
      _this._state_.toggleState = TOGGLE.EXPANDED;
      _this.setState({ toggleState: TOGGLE.EXPANDED });
      if (!initialState && _this.props.onExpanded) _this.props.onExpanded();
    };

    _this.expand = function () {
      if (!_this._state_.collasibleElement) {
        warn('no collapsibleElement');
        return;
      }
      if (_this._state_.toggleState !== TOGGLE.EXPANDING) {
        return;
      }

      var _this$_state_2 = _this._state_,
          duration = _this$_state_2.duration,
          startTime = _this$_state_2.startTime,
          startDirection = _this$_state_2.startDirection,
          toggleState = _this$_state_2.toggleState,
          boxHeight = _this$_state_2.boxHeight;

      var elapsedTime = Math.min(duration, util.now() - startTime);
      var range = util.clamp({ value: elapsedTime / duration });
      var progress = void 0;

      if (_this.props.whenReversedUseBackwardEase && startDirection !== toggleState) {
        progress = 1 - _this.props.easeCollapse(1 - range);
      } else {
        progress = _this.props.easeExpand(range);
      }

      var currentHeightValue = Math.round(boxHeight * progress);

      if (elapsedTime < duration) {
        _this._state_.collasibleElement.style.height = currentHeightValue + 'px';
        _this.nextTick(_this.expand);
      } else {
        _this.setExpandedState();
      }
    };

    _this.setCollapsedState = function () {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          initialState = _ref4.initialState;

      _this._state_.collasibleElement.style.display = 'none';
      _this._state_.collasibleElement.style.height = '';
      _this._state_.toggleState = TOGGLE.COLLAPSED;
      _this.setState({
        toggleState: TOGGLE.COLLAPSED
      });
      if (!initialState && _this.props.onCollapsed) _this.props.onCollapsed();
    };

    _this.collapse = function () {
      if (!_this._state_.collasibleElement) {
        warn('no collapsibleElement');
        return;
      }
      if (_this._state_.toggleState !== TOGGLE.COLLAPSING) {
        return;
      }

      var _this$_state_3 = _this._state_,
          duration = _this$_state_3.duration,
          startTime = _this$_state_3.startTime,
          startDirection = _this$_state_3.startDirection,
          boxHeight = _this$_state_3.boxHeight,
          toggleState = _this$_state_3.toggleState;

      var elapsedTime = Math.min(duration, util.now() - startTime);
      var range = util.clamp({ value: elapsedTime / duration });
      var progress = void 0;

      var _this$props = _this.props,
          whenReversedUseBackwardEase = _this$props.whenReversedUseBackwardEase,
          easeExpand = _this$props.easeExpand,
          easeCollapse = _this$props.easeCollapse;


      if (whenReversedUseBackwardEase && startDirection !== toggleState) {
        progress = easeExpand(1 - range);
      } else {
        progress = 1 - easeCollapse(range);
      }

      var currentHeightValue = Math.round(boxHeight * progress);

      if (elapsedTime < duration) {
        _this._state_.collasibleElement.style.height = currentHeightValue + 'px';
        _this._state_.timeout = _this.nextTick(_this.collapse);
      } else {
        _this.setCollapsedState();
      }
    };

    _this.nextTick = function (callback) {
      _this._state_.timeout = rAF(callback);
    };

    _this._state_ = {
      collasibleElement: null,
      toggleState: _this.props.collapsed ? TOGGLE.COLLAPSED : TOGGLE.EXPANDED,
      duration: util.sanitizeDuration(_this.props.duration)
    };

    _this.state = {
      toggleState: _this._state_.toggleState,
      hasReversed: false
    };
    return _this;
  }

  _createClass(SlideToggle, [{
    key: 'render',
    value: function render() {
      return this.props.render({
        onToggle: this.onToggle,
        setCollasibleElement: this.setCollapsibleElement,
        toggleState: this.state.toggleState,
        hasReversed: this.state.hasReversed,
        isMoving: util.isMoving(this.state.toggleState),
        boxHeight: this.state.boxHeight,
        updateBoxHeight: this.updateBoxHeight
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.duration !== this.props.duration) {
        this._state_.duration = util.sanitizeDuration(nextProps.duration);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      cAF(this._state_.timeout);
    }
  }]);

  return SlideToggle;
}(_react2.default.Component);

SlideToggle.defaultProps = {
  duration: 300,
  easeCollapse: easeInOutCubic,
  easeExpand: easeInOutCubic,
  boxHeight: 0
};
exports.default = SlideToggle;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ]);
});