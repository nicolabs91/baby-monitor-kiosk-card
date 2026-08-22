const T = globalThis, G = T.ShadowRoot && (T.ShadyCSS === void 0 || T.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, F = /* @__PURE__ */ Symbol(), st = /* @__PURE__ */ new WeakMap();
let gt = class {
  constructor(t, s, i) {
    if (this._$cssResult$ = !0, i !== F) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = s;
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (G && t === void 0) {
      const i = s !== void 0 && s.length === 1;
      i && (t = st.get(s)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && st.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const xt = (e) => new gt(typeof e == "string" ? e : e + "", void 0, F), _t = (e, ...t) => {
  const s = e.length === 1 ? e[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[n + 1], e[0]);
  return new gt(s, e, F);
}, Ot = (e, t) => {
  if (G) e.adoptedStyleSheets = t.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of t) {
    const i = document.createElement("style"), o = T.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, e.appendChild(i);
  }
}, it = G ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let s = "";
  for (const i of t.cssRules) s += i.cssText;
  return xt(s);
})(e) : e;
const { is: Mt, defineProperty: Pt, getOwnPropertyDescriptor: It, getOwnPropertyNames: Nt, getOwnPropertySymbols: Ut, getPrototypeOf: Lt } = Object, j = globalThis, ot = j.trustedTypes, Dt = ot ? ot.emptyScript : "", Tt = j.reactiveElementPolyfillSupport, x = (e, t) => e, R = { toAttribute(e, t) {
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
  let s = e;
  switch (t) {
    case Boolean:
      s = e !== null;
      break;
    case Number:
      s = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(e);
      } catch {
        s = null;
      }
  }
  return s;
} }, J = (e, t) => !Mt(e, t), nt = { attribute: !0, type: String, converter: R, reflect: !1, useDefault: !1, hasChanged: J };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), j.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let A = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, s = nt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(t, s), !s.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, i, s);
      o !== void 0 && Pt(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, s, i) {
    const { get: o, set: n } = It(this.prototype, t) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: o, set(r) {
      const h = o?.call(this);
      n?.call(this, r), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = Lt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const s = this.properties, i = [...Nt(s), ...Ut(s)];
      for (const o of i) this.createProperty(o, s[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const s = litPropertyMetadata.get(t);
      if (s !== void 0) for (const [i, o] of s) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const o = this._$Eu(s, i);
      o !== void 0 && this._$Eh.set(o, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const s = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i) s.unshift(it(o));
    } else t !== void 0 && s.push(it(t));
    return s;
  }
  static _$Eu(t, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    const t = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
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
  attributeChangedCallback(t, s, i) {
    this._$AK(t, i);
  }
  _$ET(t, s) {
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : R).toAttribute(s, i.type);
      this._$Em = t, n == null ? this.removeAttribute(o) : this.setAttribute(o, n), this._$Em = null;
    }
  }
  _$AK(t, s) {
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const n = i.getPropertyOptions(o), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : R;
      this._$Em = o;
      const h = r.fromAttribute(s, n.type);
      this[o] = h ?? this._$Ej?.get(o) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, s, i, o = !1, n) {
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (n = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? J)(n, s) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, s, { useDefault: i, reflect: o, wrapped: n }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? s ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (s = void 0), this._$AL.set(t, s)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
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
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: r } = n, h = this[o];
        r !== !0 || this._$AL.has(o) || h === void 0 || this.C(o, void 0, n, h);
      }
    }
    let t = !1;
    const s = this._$AL;
    try {
      t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(s);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((s) => this._$ET(s, this[s])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[x("elementProperties")] = /* @__PURE__ */ new Map(), A[x("finalized")] = /* @__PURE__ */ new Map(), Tt?.({ ReactiveElement: A }), (j.reactiveElementVersions ??= []).push("2.1.2");
const Q = globalThis, rt = (e) => e, H = Q.trustedTypes, at = H ? H.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, $t = "$lit$", g = `lit$${Math.random().toFixed(9).slice(2)}$`, bt = "?" + g, Rt = `<${bt}>`, y = document, M = () => y.createComment(""), P = (e) => e === null || typeof e != "object" && typeof e != "function", Z = Array.isArray, Ht = (e) => Z(e) || typeof e?.[Symbol.iterator] == "function", q = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ht = /-->/g, ct = />/g, _ = RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), lt = /'/g, dt = /"/g, yt = /^(?:script|style|textarea|title)$/i, Vt = (e) => (t, ...s) => ({ _$litType$: e, strings: t, values: s }), u = Vt(1), w = /* @__PURE__ */ Symbol.for("lit-noChange"), c = /* @__PURE__ */ Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), $ = y.createTreeWalker(y, 129);
function vt(e, t) {
  if (!Z(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return at !== void 0 ? at.createHTML(t) : t;
}
const jt = (e, t) => {
  const s = e.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = C;
  for (let h = 0; h < s; h++) {
    const a = e[h];
    let d, p, l = -1, f = 0;
    for (; f < a.length && (r.lastIndex = f, p = r.exec(a), p !== null); ) f = r.lastIndex, r === C ? p[1] === "!--" ? r = ht : p[1] !== void 0 ? r = ct : p[2] !== void 0 ? (yt.test(p[2]) && (o = RegExp("</" + p[2], "g")), r = _) : p[3] !== void 0 && (r = _) : r === _ ? p[0] === ">" ? (r = o ?? C, l = -1) : p[1] === void 0 ? l = -2 : (l = r.lastIndex - p[2].length, d = p[1], r = p[3] === void 0 ? _ : p[3] === '"' ? dt : lt) : r === dt || r === lt ? r = _ : r === ht || r === ct ? r = C : (r = _, o = void 0);
    const m = r === _ && e[h + 1].startsWith("/>") ? " " : "";
    n += r === C ? a + Rt : l >= 0 ? (i.push(d), a.slice(0, l) + $t + a.slice(l) + g + m) : a + g + (l === -2 ? h : m);
  }
  return [vt(e, n + (e[s] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class I {
  constructor({ strings: t, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const h = t.length - 1, a = this.parts, [d, p] = jt(t, s);
    if (this.el = I.createElement(d, i), $.currentNode = this.el.content, s === 2 || s === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (o = $.nextNode()) !== null && a.length < h; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const l of o.getAttributeNames()) if (l.endsWith($t)) {
          const f = p[r++], m = o.getAttribute(l).split(g), D = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: n, name: D[2], strings: m, ctor: D[1] === "." ? zt : D[1] === "?" ? qt : D[1] === "@" ? Wt : B }), o.removeAttribute(l);
        } else l.startsWith(g) && (a.push({ type: 6, index: n }), o.removeAttribute(l));
        if (yt.test(o.tagName)) {
          const l = o.textContent.split(g), f = l.length - 1;
          if (f > 0) {
            o.textContent = H ? H.emptyScript : "";
            for (let m = 0; m < f; m++) o.append(l[m], M()), $.nextNode(), a.push({ type: 2, index: ++n });
            o.append(l[f], M());
          }
        }
      } else if (o.nodeType === 8) if (o.data === bt) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = o.data.indexOf(g, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += g.length - 1;
      }
      n++;
    }
  }
  static createElement(t, s) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function k(e, t, s = e, i) {
  if (t === w) return t;
  let o = i !== void 0 ? s._$Co?.[i] : s._$Cl;
  const n = P(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== n && (o?._$AO?.(!1), n === void 0 ? o = void 0 : (o = new n(e), o._$AT(e, s, i)), i !== void 0 ? (s._$Co ??= [])[i] = o : s._$Cl = o), o !== void 0 && (t = k(e, o._$AS(e, t.values), o, i)), t;
}
class Bt {
  constructor(t, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: s }, parts: i } = this._$AD, o = (t?.creationScope ?? y).importNode(s, !0);
    $.currentNode = o;
    let n = $.nextNode(), r = 0, h = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let d;
        a.type === 2 ? d = new U(n, n.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (d = new Kt(n, this, t)), this._$AV.push(d), a = i[++h];
      }
      r !== a?.index && (n = $.nextNode(), r++);
    }
    return $.currentNode = y, o;
  }
  p(t) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, s), s += i.strings.length - 2) : i._$AI(t[s])), s++;
  }
}
class U {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, s, i, o) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = s, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && t?.nodeType === 11 && (t = s.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, s = this) {
    t = k(this, t, s), P(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ht(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: s, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = I.createElement(vt(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(s);
    else {
      const n = new Bt(o, this), r = n.u(this.options);
      n.p(s), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let s = ut.get(t.strings);
    return s === void 0 && ut.set(t.strings, s = new I(t)), s;
  }
  k(t) {
    Z(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const n of t) o === s.length ? s.push(i = new U(this.O(M()), this.O(M()), this, this.options)) : i = s[o], i._$AI(n), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(t = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); t !== this._$AB; ) {
      const i = rt(t).nextSibling;
      rt(t).remove(), t = i;
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
  constructor(t, s, i, o, n) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = s, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = c;
  }
  _$AI(t, s = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = k(this, t, s, 0), r = !P(t) || t !== this._$AH && t !== w, r && (this._$AH = t);
    else {
      const h = t;
      let a, d;
      for (t = n[0], a = 0; a < n.length - 1; a++) d = k(this, h[i + a], s, a), d === w && (d = this._$AH[a]), r ||= !P(d) || d !== this._$AH[a], d === c ? t = c : t !== c && (t += (d ?? "") + n[a + 1]), this._$AH[a] = d;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class zt extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class qt extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Wt extends B {
  constructor(t, s, i, o, n) {
    super(t, s, i, o, n), this.type = 5;
  }
  _$AI(t, s = this) {
    if ((t = k(this, t, s, 0) ?? c) === w) return;
    const i = this._$AH, o = t === c && i !== c || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== c && (i === c || o);
    o && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Kt {
  constructor(t, s, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    k(this, t);
  }
}
const Gt = Q.litHtmlPolyfillSupport;
Gt?.(I, U), (Q.litHtmlVersions ??= []).push("3.3.3");
const At = (e, t, s) => {
  const i = s?.renderBefore ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const n = s?.renderBefore ?? null;
    i._$litPart$ = o = new U(t.insertBefore(M(), n), n, void 0, s ?? {});
  }
  return o._$AI(e), o;
};
const X = globalThis;
class S extends A {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = At(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return w;
  }
}
S._$litElement$ = !0, S.finalized = !0, X.litElementHydrateSupport?.({ LitElement: S });
const Ft = X.litElementPolyfillSupport;
Ft?.({ LitElement: S });
(X.litElementVersions ??= []).push("4.2.2");
const Et = (e) => (t, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const Jt = { attribute: !0, type: String, converter: R, reflect: !1, hasChanged: J }, Qt = (e = Jt, t, s) => {
  const { kind: i, metadata: o } = s;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), n.set(s.name, e), i === "accessor") {
    const { name: r } = s;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(r, a, e, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(r, void 0, e, h), h;
    } };
  }
  if (i === "setter") {
    const { name: r } = s;
    return function(h) {
      const a = this[r];
      t.call(this, h), this.requestUpdate(r, a, e, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Y(e) {
  return (t, s) => typeof s == "object" ? Qt(e, t, s) : ((i, o, n) => {
    const r = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(o, n) : void 0;
  })(e, t, s);
}
function z(e) {
  return Y({ ...e, state: !0, attribute: !1 });
}
const St = "baby-monitor-kiosk-card:", tt = (e) => St + e;
function b(e) {
  return localStorage.getItem(tt(e)) === "paired";
}
function wt(e) {
  localStorage.setItem(tt(e), "paired");
}
function kt(e) {
  localStorage.removeItem(tt(e));
}
function pt(e) {
  return St + e + ":muted";
}
var Zt = Object.defineProperty, Xt = Object.getOwnPropertyDescriptor, et = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Xt(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && Zt(t, s, o), o;
};
let N = class extends S {
  setConfig(e) {
    this.config = structuredClone(e);
  }
  set(e, t) {
    if (!this.config) return;
    const s = structuredClone(this.config), i = e.split(".");
    let o = s;
    for (; i.length > 1; ) {
      const n = i.shift();
      o[n] ??= {}, o = o[n];
    }
    o[i[0]] = t, this.config = s, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: s }, bubbles: !0, composed: !0 }));
  }
  entity(e, t, s, i) {
    return u`<label>${t}<ha-entity-picker .hass=${this.hass} .value=${s} .includeDomains=${i} allow-custom-entity @value-changed=${(o) => this.set(e, o.detail.value)}></ha-entity-picker></label>`;
  }
  render() {
    const e = this.config;
    if (!e) return u``;
    const t = e.id ?? `${e.camera ?? e.stream}|${e.sound_sensor}`, s = (i, o, n) => u`<label><input type=checkbox .checked=${n} @change=${(r) => this.set(i, r.target.checked)}> ${o}</label>`;
    return u`<div class=grid><label>Naam/ID<input .value=${e.id ?? ""} @change=${(i) => this.set("id", i.target.value)}></label>${this.entity("camera", "Camera entity", e.camera ?? "", ["camera"])}<label>go2rtc/WebRTC stream<input .value=${e.stream ?? ""} @change=${(i) => this.set("stream", i.target.value)}></label>${this.entity("sound_sensor", "Geluidsensor", e.sound_sensor ?? "", ["sensor", "binary_sensor"])}${[["sound_threshold_db", "Activeringsgrens dB"], ["sound_reset_db", "Resetgrens dB"], ["trigger_for", "Minimale geluidsduur (s)"], ["silence_duration", "Stiltetijd (s)"], ["manual_close_cooldown", "Cooldown handmatig sluiten (s)"]].map(([i, o]) => u`<label>${o}<input type=number .value=${String(e[i] ?? "")} @change=${(n) => this.set(i, Number(n.target.value))}></label>`)}${s("preload", "Stream voorverwarmen", e.preload !== !1)}${s("auto_open", "Automatisch openen", e.auto_open !== !1)}${s("kiosk.enabled", "Kioskmodus", e.kiosk?.enabled !== !1)}${s("kiosk.device_bound", "Alleen gekoppeld apparaat", e.kiosk?.device_bound !== !1)}<label>Toegestane HA-user-ID’s (komma-gescheiden)<input .value=${e.kiosk?.allowed_user_ids?.join(", ") ?? ""} @change=${(i) => this.set("kiosk.allowed_user_ids", i.target.value.split(",").map((o) => o.trim()).filter(Boolean))}></label>${s("audio.default_muted", "Standaard gedempt", e.audio?.default_muted ?? !1)}${s("audio.remember_state", "Audiostatus onthouden", e.audio?.remember_state !== !1)}${s("controls.mute", "Mute-knop tonen", e.controls?.mute !== !1)}${s("controls.close", "Sluitknop tonen", e.controls?.close !== !1)}${s("controls.volume", "Volumeknoppen tonen", e.controls?.volume ?? !1)}${s("controls.brightness", "Helderheidsknoppen tonen", e.controls?.brightness ?? !1)}${s("debug", "Debugstatus", !!e.debug)}<label>Companion notify service<input .value=${e.companion?.notify_service ?? ""} @change=${(i) => this.set("companion.notify_service", i.target.value)}></label>${[["active_brightness", "Actieve helderheid"], ["idle_brightness", "Rusthelderheid"], ["active_volume", "Actief volume"], ["idle_volume", "Rustvolume"]].map(([i, o]) => u`<label>${o}<input type=number min=0 max=100 .value=${String(e.companion?.[i] ?? "")} @change=${(n) => this.set(`companion.${i}`, Number(n.target.value))}></label>`)}<div class=pair><b>Dit apparaat gekoppeld: ${b(t) ? "ja" : "nee"}</b><button @click=${() => {
      b(t) ? kt(t) : wt(t), this.requestUpdate();
    }}>${b(t) ? "Ontkoppel" : "Koppel dit apparaat"}</button></div></div>`;
  }
};
N.styles = _t`:host{display:block;padding:16px}.grid{display:grid;gap:12px}label{display:grid;gap:4px}input{padding:8px}.pair{display:flex;gap:8px;align-items:center}button{padding:10px}`;
et([
  Y({ attribute: !1 })
], N.prototype, "hass", 2);
et([
  z()
], N.prototype, "config", 2);
N = et([
  Et("baby-monitor-kiosk-card-editor")
], N);
const E = { preload: !0, trigger_for: 1, silence_duration: 5, manual_close_cooldown: 30, sound_threshold_db: 48, sound_reset_db: 42 };
function Yt(e, t) {
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
  constructor(t, s, i, o) {
    this.triggerMs = t, this.silenceMs = s, this.cooldownMs = i, this.changed = o, this.state = "IDLE", this.deadline = 0;
  }
  dispatch(t) {
    const s = this.state, i = Yt(s, t);
    if (i === s) return;
    this.clear(), this.state = i, this.changed(i);
    let o;
    if (i === "SOUND_PENDING" && (o = this.triggerMs), i === "SILENCE_TIMER" && (o = this.silenceMs), i === "MANUAL_COOLDOWN" && (o = this.cooldownMs), o !== void 0) {
      this.deadline = Date.now() + o;
      const n = i === "SOUND_PENDING" ? "TRIGGER_ELAPSED" : i === "SILENCE_TIMER" ? "SILENCE_ELAPSED" : "COOLDOWN_ELAPSED";
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
  constructor(t, s) {
    this.config = t, this.key = s, this.listeners = /* @__PURE__ */ new Set(), this.lastLoud = !1, this.state = "IDLE", this.machine = new te((t.trigger_for ?? E.trigger_for) * 1e3, (t.silence_duration ?? E.silence_duration) * 1e3, (t.manual_close_cooldown ?? E.manual_close_cooldown) * 1e3, (i) => {
      this.state = i, this.listeners.forEach((o) => o(i)), i === "IDLE" && this.lastLoud && queueMicrotask(() => this.machine.dispatch({ type: "LOUD" }));
    });
  }
  update(t) {
    const s = t.states[this.config.sound_sensor];
    if (!s) return;
    const i = !this.config.sound_sensor.startsWith("binary_sensor."), o = Number(s.state);
    if (i && !Number.isFinite(o)) return;
    let n;
    if (i)
      n = this.lastLoud ? o > (this.config.sound_reset_db ?? E.sound_reset_db) : o >= (this.config.sound_threshold_db ?? E.sound_threshold_db);
    else {
      if (!["on", "off"].includes(s.state)) return;
      n = s.state === "on";
    }
    n !== this.lastLoud && (this.lastLoud = n, this.machine.dispatch({ type: n ? "LOUD" : "QUIET" }));
  }
  subscribe(t) {
    return this.listeners.add(t), t(this.state), () => {
      this.listeners.delete(t), this.listeners.size || (this.machine.destroy(), V.get(this.key) === this && V.delete(this.key));
    };
  }
  close() {
    this.machine.dispatch({ type: "MANUAL_CLOSE" });
  }
  remainingMs() {
    return this.machine.remainingMs();
  }
}
const V = /* @__PURE__ */ new Map(), ft = /* @__PURE__ */ new Map();
function se(e) {
  const t = e.id ?? `${e.camera ?? e.stream}|${e.sound_sensor}`, s = JSON.stringify([e.sound_sensor, e.sound_threshold_db, e.sound_reset_db, e.trigger_for, e.silence_duration, e.manual_close_cooldown]);
  let i = V.get(t);
  return (!i || ft.get(t) !== s) && (i = new ee(e, t), V.set(t, i), ft.set(t, s)), i;
}
const O = /* @__PURE__ */ new Map();
function W(e, t) {
  return O.has(e) || O.set(e, t), O.get(e) === t;
}
function mt(e, t) {
  O.get(e) === t && O.delete(e);
}
function ie(e, t, s) {
  return e ? !0 : t === null ? s : t === "true";
}
function oe(e, t = "", s = 0) {
  return /iPad|iPhone|iPod/i.test(e) || t === "MacIntel" && s > 1;
}
const Ct = /* @__PURE__ */ new Set();
function K(e) {
  return Ct.has(e);
}
function ne(e) {
  Ct.add(e);
}
var re = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, L = (e, t, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ae(t, s) : t, n = e.length - 1, r; n >= 0; n--)
    (r = e[n]) && (o = (i ? r(t, s, o) : r(o)) || o);
  return i && o && re(t, s, o), o;
};
let v = class extends S {
  constructor() {
    super(...arguments), this.machineState = "IDLE", this.muted = !0, this.automaticAudio = !1, this.cameraSignature = "", this.currentBrightness = 100, this.currentVolume = 100;
  }
  static getConfigElement() {
    return document.createElement("baby-monitor-kiosk-card-editor");
  }
  static getStubConfig() {
    return { type: "custom:baby-monitor-kiosk-card", camera: "camera.babykamer", sound_sensor: "binary_sensor.babykamer_geluid", preload: !0, silence_duration: 5, kiosk: { device_bound: !0 } };
  }
  setConfig(e) {
    if (!e.camera && !e.stream || !e.sound_sensor) throw Error("camera or stream, and sound_sensor are required");
    const t = e.id ?? `${e.camera ?? e.stream}|${e.sound_sensor}`;
    this.config && this.configId !== t && (this.unsubscribe?.(), mt(this.configId, this), this.portal?.remove(), this.portal = void 0, this.camera = void 0, this.cameraSignature = ""), this.config = { ...E, ...e }, this.id = this.configId, this.currentBrightness = e.companion?.active_brightness ?? 100, this.currentVolume = e.companion?.active_volume ?? 100, this.automaticAudio = K(this.configId);
    const s = e.audio?.remember_state === !1 ? null : localStorage.getItem(pt(this.configId));
    this.muted = this.automaticAudio ? !this.active() : ie(e.preload !== !1, s, e.audio?.default_muted ?? !1), this.connectRuntime(), this.isConnected && (this.ensureCamera(), this.configureCamera());
  }
  get configId() {
    return this.config?.id ?? `${this.config?.camera ?? this.config?.stream}|${this.config?.sound_sensor}`;
  }
  connectRuntime() {
    this.unsubscribe?.(), this.runtime = se(this.config), this.unsubscribe = this.runtime.subscribe((e) => {
      this.machineState = e, this.automaticAudio = K(this.configId), this.requestUpdate(), W(this.configId, this) && (e === "ACTIVE" && (this.companion(!0), this.activateVideo()), (e === "IDLE" || e === "MANUAL_COOLDOWN") && (this.companion(!1), this.muteVideo()));
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.config && (this.connectRuntime(), this.ensureCamera(), this.configureCamera());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.unsubscribe?.(), this.unsubscribe = void 0, this.portal?.remove(), this.portal = void 0, mt(this.configId, this);
  }
  updated() {
    this.hass && this.runtime?.update(this.hass), this.ensureCamera(), this.camera && (this.camera.hass = this.hass), this.syncPortal();
  }
  cameraConfig() {
    return { type: "custom:webrtc-camera", ...this.config.stream ? { url: this.config.stream } : { entity: this.config.camera }, muted: this.muted, controls: !0 };
  }
  configureCamera() {
    const e = this.cameraConfig(), t = JSON.stringify(e);
    this.camera && t !== this.cameraSignature && (this.camera.setConfig?.(e), this.cameraSignature = t);
  }
  ensureCamera() {
    !this.isConnected || this.camera || !this.config || !this.eligible() || !W(this.configId, this) || (this.camera = document.createElement("webrtc-camera"), this.camera.style.cssText = "display:block;width:100%;height:100%;object-fit:contain", this.configureCamera());
  }
  async activateVideo() {
    await this.updateComplete;
    const e = globalThis.navigator;
    this.automaticAudio = K(this.configId), this.muted = !this.automaticAudio, this.requestUpdate(), e && oe(e.userAgent, e.platform, e.maxTouchPoints) && !this.automaticAudio && (this.camera?.remove(), this.camera = void 0, this.cameraSignature = "", this.ensureCamera(), this.camera && (this.camera.hass = this.hass), this.syncPortal()), requestAnimationFrame(() => {
      this.playVideos(this.camera), setTimeout(() => this.playVideos(this.camera), 300);
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
      for (const s of e.querySelectorAll?.("video") ?? []) s.muted = t;
      this.applyVideoMuted(e.shadowRoot, t);
    }
  }
  enableAutomaticAudio() {
    ne(this.configId), this.automaticAudio = !0, this.muted = !1, this.applyVideoMuted(this.camera, !1), this.playVideos(this.camera), this.active() || setTimeout(() => this.muteVideo(), 150), this.requestUpdate();
  }
  eligible() {
    return this.config.kiosk?.enabled !== !1 && (this.config.kiosk?.device_bound === !1 || b(this.configId)) && (!this.config.kiosk?.allowed_user_ids?.length || !!this.hass?.user && this.config.kiosk.allowed_user_ids.includes(this.hass.user.id));
  }
  active() {
    return this.config.auto_open !== !1 && this.eligible() && (this.machineState === "ACTIVE" || this.machineState === "SILENCE_TIMER");
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
    const s = e ? this.config.companion?.active_brightness : this.config.companion?.idle_brightness, i = e ? this.config.companion?.active_volume : this.config.companion?.idle_volume, o = [];
    e && this.config.companion?.screensaver !== !1 && o.push({ message: "kiosk_hide_screensaver" }), s != null && o.push({ message: "kiosk_set_brightness", data: { level: s } }), i != null && o.push({ message: "kiosk_set_volume", data: { volume: i } }), !e && this.config.companion?.screensaver !== !1 && o.push({ message: "kiosk_show_screensaver" });
    for (const n of o) try {
      await this.hass.callService("notify", t, n);
    } catch (r) {
      this.config.debug && console.warn("[baby-monitor] Companion command failed", r);
    }
  }
  async kioskLevel(e, t) {
    const s = this.config.companion?.notify_service;
    if (!s || !this.hass) return;
    const i = Math.max(0, Math.min(100, (e === "brightness" ? this.currentBrightness : this.currentVolume) + t));
    e === "brightness" ? this.currentBrightness = i : this.currentVolume = i;
    const o = e === "brightness" ? "kiosk_set_brightness" : "kiosk_set_volume", n = e === "brightness" ? { level: i } : { volume: i };
    try {
      await this.hass.callService("notify", s, { message: o, data: n });
    } catch (r) {
      this.config.debug && console.warn("[baby-monitor] Companion level command failed", r);
    }
  }
  syncPortal() {
    if (!this.camera || !W(this.configId, this)) return;
    this.portal || (this.portal = document.createElement("div"), this.portal.dataset.babyMonitorKiosk = this.configId, document.body.append(this.portal));
    const e = this.active(), t = this.config.preload !== !1 && this.eligible();
    this.portal.style.cssText = e ? "position:fixed;inset:0;z-index:2147483000;opacity:1;pointer-events:auto;background:#000;display:grid;place-items:center;overflow:hidden;" : "position:fixed;inset:0;z-index:-1;opacity:.001;pointer-events:none;background:#000;display:grid;place-items:center;overflow:hidden;", At(e || t ? u`<style>.cam{width:100%;height:100%;min-width:100vw;min-height:100vh}.controls{position:absolute;left:50%;bottom:max(24px,env(safe-area-inset-bottom));transform:translateX(-50%);display:flex;gap:12px;flex-wrap:wrap;justify-content:center}.controls button{width:68px;height:68px;border:0;border-radius:50%;font-size:25px;background:#111c;color:#fff}</style><div class=cam>${this.camera}</div>${e ? u`<div class=controls>${this.config.controls?.brightness ? u`<button aria-label="Helderheid lager" @click=${() => this.kioskLevel("brightness", -20)}>☀−</button><button aria-label="Helderheid hoger" @click=${() => this.kioskLevel("brightness", 20)}>☀+</button>` : c}${this.config.controls?.volume ? u`<button aria-label="Volume lager" @click=${() => this.kioskLevel("volume", -20)}>−🔊</button><button aria-label="Volume hoger" @click=${() => this.kioskLevel("volume", 20)}>+🔊</button>` : c}${this.config.controls?.mute !== !1 ? u`<button aria-label=${this.muted ? "Geluid aan" : "Geluid uit"} @click=${() => this.toggleMute()}>${this.muted ? "🔇" : "🔊"}</button>` : c}${this.config.controls?.close !== !1 ? u`<button aria-label="Sluiten" @click=${() => this.runtime?.close()}>✕</button>` : c}</div>` : c}` : c, this.portal);
  }
  togglePair() {
    b(this.configId) ? kt(this.configId) : wt(this.configId), b(this.configId) && this.ensureCamera(), this.requestUpdate();
  }
  render() {
    if (!this.config) return c;
    const e = this.hass?.states[this.config.sound_sensor]?.state ?? "?", t = b(this.configId);
    return u`${this.config.show_setup ? u`<ha-card class="setup"><div><b>Baby Monitor Kiosk</b><div>Dit apparaat is ${t ? "gekoppeld" : "niet gekoppeld"}.</div><div>Automatisch camerageluid: ${this.automaticAudio ? "ingeschakeld" : "toestemming nodig"}</div></div><button @click=${() => this.togglePair()}>${t ? "Ontkoppelen" : "Koppel dit apparaat"}</button>${t && !this.automaticAudio ? u`<button @click=${() => this.enableAutomaticAudio()}>Automatisch camerageluid inschakelen</button>` : c}</ha-card>` : c}${!this.active() && this.config.preload === !1 ? u`<span class=idle>Baby monitor gereed</span>` : c}${this.config.debug ? u`<div class=debug>state=${this.machineState} | value=${e} | on≥${this.config.sound_threshold_db ?? "-"} | off≤${this.config.sound_reset_db ?? "-"} | timer=${Math.ceil((this.runtime?.remainingMs() ?? 0) / 1e3)}s | kiosk=${this.eligible()} | preload=${this.config.preload !== !1 && this.eligible()}</div>` : c}`;
  }
};
v.styles = _t`:host{display:block;min-height:1px}.stage{position:fixed;inset:0;z-index:2147483000;background:#000;display:grid;place-items:center}.stage>*:first-child{width:100%;height:100%}.controls{position:absolute;left:50%;bottom:max(24px,env(safe-area-inset-bottom));transform:translateX(-50%);display:flex;gap:18px}.controls button{width:68px;height:68px;border:0;border-radius:50%;font-size:28px;background:#111c;color:white}.preload{position:fixed;width:2px;height:2px;opacity:.01;pointer-events:none;overflow:hidden;left:-4px;top:-4px}.debug{position:fixed;z-index:2147483001;top:8px;left:8px;background:#000b;color:#fff;padding:8px;font:14px monospace}.idle{font-size:12px;color:var(--secondary-text-color)}`;
L([
  Y({ attribute: !1 })
], v.prototype, "hass", 2);
L([
  z()
], v.prototype, "machineState", 2);
L([
  z()
], v.prototype, "muted", 2);
L([
  z()
], v.prototype, "automaticAudio", 2);
v = L([
  Et("baby-monitor-kiosk-card")
], v);
window.customCards = window.customCards || [];
window.customCards.push({ type: "baby-monitor-kiosk-card", name: "Baby Monitor Kiosk Card", description: "Device-local sound-triggered preloaded WebRTC baby monitor" });
console.info("%c BABY-MONITOR-KIOSK-CARD %c 0.2.1 ", "color:white;background:#3949ab;font-weight:bold", "color:#3949ab;background:white");
//# sourceMappingURL=baby-monitor-kiosk-card.js.map
