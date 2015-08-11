function hash(e) {
    var t = 0,
        n, r, i;
    if (e.length == 0) return t;
    for (n = 0, i = e.length; n < i; ++n) r = e.charCodeAt(n), t = (t << 5) - t + r, t |= 0;
    return t
}

function limit(e, t) {
    var n = 0,
        r = [];
    return function() {
        if (new Date >= n) {
            var r = e.apply(this, arguments);
            return n = now() + t, r
        }
        return null
    }
}

function limit_more(e, t) {
    var n = 0,
        r = [];
    return function() {
        if (new Date >= n) {
            var i = e.apply(this, r.length ? (r.push(arguments), r) : arguments);
            return n = new Date + t, r = null, r = [], i
        }
        return r.push(arguments), !1
    }
}

function rand(e, t) {
    return Math.floor(Math.random() * (t - e) + e)
}

function now() {
    return Date.now()
}

function synch(e, t, n) {
    function i() {
        r.next().done ? (!t || t(), i = r = t = null) : setTimeout(i, n)
    }
    var r = e();
    n = n || 300, i()
}

function ajax(e, t, n, r) {
    if (!e) throw new Error("Не указан URL");
    n || (n = t, t = null);
    var i = [];
    if (t)
        for (var s in t) i.push(s + "=" + t[s]);
    var o = new XMLHttpRequest;
    return o.open("GET", e, !0), o.setRequestHeader("Content-Type", "application/text"), o.setRequestHeader("Accept", "text/plain, */*; q=0.01"), o.onreadystatechange = function() {
        var e = this;
        if (e.readyState != 4) return;
        e.status == 200 && n("json" == r ? JSON.parse(e.responseText) : e.responseText), e = n = r = null
    }, o.send(i.join("&")), o
}

function lang(e) {
    return chrome.i18n.getMessage(e) || e
}
String.prototype.repeat = function(e) {
    var t = new Array((e || 1) + 1);
    return t.join(this)
};
var Class = function(e, t) {
        var n = function() {
            this.constructor.apply(this, arguments)
        };
        t && (n.prototype.__proto__ = t.prototype, n.prototype.__p = t, n.prototype.constructor && (n.prototype.constructor = t.prototype.constructor));
        for (var r in e) n.prototype[r] = e[r];
        return n
    },
    MEvent = new Class({});
! function(e) {
    var t = 0,
        n = {},
        r = {get l() {
            return e.localStorage.limit || 3e3
        }
        };
    e.myInterval = function(e, r, i) {
        var s = ++t;
        return n[s] = {
            c: e,
            e: i,
            t: now() + r
        }, n[s].l = r, s
    }, e.clearMyInterval = function(e) {
        n[e] && (n[e].e && n[e].e(), n[e].t = n[e].c = n[e].e = null, delete n[e])
    }, setInterval(function() {
        var e = now(),
            t, r = 10;
        for (t in n)
            if (n[t] && n[t].t < e) {
                n[t].c(), n[t] && (n[t].t = e + (n[t].l || 6e4));
                if (--r < 0) return
            }
    }, 30)
}(this), ! function(e) {
    var t = Class({
        constructor: function(e, t) {
            var n = this;
            n.u = e, n.t = t, n.xhr = new XMLHttpRequest, n.xhr.open("GET", n.u, !0), setTimeout(function() {
                n._go(), n = null
            }, 30)
        },
        _go: function() {
            var e = this,
                t = e.xhr;
            t.onreadystatechange = function() {
                var t = this;
                if (t.readyState != 4) return;
                if (t.status == 200) try {
                    e._done && e._done("json" == e.t ? JSON.parse(t.responseText) : t.responseText)
                } catch (n) {} else e._fail && e._fail(t.status);
                e._always && e._always(), t = e = e._done = e._fail = e._always = null
            };
            try {
                t.send("")
            } catch (n) {
                debugger
            }
        },
        c: function(e) {
            return this
        },
        done: function(e) {
            return this._done = e, this
        },
        fail: function(e) {
            return this._fail = e, this
        },
        always: function(e) {
            return this._always = e, this
        }
    });
    e.get = function(e, n) {
        return new t(e, n)
    }
}(this)