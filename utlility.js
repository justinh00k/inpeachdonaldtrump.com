// FASTCLICK

! function(t) {
    function e(o) { if (n[o]) return n[o].exports; var i = n[o] = { exports: {}, id: o, loaded: !1 }; return t[o].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports }
    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0)
}([function(t, e, n) {
    "use strict";
    n(1), window.Origami = { fastclick: n(2), "o-autoinit": n(4) }
}, function(t, e) { t.exports = { name: "__MAIN__", dependencies: { fastclick: "fastclick#*", "o-autoinit": "o-autoinit#^1.0.0" } } }, function(t, e, n) { t.exports = n(3) }, function(t, e) {
    "use strict";
    var n = !1;
    ! function() {
        /**
         * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
         *
         * @codingstandard ftlabs-jsv2
         * @copyright The Financial Times Limited [All Rights Reserved]
         * @license MIT License (see LICENSE.txt)
         */
        function e(t, n) {
            function o(t, e) { return function() { return t.apply(e, arguments) } }
            var r;
            if (n = n || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = n.touchBoundary || 10, this.layer = t, this.tapDelay = n.tapDelay || 200, this.tapTimeout = n.tapTimeout || 700, !e.notNeeded(t)) {
                for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this, s = 0, u = a.length; s < u; s++) c[a[s]] = o(c[a[s]], c);
                i && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, n, o) { var i = Node.prototype.removeEventListener; "click" === e ? i.call(t, e, n.hijacked || n, o) : i.call(t, e, n, o) }, t.addEventListener = function(e, n, o) { var i = Node.prototype.addEventListener; "click" === e ? i.call(t, e, n.hijacked || (n.hijacked = function(t) { t.propagationStopped || n(t) }), o) : i.call(t, e, n, o) }), "function" == typeof t.onclick && (r = t.onclick, t.addEventListener("click", function(t) { r(t) }, !1), t.onclick = null)
            }
        }
        var o = navigator.userAgent.indexOf("Windows Phone") >= 0,
            i = navigator.userAgent.indexOf("Android") > 0 && !o,
            r = /iP(ad|hone|od)/.test(navigator.userAgent) && !o,
            a = r && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            c = r && /OS [6-7]_\d/.test(navigator.userAgent),
            s = navigator.userAgent.indexOf("BB10") > 0;
        e.prototype.needsClick = function(t) {
            switch (t.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (t.disabled) return !0;
                    break;
                case "input":
                    if (r && "file" === t.type || t.disabled) return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0
            }
            return /\bneedsclick\b/.test(t.className)
        }, e.prototype.needsFocus = function(t) {
            switch (t.nodeName.toLowerCase()) {
                case "textarea":
                    return !0;
                case "select":
                    return !i;
                case "input":
                    switch (t.type) {
                        case "button":
                        case "checkbox":
                        case "file":
                        case "image":
                        case "radio":
                        case "submit":
                            return !1
                    }
                    return !t.disabled && !t.readOnly;
                default:
                    return /\bneedsfocus\b/.test(t.className)
            }
        }, e.prototype.sendClick = function(t, e) {
            var n, o;
            document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
        }, e.prototype.determineEventType = function(t) { return i && "select" === t.tagName.toLowerCase() ? "mousedown" : "click" }, e.prototype.focus = function(t) {
            var e;
            r && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
        }, e.prototype.updateScrollParent = function(t) {
            var e, n;
            if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
                n = t;
                do {
                    if (n.scrollHeight > n.offsetHeight) { e = n, t.fastClickScrollParent = n; break }
                    n = n.parentElement
                } while (n)
            }
            e && (e.fastClickLastScrollTop = e.scrollTop)
        }, e.prototype.getTargetElementFromEventTarget = function(t) { return t.nodeType === Node.TEXT_NODE ? t.parentNode : t }, e.prototype.onTouchStart = function(t) {
            var e, n, o;
            if (t.targetTouches.length > 1) return !0;
            if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], r) {
                if (o = window.getSelection(), o.rangeCount && !o.isCollapsed) return !0;
                if (!a) {
                    if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
                    this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
                }
            }
            return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
        }, e.prototype.touchHasMoved = function(t) {
            var e = t.changedTouches[0],
                n = this.touchBoundary;
            return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n
        }, e.prototype.onTouchMove = function(t) { return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) }, e.prototype.findControl = function(t) { return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea") }, e.prototype.onTouchEnd = function(t) {
            var e, n, o, s, u, l = this.targetElement;
            if (!this.trackingClick) return !0;
            if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
            if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
            if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, n = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, c && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), o = l.tagName.toLowerCase(), "label" === o) {
                if (e = this.findControl(l)) {
                    if (this.focus(l), i) return !1;
                    l = e
                }
            } else if (this.needsFocus(l)) return t.timeStamp - n > 100 || r && window.top !== window && "input" === o ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), r && "select" === o || (this.targetElement = null, t.preventDefault()), !1);
            return !(!r || a || (s = l.fastClickScrollParent, !s || s.fastClickLastScrollTop === s.scrollTop)) || (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
        }, e.prototype.onTouchCancel = function() { this.trackingClick = !1, this.targetElement = null }, e.prototype.onMouse = function(t) { return !this.targetElement || (!!t.forwardedTouchEvent || (!t.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1)))) }, e.prototype.onClick = function(t) { var e; return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail || (e = this.onMouse(t), e || (this.targetElement = null), e) }, e.prototype.destroy = function() {
            var t = this.layer;
            i && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }, e.notNeeded = function(t) { var e, n, o, r; if ("undefined" == typeof window.ontouchstart) return !0; if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) { if (!i) return !0; if (e = document.querySelector("meta[name=viewport]")) { if (e.content.indexOf("user-scalable=no") !== -1) return !0; if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0 } } if (s && (o = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), o[1] >= 10 && o[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) { if (e.content.indexOf("user-scalable=no") !== -1) return !0; if (document.documentElement.scrollWidth <= window.outerWidth) return !0 } return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction || (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], !!(r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (e.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth))) || ("none" === t.style.touchAction || "manipulation" === t.style.touchAction)) }, e.attach = function(t, n) { return new e(t, n) }, "function" == typeof n && "object" == typeof n.amd && n.amd ? n(function() { return e }) : "undefined" != typeof t && t.exports ? (t.exports = e.attach, t.exports.FastClick = e) : window.FastClick = e
    }()
}, function(t, e, n) { t.exports = n(5) }, function(t, e) {
    "use strict";

    function n(t) { t in o || (o[t] = !0, document.dispatchEvent(new CustomEvent("o." + t))) }
    var o = {};
    window.addEventListener("load", n.bind(null, "load")), window.addEventListener("load", n.bind(null, "DOMContentLoaded")), document.addEventListener("DOMContentLoaded", n.bind(null, "DOMContentLoaded")), document.onreadystatechange = function() { "complete" === document.readyState ? (n("DOMContentLoaded"), n("load")) : "interactive" !== document.readyState || document.attachEvent || n("DOMContentLoaded") }, "complete" === document.readyState ? (n("DOMContentLoaded"), n("load")) : "interactive" !== document.readyState || document.attachEvent || n("DOMContentLoaded"), document.attachEvent && ! function() {
        var t = !1,
            e = 50;
        try { t = null === window.frameElement && document.documentElement } catch (t) {}
        t && t.doScroll && ! function i() {
            if (!("DOMContentLoaded" in o)) {
                try { t.doScroll("left") } catch (t) { return e < 5e3 ? setTimeout(i, e *= 1.2) : void 0 }
                n("DOMContentLoaded")
            }
        }()
    }()
}]);

// SMOKE.JS
var smokemachine = function(t, a) {
    function i(a, i, e) {
        this.x = a, this.y = i, this.age = 0, this.vx = (8 * Math.random() - 4) / 100, this.startvy = -(30 * Math.random() + 10) / 100, this.vy = this.startvy, this.scale = .5 * Math.random(), this.lifetime = Math.random() * e + e / 2, this.finalscale = 5 + this.scale + Math.random(), this.update = function(t) {
            this.x += this.vx * t, this.y += this.vy * t;
            var a = Math.pow(this.age / this.lifetime, .5);
            this.vy = (1 - a) * this.startvy, this.age += t, this.scale = a * this.finalscale
        }, this.draw = function() {
            t.globalAlpha = (1 - Math.abs(1 - 2 * this.age / this.lifetime)) / 8;
            var a = this.scale * p / 2,
                i = this.x - a,
                e = i + this.scale * y,
                s = this.y - a,
                n = s + this.scale * y;
            t.drawImage(d, i, s, e - i, n - s)
        }
    }

    function e(t, a, e, s) { if (s = s || 4e3, (e = e || 10) < 1) return Math.random() <= e && u.push(new i(t, a, s)); for (var n = 0; n < e; n++) u.push(new i(t, a, s)) }

    function s(a) {
        t.clearRect(0, 0, canvas.width, canvas.height), a = a || 16;
        var i = [];
        m = m.concat(u), u = [], m.forEach(function(t) { t.update(a), t.age < t.lifetime && (t.draw(), i.push(t)) }), m = i
    }

    function n(t) {
        if (M) {
            var a = t - r;
            r = t, s(a), c(n)
        }
    }

    function h() { M = !0, c(function(t) { r = t, c(n) }) }

    function o() { M = !1 }
    a = a || [24, 46.8, 48.2];
    var r, c = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
        m = [],
        u = [],
        d = document.createElement("canvas"),
        f = d.getContext("2d");
    d.width = 20, d.height = 20;
    for (var l = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 5, 5, 7, 4, 4, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 17, 27, 41, 52, 56, 34, 23, 15, 11, 4, 9, 5, 1, 0, 0, 0, 0, 0, 0, 1, 45, 63, 57, 45, 78, 66, 52, 41, 34, 37, 23, 20, 0, 1, 0, 0, 0, 0, 1, 43, 62, 66, 64, 67, 115, 112, 114, 56, 58, 47, 33, 18, 12, 10, 0, 0, 0, 0, 39, 50, 63, 76, 87, 107, 105, 112, 128, 104, 69, 64, 29, 18, 21, 15, 0, 0, 0, 7, 42, 52, 85, 91, 103, 126, 153, 128, 124, 82, 57, 52, 52, 24, 1, 0, 0, 0, 2, 17, 41, 67, 84, 100, 122, 136, 159, 127, 78, 69, 60, 50, 47, 25, 7, 1, 0, 0, 0, 34, 33, 66, 82, 113, 138, 149, 168, 175, 82, 142, 133, 70, 62, 41, 25, 6, 0, 0, 0, 18, 39, 55, 113, 111, 137, 141, 139, 141, 128, 102, 130, 90, 96, 65, 37, 0, 0, 0, 2, 15, 27, 71, 104, 129, 129, 158, 140, 154, 146, 150, 131, 92, 100, 67, 26, 3, 0, 0, 0, 0, 46, 73, 104, 124, 145, 135, 122, 107, 120, 122, 101, 98, 96, 35, 38, 7, 2, 0, 0, 0, 50, 58, 91, 124, 127, 139, 118, 121, 177, 156, 88, 90, 88, 28, 43, 3, 0, 0, 0, 0, 30, 62, 68, 91, 83, 117, 89, 139, 139, 99, 105, 77, 32, 1, 1, 0, 0, 0, 0, 0, 16, 21, 8, 45, 101, 125, 118, 87, 110, 86, 64, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 28, 79, 79, 117, 122, 88, 84, 54, 46, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 6, 55, 61, 68, 71, 30, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 23, 25, 20, 12, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 12, 9, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0], v = f.createImageData(20, 20), w = v.data, g = 0; g < w.length; g += 4) w[g] = a[0], w[g + 1] = a[1], w[g + 2] = a[2], w[g + 3] = l[g / 4];
    f.putImageData(v, 0, 0);
    var p = 100,
        y = 100,
        M = !1;
    return { start: h, stop: o, step: s, addsmoke: e }
};