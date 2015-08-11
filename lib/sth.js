! function(e) {
    "use strict";

    function u() {
        if (u.do) return !1;
        var t = e.STH().start;
        t && (e.STH().start = !1), u.do = !0, this.post()
    }

    function a(e, t, n) {
        var r = this;
        r.u = e, r.tl = n || 1e4, r.test = t
    }

    function m() {
        return (m.time || 0) > now() || ajax("https://steamdb.info/api/SteamRailgun/", "", function(e) {
            var t, n;
            try {
                t = JSON.parse(e), n = t.services.steam.title, e = t = null
            } catch (e) {}
            m.v = n || "--", m.time = now() + 2e6
        }), m.v
    }

    function g() {
        l = 0, c = 0, h = 0, p = 0, v.S.stop(), v.B.stop()
    }

    function y() {
        v.S.start(), v.B.start()
    }
    var t = "http://steamtraderhelper.com",
        n = Class({
            constructor: function(e) {
                this.name = e, this.fns = []
            },
            on: function(t) {
                return this.fns.forEach(function(n) {
                    n && n.apply(e, t || [])
                }), this
            },
            off: function(e) {
                var t = this.fns,
                    n = t.length;
                if (e)
                    for (; n--;) t[n].sn === e && (t[n] = t[n].sn = null);
                else {
                    for (; n--;) t[n] = null;
                    this.fns = []
                }
            },
            set: function(e, t) {
                this.fns.push(e), t && (e.sn = t)
            }
        }),
        r = Class({
            parsName: function(e) {
                return e.split(":")
            },
            constructor: function() {
                this.l = {}
            },
            off: function(e) {
                e = this.parsName(e), this.l[e[0]].off(e[1])
            },
            on: function(e, t) {
                var r = this;
                e = r.parsName(e), r.l[e[0]] || (r.l[e[0]] = new n(e)), typeof t == "function" ? r.l[e[0]].set(t, e[1]) : r.l[e[0]].on([].splice.call(arguments, 1))
            }
        }),
        i = !1,
        s = Class({
            constructor: function() {
                i || (i = !0, this.do())
            },
            f: function(e) {
                var t = JSON.stringify(e);
                return new File([t], "data.txt", {
                    type: "text/plain",
                    lastModified: now()
                })
            },
            _f: function(e) {
                var t = JSON.stringify(e),
                    n = t.length,
                    e = new Uint16Array(n),
                    r = {};
                for (; n--;) r[t.charCodeAt(n)] = (r[t.charCodeAt(n)] || 0) + 1, e[n] = t.charCodeAt(n);
                r = function(e) {
                    var t, n = [];
                    for (t in e) n.push({
                        i: t,
                        a: e
                    });
                    return n.sort(function(e, t) {
                        return e.i > t.i
                    }).map(function(e) {
                        return e.a
                    })
                }(r);
                debugger
            }
        }),
        o = Class({
            "do": function() {
                var e = this;
                e.get_Item(), e.getItem(), e.getGroup(), i = !0
            },
            _end: function() {},
            getGroup: function() {
                var t = this;
                e.DB.group.select(function(e, n) {
                    var r = n.rows.length,
                        i = [];
                    for (; r--;) i.unshift(n.rows.item(r));
                    t.group = t.f(i), t.post(), i = t = null
                })
            },
            getItem: function() {
                var t = this;
                e.DB.item.select(function(e, n) {
                    var r = n.rows.length,
                        i = [];
                    for (; r--;) i.unshift(n.rows.item(r));
                    t.item = t.f(i), t.post(), i = t = null
                })
            },
            get_Item: function() {
                var t = this;
                e.DB._item.select(function(e, n) {
                    var r = n.rows.length,
                        i = [];
                    for (; r--;) i.unshift(n.rows.item(r));
                    t._item = t.f(i), t.post(), i = t = null
                })
            },
            post: function() {
                var e = this;
                e.group && e.item && e._item && e._post()
            },
            _post: function() {
                var n = this,
                    r = e.STH().authS(),
                    s = new FormData;
                return s.append("user", r ? r.id : null), s.append("version", e.STH("version")), s.append("attr", r ? "country=" + r.country + "&language=" + r.language + "&currency=" + r.currency : ""), s.append("exp1", n.group), s.append("exp2", n.item), s.append("exp3", n._item), i = !1, $.ajax({
                    url: t + "/user/api/export_f/",
                    data: s,
                    type: "POST",
                    dataType: "json",
                    contentType: !1,
                    processData: !1
                }).done(function(e) {
                    n._end(e.res)
                }).fail(function() {
                    n._end(!1)
                }).always(function() {
                    n.group = n.item = n._item = null, n = null
                }), this
            },
            end: function(e) {
                return this._end = e, this
            }
        }, s);
    u.do = !1, u.prototype = {
        tG: function() {
            var t = this;
            e.DB("Delete from `group`", function() {
                t.group = !0, t.save(), t = null
            })
        },
        t_I: function() {
            var t = this;
            e.DB("Delete from `_item`", function() {
                t._item = !0, t.save(), t = null
            })
        },
        tI: function() {
            var t = this;
            e.DB("Delete from `item`", function() {
                t.item = !0, t.save(), t = null
            })
        },
        save: function() {
            var e = this;
            e.item && e._item && e.group && e._save()
        },
        _save: function() {
            var t = this,
                n = 0,
                r = 0,
                i;
            t.o.item.forEach && t.o.item.forEach(function(t) {
                ++n, e.DB.item.insert(t, function() {
                    --n
                })
            }), t.o._item.forEach && t.o._item.forEach(function(t) {
                ++n, e.DB._item.insert(t, function() {
                    --n
                })
            }), t.o.group.forEach && t.o.group.forEach(function(t) {
                ++n, e.DB.group.insert(t, function() {
                    --n
                })
            }), r = n, i = setInterval(function() {
                n < 1 ? (t.finish(!0), clearInterval(i)) : t.s(n, r)
            }, 1e3)
        },
        post: function() {
            var e = this;
            $.get("http://steamtraderhelper.com/user/api/import/", {}, function(t) {
                t._item && t.item && t.group ? (e.o = t, e.t_I(), e.tI(), e.tG()) : e.finish(!1)
            }, "json").error(function() {
                e.finish(!1)
            })
        },
        s: function(e, t) {
            return this._p && this._p(Math.ceil(100 - e / t * 100), e, t), this
        },
        finish: function(e) {
            var t = this;
            t._end && t._end(e), u.do = !1, this._p = null, this.o = null
        },
        process: function(e) {
            return this._p = e, this
        },
        end: function(e) {
            return this._end = e, this
        }
    }, a.prototype = {
        t: !1,
        u: !1,
        b: !1,
        get Data() {
            var e = this;
            return e.isAuth ? new Object(e.data) : !1
        },
        test: !1,
        get get() {
            var e = this;
            return $.ajax({
                type: "GET",
                url: e.u,
                dataType: "text",
                async: !1
            }).responseText
        },
        get isAuth() {
            var e = this;
            return e.t && e.t > now() || (e.b = e.test(e.get), e.t = now() + (e.b ? 1e6 : e.tl)), e.b
        }
    };
    var f = !1,
        l = 0,
        c = 0,
        h = 0,
        p = 0,
        d = new a("https://steamcommunity.com/market/", function(e) {
            var t, n, r = this;
            return e && (t = JSON.parse((e.replace(/[\r\n]*/gm, "").match(/g_rgWalletInfo = (\{[^}]+\})/g) || ["{}"]).pop().replace("g_rgWalletInfo = ", "")), r.data = null, n = r.data = {
                id: (e.match(/g_steamID = "([^"]+)"/m) || [!1]).pop(),
                href: (e.match(/\:\/\/steamcommunity\.com(\/profiles\/[^\/]+\/inventory)/m) || e.match(/\:\/\/steamcommunity\.com(\/id\/[^\/]+\/inventory)/m) || [!1]).pop(),
                name: $("#account_pulldown", e).text(),
                balance: $("#marketWalletBalance", e).text(),
                sessionID: (e.match(/g_sessionID = "([^"]+)"/m) || [!1]).pop(),
                language: (e.match(/g_strLanguage = "([^"]+)"/m) || [!1]).pop(),
                country: t.wallet_country,
                currency: t.wallet_currency
            }, t = null), !!(n.sessionID && n.country && n.currency)
        }),
        v = {get version() {
            return chrome.runtime.getManifest().version
        },
            get start() {
                return f
            },
            set start(e) {
                (f = e) ? y(): g()
            },
            get stat() {
                return new Object({
                    found: l,
                    bought: c,
                    sale: h,
                    errors: p
                })
            },
            get isPay() {
                var e = b.Data;
                return !!e && !!b.isPay()
            },
            set found(e) {
                l++
            },
            set bought(e) {
                c++
            },
            set sale(e) {
                h = e
            },
            set error(e) {
                console.log(e), p++
            },
            on: new r,
            auth: function() {
                return b.Data
            },
            authS: function() {
                return d.Data
            },
            stimStatus: function() {
                return m()
            },
            data: function(e) {
                var t = ["wOptionsRate", "wOptionsChkJSON", "wOptionsChkHTML", "wOptionsChkPageC", "wOptionsChkPage", "wOptionsChkNL", "wOptionsRatePageC", "wOptionsRatePage", "wOptionsRateNL", "wOptionsRadPP"],
                    n = {},
                    r = {};
                return t.forEach(function(t, i) {
                    n[t] = e[t] || "", r.__defineGetter__(t, function() {
                        return n[t]
                    }), r.__defineSetter__(t, function(r) {
                        n[t] = e[t] = r
                    })
                }), r
            }(e.localStorage),
            "export": function() {
                var e = this.auth();
                if (e && e.subscription) return new o
            },
            "import": function() {
                var e = this.auth();
                if (e && e.subscription && e.backap) return new u
            },
            addUrl: function(t) {
                e.app.addUrl(t, t)
            }
        };
    e.STH = function(e, t, n) {
        return e ? "on" === e ? v[e].on(t, n) : "undefined" != typeof t ? v[e] = t : v[e] : v
    };
    var b = function(e, t) {
        var n = true,
            r = {},
            i = !1,
            s = !1,
            i = function() {
                return s && s > now() || (o(), s = now() + 1e6), n
            },
            o = function() {
                return n = a(u())
            },
            u = function() {
                return $.ajax({
                    type: "GET",
                    url: e + t,
                    dataType: "text",
                    async: !1
                }).responseText
            },
            a = function(e) {
                var t;
                if (e && e[0] == "{") {
                    try {
                        t = JSON.parse(e)
                    } catch (n) {}

                    t.nl = true;
                    t.cd = 10;
                    t.backap = true;

                    r.backap = t.backap, r.user = t.u, r.cd = t.cd, r.subscription = t.cd
                } else r.backap = null, r.user = null, r.subscription = null, delete r.cd;
                return !!r && !!r.user
            },
            f = function(t) {
                o(), chrome.cookies.remove({
                    url: e,
                    name: t.name,
                    storeId: t.storeId
                })
            },
            l = function(e, t) {
                var n = !!t && !!e;
                if (n) {
                    var i = Math.ceil((e.value * 1e3 - now()) / 1e3 / 60 / 60 / 24) - r.cd || 0;
                    if (i > 1 || i < -1) n = !1, r.subscription = null
                }
            };
        return setInterval(function() {
            chrome.cookies.getAll({
                url: e
            }, function(e) {
                var t, n, r, i = e.length;
                for (; i--;) e[i].name == "_e" && (t = e[i]), e[i].name == "_m" && (n = e[i]), e[i].name == "_u" && (r = e[i]);
                l(t, n), r && f(r)
            })
        }, 700), {get Data() {
            return i() ? new Object(r) : !1
        },
            isPay: function() {
                return true;
            }
        }
    }(t, "/user/api/u")
}(this)