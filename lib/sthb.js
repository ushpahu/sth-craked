! function(e) {
    "use strict";
    var t = e,
        n = 0,
        r = function() {
            var e = STH("data");
            return function() {
                var n = !!e.wOptionsChkHTML,
                    r;
                return t.STH("isPay") ? (r = !!e.wOptionsChkJSON, n && r ? rand(0, 10) < 6 : n) : !0
            }
        }(),
        i = {
            fnPage: {
                S: function() {
                    return 8e3
                },
                M: function() {
                    return 3e3
                },
                F: function() {
                    return 1e3
                },
                C: function() {
                    return STH("data").wOptionsRatePageC * 1 || 2e3
                }
            },
            val: 0,
            setVal: limit(function() {
                var e = this;
                e.val = e.fnPage[STH("data").wOptionsRate || "S"]()
            }, 3e3),
            valueOf: function() {
                return this.setVal(), Math.max(this.val, 300)
            }
        },
        s = {
            fnPage: {
                S: function() {
                    return 6e3
                },
                M: function() {
                    return 2e3
                },
                F: function() {
                    return 1e3
                },
                C: function() {
                    return STH("data").wOptionsRateNL * 1 || 2e3
                }
            },
            val: 0,
            setVal: limit(function() {
                var e = this;
                e.val = e.fnPage[STH("data").wOptionsRate || "S"]()
            }, 703),
            valueOf: function() {
                return this.setVal(), Math.max(this.val, 300)
            }
        },
        o = {
            error: function() {
                n = Math.min(n + 1, 90)
            },
            fnPage: {
                S: function(e) {
                    return .6 * e * e, 4e4
                },
                M: function(e) {
                    return .6 * e * e + 2e4
                },
                F: function(e) {
                    return .65 * e * e + 5e3
                },
                C: function(e) {
                    return .7 * e * e + STH("data").wOptionsRatePage * 1 || 500
                }
            },
            val: 0,
            setVal: limit(function() {
                var e = this;
                t.DB("SELECT sum(b_on) b FROM item", function(t, n) {
                    var r, i = STH("data").wOptionsRate || "S";
                    !n.rows.length || (r = n.rows.item(0), e.val = (e.fnPage[i] || e.fnPage.S)(r.b)), e = null
                })
            }, 3e3),
            valueOf: function() {
                this.setVal();
                var e = Math.max(this.val, 1e3) + n * 1e3,
                    t = e * .1;
                return e + rand(-t, t)
            }
        },
        u = function(e, t, n) {
            var r = [],
                i, s, o, u;
            for (u in e) s = e[u], o = (s.converted_fee || 0) + (s.converted_price || 0), o && (i = t[s.asset.appid][s.asset.contextid][s.asset.id], !i.owner && i.status == 2 && r.push({
                listingid: s.listingid,
                currencyid: s.converted_currencyid,
                subtotal: s.converted_price,
                fee: s.converted_fee,
                price: o,
                id: n,
                quantity: 1
            })), i = s = null;
            return r
        },
        a = function(e) {
            return rand(0, 5) < 2 ? e : e.replace("https://", "http://")
        },
        f = {},
        l = {},
        c = Class({
            timeI: 0,
            id: null,
            constructor: function(e) {
                if (l[e]) return l[e];
                var n = l[e] = this;
                n.id = e, n.interval = myInterval(function() {
                    t.STH("isPay") && t.STH("data").wOptionsChkPage && n.scan()
                }, o, function() {
                    n = null
                }), n._nr()
            },
            _nr: function() {
                var e = this;
                e.interval2 = myInterval(function() {
                    if (e) {
                        var t = e.nlName();
                        t && (f[t] = e, clearMyInterval(e.interval2))
                    }
                }, 700, function() {
                    e.interval2 = null, e = null
                })
            },
            stop: function() {
                var e = this,
                    t = e.nlName();
                t && delete f[t], delete l[e.id], clearMyInterval(e.interval), e.interval2 && clearMyInterval(e.interval2), e.id = e.data = null
            },
            update: function() {
                this.loadDB()
            },
            count: function(e) {
                var t = this;
                return t.data ? t.data.b_cnt : null
            },
            price: function(e) {
                return e ? (this._price = e, this) : this._price
            },
            payList: function(e) {
                this.loadDB(function(n) {
                    n.b_cnt > 0 && t.app.payL(e), e = null
                })
            },
            pay: function(e) {
                this.loadDB(function(n) {
                    n.b_cnt > 0 && n.b_summ >= e.price && t.app.pay(e), e = null
                })
            },
            scan: function(e) {
                var i = this,
                    s = t.STH().authS(),
                    u = now(),
                    f = typeof e == "boolean" ? e : r();
                return i.timeI < u && s && (i.data ? !0 : (i.loadDB(), !1)) && i.data.b_on && i.data.b_cnt && i.data.b_summ && !i.get ? (i.timeI = u + 400, i.get = f ? t.get(a(i.data.url)).done(function(e) {
                    if (!i.data) return;
                    var t, r, s, o = (e.match(/(?:g_rgListingInfo[\s]*\=[\s]*)(\{[^;]+\})/g) || []).pop(),
                        u = (e.match(/(?:g_rgAssets[\s]*\=[\s]*)(\{[^;]+\})/g) || []).pop();
                    u = (e.match(/(?:g_rgAssets[\s]*\=[\s]*)(\{[^\n]+\};)/g) || []).pop();
                    if (o && u) {
                        try {
                            t = JSON.parse(o.replace(/(?:g_rgListingInfo[\s]*\=[\s]*)(\{[^;]+\})/g, "$1")) || {}, r = JSON.parse(u.replace(/(?:g_rgAssets[\s]*\=[\s]*)(\{[^\n]+\});{0,1}/g, "$1")) || {}
                        } catch (a) {
                            return
                        }
                        s = i.fL(t, r), t = r = null, s.length && i.payList(s), s = null, n = Math.max(n - .5, 0)
                    }
                }) : t.get(i.data.url + "/render/?start=0&count=10&country=" + s.country + "&language=" + s.language + "&currency=" + s.currency, "json").c(s.language).done(function(e) {
                    if (!i.data) return;
                    var t = i.fL(e.listinginfo, e.assets);
                    e = e.assets = e.listinginfo = null, t.length && i.payList(t), t = null, n = Math.max(n - .5, 0)
                }), i.get.fail(function(e) {
                    t.STH().error = "STHB-2 - Limit recuest " + e, e == 429 && o.error()
                }).always(function() {
                    i.get = null, i = null
                }), !0) : i = null
            },
            fL: function(e, t) {
                var n = this,
                    r = u(e, t, n.id),
                    i = n.data.b_summ,
                    s = r.map(function(e) {
                            return e.price
                        }).reduce(function(e, t) {
                            return Math.min(e, t)
                        }) || 0;
                if (s) {
                    n.price(s);
                    if (s && s <= i) return r = r.filter(function(e, t) {
                        return e.price <= this
                    }, i), r.sort(function(e, t) {
                        if (e) {
                            if (t == "MAX") return function(e, t) {
                                e.price < t.price ? 1 : -1
                            };
                            if (t == "RND") return function() {
                                return .5 - Math.random()
                            }
                        }
                        return function(e, t) {
                            e.price > t.price ? 1 : -1
                        }
                    }(STH("isPay"), STH("data").wOptionsRadPP)), r
                }
                return []
            },
            nlName: function() {
                var e = this;
                return e.__nl || e.data && e.data.market_hash_name ? e.__nl = [e.data.contextid, e.data.appid, e.data.market_hash_name].join("_") : null
            },
            loadDB: function(e) {
                var n = this;
                return t.DB.item.select(function(t, r) {
                    r.rows.length ? n.data = r.rows.item(0) : (n.stop(), e = null), !e || e.call(n, n.data), n = e = null
                }, {
                    id: n.id
                }), n
            }
        }),
        h, p = 0,
        d = function() {
            if (t.STH("start") && (!t.STH("isPay") || STH("data").wOptionsChkPageC)) {
                var e = 0,
                    n, r = new ArrayBuffer(8);
                for (n in l) r[e] = n, e++;
                n = !1, e && (p >= e && (p = 0), n = l[r[p]].scan(), ++p), n || setTimeout(d, 10)
            }
        },
        v = function(e, t) {
            var n = [],
                r = !1;
            return $.each(e, function(e, n) {
                var r, i, s, o = t[n.asset.appid][n.asset.contextid][n.asset.id],
                    u = o.contextid + "_" + o.appid + "_" + o.market_hash_name;
                if (r = f[u]) s = r.data.b_summ, i = n.converted_fee + n.converted_price, i <= s && r.payList([{
                    h: u,
                    price: i,
                    listingid: n.listingid,
                    currencyid: n.converted_currencyid,
                    subtotal: n.converted_price,
                    fee: n.converted_fee,
                    id: r.id,
                    m_price: s,
                    quantity: 1
                }])
            }), r
        },
        m, g = function() {
            t.DB.item.select(function(e, t) {
                var n = t.rows.length,
                    r, i = [];
                for (; n--;) r = t.rows.item(n).id, r && !l[r] && i.push(r);
                i.length && y.add(i)
            }, {
                b_on: 1
            })
        },
        y = {
            remove: function(e) {
                return typeof e == "object" ? e.forEach(function(e) {
                    y.remove(e)
                }) : l[e] && l[e].stop()
            },
            add: function(e) {
                if (e && e.indexOf && e.indexOf(",") > -1) debugger;
                return typeof e == "object" ? e.forEach(function(e, t) {
                    setTimeout(function() {
                        y.add(e), e = null
                    }, t * 60)
                }) : new c(e * 1)
            },
            getCnt: function(e) {
                return l[e] ? l[e].count() : null
            },
            getPrice: function(e) {
                return l[e] ? l[e].price() : 0
            },
            stop: function() {
                m || clearInterval(m), $.each(l, function(e, t) {
                    t.stop()
                }), "number" == typeof b && clearMyInterval(b), "number" == typeof h && clearMyInterval(h)
            },
            start: function() {
                this.stop(), m = setInterval(g, 3e3), b = myInterval(x, s), h = myInterval(d, i)
            },
            update: function(e) {
                t.STH("start") && (typeof e == "object" ? e.forEach(function(e, t) {
                    setTimeout(function() {
                        y.update(e), e = null
                    }, t * 10)
                }) : l[e] && l[e].update())
            }
        };
    t.STH("B", y);
    var b, w = null,
        E, S = 0,
        x = function() {
            var t = e.STH("authS")();
            if (e.STH("start") && t && e.STH("isPay") && e.STH("data").wOptionsChkNL && !E) {
                var n = ["country=" + t.country, "language=" + t.language, "currency=" + t.currency],
                    r = (new Date).getTime() - 3e3;
                E = e.get((STH("auth")().nl ? "http://steamtraderhelper/sth.json?" : "https://steamcommunity.com/market/recent?") + n.join("&"), "json").done(function(e) {
                    if (e.success) {
                        var t = hash(e.hovers);
                        t != w && (w = t, v(e.listinginfo, e.assets))
                    }
                }).c().fail(function(t) {
                    e.STH().error = "STHB-2 - NewReLimit recuest " + t
                }).always(function() {
                    E = null
                })
            }
        },
        T = {
            urls: ["https://steamcommunity.com/market/recent*"]
        },
        N = ["requestHeaders", "blocking"],
        C = function(e) {
            var t = e.requestHeaders,
                n = {};
            for (var r = 0, i = t.length; r < i; ++r)
                if (t[r].name == "User-Agent") {
                    t[r].value = ">>> Your new user agent string here <<<";
                    break
                }
            return n.requestHeaders = t, n
        }
}(this)