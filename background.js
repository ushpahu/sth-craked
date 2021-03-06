! function(e) {
    "use strict";

    function n(e) {
        chrome.extension.onMessage.addListener(function(t, n, i) {
            if (t && t.do) switch (t.do) {
                case "add":
                    r(t.url), i();
                    break;
                case "pay":
                    e.payRes(t.id, t.res)
            }
        }), n = null
    }

    function r(e) {
        var t = $("<a>", {
                href: e
            })[0].pathname,
            n = "https://steamcommunity.com" + t;
        app.addUrl(n, decodeURIComponent(t.replace(/\/market\/listings\/([0-9]+)\/(.+)/, "$2")))
    }
    var t = new(Class({
        constructor: function() {
            this.a = []
        },
        test: function(e) {
            return this.a.indexOf(e) !== -1
        },
        add: function(e) {
            var t = this;
            return t.a.push(e), t.a.length > 10 && t.a.splice(0, 1), t
        }
    }));
    e.app = {
        init: function() {
            chrome.browserAction.onClicked.addListener(function(e) {
                var t = chrome.extension.getURL("page/page.html");
                chrome.tabs.query({
                    url: t
                }, function(e) {
                    var t;
                    if (t = e.pop()) chrome.tabs.update(t.id, {
                        active: !0
                    });
                    else {
                        var n = chrome.extension.getURL("page/page.html");
                        chrome.tabs.create({
                            url: n
                        })
                    }
                })
            }), n(this), chrome.tabs.query({
                url: "*://steamcommunity.com/*"
            }, function(e) {
                var t = e.length;
                for (; t--;) chrome.tabs.reload(e[t].id)
            })
        },
        faendData: function(t) {
            var n = e.STH().authS();
            !n || ajax(t.url + "/render/?start=0&count=10&country=" + n.country + "&language=" + n.language + "&currency=" + n.currency, null, function(e) {
                var n, r, i;
                if (e.assets) {
                    var s = {},
                        u = {};
                    for (n in e.assets) {
                        s.appid = n;
                        for (r in e.assets[n]) {
                            s.contextid = r, i = e.assets[n][r];
                            break
                        }
                    }
                    if (i) {
                        for (n in i) {
                            s.name || (s.name = i[n].market_name, s.type = i[n].type, s.market_hash_name = i[n].market_hash_name);
                            break
                        }
                        for (n in i) u[i[n].classid] || (u[i[n].classid] = i[n].classid)
                    }
                    DB.item.update(t.id, s);
                    for (n in u) DB._item.insert({
                        classid: n,
                        id_item: t.id
                    })
                }
            }, "json")
        },
        addUrl: function(e, t, n) {
            DB.item.select(function(r, i) {
                i.rows.length == 0 && DB.item.insert({
                    name: t,
                    url: e,
                    id_group: n || 0
                }, function(t, n) {
                    var r = n.insertId;
                    !r || app.faendData({
                        url: e,
                        id: r
                    }), e = null
                })
            }, {
                url: e
            })
        },
        tab: function() {
            var e = function(e) {
                    return n(function(t) {
                        chrome.tabs.sendMessage(t, e), e = null
                    })
                },
                t = null,
                n = function(e) {
                    return t ? e(t) : (chrome.tabs.query({
                        url: "*://steamcommunity.com/*"
                    }, function(n) {
                        n.length ? (e(t = n[0].id), e = null) : chrome.tabs.create({
                            url: "https://steamcommunity.com/market/",
                            selected: !1
                        }, function(n) {
                            e(t = n.id), e = null
                        })
                    }), 0)
                };
            return e.mes = function(t) {
                return e
            }, chrome.tabs.onRemoved.addListener(function(e, n, r) {
                t && t === e && (t = !1)
            }), chrome.tabs.onUpdated.addListener(function(e, n, r) {
                t && t === e && (t = !1)
            }), e
        }(),
        messTime: 0,
        _payL: null,
        payL: function(e) {
            var n = this;
            if (e) {
                e = e.filter(function(e) {
                    return !t.test(e.listingid)
                });
                if (!e.length) return !1;
                n._payL = e
            }
            n.payDo()
        },
        payDo: function() {
            var e, t = this,
                n;
            (e = t._payL) && (n = e.shift()) && (t.pay(n) || e.unshift(n))
        },
        pay: function(n) {
            var r = e.STH().authS(),
                i = this;
            if (i.messTime < now() && e.STH("start") && r) return console.log("found"), t.add(n.listingid), e.STH().found = 1, i.messTime = now() + 1e4, n.type = "buy", n.sessionid = r.sessionID, n.currency = r.currency, e.app.tab(n, function(t) {
                e.app.payRes(0, t)
            }), !0
        },
        payRes: function(t, n) {
            var r = this;
            n == "good" ? (e.DB("UPDATE `item` SET b_cnt=b_cnt-1 WHERE id=?", [t], function() {
                e.STH().B.update(t), STH("on", "edit", t), t = null
            }), r._payL = null, e.STH().bought = 1) : e.STH().error = t + "|" + n, r.messTime = 0, r.payDo()
        },
        sell: function(t) {
            var n = e.STH().authS();
            e.STH().start && n && (t.type = "sell", t.sessionid = n.sessionID, e.app.tab(t, function(e) {
                console.log("sell res", e)
            }))
        },
        sell_good: function() {}
    }, e.app.init()
}(this)