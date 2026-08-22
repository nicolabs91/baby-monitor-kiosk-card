const T = globalThis, K = T.ShadowRoot && (T.ShadyCSS === void 0 || T.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = /* @__PURE__ */ Symbol(), it = /* @__PURE__ */ new WeakMap();
let gt = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (K && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = it.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && it.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ct = (e) => new gt(typeof e == "string" ? e : e + "", void 0, F), bt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, o, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new gt(i, e, F);
}, Ot = (e, t) => {
  if (K) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), o = T.litNonce;
    o !== void 0 && s.setAttribute("nonce", o), s.textContent = i.cssText, e.appendChild(s);
  }
}, st = K ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return Ct(i);
})(e) : e;
const { is: Mt, defineProperty: It, getOwnPropertyDescriptor: Pt, getOwnPropertyNames: Nt, getOwnPropertySymbols: Ut, getPrototypeOf: Lt } = Object, z = globalThis, ot = z.trustedTypes, Dt = ot ? ot.emptyScript : "", Tt = z.reactiveElementPolyfillSupport, C = (e, t) => e, R = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Dt : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, J = (e, t) => !Mt(e, t), nt = { attribute: !0, type: String, converter: R, reflect: !1, useDefault: !1, hasChanged: J };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = nt) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, s, i);
      o !== void 0 && It(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: o, set: n } = Pt(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: o, set(r) {
      const c = o?.call(this);
      n?.call(this, r), this.requestUpdate(t, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = Lt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const i = this.properties, s = [...Nt(i), ...Ut(i)];
      for (const o of s) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [s, o] of i) this.elementProperties.set(s, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const o = this._$Eu(i, s);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const o of s) i.unshift(st(o));
    } else t !== void 0 && i.push(st(t));
    return i;
  }
  static _$Eu(t, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ot(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$ET(t, i) {
    const s = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, s);
    if (o !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : R).toAttribute(i, s.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const s = this.constructor, o = s._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = s.getPropertyOptions(o), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : R;
      this._$Em = o;
      const c = r.fromAttribute(i, n.type);
      this[o] = c ?? this._$Ej?.get(o) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, o = !1, n) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (n = this[t]), s ??= r.getPropertyOptions(t), !((s.hasChanged ?? J)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, s)))) return;
      this.C(t, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: s, reflect: o, wrapped: n }, r) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, n] of s) {
        const { wrapped: r } = n, c = this[o];
        r !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, n, c);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[C("elementProperties")] = /* @__PURE__ */ new Map(), A[C("finalized")] = /* @__PURE__ */ new Map(), Tt?.({ ReactiveElement: A }), (z.reactiveElementVersions ??= []).push("2.1.2");
const Q = globalThis, rt = (e) => e, V = Q.trustedTypes, at = V ? V.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, _t = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + g, Rt = `<${$t}>`, v = document, M = () => v.createComment(""), I = (e) => e === null || typeof e != "object" && typeof e != "function", Z = Array.isArray, Vt = (e) => Z(e) || typeof e?.[Symbol.iterator] == "function", q = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ct = /-->/g, ht = />/g, b = RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), lt = /'/g, dt = /"/g, vt = /^(?:script|style|textarea|title)$/i, Ht = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), u = Ht(1), k = /* @__PURE__ */ Symbol.for("lit-noChange"), h = /* @__PURE__ */ Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), _ = v.createTreeWalker(v, 129);
function yt(e, t) {
  if (!Z(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return at !== void 0 ? at.createHTML(t) : t;
}
const zt = (e, t) => {
  const i = e.length - 1, s = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = S;
  for (let c = 0; c < i; c++) {
    const a = e[c];
    let d, p, l = -1, m = 0;
    for (; m < a.length && (r.lastIndex = m, p = r.exec(a), p !== null); ) m = r.lastIndex, r === S ? p[1] === "!--" ? r = ct : p[1] !== void 0 ? r = ht : p[2] !== void 0 ? (vt.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = b) : p[3] !== void 0 && (r = b) : r === b ? p[0] === ">" ? (r = o ?? S, l = -1) : p[1] === void 0 ? l = -2 : (l = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? b : p[3] === '"' ? dt : lt) : r === dt || r === lt ? r = b : r === ct || r === ht ? r = S : (r = b, o = void 0);
    const f = r === b && e[c + 1].startsWith("/>") ? " " : "";
    n += r === S ? a + Rt : l >= 0 ? (s.push(d), a.slice(0, l) + _t + a.slice(l) + g + f) : a + g + (l === -2 ? c : f);
  }
  return [yt(e, n + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class P {
  constructor({ strings: t, _$litType$: i }, s) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const c = t.length - 1, a = this.parts, [d, p] = zt(t, i);
    if (this.el = P.createElement(d, s), _.currentNode = this.el.content, i === 2 || i === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (o = _.nextNode()) !== null && a.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const l of o.getAttributeNames()) if (l.endsWith(_t)) {
          const m = p[r++], f = o.getAttribute(l).split(g), D = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: n, name: D[2], strings: f, ctor: D[1] === "." ? jt : D[1] === "?" ? qt : D[1] === "@" ? Wt : B }), o.removeAttribute(l);
        } else l.startsWith(g) && (a.push({ type: 6, index: n }), o.removeAttribute(l));
        if (vt.test(o.tagName)) {
          const l = o.textContent.split(g), m = l.length - 1;
          if (m > 0) {
            o.textContent = V ? V.emptyScript : "";
            for (let f = 0; f < m; f++) o.append(l[f], M()), _.nextNode(), a.push({ type: 2, index: ++n });
            o.append(l[m], M());
          }
        }
      } else if (o.nodeType === 8) if (o.data === $t) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = o.data.indexOf(g, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += g.length - 1;
      }
      n++;
    }
  }
  static createElement(t, i) {
    const s = v.createElement("template");
    return s.innerHTML = t, s;
  }
}
function x(e, t, i = e, s) {
  if (t === k) return t;
  let o = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = I(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = o : i._$Cl = o), o !== void 0 && (t = x(e, o._$AS(e, t.values), o, s)), t;
}
class Bt {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: s } = this._$AD, o = (t?.creationScope ?? v).importNode(i, !0);
    _.currentNode = o;
    let n = _.nextNode(), r = 0, c = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let d;
        a.type === 2 ? d = new U(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new Gt(n, this, t)), this._$AV.push(d), a = s[++c];
      }
      r !== a?.index && (n = _.nextNode(), r++);
    }
    return _.currentNode = v, o;
  }
  p(t) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }
}
class U {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, s, o) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = x(this, t, i), I(t) ? t === h || t == null || t === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : t !== this._$AH && t !== k && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Vt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== h && I(this._$AH) ? this._$AA.nextSibling.data = t : this.T(v.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = P.createElement(yt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const n = new Bt(o, this), r = n.u(this.options);
      n.p(i), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let i = ut.get(t.strings);
    return i === void 0 && ut.set(t.strings, i = new P(t)), i;
  }
  k(t) {
    Z(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, o = 0;
    for (const n of t) o === i.length ? i.push(s = new U(this.O(M()), this.O(M()), this, this.options)) : s = i[o], s._$AI(n), o++;
    o < i.length && (this._$AR(s && s._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const s = rt(t).nextSibling;
      rt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class B {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, o, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = h;
  }
  _$AI(t, i = this, s, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = x(this, t, i, 0), r = !I(t) || t !== this._$AH && t !== k, r && (this._$AH = t);
    else {
      const c = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++) d = x(this, c[s + a], i, a), d === k && (d = this._$AH[a]), r ||= !I(d) || d !== this._$AH[a], d === h ? t = h : t !== h && (t += (d ?? "") + n[a + 1]), this._$AH[a] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class jt extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === h ? void 0 : t;
  }
}
class qt extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== h);
  }
}
class Wt extends B {
  constructor(t, i, s, o, n) {
    super(t, i, s, o, n), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = x(this, t, i, 0) ?? h) === k) return;
    const s = this._$AH, o = t === h && s !== h || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== h && (s === h || o);
    o && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Gt {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    x(this, t);
  }
}
const Kt = Q.litHtmlPolyfillSupport;
Kt?.(P, U), (Q.litHtmlVersions ??= []).push("3.3.3");
const At = (e, t, i) => {
  const s = i?.renderBefore ?? t;
  let o = s._$litPart$;
  if (o === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = o = new U(t.insertBefore(M(), n), n, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
const X = globalThis;
class w extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = At(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return k;
  }
}
w._$litElement$ = !0, w.finalized = !0, X.litElementHydrateSupport?.({ LitElement: w });
const Ft = X.litElementPolyfillSupport;
Ft?.({ LitElement: w });
(X.litElementVersions ??= []).push("4.2.2");
const Et = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Jt = { attribute: !0, type: String, converter: R, reflect: !1, hasChanged: J }, Qt = (e = Jt, t, i) => {
  const { kind: s, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(i.name, e), s === "accessor") {
    const { name: r } = i;
    return { set(c) {
      const a = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(r, a, e, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(r, void 0, e, c), c;
    } };
  }
  if (s === "setter") {
    const { name: r } = i;
    return function(c) {
      const a = this[r];
      t.call(this, c), this.requestUpdate(r, a, e, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Y(e) {
  return (t, i) => typeof i == "object" ? Qt(e, t, i) : ((s, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, i);
}
function j(e) {
  return Y({ ...e, state: !0, attribute: !1 });
}
const wt = "baby-monitor-kiosk-card:", tt = (e) => wt + e;
function $(e) {
  return localStorage.getItem(tt(e)) === "paired";
}
function kt(e) {
  localStorage.setItem(tt(e), "paired");
}
function xt(e) {
  localStorage.removeItem(tt(e));
}
function pt(e) {
  return wt + e + ":muted";
}
var Zt = Object.defineProperty, Xt = Object.getOwnPropertyDescriptor, et = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? Xt(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && Zt(t, i, o), o;
};
let N = class extends w {
  setConfig(e) {
    this.config = structuredClone(e);
  }
  set(e, t) {
    if (!this.config) return;
    const i = structuredClone(this.config), s = e.split(".");
    let o = i;
    for (; s.length > 1; ) {
      const n = s.shift();
      o[n] ??= {}, o = o[n];
    }
    o[s[0]] = t, this.config = i, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: i }, bubbles: !0, composed: !0 }));
  }
  entity(e, t, i, s) {
    return u`<label>${t}<ha-entity-picker .hass=${this.hass} .value=${i} .includeDomains=${s} allow-custom-entity @value-changed=${(o) => this.set(e, o.detail.value)}></ha-entity-picker></label>`;
  }
  render() {
    const e = this.config;
    if (!e) return u``;
    const t = e.id ?? `${e.camera ?? e.stream}|${e.sound_sensor}`, i = (s, o, n) => u`<label><input type=checkbox .checked=${n} @change=${(r) => this.set(s, r.target.checked)}> ${o}</label>`;
    return u`<div class=grid><label>Naam/ID<input .value=${e.id ?? ""} @change=${(s) => this.set("id", s.target.value)}></label>${this.entity("camera", "Camera entity", e.camera ?? "", ["camera"])}<label>go2rtc/WebRTC stream<input .value=${e.stream ?? ""} @change=${(s) => this.set("stream", s.target.value)}></label>${this.entity("sound_sensor", "Geluidsensor", e.sound_sensor ?? "", ["sensor", "binary_sensor"])}${[["sound_threshold_db", "Activeringsgrens dB"], ["sound_reset_db", "Resetgrens dB"], ["trigger_for", "Minimale geluidsduur (s)"], ["silence_duration", "Stiltetijd (s)"], ["manual_close_cooldown", "Cooldown handmatig sluiten (s)"]].map(([s, o]) => u`<label>${o}<input type=number .value=${String(e[s] ?? "")} @change=${(n) => this.set(s, Number(n.target.value))}></label>`)}${i("preload", "Stream voorverwarmen", e.preload !== !1)}${i("auto_open", "Automatisch openen", e.auto_open !== !1)}${i("kiosk.enabled", "Kioskmodus", e.kiosk?.enabled !== !1)}${i("kiosk.device_bound", "Alleen gekoppeld apparaat", e.kiosk?.device_bound !== !1)}<label>Toegestane HA-user-ID’s (komma-gescheiden)<input .value=${e.kiosk?.allowed_user_ids?.join(", ") ?? ""} @change=${(s) => this.set("kiosk.allowed_user_ids", s.target.value.split(",").map((o) => o.trim()).filter(Boolean))}></label>${i("audio.default_muted", "Standaard gedempt", e.audio?.default_muted ?? !1)}${i("audio.remember_state", "Audiostatus onthouden", e.audio?.remember_state !== !1)}${i("controls.mute", "Mute-knop tonen", e.controls?.mute !== !1)}${i("controls.close", "Sluitknop tonen", e.controls?.close !== !1)}${i("controls.volume", "Volumeknoppen tonen", e.controls?.volume ?? !1)}${i("controls.brightness", "Helderheidsknoppen tonen", e.controls?.brightness ?? !1)}${i("debug", "Debugstatus", !!e.debug)}<label>Companion notify service<input .value=${e.companion?.notify_service ?? ""} @change=${(s) => this.set("companion.notify_service", s.target.value)}></label>${[["active_brightness", "Actieve helderheid"], ["idle_brightness", "Rusthelderheid"], ["active_volume", "Actief volume"], ["idle_volume", "Rustvolume"]].map(([s, o]) => u`<label>${o}<input type=number min=0 max=100 .value=${String(e.companion?.[s] ?? "")} @change=${(n) => this.set(`companion.${s}`, Number(n.target.value))}></label>`)}<div class=pair><b>Dit apparaat gekoppeld: ${$(t) ? "ja" : "nee"}</b><button @click=${() => {
      $(t) ? xt(t) : kt(t), this.requestUpdate();
    }}>${$(t) ? "Ontkoppel" : "Koppel dit apparaat"}</button></div></div>`;
  }
};
N.styles = bt`:host{display:block;padding:16px}.grid{display:grid;gap:12px}label{display:grid;gap:4px}input{padding:8px}.pair{display:flex;gap:8px;align-items:center}button{padding:10px}`;
et([
  Y({ attribute: !1 })
], N.prototype, "hass", 2);
et([
  j()
], N.prototype, "config", 2);
N = et([
  Et("baby-monitor-kiosk-card-editor")
], N);
const E = { preload: !0, trigger_for: 1, silence_duration: 5, manual_close_cooldown: 30, sound_threshold_db: 48, sound_reset_db: 42 };
function Yt(e, t) {
  if (t.type === "MANUAL_OPEN") return "ACTIVE";
  switch (e) {
    case "IDLE":
      return t.type === "LOUD" ? "SOUND_PENDING" : e;
    case "SOUND_PENDING":
      return t.type === "QUIET" ? "IDLE" : t.type === "TRIGGER_ELAPSED" ? "ACTIVE" : e;
    case "ACTIVE":
      return t.type === "QUIET" ? "SILENCE_TIMER" : t.type === "MANUAL_CLOSE" ? "MANUAL_COOLDOWN" : e;
    case "SILENCE_TIMER":
      return t.type === "LOUD" ? "ACTIVE" : t.type === "SILENCE_ELAPSED" ? "IDLE" : t.type === "MANUAL_CLOSE" ? "MANUAL_COOLDOWN" : e;
    case "MANUAL_COOLDOWN":
      return t.type === "COOLDOWN_ELAPSED" ? "IDLE" : e;
  }
}
class te {
  constructor(t, i, s, o) {
    this.triggerMs = t, this.silenceMs = i, this.cooldownMs = s, this.changed = o, this.state = "IDLE", this.deadline = 0;
  }
  dispatch(t) {
    const i = this.state, s = Yt(i, t);
    if (s === i) return;
    this.clear(), this.state = s, this.changed(s);
    let o;
    if (s === "SOUND_PENDING" && (o = this.triggerMs), s === "SILENCE_TIMER" && (o = this.silenceMs), s === "MANUAL_COOLDOWN" && (o = this.cooldownMs), o !== void 0) {
      this.deadline = Date.now() + o;
      const n = s === "SOUND_PENDING" ? "TRIGGER_ELAPSED" : s === "SILENCE_TIMER" ? "SILENCE_ELAPSED" : "COOLDOWN_ELAPSED";
      this.timer = globalThis.setTimeout(() => this.dispatch({ type: n }), o);
    }
  }
  remainingMs() {
    return Math.max(0, this.deadline - Date.now());
  }
  destroy() {
    this.clear();
  }
  clear() {
    this.timer !== void 0 && globalThis.clearTimeout(this.timer), this.timer = void 0, this.deadline = 0;
  }
}
class ee {
  constructor(t, i) {
    this.config = t, this.key = i, this.listeners = /* @__PURE__ */ new Set(), this.lastLoud = !1, this.state = "IDLE", this.machine = new te((t.trigger_for ?? E.trigger_for) * 1e3, (t.silence_duration ?? E.silence_duration) * 1e3, (t.manual_close_cooldown ?? E.manual_close_cooldown) * 1e3, (s) => {
      this.state = s, this.listeners.forEach((o) => o(s)), s === "IDLE" && this.lastLoud && queueMicrotask(() => this.machine.dispatch({ type: "LOUD" }));
    });
  }
  update(t) {
    const i = t.states[this.config.sound_sensor];
    if (!i) return;
    const s = !this.config.sound_sensor.startsWith("binary_sensor."), o = Number(i.state);
    if (s && !Number.isFinite(o)) return;
    let n;
    if (s)
      n = this.lastLoud ? o > (this.config.sound_reset_db ?? E.sound_reset_db) : o >= (this.config.sound_threshold_db ?? E.sound_threshold_db);
    else {
      if (!["on", "off"].includes(i.state)) return;
      n = i.state === "on";
    }
    n !== this.lastLoud && (this.lastLoud = n, this.machine.dispatch({ type: n ? "LOUD" : "QUIET" }));
  }
  subscribe(t) {
    return this.listeners.add(t), t(this.state), () => {
      this.listeners.delete(t), this.listeners.size || (this.machine.destroy(), H.get(this.key) === this && H.delete(this.key));
    };
  }
  open() {
    this.machine.dispatch({ type: "MANUAL_OPEN" });
  }
  close() {
    this.machine.dispatch({ type: "MANUAL_CLOSE" });
  }
  remainingMs() {
    return this.machine.remainingMs();
  }
}
const H = /* @__PURE__ */ new Map(), mt = /* @__PURE__ */ new Map();
function ie(e) {
  const t = e.id ?? `${e.camera ?? e.stream}|${e.sound_sensor}`, i = JSON.stringify([e.sound_sensor, e.sound_threshold_db, e.sound_reset_db, e.trigger_for, e.silence_duration, e.manual_close_cooldown]);
  let s = H.get(t);
  return (!s || mt.get(t) !== i) && (s = new ee(e, t), H.set(t, s), mt.set(t, i)), s;
}
const O = /* @__PURE__ */ new Map();
function W(e, t) {
  return O.has(e) || O.set(e, t), O.get(e) === t;
}
function ft(e, t) {
  O.get(e) === t && O.delete(e);
}
function se(e, t, i) {
  return e ? !0 : t === null ? i : t === "true";
}
function oe(e, t = "", i = 0) {
  return /iPad|iPhone|iPod/i.test(e) || t === "MacIntel" && i > 1;
}
function ne(e, t, i, s, o) {
  return oe(e, t, i) && (o || !s);
}
const St = /* @__PURE__ */ new Set();
function G(e) {
  return St.has(e);
}
function re(e) {
  St.add(e);
}
var ae = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, L = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? ce(t, i) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (s ? r(t, i, o) : r(o)) || o);
  return s && o && ae(t, i, o), o;
};
let y = class extends w {
  constructor() {
    super(...arguments), this.machineState = "IDLE", this.muted = !0, this.automaticAudio = !1, this.manualActivation = !1, this.cameraSignature = "", this.currentBrightness = 100, this.currentVolume = 100;
  }
  static getConfigElement() {
    return document.createElement("baby-monitor-kiosk-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:baby-monitor-kiosk-card",
      camera: "camera.babykamer",
      sound_sensor: "binary_sensor.babykamer_geluid",
      preload: !0,
      silence_duration: 5,
      kiosk: { device_bound: !0 }
    };
  }
  setConfig(e) {
    if (!e.camera && !e.stream || !e.sound_sensor) throw Error("camera or stream, and sound_sensor are required");
    const t = e.id ?? `${e.camera ?? e.stream}|${e.sound_sensor}`;
    this.config && this.configId !== t && (this.manualActivation = !1, this.unsubscribe?.(), ft(this.configId, this), this.portal?.remove(), this.portal = void 0, this.camera = void 0, this.cameraSignature = ""), this.config = { ...E, ...e }, this.id = this.configId, this.currentBrightness = e.companion?.active_brightness ?? 100, this.currentVolume = e.companion?.active_volume ?? 100, this.automaticAudio = G(this.configId);
    const i = e.audio?.remember_state === !1 ? null : localStorage.getItem(pt(this.configId));
    this.muted = this.automaticAudio ? !this.active() : se(e.preload !== !1, i, e.audio?.default_muted ?? !1), this.connectRuntime(), this.isConnected && (this.ensureCamera(), this.configureCamera());
  }
  get configId() {
    return this.config?.id ?? `${this.config?.camera ?? this.config?.stream}|${this.config?.sound_sensor}`;
  }
  connectRuntime() {
    this.unsubscribe?.(), this.runtime = ie(this.config), this.unsubscribe = this.runtime.subscribe((e) => {
      this.machineState = e, (e === "IDLE" || e === "MANUAL_COOLDOWN") && (this.manualActivation = !1), this.automaticAudio = G(this.configId), this.requestUpdate(), W(this.configId, this) && (e === "ACTIVE" && (this.eligible() || this.manualActivation) && (this.companion(!0), this.activateVideo()), (e === "IDLE" || e === "MANUAL_COOLDOWN") && (this.companion(!1), this.muteVideo()));
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.config && (this.connectRuntime(), this.ensureCamera(), this.configureCamera());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribe?.(), this.unsubscribe = void 0, this.portal?.remove(), this.portal = void 0, ft(this.configId, this);
  }
  updated() {
    this.hass && this.runtime?.update(this.hass), this.ensureCamera(), this.camera && (this.camera.hass = this.hass), this.syncPortal();
  }
  cameraConfig() {
    return {
      type: "custom:webrtc-camera",
      ...this.config.stream ? { url: this.config.stream } : { entity: this.config.camera },
      muted: this.muted,
      controls: !0
    };
  }
  configureCamera() {
    const e = this.cameraConfig(), t = JSON.stringify(e);
    this.camera && t !== this.cameraSignature && (this.camera.setConfig?.(e), this.cameraSignature = t);
  }
  ensureCamera(e = !1) {
    !this.isConnected || this.camera || !this.config || !(e ? this.manualAllowed() : this.eligible()) || !W(this.configId, this) || (this.camera = document.createElement("webrtc-camera"), this.camera.style.cssText = "display:block;width:100%;height:100%;object-fit:contain", this.configureCamera());
  }
  async activateVideo() {
    await this.updateComplete;
    const e = globalThis.navigator;
    this.automaticAudio = G(this.configId);
    const t = this.automaticAudio;
    this.muted = !0, this.applyVideoMuted(this.camera, !0), this.requestUpdate(), e && ne(e.userAgent, e.platform, e.maxTouchPoints, t, this.manualActivation) && (this.camera?.remove(), this.camera = void 0, this.cameraSignature = "", this.ensureCamera(this.manualActivation), this.camera && (this.camera.hass = this.hass), this.syncPortal()), requestAnimationFrame(() => {
      this.playVideos(this.camera), setTimeout(() => {
        this.playVideos(this.camera), t && (this.muted = !1, this.applyVideoMuted(this.camera, !1), this.requestUpdate());
      }, 300);
    });
  }
  playVideos(e) {
    if (e) {
      for (const t of e.querySelectorAll?.("video") ?? [])
        t.muted = this.muted, t.playsInline = !0, t.play?.().catch(() => {
        });
      this.playVideos(e.shadowRoot);
    }
  }
  muteVideo() {
    this.muted = !0, this.applyVideoMuted(this.camera, !0), this.requestUpdate();
  }
  applyVideoMuted(e, t) {
    if (e) {
      for (const i of e.querySelectorAll?.("video") ?? []) i.muted = t;
      this.applyVideoMuted(e.shadowRoot, t);
    }
  }
  enableAutomaticAudio() {
    re(this.configId), this.automaticAudio = !0, this.muted = !1, this.applyVideoMuted(this.camera, !1), this.playVideos(this.camera), this.active() || setTimeout(() => this.muteVideo(), 150), this.requestUpdate();
  }
  eligible() {
    return this.config.kiosk?.enabled !== !1 && (this.config.kiosk?.device_bound === !1 || $(this.configId)) && (!this.config.kiosk?.allowed_user_ids?.length || !!this.hass?.user && this.config.kiosk.allowed_user_ids.includes(this.hass.user.id));
  }
  manualAllowed() {
    return this.config.kiosk?.enabled !== !1 && (!this.config.kiosk?.allowed_user_ids?.length || !!this.hass?.user && this.config.kiosk.allowed_user_ids.includes(this.hass.user.id));
  }
  active() {
    return (this.machineState === "ACTIVE" || this.machineState === "SILENCE_TIMER") && (this.manualActivation || this.config.auto_open !== !1 && this.eligible());
  }
  toggleMute() {
    if (this.muted && !this.automaticAudio) {
      this.enableAutomaticAudio();
      return;
    }
    this.muted = !this.muted, this.config.audio?.remember_state !== !1 && localStorage.setItem(pt(this.configId), String(this.muted)), this.applyVideoMuted(this.camera, this.muted), this.playVideos(this.camera), this.requestUpdate();
  }
  async companion(e) {
    const t = this.config.companion?.notify_service;
    if (!t || !this.eligible() || !this.hass) return;
    const i = e ? this.config.companion?.active_brightness : this.config.companion?.idle_brightness, s = e ? this.config.companion?.active_volume : this.config.companion?.idle_volume, o = [];
    e && this.config.companion?.screensaver !== !1 && o.push({ message: "kiosk_hide_screensaver" }), i != null && o.push({
      message: "kiosk_set_brightness",
      data: { level: i }
    }), s != null && o.push({ message: "kiosk_set_volume", data: { volume: s } }), !e && this.config.companion?.screensaver !== !1 && o.push({ message: "kiosk_show_screensaver" });
    for (const n of o)
      try {
        await this.hass.callService("notify", t, n);
      } catch (r) {
        this.config.debug && console.warn("[baby-monitor] Companion command failed", r);
      }
  }
  async kioskLevel(e, t) {
    const i = this.config.companion?.notify_service;
    if (!i || !this.hass) return;
    const s = Math.max(0, Math.min(100, (e === "brightness" ? this.currentBrightness : this.currentVolume) + t));
    e === "brightness" ? this.currentBrightness = s : this.currentVolume = s;
    const o = e === "brightness" ? "kiosk_set_brightness" : "kiosk_set_volume", n = e === "brightness" ? { level: s } : { volume: s };
    try {
      await this.hass.callService("notify", i, { message: o, data: n });
    } catch (r) {
      this.config.debug && console.warn("[baby-monitor] Companion level command failed", r);
    }
  }
  syncPortal() {
    if (!this.camera || !W(this.configId, this)) return;
    this.portal || (this.portal = document.createElement("div"), this.portal.dataset.babyMonitorKiosk = this.configId, document.body.append(this.portal));
    const e = this.active(), t = this.config.preload !== !1 && this.eligible();
    this.portal.style.cssText = e ? "position:fixed;inset:0;z-index:2147483000;opacity:1;pointer-events:auto;background:#000;display:grid;place-items:center;overflow:hidden;" : "position:fixed;inset:0;z-index:-1;opacity:.001;pointer-events:none;background:#000;display:grid;place-items:center;overflow:hidden;", At(
      e || t ? u`<style>
              .cam {
                width: 100%;
                height: 100%;
                min-width: 100vw;
                min-height: 100vh;
              }
              .controls {
                position: absolute;
                left: 50%;
                bottom: max(24px, env(safe-area-inset-bottom));
                transform: translateX(-50%);
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
                justify-content: center;
              }
              .controls button {
                width: 68px;
                height: 68px;
                border: 0;
                border-radius: 50%;
                font-size: 25px;
                background: #111c;
                color: #fff;
              }
            </style>
            <div class="cam">${this.camera}</div>
            ${e ? u`<div class="controls">${this.config.controls?.brightness ? u`<button aria-label="Helderheid lager" @click=${() => this.kioskLevel("brightness", -20)}>☀−</button><button aria-label="Helderheid hoger" @click=${() => this.kioskLevel("brightness", 20)}>☀+</button>` : h}${this.config.controls?.volume ? u`<button aria-label="Volume lager" @click=${() => this.kioskLevel("volume", -20)}>−🔊</button><button aria-label="Volume hoger" @click=${() => this.kioskLevel("volume", 20)}>+🔊</button>` : h}${this.config.controls?.mute !== !1 ? u`<button aria-label=${this.muted ? "Geluid aan" : "Geluid uit"} @click=${() => this.toggleMute()}>${this.muted ? "🔇" : "🔊"}</button>` : h}${this.config.controls?.close !== !1 ? u`<button aria-label="Sluiten" @click=${() => this.runtime?.close()}>✕</button>` : h}</div>` : h}` : h,
      this.portal
    );
  }
  togglePair() {
    $(this.configId) ? xt(this.configId) : kt(this.configId), $(this.configId) && this.ensureCamera(), this.requestUpdate();
  }
  openCamera() {
    if (!this.manualAllowed()) return;
    const e = this.machineState === "ACTIVE" || this.machineState === "SILENCE_TIMER";
    this.manualActivation = !0, this.ensureCamera(!0), this.runtime?.open(), e && this.activateVideo(), this.requestUpdate();
  }
  render() {
    if (!this.config) return h;
    const e = this.hass?.states[this.config.sound_sensor]?.state ?? "?", t = $(this.configId), i = t && this.automaticAudio, s = this.manualAllowed();
    return u`${this.config.show_setup ? u`<ha-card class="setup"
          ><button class="monitor-icon ${i ? "ready" : ""}" title=${s ? "Camera openen" : "Camera niet beschikbaar voor deze gebruiker"} aria-label=${s ? "Babycamera openen" : "Babycamera niet beschikbaar voor deze gebruiker"} ?disabled=${!s} @click=${() => this.openCamera()}>
            <ha-icon icon="mdi:baby-face-outline"></ha-icon>
          </button>
          <div class="copy">
            <div class="title">Baby Monitor</div>
            <div class="status"><span class="dot ${i ? "ok" : ""}"></span>${t ? this.automaticAudio ? "Klaar · automatisch geluid" : "Gekoppeld · tik voor geluid" : "Niet gekoppeld"}</div>
          </div>
          <div class="actions">
            ${t && !this.automaticAudio ? u`<button class="icon-button primary" title="Automatisch camerageluid inschakelen" aria-label="Automatisch camerageluid inschakelen" @click=${() => this.enableAutomaticAudio()}>
                  <ha-icon icon="mdi:volume-high"></ha-icon>
                </button>` : h}<button class="icon-button" title=${t ? "Dit apparaat ontkoppelen" : "Dit apparaat koppelen"} aria-label=${t ? "Dit apparaat ontkoppelen" : "Dit apparaat koppelen"} @click=${() => this.togglePair()}>
              <ha-icon icon=${t ? "mdi:link-variant" : "mdi:link-variant-plus"}></ha-icon>
            </button></div
        ></ha-card>` : h}${!this.active() && this.config.preload === !1 ? u`<span class="idle">Baby monitor gereed</span>` : h}${this.config.debug ? u`<div class="debug">state=${this.machineState} | value=${e} | on≥${this.config.sound_threshold_db ?? "-"} | off≤${this.config.sound_reset_db ?? "-"} | timer=${Math.ceil((this.runtime?.remainingMs() ?? 0) / 1e3)}s | kiosk=${this.eligible()} | preload=${this.config.preload !== !1 && this.eligible()}</div>` : h}`;
  }
};
y.styles = bt`
    :host {
      display: block;
      min-height: 1px;
      container-type: inline-size;
    }
    ha-card.setup {
      height: 56px;
      min-height: 56px;
      max-height: 56px;
      padding: 6px 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 9px;
      overflow: hidden;
      border-radius: 16px;
    }
    .monitor-icon {
      border: 0;
      padding: 0;
      position: relative;
      width: 36px;
      height: 36px;
      flex: 0 0 36px;
      border-radius: 11px;
      display: grid;
      place-items: center;
      color: var(--state-icon-color, var(--primary-color));
      background: color-mix(in srgb, var(--state-icon-color, var(--primary-color)) 14%, transparent);
      cursor: pointer;
    }
    .monitor-icon:disabled {
      cursor: default;
      opacity: 0.55;
    }
    .monitor-icon::after {
      content: "";
      position: absolute;
      right: -2px;
      bottom: -2px;
      width: 9px;
      height: 9px;
      border: 2px solid var(--card-background-color, #fff);
      border-radius: 50%;
      background: var(--warning-color, #ff9800);
    }
    .monitor-icon.ready::after {
      background: var(--success-color, #4caf50);
    }
    .monitor-icon ha-icon {
      --mdc-icon-size: 28px;
    }
    .copy {
      min-width: 0;
      flex: 1;
      line-height: 1.2;
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status {
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
      font-size: 12px;
      white-space: nowrap;
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--warning-color, #ff9800);
    }
    .dot.ok {
      background: var(--success-color, #4caf50);
    }
    .actions {
      display: flex;
      gap: 5px;
      flex: 0 0 auto;
    }
    .icon-button {
      width: 34px;
      height: 34px;
      border: 0;
      border-radius: 10px;
      display: grid;
      place-items: center;
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .icon-button.primary {
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color));
    }
    .icon-button ha-icon {
      --mdc-icon-size: 21px;
    }
    @container (max-width:250px) {
      ha-card.setup {
        padding: 6px 8px;
        gap: 6px;
      }
      .copy {
        display: none;
      }
      .actions {
        margin-left: auto;
      }
    }
    .stage {
      position: fixed;
      inset: 0;
      z-index: 2147483000;
      background: #000;
      display: grid;
      place-items: center;
    }
    .stage > *:first-child {
      width: 100%;
      height: 100%;
    }
    .controls {
      position: absolute;
      left: 50%;
      bottom: max(24px, env(safe-area-inset-bottom));
      transform: translateX(-50%);
      display: flex;
      gap: 18px;
    }
    .controls button {
      width: 68px;
      height: 68px;
      border: 0;
      border-radius: 50%;
      font-size: 28px;
      background: #111c;
      color: white;
    }
    .preload {
      position: fixed;
      width: 2px;
      height: 2px;
      opacity: 0.01;
      pointer-events: none;
      overflow: hidden;
      left: -4px;
      top: -4px;
    }
    .debug {
      position: fixed;
      z-index: 2147483001;
      top: 8px;
      left: 8px;
      background: #000b;
      color: #fff;
      padding: 8px;
      font: 14px monospace;
    }
    .idle {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
  `;
L([
  Y({ attribute: !1 })
], y.prototype, "hass", 2);
L([
  j()
], y.prototype, "machineState", 2);
L([
  j()
], y.prototype, "muted", 2);
L([
  j()
], y.prototype, "automaticAudio", 2);
y = L([
  Et("baby-monitor-kiosk-card")
], y);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "baby-monitor-kiosk-card",
  name: "Baby Monitor Kiosk Card",
  description: "Device-local sound-triggered preloaded WebRTC baby monitor"
});
console.info("%c BABY-MONITOR-KIOSK-CARD %c 0.3.7 ", "color:white;background:#3949ab;font-weight:bold", "color:#3949ab;background:white");
//# sourceMappingURL=baby-monitor-kiosk-card.js.map
