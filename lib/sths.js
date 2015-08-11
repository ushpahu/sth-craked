! function(e, t) {
    "use strict";
    var n = {},
        r = function() {
            console.log("STHS scan");
            var r = e.STH().authS(),
                i = e.STH().auth();
            if (!e.STH().start) return;
            r ? i && i.subscription && e.DB("SELECT appid,contextid FROM item WHERE s_on=1 GROUP BY appid,contextid", function(i, s) {
                var o = s.rows.length,
                    u, a;
                for (; o--;) u = s.rows.item(o).appid, a = s.rows.item(o).contextid, t.get("https://steamcommunity.com" + r.href + "/json/" + u + "/" + a, function(t) {
                    var r, i, s, o, u;
                    if (!e.STH().start) return;
                    for (s in t.rgDescriptions) {
                        u = t.rgDescriptions[s];
                        if (!u.marketable) continue;
                        o = u.market_hash_name, n[o] = [], r = t.rgDescriptions[s].classid;
                        if (r)
                            for (i in t.rgInventory) t.rgInventory[i].classid != r || n[o].push(t.rgInventory[i])
                    }
                }, "json").error(function() {
                    e.STH().error = "STHS-2 - User steamcommunity not find"
                })
            }) : e.STH().error = "STHS-1 - User steamcommunity not find"
        },
        i = function(e) {
            if (i.l[e]) return i.l[e];
            var t = i.l[e] = this;
            t.selsCnt = 0, t.id = e, t.loadDB(), t.interval = myInterval(function() {
                var e;
                t.data ? (t.last_data && (t.selsCnt = t.last_data.length, i.list && !~(e = i.list.indexOf(t.id)) && i.list.push(t.id)), rand(0, 10) < 20 || t.loadDB()) : t.loadDB()
            }, 4e3, function() {
                t = null
            })
        };
    i.prototype = {get last_data() {
        var e = this.data,
            t = e ? e.market_hash_name : !1;
        return n[t] ? new Object(n[t]) : null
    },
        stop: function() {
            var e = this,
                t;
            clearMyInterval(e.interval), i.list && ~(t = i.list.indexOf(e.id)) && i.list.splice(t, 1), e.data = i.l[e.id] = null, delete i.l[e.id]
        },
        loadDB: function() {
            var t = this;
            e.DB.item.select(function(e, n) {
                t.data = n.rows.length ? n.rows.item(0) : {}
            }, {
                id: t.id,
                s_on: 1
            })
        }
    }, i.l = {}, i.list, setInterval(function() {
        var t = 0,
            n;
        if (e.STH().start)
            for (n in i.l) i.l[n] && (t += i.l[n].selsCnt || 0);
        e.STH().sale = t
    }, 3e4), setInterval(function() {
        var t;
        e.STH("isPay") && i.list && (t = i.list.shift()) && ! function(t) {
            e.DB.item.select(function(n, r) {
                if (r.rows.length) {
                    var s = i.l[t],
                        o = s.data = r.rows.item(0),
                        u = s.last_data,
                        a, f = e.STH().auth();
                    f && f.subscription && o && u && (a = u.shift()) && e.app.sell({
                        appid: o.appid,
                        contextid: o.contextid,
                        price: o.s_summ,
                        classid: a.classid,
                        amount: a.amount,
                        assetid: a.id,
                        id: a.id
                    })
                }
            }, {
                id: t,
                s_on: 1
            })
        }(t)
    }, 1e4);
    var s, o = function() {
            e.DB.item.select(function(e, t) {
                var n = t.rows.length,
                    r = [];
                for (; n--;) r.push(t.rows.item(n).id);
                a.add(r)
            }, {
                s_on: 1
            })
        },
        u, a = {
            remove: function(e) {
                return e.json ? e.forEach(function(e) {
                    a.remove(e)
                }) : i.l[e] && i.l[e].stop()
            },
            add: function(e) {
                return typeof e == "object" ? e.forEach(function(e, t) {
                    setTimeout(function() {
                        a.add(e), e = null
                    }, t * 10)
                }) : new i(e * 1)
            },
            stop: function() {
                clearInterval(u), s || clearTimeout(s), i.list = null
            },
            start: function() {
                u || this.stop(), i.list = [], s = setInterval(o, 3e3), u = setInterval(r, 1e6), r()
            }
        };
    e.STH("S", a)
}(this, $)