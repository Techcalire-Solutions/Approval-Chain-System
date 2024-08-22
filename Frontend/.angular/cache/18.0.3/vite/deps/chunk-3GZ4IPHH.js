import {
  BaseDirective2,
  CoreModule,
  LAYOUT_CONFIG,
  LAYOUT_VALUES,
  MediaMarshaller,
  StyleBuilder,
  StyleUtils,
  buildLayoutCSS,
  extendObject,
  isFlowHorizontal,
  multiply,
  validateBasis
} from "./chunk-BNC3O62K.js";
import {
  BidiModule,
  Directionality
} from "./chunk-VIFRIXRU.js";
import {
  Directive,
  ElementRef,
  Inject,
  Injectable,
  Input,
  NgModule,
  NgZone,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-Y6TRI7LI.js";
import {
  Subject,
  takeUntil
} from "./chunk-3OYL3RVR.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-CPNXOV62.js";

// node_modules/@ngbracket/ngx-layout/fesm2022/ngbracket-ngx-layout-flex.mjs
var _FlexAlignStyleBuilder = class _FlexAlignStyleBuilder extends StyleBuilder {
  buildStyles(input) {
    input = input || "stretch";
    const styles = {};
    switch (input) {
      case "start":
        styles["align-self"] = "flex-start";
        break;
      case "end":
        styles["align-self"] = "flex-end";
        break;
      default:
        styles["align-self"] = input;
        break;
    }
    return styles;
  }
};
_FlexAlignStyleBuilder.ɵfac = /* @__PURE__ */ (() => {
  let ɵFlexAlignStyleBuilder_BaseFactory;
  return function FlexAlignStyleBuilder_Factory(t) {
    return (ɵFlexAlignStyleBuilder_BaseFactory || (ɵFlexAlignStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_FlexAlignStyleBuilder)))(t || _FlexAlignStyleBuilder);
  };
})();
_FlexAlignStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: _FlexAlignStyleBuilder,
  factory: _FlexAlignStyleBuilder.ɵfac,
  providedIn: "root"
});
var FlexAlignStyleBuilder = _FlexAlignStyleBuilder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexAlignStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs$6 = ["fxFlexAlign", "fxFlexAlign.xs", "fxFlexAlign.sm", "fxFlexAlign.md", "fxFlexAlign.lg", "fxFlexAlign.xl", "fxFlexAlign.lt-sm", "fxFlexAlign.lt-md", "fxFlexAlign.lt-lg", "fxFlexAlign.lt-xl", "fxFlexAlign.gt-xs", "fxFlexAlign.gt-sm", "fxFlexAlign.gt-md", "fxFlexAlign.gt-lg"];
var selector$6 = `
  [fxFlexAlign], [fxFlexAlign.xs], [fxFlexAlign.sm], [fxFlexAlign.md],
  [fxFlexAlign.lg], [fxFlexAlign.xl], [fxFlexAlign.lt-sm], [fxFlexAlign.lt-md],
  [fxFlexAlign.lt-lg], [fxFlexAlign.lt-xl], [fxFlexAlign.gt-xs], [fxFlexAlign.gt-sm],
  [fxFlexAlign.gt-md], [fxFlexAlign.gt-lg]
`;
var _FlexAlignDirective = class _FlexAlignDirective extends BaseDirective2 {
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.DIRECTIVE_KEY = "flex-align";
    this.styleCache = flexAlignCache;
    this.init();
  }
};
_FlexAlignDirective.ɵfac = function FlexAlignDirective_Factory(t) {
  return new (t || _FlexAlignDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(FlexAlignStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
_FlexAlignDirective.ɵdir = ɵɵdefineDirective({
  type: _FlexAlignDirective,
  features: [ɵɵInheritDefinitionFeature]
});
var FlexAlignDirective = _FlexAlignDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexAlignDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: FlexAlignStyleBuilder
  }, {
    type: MediaMarshaller
  }], null);
})();
var flexAlignCache = /* @__PURE__ */ new Map();
var _DefaultFlexAlignDirective = class _DefaultFlexAlignDirective extends FlexAlignDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$6;
  }
};
_DefaultFlexAlignDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultFlexAlignDirective_BaseFactory;
  return function DefaultFlexAlignDirective_Factory(t) {
    return (ɵDefaultFlexAlignDirective_BaseFactory || (ɵDefaultFlexAlignDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultFlexAlignDirective)))(t || _DefaultFlexAlignDirective);
  };
})();
_DefaultFlexAlignDirective.ɵdir = ɵɵdefineDirective({
  type: _DefaultFlexAlignDirective,
  selectors: [["", "fxFlexAlign", ""], ["", "fxFlexAlign.xs", ""], ["", "fxFlexAlign.sm", ""], ["", "fxFlexAlign.md", ""], ["", "fxFlexAlign.lg", ""], ["", "fxFlexAlign.xl", ""], ["", "fxFlexAlign.lt-sm", ""], ["", "fxFlexAlign.lt-md", ""], ["", "fxFlexAlign.lt-lg", ""], ["", "fxFlexAlign.lt-xl", ""], ["", "fxFlexAlign.gt-xs", ""], ["", "fxFlexAlign.gt-sm", ""], ["", "fxFlexAlign.gt-md", ""], ["", "fxFlexAlign.gt-lg", ""]],
  inputs: {
    fxFlexAlign: "fxFlexAlign",
    "fxFlexAlign.xs": "fxFlexAlign.xs",
    "fxFlexAlign.sm": "fxFlexAlign.sm",
    "fxFlexAlign.md": "fxFlexAlign.md",
    "fxFlexAlign.lg": "fxFlexAlign.lg",
    "fxFlexAlign.xl": "fxFlexAlign.xl",
    "fxFlexAlign.lt-sm": "fxFlexAlign.lt-sm",
    "fxFlexAlign.lt-md": "fxFlexAlign.lt-md",
    "fxFlexAlign.lt-lg": "fxFlexAlign.lt-lg",
    "fxFlexAlign.lt-xl": "fxFlexAlign.lt-xl",
    "fxFlexAlign.gt-xs": "fxFlexAlign.gt-xs",
    "fxFlexAlign.gt-sm": "fxFlexAlign.gt-sm",
    "fxFlexAlign.gt-md": "fxFlexAlign.gt-md",
    "fxFlexAlign.gt-lg": "fxFlexAlign.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
var DefaultFlexAlignDirective = _DefaultFlexAlignDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexAlignDirective, [{
    type: Directive,
    args: [{
      selector: selector$6,
      inputs: inputs$6
    }]
  }], null, null);
})();
var FLEX_FILL_CSS = {
  margin: 0,
  width: "100%",
  height: "100%",
  "min-width": "100%",
  "min-height": "100%"
};
var _FlexFillStyleBuilder = class _FlexFillStyleBuilder extends StyleBuilder {
  buildStyles(_input) {
    return FLEX_FILL_CSS;
  }
};
_FlexFillStyleBuilder.ɵfac = /* @__PURE__ */ (() => {
  let ɵFlexFillStyleBuilder_BaseFactory;
  return function FlexFillStyleBuilder_Factory(t) {
    return (ɵFlexFillStyleBuilder_BaseFactory || (ɵFlexFillStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_FlexFillStyleBuilder)))(t || _FlexFillStyleBuilder);
  };
})();
_FlexFillStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: _FlexFillStyleBuilder,
  factory: _FlexFillStyleBuilder.ɵfac,
  providedIn: "root"
});
var FlexFillStyleBuilder = _FlexFillStyleBuilder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexFillStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _FlexFillDirective = class _FlexFillDirective extends BaseDirective2 {
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.styleCache = flexFillCache;
    this.addStyles("");
  }
};
_FlexFillDirective.ɵfac = function FlexFillDirective_Factory(t) {
  return new (t || _FlexFillDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(FlexFillStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
_FlexFillDirective.ɵdir = ɵɵdefineDirective({
  type: _FlexFillDirective,
  selectors: [["", "fxFill", ""], ["", "fxFlexFill", ""]],
  features: [ɵɵInheritDefinitionFeature]
});
var FlexFillDirective = _FlexFillDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexFillDirective, [{
    type: Directive,
    args: [{
      selector: `[fxFill], [fxFlexFill]`
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: FlexFillStyleBuilder
  }, {
    type: MediaMarshaller
  }], null);
})();
var flexFillCache = /* @__PURE__ */ new Map();
var _FlexOffsetStyleBuilder = class _FlexOffsetStyleBuilder extends StyleBuilder {
  constructor(_config) {
    super();
    this._config = _config;
  }
  buildStyles(offset, parent) {
    offset ||= "0";
    offset = multiply(offset, this._config.multiplier);
    const isPercent = String(offset).indexOf("%") > -1;
    const isPx = String(offset).indexOf("px") > -1;
    if (!isPx && !isPercent && !isNaN(+offset)) {
      offset = `${offset}%`;
    }
    const horizontalLayoutKey = parent.isRtl ? "margin-right" : "margin-left";
    const styles = isFlowHorizontal(parent.layout) ? {
      [horizontalLayoutKey]: offset
    } : {
      "margin-top": offset
    };
    return styles;
  }
};
_FlexOffsetStyleBuilder.ɵfac = function FlexOffsetStyleBuilder_Factory(t) {
  return new (t || _FlexOffsetStyleBuilder)(ɵɵinject(LAYOUT_CONFIG));
};
_FlexOffsetStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: _FlexOffsetStyleBuilder,
  factory: _FlexOffsetStyleBuilder.ɵfac,
  providedIn: "root"
});
var FlexOffsetStyleBuilder = _FlexOffsetStyleBuilder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOffsetStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LAYOUT_CONFIG]
    }]
  }], null);
})();
var inputs$5 = ["fxFlexOffset", "fxFlexOffset.xs", "fxFlexOffset.sm", "fxFlexOffset.md", "fxFlexOffset.lg", "fxFlexOffset.xl", "fxFlexOffset.lt-sm", "fxFlexOffset.lt-md", "fxFlexOffset.lt-lg", "fxFlexOffset.lt-xl", "fxFlexOffset.gt-xs", "fxFlexOffset.gt-sm", "fxFlexOffset.gt-md", "fxFlexOffset.gt-lg"];
var selector$5 = `
  [fxFlexOffset], [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md],
  [fxFlexOffset.lg], [fxFlexOffset.xl], [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md],
  [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl], [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm],
  [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]
`;
var _FlexOffsetDirective = class _FlexOffsetDirective extends BaseDirective2 {
  constructor(elRef, directionality, styleBuilder, marshal, styler) {
    super(elRef, styleBuilder, styler, marshal);
    this.directionality = directionality;
    this.DIRECTIVE_KEY = "flex-offset";
    this.init([this.directionality.change]);
    if (this.parentElement) {
      this.marshal.trackValue(this.parentElement, "layout-gap").pipe(takeUntil(this.destroySubject)).subscribe(this.triggerUpdate.bind(this));
    }
  }
  // *********************************************
  // Protected methods
  // *********************************************
  /**
   * Using the current fxFlexOffset value, update the inline CSS
   * NOTE: this will assign `margin-left` if the parent flex-direction == 'row',
   *       otherwise `margin-top` is used for the offset.
   */
  updateWithValue(value = "") {
    const layout = this.getFlexFlowDirection(this.parentElement, true);
    const isRtl = this.directionality.value === "rtl";
    if (layout === "row" && isRtl) {
      this.styleCache = flexOffsetCacheRowRtl;
    } else if (layout === "row" && !isRtl) {
      this.styleCache = flexOffsetCacheRowLtr;
    } else if (layout === "column" && isRtl) {
      this.styleCache = flexOffsetCacheColumnRtl;
    } else if (layout === "column" && !isRtl) {
      this.styleCache = flexOffsetCacheColumnLtr;
    }
    this.addStyles(value + "", {
      layout,
      isRtl
    });
  }
};
_FlexOffsetDirective.ɵfac = function FlexOffsetDirective_Factory(t) {
  return new (t || _FlexOffsetDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Directionality), ɵɵdirectiveInject(FlexOffsetStyleBuilder), ɵɵdirectiveInject(MediaMarshaller), ɵɵdirectiveInject(StyleUtils));
};
_FlexOffsetDirective.ɵdir = ɵɵdefineDirective({
  type: _FlexOffsetDirective,
  features: [ɵɵInheritDefinitionFeature]
});
var FlexOffsetDirective = _FlexOffsetDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOffsetDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: Directionality
  }, {
    type: FlexOffsetStyleBuilder
  }, {
    type: MediaMarshaller
  }, {
    type: StyleUtils
  }], null);
})();
var _DefaultFlexOffsetDirective = class _DefaultFlexOffsetDirective extends FlexOffsetDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$5;
  }
};
_DefaultFlexOffsetDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultFlexOffsetDirective_BaseFactory;
  return function DefaultFlexOffsetDirective_Factory(t) {
    return (ɵDefaultFlexOffsetDirective_BaseFactory || (ɵDefaultFlexOffsetDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultFlexOffsetDirective)))(t || _DefaultFlexOffsetDirective);
  };
})();
_DefaultFlexOffsetDirective.ɵdir = ɵɵdefineDirective({
  type: _DefaultFlexOffsetDirective,
  selectors: [["", "fxFlexOffset", ""], ["", "fxFlexOffset.xs", ""], ["", "fxFlexOffset.sm", ""], ["", "fxFlexOffset.md", ""], ["", "fxFlexOffset.lg", ""], ["", "fxFlexOffset.xl", ""], ["", "fxFlexOffset.lt-sm", ""], ["", "fxFlexOffset.lt-md", ""], ["", "fxFlexOffset.lt-lg", ""], ["", "fxFlexOffset.lt-xl", ""], ["", "fxFlexOffset.gt-xs", ""], ["", "fxFlexOffset.gt-sm", ""], ["", "fxFlexOffset.gt-md", ""], ["", "fxFlexOffset.gt-lg", ""]],
  inputs: {
    fxFlexOffset: "fxFlexOffset",
    "fxFlexOffset.xs": "fxFlexOffset.xs",
    "fxFlexOffset.sm": "fxFlexOffset.sm",
    "fxFlexOffset.md": "fxFlexOffset.md",
    "fxFlexOffset.lg": "fxFlexOffset.lg",
    "fxFlexOffset.xl": "fxFlexOffset.xl",
    "fxFlexOffset.lt-sm": "fxFlexOffset.lt-sm",
    "fxFlexOffset.lt-md": "fxFlexOffset.lt-md",
    "fxFlexOffset.lt-lg": "fxFlexOffset.lt-lg",
    "fxFlexOffset.lt-xl": "fxFlexOffset.lt-xl",
    "fxFlexOffset.gt-xs": "fxFlexOffset.gt-xs",
    "fxFlexOffset.gt-sm": "fxFlexOffset.gt-sm",
    "fxFlexOffset.gt-md": "fxFlexOffset.gt-md",
    "fxFlexOffset.gt-lg": "fxFlexOffset.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
var DefaultFlexOffsetDirective = _DefaultFlexOffsetDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexOffsetDirective, [{
    type: Directive,
    args: [{
      selector: selector$5,
      inputs: inputs$5
    }]
  }], null, null);
})();
var flexOffsetCacheRowRtl = /* @__PURE__ */ new Map();
var flexOffsetCacheColumnRtl = /* @__PURE__ */ new Map();
var flexOffsetCacheRowLtr = /* @__PURE__ */ new Map();
var flexOffsetCacheColumnLtr = /* @__PURE__ */ new Map();
var _FlexOrderStyleBuilder = class _FlexOrderStyleBuilder extends StyleBuilder {
  buildStyles(value) {
    return {
      order: value && parseInt(value, 10) || ""
    };
  }
};
_FlexOrderStyleBuilder.ɵfac = /* @__PURE__ */ (() => {
  let ɵFlexOrderStyleBuilder_BaseFactory;
  return function FlexOrderStyleBuilder_Factory(t) {
    return (ɵFlexOrderStyleBuilder_BaseFactory || (ɵFlexOrderStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_FlexOrderStyleBuilder)))(t || _FlexOrderStyleBuilder);
  };
})();
_FlexOrderStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: _FlexOrderStyleBuilder,
  factory: _FlexOrderStyleBuilder.ɵfac,
  providedIn: "root"
});
var FlexOrderStyleBuilder = _FlexOrderStyleBuilder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOrderStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs$4 = ["fxFlexOrder", "fxFlexOrder.xs", "fxFlexOrder.sm", "fxFlexOrder.md", "fxFlexOrder.lg", "fxFlexOrder.xl", "fxFlexOrder.lt-sm", "fxFlexOrder.lt-md", "fxFlexOrder.lt-lg", "fxFlexOrder.lt-xl", "fxFlexOrder.gt-xs", "fxFlexOrder.gt-sm", "fxFlexOrder.gt-md", "fxFlexOrder.gt-lg"];
var selector$4 = `
  [fxFlexOrder], [fxFlexOrder.xs], [fxFlexOrder.sm], [fxFlexOrder.md],
  [fxFlexOrder.lg], [fxFlexOrder.xl], [fxFlexOrder.lt-sm], [fxFlexOrder.lt-md],
  [fxFlexOrder.lt-lg], [fxFlexOrder.lt-xl], [fxFlexOrder.gt-xs], [fxFlexOrder.gt-sm],
  [fxFlexOrder.gt-md], [fxFlexOrder.gt-lg]
`;
var _FlexOrderDirective = class _FlexOrderDirective extends BaseDirective2 {
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.DIRECTIVE_KEY = "flex-order";
    this.styleCache = flexOrderCache;
    this.init();
  }
  updateWithValue(input) {
    super.updateWithValue(input);
    if (this.parentElement) {
      this.marshal.triggerUpdate(this.parentElement, "layout-gap");
    }
  }
};
_FlexOrderDirective.ɵfac = function FlexOrderDirective_Factory(t) {
  return new (t || _FlexOrderDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(FlexOrderStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
_FlexOrderDirective.ɵdir = ɵɵdefineDirective({
  type: _FlexOrderDirective,
  features: [ɵɵInheritDefinitionFeature]
});
var FlexOrderDirective = _FlexOrderDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexOrderDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: FlexOrderStyleBuilder
  }, {
    type: MediaMarshaller
  }], null);
})();
var flexOrderCache = /* @__PURE__ */ new Map();
var _DefaultFlexOrderDirective = class _DefaultFlexOrderDirective extends FlexOrderDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$4;
  }
};
_DefaultFlexOrderDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultFlexOrderDirective_BaseFactory;
  return function DefaultFlexOrderDirective_Factory(t) {
    return (ɵDefaultFlexOrderDirective_BaseFactory || (ɵDefaultFlexOrderDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultFlexOrderDirective)))(t || _DefaultFlexOrderDirective);
  };
})();
_DefaultFlexOrderDirective.ɵdir = ɵɵdefineDirective({
  type: _DefaultFlexOrderDirective,
  selectors: [["", "fxFlexOrder", ""], ["", "fxFlexOrder.xs", ""], ["", "fxFlexOrder.sm", ""], ["", "fxFlexOrder.md", ""], ["", "fxFlexOrder.lg", ""], ["", "fxFlexOrder.xl", ""], ["", "fxFlexOrder.lt-sm", ""], ["", "fxFlexOrder.lt-md", ""], ["", "fxFlexOrder.lt-lg", ""], ["", "fxFlexOrder.lt-xl", ""], ["", "fxFlexOrder.gt-xs", ""], ["", "fxFlexOrder.gt-sm", ""], ["", "fxFlexOrder.gt-md", ""], ["", "fxFlexOrder.gt-lg", ""]],
  inputs: {
    fxFlexOrder: "fxFlexOrder",
    "fxFlexOrder.xs": "fxFlexOrder.xs",
    "fxFlexOrder.sm": "fxFlexOrder.sm",
    "fxFlexOrder.md": "fxFlexOrder.md",
    "fxFlexOrder.lg": "fxFlexOrder.lg",
    "fxFlexOrder.xl": "fxFlexOrder.xl",
    "fxFlexOrder.lt-sm": "fxFlexOrder.lt-sm",
    "fxFlexOrder.lt-md": "fxFlexOrder.lt-md",
    "fxFlexOrder.lt-lg": "fxFlexOrder.lt-lg",
    "fxFlexOrder.lt-xl": "fxFlexOrder.lt-xl",
    "fxFlexOrder.gt-xs": "fxFlexOrder.gt-xs",
    "fxFlexOrder.gt-sm": "fxFlexOrder.gt-sm",
    "fxFlexOrder.gt-md": "fxFlexOrder.gt-md",
    "fxFlexOrder.gt-lg": "fxFlexOrder.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
var DefaultFlexOrderDirective = _DefaultFlexOrderDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexOrderDirective, [{
    type: Directive,
    args: [{
      selector: selector$4,
      inputs: inputs$4
    }]
  }], null, null);
})();
var _FlexStyleBuilder = class _FlexStyleBuilder extends StyleBuilder {
  constructor(layoutConfig) {
    super();
    this.layoutConfig = layoutConfig;
  }
  buildStyles(input, parent) {
    let [grow, shrink, ...basisParts] = input.split(" ");
    let basis = basisParts.join(" ");
    const direction = parent.direction.indexOf("column") > -1 ? "column" : "row";
    const max = isFlowHorizontal(direction) ? "max-width" : "max-height";
    const min = isFlowHorizontal(direction) ? "min-width" : "min-height";
    const hasCalc = String(basis).indexOf("calc") > -1;
    const usingCalc = hasCalc || basis === "auto";
    const isPercent = String(basis).indexOf("%") > -1 && !hasCalc;
    const hasUnits = String(basis).indexOf("px") > -1 || String(basis).indexOf("rem") > -1 || String(basis).indexOf("em") > -1 || String(basis).indexOf("vw") > -1 || String(basis).indexOf("vh") > -1;
    let isValue = hasCalc || hasUnits;
    grow = grow == "0" ? 0 : grow;
    shrink = shrink == "0" ? 0 : shrink;
    const isFixed = !grow && !shrink;
    let css = {};
    const clearStyles = {
      "max-width": null,
      "max-height": null,
      "min-width": null,
      "min-height": null
    };
    switch (basis || "") {
      case "":
        const useColumnBasisZero = this.layoutConfig.useColumnBasisZero !== false;
        basis = direction === "row" ? "0%" : useColumnBasisZero ? "0.000000001px" : "auto";
        break;
      case "initial":
      case "nogrow":
        grow = 0;
        basis = "auto";
        break;
      case "grow":
        basis = "100%";
        break;
      case "noshrink":
        shrink = 0;
        basis = "auto";
        break;
      case "auto":
        break;
      case "none":
        grow = 0;
        shrink = 0;
        basis = "auto";
        break;
      default:
        if (!isValue && !isPercent && !isNaN(basis)) {
          basis = basis + "%";
        }
        if (basis === "0%") {
          isValue = true;
        }
        if (basis === "0px") {
          basis = "0%";
        }
        if (hasCalc) {
          css = extendObject(clearStyles, {
            "flex-grow": grow,
            "flex-shrink": shrink,
            "flex-basis": isValue ? basis : "100%"
          });
        } else {
          css = extendObject(clearStyles, {
            flex: `${grow} ${shrink} ${isValue ? basis : "100%"}`
          });
        }
        break;
    }
    if (!(css["flex"] || css["flex-grow"])) {
      if (hasCalc) {
        css = extendObject(clearStyles, {
          "flex-grow": grow,
          "flex-shrink": shrink,
          "flex-basis": basis
        });
      } else {
        css = extendObject(clearStyles, {
          flex: `${grow} ${shrink} ${basis}`
        });
      }
    }
    if (basis !== "0%" && basis !== "0px" && basis !== "0.000000001px" && basis !== "auto") {
      css[min] = isFixed || isValue && grow ? basis : null;
      css[max] = isFixed || !usingCalc && shrink ? basis : null;
    }
    if (!css[min] && !css[max]) {
      if (hasCalc) {
        css = extendObject(clearStyles, {
          "flex-grow": grow,
          "flex-shrink": shrink,
          "flex-basis": basis
        });
      } else {
        css = extendObject(clearStyles, {
          flex: `${grow} ${shrink} ${basis}`
        });
      }
    } else {
      if (parent.hasWrap) {
        css[hasCalc ? "flex-basis" : "flex"] = css[max] ? hasCalc ? css[max] : `${grow} ${shrink} ${css[max]}` : hasCalc ? css[min] : `${grow} ${shrink} ${css[min]}`;
      }
    }
    return extendObject(css, {
      "box-sizing": "border-box"
    });
  }
};
_FlexStyleBuilder.ɵfac = function FlexStyleBuilder_Factory(t) {
  return new (t || _FlexStyleBuilder)(ɵɵinject(LAYOUT_CONFIG));
};
_FlexStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: _FlexStyleBuilder,
  factory: _FlexStyleBuilder.ɵfac,
  providedIn: "root"
});
var FlexStyleBuilder = _FlexStyleBuilder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LAYOUT_CONFIG]
    }]
  }], null);
})();
var inputs$3 = ["fxFlex", "fxFlex.xs", "fxFlex.sm", "fxFlex.md", "fxFlex.lg", "fxFlex.xl", "fxFlex.lt-sm", "fxFlex.lt-md", "fxFlex.lt-lg", "fxFlex.lt-xl", "fxFlex.gt-xs", "fxFlex.gt-sm", "fxFlex.gt-md", "fxFlex.gt-lg"];
var selector$3 = `
  [fxFlex], [fxFlex.xs], [fxFlex.sm], [fxFlex.md],
  [fxFlex.lg], [fxFlex.xl], [fxFlex.lt-sm], [fxFlex.lt-md],
  [fxFlex.lt-lg], [fxFlex.lt-xl], [fxFlex.gt-xs], [fxFlex.gt-sm],
  [fxFlex.gt-md], [fxFlex.gt-lg]
`;
var _FlexDirective = class _FlexDirective extends BaseDirective2 {
  get shrink() {
    return this.flexShrink;
  }
  set shrink(value) {
    this.flexShrink = value || "1";
    this.triggerReflow();
  }
  get grow() {
    return this.flexGrow;
  }
  set grow(value) {
    this.flexGrow = value || "1";
    this.triggerReflow();
  }
  constructor(elRef, styleUtils, layoutConfig, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.layoutConfig = layoutConfig;
    this.marshal = marshal;
    this.DIRECTIVE_KEY = "flex";
    this.direction = void 0;
    this.wrap = void 0;
    this.flexGrow = "1";
    this.flexShrink = "1";
    this.init();
  }
  ngOnInit() {
    if (this.parentElement) {
      this.marshal.trackValue(this.parentElement, "layout").pipe(takeUntil(this.destroySubject)).subscribe(this.onLayoutChange.bind(this));
      this.marshal.trackValue(this.nativeElement, "layout-align").pipe(takeUntil(this.destroySubject)).subscribe(this.triggerReflow.bind(this));
    }
  }
  /**
   * Caches the parent container's 'flex-direction' and updates the element's style.
   * Used as a handler for layout change events from the parent flex container.
   */
  onLayoutChange(matcher) {
    const layout = matcher.value;
    const layoutParts = layout.split(" ");
    this.direction = layoutParts[0];
    this.wrap = layoutParts[1] !== void 0 && layoutParts[1] === "wrap";
    this.triggerUpdate();
  }
  /** Input to this is exclusively the basis input value */
  updateWithValue(value) {
    const addFlexToParent = this.layoutConfig.addFlexToParent !== false;
    if (this.direction === void 0) {
      this.direction = this.getFlexFlowDirection(this.parentElement, addFlexToParent);
    }
    if (this.wrap === void 0) {
      this.wrap = this.hasWrap(this.parentElement);
    }
    const direction = this.direction;
    const isHorizontal = direction.startsWith("row");
    const hasWrap = this.wrap;
    if (isHorizontal && hasWrap) {
      this.styleCache = flexRowWrapCache;
    } else if (isHorizontal && !hasWrap) {
      this.styleCache = flexRowCache;
    } else if (!isHorizontal && hasWrap) {
      this.styleCache = flexColumnWrapCache;
    } else if (!isHorizontal && !hasWrap) {
      this.styleCache = flexColumnCache;
    }
    const basis = String(value).replace(";", "");
    const parts = validateBasis(basis, this.flexGrow, this.flexShrink);
    this.addStyles(parts.join(" "), {
      direction,
      hasWrap
    });
  }
  /** Trigger a style reflow, usually based on a shrink/grow input event */
  triggerReflow() {
    const activatedValue = this.activatedValue;
    if (activatedValue !== void 0) {
      const parts = validateBasis(activatedValue + "", this.flexGrow, this.flexShrink);
      this.marshal.updateElement(this.nativeElement, this.DIRECTIVE_KEY, parts.join(" "));
    }
  }
};
_FlexDirective.ɵfac = function FlexDirective_Factory(t) {
  return new (t || _FlexDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LAYOUT_CONFIG), ɵɵdirectiveInject(FlexStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
_FlexDirective.ɵdir = ɵɵdefineDirective({
  type: _FlexDirective,
  inputs: {
    shrink: [0, "fxShrink", "shrink"],
    grow: [0, "fxGrow", "grow"]
  },
  features: [ɵɵInheritDefinitionFeature]
});
var FlexDirective = _FlexDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LAYOUT_CONFIG]
    }]
  }, {
    type: FlexStyleBuilder
  }, {
    type: MediaMarshaller
  }], {
    shrink: [{
      type: Input,
      args: ["fxShrink"]
    }],
    grow: [{
      type: Input,
      args: ["fxGrow"]
    }]
  });
})();
var _DefaultFlexDirective = class _DefaultFlexDirective extends FlexDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$3;
  }
};
_DefaultFlexDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultFlexDirective_BaseFactory;
  return function DefaultFlexDirective_Factory(t) {
    return (ɵDefaultFlexDirective_BaseFactory || (ɵDefaultFlexDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultFlexDirective)))(t || _DefaultFlexDirective);
  };
})();
_DefaultFlexDirective.ɵdir = ɵɵdefineDirective({
  type: _DefaultFlexDirective,
  selectors: [["", "fxFlex", ""], ["", "fxFlex.xs", ""], ["", "fxFlex.sm", ""], ["", "fxFlex.md", ""], ["", "fxFlex.lg", ""], ["", "fxFlex.xl", ""], ["", "fxFlex.lt-sm", ""], ["", "fxFlex.lt-md", ""], ["", "fxFlex.lt-lg", ""], ["", "fxFlex.lt-xl", ""], ["", "fxFlex.gt-xs", ""], ["", "fxFlex.gt-sm", ""], ["", "fxFlex.gt-md", ""], ["", "fxFlex.gt-lg", ""]],
  inputs: {
    fxFlex: "fxFlex",
    "fxFlex.xs": "fxFlex.xs",
    "fxFlex.sm": "fxFlex.sm",
    "fxFlex.md": "fxFlex.md",
    "fxFlex.lg": "fxFlex.lg",
    "fxFlex.xl": "fxFlex.xl",
    "fxFlex.lt-sm": "fxFlex.lt-sm",
    "fxFlex.lt-md": "fxFlex.lt-md",
    "fxFlex.lt-lg": "fxFlex.lt-lg",
    "fxFlex.lt-xl": "fxFlex.lt-xl",
    "fxFlex.gt-xs": "fxFlex.gt-xs",
    "fxFlex.gt-sm": "fxFlex.gt-sm",
    "fxFlex.gt-md": "fxFlex.gt-md",
    "fxFlex.gt-lg": "fxFlex.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
var DefaultFlexDirective = _DefaultFlexDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultFlexDirective, [{
    type: Directive,
    args: [{
      inputs: inputs$3,
      selector: selector$3
    }]
  }], null, null);
})();
var flexRowCache = /* @__PURE__ */ new Map();
var flexColumnCache = /* @__PURE__ */ new Map();
var flexRowWrapCache = /* @__PURE__ */ new Map();
var flexColumnWrapCache = /* @__PURE__ */ new Map();
var _LayoutAlignStyleBuilder = class _LayoutAlignStyleBuilder extends StyleBuilder {
  buildStyles(align, parent) {
    const css = {}, [mainAxis, crossAxis] = align.split(" ");
    switch (mainAxis) {
      case "center":
        css["justify-content"] = "center";
        break;
      case "space-around":
        css["justify-content"] = "space-around";
        break;
      case "space-between":
        css["justify-content"] = "space-between";
        break;
      case "space-evenly":
        css["justify-content"] = "space-evenly";
        break;
      case "end":
      case "flex-end":
        css["justify-content"] = "flex-end";
        break;
      case "start":
      case "flex-start":
      default:
        css["justify-content"] = "flex-start";
        break;
    }
    switch (crossAxis) {
      case "start":
      case "flex-start":
        css["align-items"] = css["align-content"] = "flex-start";
        break;
      case "center":
        css["align-items"] = css["align-content"] = "center";
        break;
      case "end":
      case "flex-end":
        css["align-items"] = css["align-content"] = "flex-end";
        break;
      case "space-between":
        css["align-content"] = "space-between";
        css["align-items"] = "stretch";
        break;
      case "space-around":
        css["align-content"] = "space-around";
        css["align-items"] = "stretch";
        break;
      case "baseline":
        css["align-content"] = "stretch";
        css["align-items"] = "baseline";
        break;
      case "stretch":
      default:
        css["align-items"] = css["align-content"] = "stretch";
        break;
    }
    return extendObject(css, {
      display: parent.inline ? "inline-flex" : "flex",
      "flex-direction": parent.layout,
      "box-sizing": "border-box",
      "max-width": crossAxis === "stretch" ? !isFlowHorizontal(parent.layout) ? "100%" : null : null,
      "max-height": crossAxis === "stretch" ? isFlowHorizontal(parent.layout) ? "100%" : null : null
    });
  }
};
_LayoutAlignStyleBuilder.ɵfac = /* @__PURE__ */ (() => {
  let ɵLayoutAlignStyleBuilder_BaseFactory;
  return function LayoutAlignStyleBuilder_Factory(t) {
    return (ɵLayoutAlignStyleBuilder_BaseFactory || (ɵLayoutAlignStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_LayoutAlignStyleBuilder)))(t || _LayoutAlignStyleBuilder);
  };
})();
_LayoutAlignStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: _LayoutAlignStyleBuilder,
  factory: _LayoutAlignStyleBuilder.ɵfac,
  providedIn: "root"
});
var LayoutAlignStyleBuilder = _LayoutAlignStyleBuilder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutAlignStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs$2 = ["fxLayoutAlign", "fxLayoutAlign.xs", "fxLayoutAlign.sm", "fxLayoutAlign.md", "fxLayoutAlign.lg", "fxLayoutAlign.xl", "fxLayoutAlign.lt-sm", "fxLayoutAlign.lt-md", "fxLayoutAlign.lt-lg", "fxLayoutAlign.lt-xl", "fxLayoutAlign.gt-xs", "fxLayoutAlign.gt-sm", "fxLayoutAlign.gt-md", "fxLayoutAlign.gt-lg"];
var selector$2 = `
  [fxLayoutAlign], [fxLayoutAlign.xs], [fxLayoutAlign.sm], [fxLayoutAlign.md],
  [fxLayoutAlign.lg], [fxLayoutAlign.xl], [fxLayoutAlign.lt-sm], [fxLayoutAlign.lt-md],
  [fxLayoutAlign.lt-lg], [fxLayoutAlign.lt-xl], [fxLayoutAlign.gt-xs], [fxLayoutAlign.gt-sm],
  [fxLayoutAlign.gt-md], [fxLayoutAlign.gt-lg]
`;
var _LayoutAlignDirective = class _LayoutAlignDirective extends BaseDirective2 {
  constructor(elRef, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.DIRECTIVE_KEY = "layout-align";
    this.layout = "row";
    this.inline = false;
    this.init();
    this.marshal.trackValue(this.nativeElement, "layout").pipe(takeUntil(this.destroySubject)).subscribe(this.onLayoutChange.bind(this));
  }
  // *********************************************
  // Protected methods
  // *********************************************
  /**
   *
   */
  updateWithValue(value) {
    const layout = this.layout || "row";
    const inline = this.inline;
    if (layout === "row" && inline) {
      this.styleCache = layoutAlignHorizontalInlineCache;
    } else if (layout === "row" && !inline) {
      this.styleCache = layoutAlignHorizontalCache;
    } else if (layout === "row-reverse" && inline) {
      this.styleCache = layoutAlignHorizontalRevInlineCache;
    } else if (layout === "row-reverse" && !inline) {
      this.styleCache = layoutAlignHorizontalRevCache;
    } else if (layout === "column" && inline) {
      this.styleCache = layoutAlignVerticalInlineCache;
    } else if (layout === "column" && !inline) {
      this.styleCache = layoutAlignVerticalCache;
    } else if (layout === "column-reverse" && inline) {
      this.styleCache = layoutAlignVerticalRevInlineCache;
    } else if (layout === "column-reverse" && !inline) {
      this.styleCache = layoutAlignVerticalRevCache;
    }
    this.addStyles(value, {
      layout,
      inline
    });
  }
  /**
   * Cache the parent container 'flex-direction' and update the 'flex' styles
   */
  onLayoutChange(matcher) {
    const layoutKeys = matcher.value.split(" ");
    this.layout = layoutKeys[0];
    this.inline = matcher.value.includes("inline");
    if (!LAYOUT_VALUES.find((x) => x === this.layout)) {
      this.layout = "row";
    }
    this.triggerUpdate();
  }
};
_LayoutAlignDirective.ɵfac = function LayoutAlignDirective_Factory(t) {
  return new (t || _LayoutAlignDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LayoutAlignStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
_LayoutAlignDirective.ɵdir = ɵɵdefineDirective({
  type: _LayoutAlignDirective,
  features: [ɵɵInheritDefinitionFeature]
});
var LayoutAlignDirective = _LayoutAlignDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutAlignDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: LayoutAlignStyleBuilder
  }, {
    type: MediaMarshaller
  }], null);
})();
var _DefaultLayoutAlignDirective = class _DefaultLayoutAlignDirective extends LayoutAlignDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$2;
  }
};
_DefaultLayoutAlignDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultLayoutAlignDirective_BaseFactory;
  return function DefaultLayoutAlignDirective_Factory(t) {
    return (ɵDefaultLayoutAlignDirective_BaseFactory || (ɵDefaultLayoutAlignDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultLayoutAlignDirective)))(t || _DefaultLayoutAlignDirective);
  };
})();
_DefaultLayoutAlignDirective.ɵdir = ɵɵdefineDirective({
  type: _DefaultLayoutAlignDirective,
  selectors: [["", "fxLayoutAlign", ""], ["", "fxLayoutAlign.xs", ""], ["", "fxLayoutAlign.sm", ""], ["", "fxLayoutAlign.md", ""], ["", "fxLayoutAlign.lg", ""], ["", "fxLayoutAlign.xl", ""], ["", "fxLayoutAlign.lt-sm", ""], ["", "fxLayoutAlign.lt-md", ""], ["", "fxLayoutAlign.lt-lg", ""], ["", "fxLayoutAlign.lt-xl", ""], ["", "fxLayoutAlign.gt-xs", ""], ["", "fxLayoutAlign.gt-sm", ""], ["", "fxLayoutAlign.gt-md", ""], ["", "fxLayoutAlign.gt-lg", ""]],
  inputs: {
    fxLayoutAlign: "fxLayoutAlign",
    "fxLayoutAlign.xs": "fxLayoutAlign.xs",
    "fxLayoutAlign.sm": "fxLayoutAlign.sm",
    "fxLayoutAlign.md": "fxLayoutAlign.md",
    "fxLayoutAlign.lg": "fxLayoutAlign.lg",
    "fxLayoutAlign.xl": "fxLayoutAlign.xl",
    "fxLayoutAlign.lt-sm": "fxLayoutAlign.lt-sm",
    "fxLayoutAlign.lt-md": "fxLayoutAlign.lt-md",
    "fxLayoutAlign.lt-lg": "fxLayoutAlign.lt-lg",
    "fxLayoutAlign.lt-xl": "fxLayoutAlign.lt-xl",
    "fxLayoutAlign.gt-xs": "fxLayoutAlign.gt-xs",
    "fxLayoutAlign.gt-sm": "fxLayoutAlign.gt-sm",
    "fxLayoutAlign.gt-md": "fxLayoutAlign.gt-md",
    "fxLayoutAlign.gt-lg": "fxLayoutAlign.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
var DefaultLayoutAlignDirective = _DefaultLayoutAlignDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultLayoutAlignDirective, [{
    type: Directive,
    args: [{
      selector: selector$2,
      inputs: inputs$2
    }]
  }], null, null);
})();
var layoutAlignHorizontalCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalCache = /* @__PURE__ */ new Map();
var layoutAlignHorizontalRevCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalRevCache = /* @__PURE__ */ new Map();
var layoutAlignHorizontalInlineCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalInlineCache = /* @__PURE__ */ new Map();
var layoutAlignHorizontalRevInlineCache = /* @__PURE__ */ new Map();
var layoutAlignVerticalRevInlineCache = /* @__PURE__ */ new Map();
var CLEAR_MARGIN_CSS = {
  "margin-left": null,
  "margin-right": null,
  "margin-top": null,
  "margin-bottom": null
};
var _LayoutGapStyleBuilder = class _LayoutGapStyleBuilder extends StyleBuilder {
  constructor(_styler, _config) {
    super();
    this._styler = _styler;
    this._config = _config;
  }
  buildStyles(gapValue, parent) {
    if (gapValue.endsWith(GRID_SPECIFIER)) {
      gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
      gapValue = multiply(gapValue, this._config.multiplier);
      return buildGridMargin(gapValue, parent.directionality);
    } else {
      return {};
    }
  }
  sideEffect(gapValue, _styles, parent) {
    const items = parent.items;
    if (gapValue.endsWith(GRID_SPECIFIER)) {
      gapValue = gapValue.slice(0, gapValue.indexOf(GRID_SPECIFIER));
      gapValue = multiply(gapValue, this._config.multiplier);
      const paddingStyles = buildGridPadding(gapValue, parent.directionality);
      this._styler.applyStyleToElements(paddingStyles, parent.items);
    } else {
      gapValue = multiply(gapValue, this._config.multiplier);
      gapValue = this.addFallbackUnit(gapValue);
      const lastItem = items.pop();
      const gapCss = buildGapCSS(gapValue, parent);
      this._styler.applyStyleToElements(gapCss, items);
      this._styler.applyStyleToElements(CLEAR_MARGIN_CSS, [lastItem]);
    }
  }
  addFallbackUnit(value) {
    return !isNaN(+value) ? `${value}${this._config.defaultUnit}` : value;
  }
};
_LayoutGapStyleBuilder.ɵfac = function LayoutGapStyleBuilder_Factory(t) {
  return new (t || _LayoutGapStyleBuilder)(ɵɵinject(StyleUtils), ɵɵinject(LAYOUT_CONFIG));
};
_LayoutGapStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: _LayoutGapStyleBuilder,
  factory: _LayoutGapStyleBuilder.ɵfac,
  providedIn: "root"
});
var LayoutGapStyleBuilder = _LayoutGapStyleBuilder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutGapStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: StyleUtils
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LAYOUT_CONFIG]
    }]
  }], null);
})();
var inputs$1 = ["fxLayoutGap", "fxLayoutGap.xs", "fxLayoutGap.sm", "fxLayoutGap.md", "fxLayoutGap.lg", "fxLayoutGap.xl", "fxLayoutGap.lt-sm", "fxLayoutGap.lt-md", "fxLayoutGap.lt-lg", "fxLayoutGap.lt-xl", "fxLayoutGap.gt-xs", "fxLayoutGap.gt-sm", "fxLayoutGap.gt-md", "fxLayoutGap.gt-lg"];
var selector$1 = `
  [fxLayoutGap], [fxLayoutGap.xs], [fxLayoutGap.sm], [fxLayoutGap.md],
  [fxLayoutGap.lg], [fxLayoutGap.xl], [fxLayoutGap.lt-sm], [fxLayoutGap.lt-md],
  [fxLayoutGap.lt-lg], [fxLayoutGap.lt-xl], [fxLayoutGap.gt-xs], [fxLayoutGap.gt-sm],
  [fxLayoutGap.gt-md], [fxLayoutGap.gt-lg]
`;
var _LayoutGapDirective = class _LayoutGapDirective extends BaseDirective2 {
  /** Special accessor to query for all child 'element' nodes regardless of type, class, etc */
  get childrenNodes() {
    const obj = this.nativeElement.children;
    const buffer = [];
    for (let i = obj.length; i--; ) {
      buffer[i] = obj[i];
    }
    return buffer;
  }
  constructor(elRef, zone, directionality, styleUtils, styleBuilder, marshal) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.zone = zone;
    this.directionality = directionality;
    this.styleUtils = styleUtils;
    this.layout = "row";
    this.DIRECTIVE_KEY = "layout-gap";
    this.observerSubject = new Subject();
    const extraTriggers = [this.directionality.change, this.observerSubject.asObservable()];
    this.init(extraTriggers);
    this.marshal.trackValue(this.nativeElement, "layout").pipe(takeUntil(this.destroySubject)).subscribe(this.onLayoutChange.bind(this));
  }
  // *********************************************
  // Lifecycle Methods
  // *********************************************
  ngAfterContentInit() {
    this.buildChildObservable();
    this.triggerUpdate();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  // *********************************************
  // Protected methods
  // *********************************************
  /**
   * Cache the parent container 'flex-direction' and update the 'margin' styles
   */
  onLayoutChange(matcher) {
    const layout = matcher.value;
    let newDirection = layout.split(" ")[0];
    if (!LAYOUT_VALUES.find((x) => x === newDirection)) {
      newDirection = "row";
    }
    if (this.layout && this.layout !== newDirection) {
      this.clearStyles();
    }
    this.layout = newDirection;
    this.triggerUpdate();
  }
  /**
   *
   */
  updateWithValue(value) {
    const items = this.childrenNodes.filter((el) => el.nodeType === 1 && this.willDisplay(el)).sort((a, b) => {
      const orderA = +this.styler.lookupStyle(a, "order");
      const orderB = +this.styler.lookupStyle(b, "order");
      if (isNaN(orderA) || isNaN(orderB) || orderA === orderB) {
        return 0;
      } else {
        return orderA > orderB ? 1 : -1;
      }
    });
    if (items.length > 0) {
      const directionality = this.directionality.value;
      const layout = this.layout;
      if (layout === "row" && directionality === "rtl") {
        this.styleCache = layoutGapCacheRowRtl;
      } else if (layout === "row" && directionality !== "rtl") {
        this.styleCache = layoutGapCacheRowLtr;
      } else if (layout === "column" && directionality === "rtl") {
        this.styleCache = layoutGapCacheColumnRtl;
      } else if (layout === "column" && directionality !== "rtl") {
        this.styleCache = layoutGapCacheColumnLtr;
      }
      this.addStyles(value, {
        directionality,
        items,
        layout
      });
    }
  }
  /** We need to override clearStyles because in most cases mru isn't populated */
  clearStyles() {
    const gridMode = Object.keys(this.mru).length > 0;
    const childrenStyle = gridMode ? "padding" : getMarginType(this.directionality.value, this.layout);
    if (gridMode) {
      super.clearStyles();
    }
    this.styleUtils.applyStyleToElements({
      [childrenStyle]: ""
    }, this.childrenNodes);
  }
  /** Determine if an element will show or hide based on current activation */
  willDisplay(source) {
    const value = this.marshal.getValue(source, "show-hide");
    return value === true || value === void 0 && this.styleUtils.lookupStyle(source, "display") !== "none";
  }
  buildChildObservable() {
    this.zone.runOutsideAngular(() => {
      if (typeof MutationObserver !== "undefined") {
        this.observer = new MutationObserver((mutations) => {
          const validatedChanges = (it) => {
            return it.addedNodes && it.addedNodes.length > 0 || it.removedNodes && it.removedNodes.length > 0;
          };
          if (mutations.some(validatedChanges)) {
            this.observerSubject.next();
          }
        });
        this.observer.observe(this.nativeElement, {
          childList: true
        });
      }
    });
  }
};
_LayoutGapDirective.ɵfac = function LayoutGapDirective_Factory(t) {
  return new (t || _LayoutGapDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(Directionality), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LayoutGapStyleBuilder), ɵɵdirectiveInject(MediaMarshaller));
};
_LayoutGapDirective.ɵdir = ɵɵdefineDirective({
  type: _LayoutGapDirective,
  features: [ɵɵInheritDefinitionFeature]
});
var LayoutGapDirective = _LayoutGapDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutGapDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: Directionality
  }, {
    type: StyleUtils
  }, {
    type: LayoutGapStyleBuilder
  }, {
    type: MediaMarshaller
  }], null);
})();
var _DefaultLayoutGapDirective = class _DefaultLayoutGapDirective extends LayoutGapDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs$1;
  }
};
_DefaultLayoutGapDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultLayoutGapDirective_BaseFactory;
  return function DefaultLayoutGapDirective_Factory(t) {
    return (ɵDefaultLayoutGapDirective_BaseFactory || (ɵDefaultLayoutGapDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultLayoutGapDirective)))(t || _DefaultLayoutGapDirective);
  };
})();
_DefaultLayoutGapDirective.ɵdir = ɵɵdefineDirective({
  type: _DefaultLayoutGapDirective,
  selectors: [["", "fxLayoutGap", ""], ["", "fxLayoutGap.xs", ""], ["", "fxLayoutGap.sm", ""], ["", "fxLayoutGap.md", ""], ["", "fxLayoutGap.lg", ""], ["", "fxLayoutGap.xl", ""], ["", "fxLayoutGap.lt-sm", ""], ["", "fxLayoutGap.lt-md", ""], ["", "fxLayoutGap.lt-lg", ""], ["", "fxLayoutGap.lt-xl", ""], ["", "fxLayoutGap.gt-xs", ""], ["", "fxLayoutGap.gt-sm", ""], ["", "fxLayoutGap.gt-md", ""], ["", "fxLayoutGap.gt-lg", ""]],
  inputs: {
    fxLayoutGap: "fxLayoutGap",
    "fxLayoutGap.xs": "fxLayoutGap.xs",
    "fxLayoutGap.sm": "fxLayoutGap.sm",
    "fxLayoutGap.md": "fxLayoutGap.md",
    "fxLayoutGap.lg": "fxLayoutGap.lg",
    "fxLayoutGap.xl": "fxLayoutGap.xl",
    "fxLayoutGap.lt-sm": "fxLayoutGap.lt-sm",
    "fxLayoutGap.lt-md": "fxLayoutGap.lt-md",
    "fxLayoutGap.lt-lg": "fxLayoutGap.lt-lg",
    "fxLayoutGap.lt-xl": "fxLayoutGap.lt-xl",
    "fxLayoutGap.gt-xs": "fxLayoutGap.gt-xs",
    "fxLayoutGap.gt-sm": "fxLayoutGap.gt-sm",
    "fxLayoutGap.gt-md": "fxLayoutGap.gt-md",
    "fxLayoutGap.gt-lg": "fxLayoutGap.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
var DefaultLayoutGapDirective = _DefaultLayoutGapDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultLayoutGapDirective, [{
    type: Directive,
    args: [{
      selector: selector$1,
      inputs: inputs$1
    }]
  }], null, null);
})();
var layoutGapCacheRowRtl = /* @__PURE__ */ new Map();
var layoutGapCacheColumnRtl = /* @__PURE__ */ new Map();
var layoutGapCacheRowLtr = /* @__PURE__ */ new Map();
var layoutGapCacheColumnLtr = /* @__PURE__ */ new Map();
var GRID_SPECIFIER = " grid";
function buildGridPadding(value, directionality) {
  const [between, below] = value.split(" ");
  const bottom = below ?? between;
  let paddingRight = "0px", paddingBottom = bottom, paddingLeft = "0px";
  if (directionality === "rtl") {
    paddingLeft = between;
  } else {
    paddingRight = between;
  }
  return {
    padding: `0px ${paddingRight} ${paddingBottom} ${paddingLeft}`
  };
}
function buildGridMargin(value, directionality) {
  const [between, below] = value.split(" ");
  const bottom = below ?? between;
  const minus = (str) => `-${str}`;
  let marginRight = "0px", marginBottom = minus(bottom), marginLeft = "0px";
  if (directionality === "rtl") {
    marginLeft = minus(between);
  } else {
    marginRight = minus(between);
  }
  return {
    margin: `0px ${marginRight} ${marginBottom} ${marginLeft}`
  };
}
function getMarginType(directionality, layout) {
  switch (layout) {
    case "column":
      return "margin-bottom";
    case "column-reverse":
      return "margin-top";
    case "row":
      return directionality === "rtl" ? "margin-left" : "margin-right";
    case "row-reverse":
      return directionality === "rtl" ? "margin-right" : "margin-left";
    default:
      return directionality === "rtl" ? "margin-left" : "margin-right";
  }
}
function buildGapCSS(gapValue, parent) {
  const key = getMarginType(parent.directionality, parent.layout);
  const margins = __spreadValues({}, CLEAR_MARGIN_CSS);
  margins[key] = gapValue;
  return margins;
}
var _LayoutStyleBuilder = class _LayoutStyleBuilder extends StyleBuilder {
  buildStyles(input, {
    display
  }) {
    const css = buildLayoutCSS(input);
    return __spreadProps(__spreadValues({}, css), {
      display: display === "none" ? display : css.display
    });
  }
};
_LayoutStyleBuilder.ɵfac = /* @__PURE__ */ (() => {
  let ɵLayoutStyleBuilder_BaseFactory;
  return function LayoutStyleBuilder_Factory(t) {
    return (ɵLayoutStyleBuilder_BaseFactory || (ɵLayoutStyleBuilder_BaseFactory = ɵɵgetInheritedFactory(_LayoutStyleBuilder)))(t || _LayoutStyleBuilder);
  };
})();
_LayoutStyleBuilder.ɵprov = ɵɵdefineInjectable({
  token: _LayoutStyleBuilder,
  factory: _LayoutStyleBuilder.ɵfac,
  providedIn: "root"
});
var LayoutStyleBuilder = _LayoutStyleBuilder;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutStyleBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var inputs = ["fxLayout", "fxLayout.xs", "fxLayout.sm", "fxLayout.md", "fxLayout.lg", "fxLayout.xl", "fxLayout.lt-sm", "fxLayout.lt-md", "fxLayout.lt-lg", "fxLayout.lt-xl", "fxLayout.gt-xs", "fxLayout.gt-sm", "fxLayout.gt-md", "fxLayout.gt-lg"];
var selector = `
  [fxLayout], [fxLayout.xs], [fxLayout.sm], [fxLayout.md],
  [fxLayout.lg], [fxLayout.xl], [fxLayout.lt-sm], [fxLayout.lt-md],
  [fxLayout.lt-lg], [fxLayout.lt-xl], [fxLayout.gt-xs], [fxLayout.gt-sm],
  [fxLayout.gt-md], [fxLayout.gt-lg]
`;
var _LayoutDirective = class _LayoutDirective extends BaseDirective2 {
  constructor(elRef, styleUtils, styleBuilder, marshal, _config) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this._config = _config;
    this.DIRECTIVE_KEY = "layout";
    this.init();
  }
  updateWithValue(input) {
    const detectLayoutDisplay = this._config.detectLayoutDisplay;
    const display = detectLayoutDisplay ? this.styler.lookupStyle(this.nativeElement, "display") : "";
    this.styleCache = cacheMap.get(display) ?? /* @__PURE__ */ new Map();
    cacheMap.set(display, this.styleCache);
    if (this.currentValue !== input) {
      this.addStyles(input, {
        display
      });
      this.currentValue = input;
    }
  }
};
_LayoutDirective.ɵfac = function LayoutDirective_Factory(t) {
  return new (t || _LayoutDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(StyleUtils), ɵɵdirectiveInject(LayoutStyleBuilder), ɵɵdirectiveInject(MediaMarshaller), ɵɵdirectiveInject(LAYOUT_CONFIG));
};
_LayoutDirective.ɵdir = ɵɵdefineDirective({
  type: _LayoutDirective,
  features: [ɵɵInheritDefinitionFeature]
});
var LayoutDirective = _LayoutDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LayoutDirective, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: StyleUtils
  }, {
    type: LayoutStyleBuilder
  }, {
    type: MediaMarshaller
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [LAYOUT_CONFIG]
    }]
  }], null);
})();
var _DefaultLayoutDirective = class _DefaultLayoutDirective extends LayoutDirective {
  constructor() {
    super(...arguments);
    this.inputs = inputs;
  }
};
_DefaultLayoutDirective.ɵfac = /* @__PURE__ */ (() => {
  let ɵDefaultLayoutDirective_BaseFactory;
  return function DefaultLayoutDirective_Factory(t) {
    return (ɵDefaultLayoutDirective_BaseFactory || (ɵDefaultLayoutDirective_BaseFactory = ɵɵgetInheritedFactory(_DefaultLayoutDirective)))(t || _DefaultLayoutDirective);
  };
})();
_DefaultLayoutDirective.ɵdir = ɵɵdefineDirective({
  type: _DefaultLayoutDirective,
  selectors: [["", "fxLayout", ""], ["", "fxLayout.xs", ""], ["", "fxLayout.sm", ""], ["", "fxLayout.md", ""], ["", "fxLayout.lg", ""], ["", "fxLayout.xl", ""], ["", "fxLayout.lt-sm", ""], ["", "fxLayout.lt-md", ""], ["", "fxLayout.lt-lg", ""], ["", "fxLayout.lt-xl", ""], ["", "fxLayout.gt-xs", ""], ["", "fxLayout.gt-sm", ""], ["", "fxLayout.gt-md", ""], ["", "fxLayout.gt-lg", ""]],
  inputs: {
    fxLayout: "fxLayout",
    "fxLayout.xs": "fxLayout.xs",
    "fxLayout.sm": "fxLayout.sm",
    "fxLayout.md": "fxLayout.md",
    "fxLayout.lg": "fxLayout.lg",
    "fxLayout.xl": "fxLayout.xl",
    "fxLayout.lt-sm": "fxLayout.lt-sm",
    "fxLayout.lt-md": "fxLayout.lt-md",
    "fxLayout.lt-lg": "fxLayout.lt-lg",
    "fxLayout.lt-xl": "fxLayout.lt-xl",
    "fxLayout.gt-xs": "fxLayout.gt-xs",
    "fxLayout.gt-sm": "fxLayout.gt-sm",
    "fxLayout.gt-md": "fxLayout.gt-md",
    "fxLayout.gt-lg": "fxLayout.gt-lg"
  },
  features: [ɵɵInheritDefinitionFeature]
});
var DefaultLayoutDirective = _DefaultLayoutDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DefaultLayoutDirective, [{
    type: Directive,
    args: [{
      selector,
      inputs
    }]
  }], null, null);
})();
var cacheMap = /* @__PURE__ */ new Map();
var ALL_DIRECTIVES = [DefaultLayoutDirective, DefaultLayoutGapDirective, DefaultLayoutAlignDirective, DefaultFlexOrderDirective, DefaultFlexOffsetDirective, FlexFillDirective, DefaultFlexAlignDirective, DefaultFlexDirective];
var _FlexModule = class _FlexModule {
};
_FlexModule.ɵfac = function FlexModule_Factory(t) {
  return new (t || _FlexModule)();
};
_FlexModule.ɵmod = ɵɵdefineNgModule({
  type: _FlexModule,
  declarations: [DefaultLayoutDirective, DefaultLayoutGapDirective, DefaultLayoutAlignDirective, DefaultFlexOrderDirective, DefaultFlexOffsetDirective, FlexFillDirective, DefaultFlexAlignDirective, DefaultFlexDirective],
  imports: [CoreModule, BidiModule],
  exports: [DefaultLayoutDirective, DefaultLayoutGapDirective, DefaultLayoutAlignDirective, DefaultFlexOrderDirective, DefaultFlexOffsetDirective, FlexFillDirective, DefaultFlexAlignDirective, DefaultFlexDirective]
});
_FlexModule.ɵinj = ɵɵdefineInjector({
  imports: [CoreModule, BidiModule]
});
var FlexModule = _FlexModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FlexModule, [{
    type: NgModule,
    args: [{
      imports: [CoreModule, BidiModule],
      declarations: [...ALL_DIRECTIVES],
      exports: [...ALL_DIRECTIVES]
    }]
  }], null, null);
})();

export {
  FlexAlignStyleBuilder,
  FlexAlignDirective,
  DefaultFlexAlignDirective,
  FlexFillStyleBuilder,
  FlexFillDirective,
  FlexOffsetStyleBuilder,
  FlexOffsetDirective,
  DefaultFlexOffsetDirective,
  FlexOrderStyleBuilder,
  FlexOrderDirective,
  DefaultFlexOrderDirective,
  FlexStyleBuilder,
  FlexDirective,
  DefaultFlexDirective,
  LayoutAlignStyleBuilder,
  LayoutAlignDirective,
  DefaultLayoutAlignDirective,
  LayoutGapStyleBuilder,
  LayoutGapDirective,
  DefaultLayoutGapDirective,
  LayoutStyleBuilder,
  LayoutDirective,
  DefaultLayoutDirective,
  FlexModule
};
/*! Bundled license information:

@ngbracket/ngx-layout/fesm2022/ngbracket-ngx-layout-flex.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)
*/
//# sourceMappingURL=chunk-3GZ4IPHH.js.map
