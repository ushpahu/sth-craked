! function(e) {
    if (e.DB) return;
    var t, n = {
        _db: openDatabase("dbSTH", "", "DB for SeamTraderHelper!", 1e9),
        q: function(e) {
            this._db.transaction(e)
        },
        v: "0.0.1",
        upd: function() {
            var e = this._db;
            (e.version = "") && e.changeVersion("", this.v, function(e) {})
        }
    };
    n.upd();
    var r = function(e, t) {
        this.n = e, this.t = t
    };
    r.prototype = {get name() {
        return this.n
    },
        get type() {
            return this.t
        },
        toString: function() {
            return "`" + this.n + "` " + this.t
        }
    };
    var i = function(e, t) {
        this._tab = e, this.__tab = "`" + e + "`", this._row = t, this.__init()
    };
    i.prototype = {
        q: function(e, t, r) {
            n.q(function(n) {
                n.executeSql(e, t, r), n = r = t = e = null
            })
        },
        __init: function() {
            var e = ["CREATE TABLE IF NOT EXISTS", this.__tab, "(", "`id` INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT ", function(e) {
                var t = "";
                for (var n in e) t += ", " + e[n];
                return t
            }(this._row), ")"].join(" ");
            this.q(e)
        },
        insert: function(e, n) {
            var r = [],
                i = [],
                s, o;
            for (s in e) r.push("`" + s + "`"), i.push(e[s]), delete e[s];
            o = "INSERT INTO " + this.__tab + " " + "(" + r.join(",") + ")  VALUES (" + (new Array(r.length + 1)).join(",?").slice(1) + ")", t(o, i, n), r = i = o = i = n = null
        },
        update: function(e, n, r) {
            var i = [],
                s = [],
                o;
            for (o in n) i.push("`" + o + "`=?"), s.push(n[o]), delete n[o];
            t("UPDATE " + this.__tab + " " + "SET " + i.join(",") + "  WHERE `id`=" + (e.join ? e.join(" or id =") : e), s, r), r = n = e = null
        },
        select: function(e, n) {
            var r = "",
                i = 1e3,
                s, o, u;
            if (n) {
                o = [], u = [];
                if (typeof n == "object") {
                    for (s in n) s == "limit" ? i = n[s] : (o.push(isNaN(s * 1) ? "`" + s + "`=?" : "?"), u.push(n[s])), delete n[s];
                    r = " WHERE " + o.join(" AND ")
                } else r = " WHERE " + n
            }
            t("SELECT * FROM " + this.__tab + r + " LIMIT " + i, u || [], e), e = n = o = u = null
        }
    }, t = e.DB = function(e, t, r) {
        return !r && typeof t == "function" && (r = t, t = null), n.q(function(n) {
            n.executeSql(e, t, r || null), delete r, delete e, delete t
        })
    }, t.group = new i("group", [new r("name", "VARCHAR(255)"), new r("sort", "INTEGER DEFAULT 0"), new r("type", "TINYINT(4) DEFAULT 0"), new r("open", "TINYINT(1) DEFAULT 1")]), t.item = new i("item", [new r("name", "VARCHAR(255)"), new r("type", "VARCHAR(255)"), new r("sort", "INTEGER DEFAULT 0"), new r("url", "VARCHAR(255)"), new r("market_hash_name", "VARCHAR(255)"), new r("appid", "INTEGER(1)  DEFAULT 0"), new r("contextid", "INTEGER(1)  DEFAULT 0"), new r("id_group", "INTEGER  DEFAULT 0"), new r("b_cnt", "INTEGER(1) DEFAULT 0"), new r("b_summ", "INTEGER(1) DEFAULT 0"), new r("b_on", "TINYINT(1)  DEFAULT 0"), new r("s_summ", "INTEGER(1)  DEFAULT 0"), new r("s_on", "TINYINT(1)  DEFAULT 0")]), t._item = new i("_item", [new r("appid", "INTEGER"), new r("id_assets", "INTEGER"), new r("classid", "INTEGER"), new r("id_item", "INTEGER")])
}(this)