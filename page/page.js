$("#widgetLink").each(function() {
    var e = this,
        t = e.import,
        n = $("body", t).html(),
        r, i = "http://steamtraderhelper.com",
        s = function(e, t) {
            return e.map ? e.length ? e.join(t ? "" : "\n") : "" : e
        },
        o = function(e, t) {
            return e.map(function(e) {
                var n = "boolean" == typeof e.nobr ? e.nobr : t || !1;
                return "string" == typeof e ? e : $(e.href ? "<a>" : "<span>", {
                    target: "_blank",
                    href: i + e.href || "",
                    css: e.cplor ? {
                        color: e.cplor
                    } : {}
                }).text(s(e.text, n)).prop("outerHTML").replace(/([\n])/ig, "<br/>") + (n ? "" : "<br/>")
            }).join("")
        };
}), ! function(e, t) {
    if (!e.chk) {
        var n = function(e) {
                var n = "#item_";
                return t(n + (e.join ? e.join("," + n) : e))
            },
            r = function(e) {
                var n = e.length,
                    r = e.max_length;
                t("#chAll")[n ? "addClass" : "removeClass"]("marked"), n > 0 && (console.log(n, r, e), t("#chAll").prop("checked", n >= r))
            };
        e.chk = function(n) {
            var i = function() {
                var e = n.length,
                    r = t(".chkItem");
                t("#chCnt").text(e), t("body")[e > 0 ? "addClass" : "removeClass"]("bGr"), e < 1 || (r = r.not(t("#chI_" + n.join(",#chI_")).prop("checked", !0))), r.prop("checked", !1)
            };
            t(e).load(function() {
                t(e.document).on("change", ".item .chkItem", function(e) {
                    var t = this,
                        s, o, u;
                    t.checked ? n.push(t.dataset.id * 1) : (s = n.indexOf(t.dataset.id * 1), s < 0 || n.splice(s, 1)), r(n), i()
                }), t(e.document).on("change", ".chkGroup", function() {
                    var s = this,
                        o = s.checked;
                    e.DB.item.select(function(e, u) {
                        var a, f = u.rows.length;
                        if (o)
                            for (; f--;) n.indexOf(u.rows.item(f).id * 1) < 0 && n.push(u.rows.item(f).id);
                        else
                            for (; f--;) a = n.indexOf(u.rows.item(f).id * 1), a < 0 || n.splice(a, 1);
                        r(n, t(s).closest(".grp")), i()
                    }, {
                        id_group: s.dataset.id
                    })
                }), t("#chAll").change(function() {
                    n.length = 0, this.checked ? e.DB.item.select(function(e, r) {
                        var s = r.rows.length;
                        for (; s--;) n.push(r.rows.item(s).id);
                        t(".chkGroup").prop("checked", !0), i()
                    }) : (t(".chkGroup").prop("checked", !1), i(), t("#chAll").removeClass("marked"))
                })
            })
        }
    }
}(this, jQuery), ! function(e) {
    "use strict";
    e.$(function(t) {
        function l() {
            t(".grp").each(function() {
                i(t(this).data("id"))
            })
        }

        function c() {
            e.DB("SELECT g.* FROM `group` g LEFT JOIN `item` i ON i.id_group=g.id WHERE i.id is null", function(t, n) {
                var r = n.rows.length,
                    i = [];
                for (; r--;) i.push(n.rows.item(r).id);
                e.DB("DELETE FROM `group` WHERE id in(" + i + ")"), $G(i).remove(), l()
            })
        }

        function p() {}
        var n = (chrome.extension.getBackgroundPage() || {
                STH: !1
            }).STH,
            r = n("isPay"),
            i = function(t) {
                t && DB("SELECT COUNT(id) as a, SUM(b_on) as b, SUM(s_on) as s  FROM `item` WHERE id_group=?", [t], function(n, r) {
                    if (r && r.rows.length) {
                        var i = r.rows.item(0),
                            s = e.$G(t);
                        s.find(".gr_count").text(i.a), s.find(".gr_count_b").text(i.b), s.find(".gr_count_s").text(i.s)
                    }
                })
            },
            s = [],
            o, u = function() {
                var e = new tpl(t("#item").text());
                return function(t) {
                    var n = {},
                        r;
                    for (r in t) n[r] = t[r];
                    s.indexOf(n.id) < 0 || (n.checked = "checked"), n.Budget = n.b_summ / 100, n.b_chack = n.b_on ? "checked" : "", !!n.b_cnt || (n.b_cnt = 0), n.priseUrl = n.market_hash_name && n.appid ? "appid=" + n.appid + "&market_hash_name=" + n.market_hash_name : "", n.Receive = Price(n.s_summ), n.Pays = Price(B.getProc(n.s_summ)), n.s_chack = n.s_on ? "checked" : "";
                    var i = e.data(n);
                    return i
                }
            }(),
            a = r ? function(n, r) {
                if (h) return;
                n || e.DB.group.select(function(e, n) {
                    var r = 0,
                        s = n.rows.length,
                        o;
                    t("#Group").empty();
                    for (; r < s; ++r) o = n.rows.item(r), t("#Group").append(gr(o)), o.open && a(o.id), i(o.id)
                }, "1 ORDER BY name"), e.DB.item.select(function(e, r) {
                    var i = 0,
                        s = r.rows.length,
                        o, a = "";
                    for (; i < s; ++i) a += u(r.rows.item(i));
                    n ? $G(n).after(a) : t("#Inventars").empty().append(a), n = null
                }, "id_group=" + (n || 0) + " ORDER BY " + (r ? o = r : o || "sort"))
            } : function(n, r) {
                e.DB.item.select(function(e, r) {
                    var i = 0,
                        s = r.rows.length,
                        o, a = "",
                        f = 30,
                        l;
                    for (; i < s; ++i) o = r.rows.item(i), a += u(o), o.b_on && (--f, f < 1);
                    n ? $G(n).after(a) : t("#Inventars").empty().append(a), n = null
                }, "1=1 ORDER BY " + (r ? o = r : o || "sort"))
            };
        ! function(e) {
            e ? e.subscription > 0 ? t(".pyInfo.subscription").css("visibility", "visible").find(".cnt").text(e.subscription) : t(".pyInfo.noSubscription").css("visibility", "visible") : t(".pyInfo.noAuth").css("visibility", "visible").find(".cnt").text(e.subscription), !e || t("#lSTH").text(e.user).attr("href", "http://steamtraderhelper.com/user/profile/")
        }(n().auth()), t("title").text("STH v" + n("version"));
        var f = function(e) {
            var n;
            return r ? e : (n = 30 - t(".b_on:checked").size(), n < 0 ? !1 : "object" == typeof e ? e.slice(0, n) : e)
        };
        t("#str").click(function(e, r) {
            var i = n("start");
            r || (i = n("start", !i)), t(this)[(i ? "add" : "remove") + "Class"]("go")
        }), !n("start") || t("#str").trigger("click", !0), t(window).load(function() {
            a()
        }), ! function() {
            var r = function(e, n, r) {
                    var i = t("#" + e),
                        s = new tpl(i.is("link") ? t("body", i[0].import).html() : i.text()),
                        o = t(s.data(n)).insertAfter(i);
                    !r || r.call(o, n), r = null
                },
                i = n().authS(),
                s = n().auth(),
                o = n("isPay");
            o && t("body").addClass("payShow"), r("widgetSteam", i ? {
                href: "https://steamcommunity.com/profiles/" + i.id,
                name: i.name,
                isLogin: "yas"
            } : {
                href: "https://steamcommunity.com/login/home/",
                name: "Steamcommunity Login",
                isLogin: "no"
            }, function() {
                var e = this,
                    r = t(".status", e);
                setInterval(function() {
                    r.html(n().stimStatus())
                }, 3e3)
            }), !o || r("widgetTools", {
                loadDisabled: s.backap ? "" : "disabled"
            }, function() {
                t("#wImport").click(function() {
                    falert("<h2>Load proccess</h2><p>Loading data from server..."), n().import().process(function(e) {
                        falert("<h2>Load proccess</h2><p>Processing is completed at - " + e + "%")
                    }).end(function(t) {
                        e.location.reload()
                    })
                }), t("#wExport").click(function() {
                    falert("<h2>Expect...</h2><p>The process of export."), n().export().end(function(t) {
                        t ? e.location.reload() : falert("<h2>warning</h2><p>export will fail", "Ok")
                    })
                })
            }), t.get("http://steamtraderhelper.com/top_link.json", {}, function(e) {
                t.each(e || {}, function(e, n) {
                    t("<a>", {
                        target: n.target,
                        href: n.href,
                        text: n.text
                    }).appendTo("#lTop")
                })
            }, "json"), r("widgetHistory", function() {}), r("widgetOptions", o ? {
                pay: "Show"
            } : {
                pay: "Hidn"
            }, function() {
                var e = this,
                    r = "#wOptionsChkJSON,#wOptionsChkHTML",
                    i = t(r + "," + "#wOptionsRadPP," + "#wOptionsRate," + "PageC,Page,NL".split(",").map(function(e) {
                            var t = "#wOptions";
                            return t + "Chk" + e + "," + t + "Rate" + e
                        })).change(function() {
                        var e = this;
                        t(e).is(".ch_in_g") && !t(".ch_in_g:checked").length && t(e).prop("checked", !0), n("data")[e.id] = e.type === "checkbox" ? e.checked ? "1" : "" : e.type === "radio" ? t("#" + e.id + ":checked").val() : e.value
                    }).each(function() {
                        var e = n("data")[this.id],
                            r = this;
                        r.type === "checkbox" ? t(r).prop("checked", !!e) : r.type === "radio" ? t("#" + r.id + (e ? "[value=" + e + "]" : ":first")).prop("checked", !0) : !e || t(r).val(e)
                    });
                i.filter(r).change(function(e, n) {
                    n || this.checked || t(r).not(this).prop("checked", !0).trigger("change", !0)
                }).filter("#wOptionsChkJSON").trigger("change"), i.filter("#wOptionsRate").change(function() {
                    t(".custom")[this.value !== "C" ? "attr" : "removeAttr"]("disabled", "")
                }).add(t(".ch_in_g").first()).trigger("change")
            }), t(".doMin").click(function() {
                t(this).closest('[class*="widget"]').toggleClass("min")
            })
        }(), e.chk(s), ! function(r) {
            t("#chDel").click(function() {
                var t = r;
                t.length && (e.DB("DELETE FROM item WHERE id in (" + r + ")", c), e.DB("DELETE FROM _item WHERE id_item in (" + r + ")"), n("B").remove(t), $I(t).remove(), r.splice(0, r.length)), console.log(r), showGr()
            }), t("#chGrp").click(function() {
                var t = r;
                t.length && e.DB("SELECT DISTINCT id_group FROM item WHERE id_group>0 AND id in (" + t + ")", function(n, r) {
                    r.rows.length == 1 ? r.rows.item(0).id_group : e.DB.group.insert({
                        name: "New group",
                        type: 0
                    }, function(n, r) {
                        var i = r.insertId;
                        e.DB.item.update(t, {
                            id_group: i
                        }), a()
                    })
                })
            }), t("#chUGrp").click(function() {
                !r.length || e.DB.item.update(r, {
                    id_group: 0
                }, c), a()
            }), t("#chBOn").click(function() {
                var i = f(r);
                i && (n("B").add(r), e.DB.item.update(i, {
                    b_on: 1
                }, function() {
                    t(".b_on", $I(i)).prop("checked", !0), i = null, l()
                }))
            }), t("#chBOff").click(function() {
                var i = r;
                n("B").remove(i), e.DB.item.update(i, {
                    b_on: 0
                }, function() {
                    t(".b_on", $I(i)).prop("checked", !1), i = null, l()
                })
            }), t("#chBSum").change(function() {
                var i = rePrice(this.value || 0),
                    s = r;
                !i || e.DB.item.update(s, {
                    b_summ: i
                }, function() {
                    t(".b_Budget", $I(s)).val(Price(i)), n("B").update(s), i = s = null
                }), this.value = ""
            }), t("#chBCnt").change(function() {
                var i = Math.floor(this.value * 1 || 0),
                    s = r;
                !i || e.DB.item.update(s, {
                    b_cnt: i
                }, function() {
                    t(".b_Count", $I(s)).val(i), n("B").update(s), i = s = null
                }), this.value = ""
            }), t("#chSSum").change(function() {
                var t = rePrice(this.value || 0),
                    n = r;
                !t || e.DB.item.update(n, {
                    s_summ: t
                }, function() {
                    $I(n).find(".s_Receive").val(Price(t)), $I(n).find(".s_Pays").val(Price(B.getProc(t))), t = n = null
                }), this.value = ""
            }), t("#chSSumProc").change(function() {
                var t = this.value * 1 || 0,
                    n = r;
                !t || (t = t / 100 + 1, e.DB.item.select(function(n, r) {
                    var i = r.rows.length,
                        s, o;
                    for (; i--;) s = r.rows.item(i), o = Math.floor(s.b_summ * t), e.DB.item.update(s.id, {
                        s_summ: o
                    }), $I(s.id).find(".s_Receive").val(Price(o)), $I(s.id).find(".s_Pays").val(Price(B.getProc(o)))
                }, "id in(" + n + ")")), this.value = ""
            }), t("#chSSumR").change(function() {
                var t = rePrice(this.value || 0),
                    n = r,
                    i = B.getReProc(t);
                !t || !i || e.DB.item.update(n, {
                    s_summ: i
                }, function() {
                    $I(n).find(".s_Receive").val(Price(i)), $I(n).find(".s_Pays").val(Price(B.getProc(i))), i = n = null
                }), this.value = ""
            }), t("#chSOn").click(function() {
                var i = r;
                n().S.add(r), e.DB.item.update(i, {
                    s_on: 1
                }, function() {
                    t(".s_on", $I(i)).prop("checked", !0), i = null, l()
                })
            }), t("#chSOff").click(function() {
                var i = r;
                n().S.remove(r), e.DB.item.update(i, {
                    s_on: 0
                }, function() {
                    t(".s_on", $I(i)).prop("checked", !1), i = null, l()
                })
            }), t("#chBSumR").change(function() {
                var n = rePrice(this.value || 0),
                    i = r;
                !n || e.DB.item.update(i, {
                    b_summ: n
                }, function(e, r) {
                    t(".b_Budget", $I(i)).val(Price(n)), n = i = null
                }), this.value = ""
            }), t(".inpRight,.inpLeft").focus(function() {
                t(this).addClass("focus").siblings("input").addClass("noFocus")
            }).focusout(function() {
                t(this).removeClass("focus").siblings("input").removeClass("noFocus")
            })
        }(s), ! function() {
            function r() {
                t(".item").each(i)
            }

            function i(e, t) {
                s(t, {
                    sort: e
                })
            }

            function s(t, n, r) {
                var i = t.dataset.id;
                return e.DB.item.update(i, n, function() {
                    r && r(i), r = i = null
                }), i
            }
            n("on", "edit:page", function(t) {
                e.DB.item.select(function(e, t) {
                    var n = t.rows.length ? t.rows.item(0) : null;
                    n && $I(n.id).find(".b_Count").val(n.b_cnt)
                }, {
                    id: t
                })
            }), t(e.document).on("change", ".b_Count", function() {
                var e = this;
                s(e, {
                    b_cnt: e.value = Math.floor(e.value * 1 || 0)
                }, function(e) {
                    n("B").update(e)
                })
            }).on("change", ".b_Budget", function() {
                var e = this,
                    t = rePrice(e.value || 0);
                e.value = Price(t), s(e, {
                    b_summ: t
                }, function(e) {
                    n("B").update(e)
                })
            }).on("change", ".b_on", function() {
                var e = this,
                    r = f(e.checked);
                n("B")[r ? "add" : "remove"](s(e, {
                    b_on: r ? 1 : 0
                })), t(e).prop("checked", r)
            }).on("change", ".s_Receive", function(e, n) {
                var r = this,
                    i = n ? n : rePrice(r.value || 0);
                r.value = Price(i), t(r).closest("tr").find(".s_Pays").val(Price(B.getProc(i))), s(r, {
                    s_summ: i
                })
            }).on("change", ".s_Pays", function() {
                var e = this,
                    n = rePrice(e.value || 0);
                t(e).closest("tr").find(".s_Receive").trigger("change", B.getReProc(n))
            }).on("change", ".s_on", function() {
                var e = this,
                    t = e.checked;
                n().S[t ? "add" : "remove"](s(e, {
                    s_on: t ? 1 : 0
                }))
            }).click().on("click", ".move-up", function() {
                var e = t(this).closest(".item"),
                    n = e.prev(".item");
                !n.length || (e.insertBefore(n), r())
            }).on("click", ".move-down", function() {
                var e = t(this).closest(".item"),
                    n = e.next(".item");
                !n.length || (n.insertBefore(e), r())
            })
        }(), ! function() {
            function n(n, r) {
                var i = t(n).closest(".grp"),
                    s = i.data("id");
                return e.DB.group.update(s, r), i
            }
            t(e.document).on("click", "#Group .close", function() {
                var e = this;
                t(e).closest(".grp").removeClass("grp_1").addClass("grp_0").nextAll(".item").remove(), n(e, {
                    open: 0
                })
            }).on("click", "#Group .open", function() {
                var e = this,
                    r = t(e).closest(".grp").removeClass("grp_0").addClass("grp_1").data("id");
                n(e, {
                    open: 1
                }), a(r)
            }).on("change", "#Group .grp-inp", function() {
                var e = this;
                n(e, {
                    name: e.value || ""
                }), a()
            }).on("click", "#Group .grp-col-sel i", function() {
                var e = t(this),
                    r;
                for (r = 0; r < 18; ++r) e.is(".col_" + r) && (n(e, {
                    type: r
                }), a())
            })
        }();
        var h = !1;
        t(e).load(function() {
            var n, r = t("<div>", {
                    "class": "bMove"
                }).appendTo(".t-s"),
                s = 0,
                o = {
                    top: 0,
                    left: 0
                },
                u = t(),
                a = function(e) {
                    return u.removeClass("fff").filterY(e).addClass("fff")
                };
            t(e.document).on("mousemove", function(e) {
                var t = e.pageY;
                !h || (o = {
                    top: t,
                    left: 0
                }, r.css(o), a(t))
            }).on("mouseup", function(t) {
                var s;
                !h || (s = u.filter(".fff").removeClass("fff"), s.after(h), s.is(".grp") || (s = s.prevAll(".grp")), s.is(".grp") && (e.DB.item.update(h.data("id"), {
                    id_group: s.data("id") || 0
                }), i(s.data("id"))), h.css({
                    opacity: ""
                }), h = !1, r.css({
                    left: "-100%"
                }), !n || clearTimeout(n), c())
            }).on("mousedown", ".move", function(e) {
                s = 0, !n || clearTimeout(n), o = {
                    top: e.pageY + s,
                    left: 0
                }, h = t(this).closest("tr"), n = setTimeout(function() {
                    h && (h.css({
                        opacity: .1
                    }), u = t(".t-s tr").not(h), r.css(o))
                }, 300)
            })
        }), ! function() {
            var e = {
                n: "name",
                b: "b_summ",
                s: "s_summ"
            };
            t(".t-h .sort").click(function() {
                var t = this.dataset.t;
                e[t] && a(0, e[t])
            }), t(".t-h .reSort").click(function() {
                var t = this.dataset.t;
                e[t] && a(0, e[t] + " DESC")
            })
        }(), t("#AddUrl").click(function() {
            var e = t("#AddUrl_text"),
                r = e.val();
            r && /(https|http):\/\/steamcommunity.com\/market\/listings\/([0-9]+)\/(.+)/.test(r) ? (e.val(""), n().addUrl(r)) : (e.focus().addClass("error"), setTimeout(function() {
                t("#AddUrl_text").removeClass("error")
            }, 2e3))
        });
        var d = -1,
            v = setInterval(function() {
                var i = now(),
                    o = t(".item .inp:focus").closest(".item").find(".Prise").fView().each(function() {
                        var e = this.dataset;
                        i < (e.time || 0) || (e.time = i + 6e4, t(this).getPrice(n("authS")()))
                    });
                i = null;
                if (n("start")) {
                    var u = t(".item").fView();
                    u.find(".Prise").not(o).fView().each(function() {
                        var e = n().B.getCnt(this.dataset.id);
                        e === null || t(this).val(e)
                    }), u.find(".Prise").not(o).fView().each(function() {
                        var e = n().B.getPrice(this.dataset.id);
                        t(this).text(e ? Price(e) : "-")
                    })
                }!n("authS")() || t("#balance").text(n("authS")().balance), e.DB("SELECT count(id) c, sum(b_on) b,sum(s_on) s FROM item", function(e, i) {
                    var o, u = n("stat"),
                        f, l;
                    t("#stat").html(i.rows.length ? (o = i.rows.item(0), d == -1 || d === o.c || a(), s.max_length = d = o.c, f = o.b || 0, l = o.s || 0, ["items: " + o.c, r ? '<span class="footer_b">on: ' + f + "</span>" : '<span class="footer_b">on: ' + f + "</span>/30", '<span class="footer_b">found: ' + u.found + "</span>", '<span class="footer_b">bought: ' + u.bought + '</span><span class="pay">', '<span class="footer_s">on: ' + l + "</span>", '<span class="footer_s">for sale: ' + u.sale + "</span></span>", '<span class="footer_e">errors: ' + u.errors + "</span>"].join(" &nbsp;|&nbsp; ")) : "..."), u = o = null
                }), r == n("isPay") || e.location.reload()
            }, 3e3);
        e.onbeforeunload = function() {
            clearInterval(v), n("on").off("edit:page"), e.DB = d = t = n = null
        }
    })
}(this);
var w = this,
    rePrice = function(e) {
        return typeof e != "string" || (e = e.replace(",", ".")), Math.ceil(e * 100)
    },
    falert = function(e, t) {
        var n = $("#falert");
        e ? (n.show().html(e), t && $('<i class="btn" id="wExport"><i>Ok</i></i>').appendTo(n).click(function() {
            falert()
        })) : n.hide()
    },
    Price = function(e) {
        var t = e / 100;
        return t
    },
    B = {
        getProc: function(e) {
            return Math.max(e, 1) + Math.max(Math.floor(e * .1), 1) + Math.max(Math.floor(e * .05), 1)
        },
        getProcPr: function(e) {
            return this.getProc(rePrice(e))
        },
        getReProc: function(e) {
            var t = Math.max(Math.floor(e / 115 * 10), 1) + Math.max(Math.floor(e / 115 * 5), 1);
            return Math.max(e - t, 3)
        },
        getReProcPr: function(e) {
            return this.getProc(rePrice(e))
        }
    },
    $G = function(e) {
        var t = "#gr_";
        return $(t + (e.join ? e.join("," + t) : e))
    },
    $I = function(e) {
        var t = "#item_";
        return $(t + (e.join ? e.join("," + t) : e))
    },
    tpl = Class({
        t: "",
        f: null,
        constructor: function(e) {
            var t = this;
            t.t = e, t.f = (e.match(/\{\{([\s\S]+?)\}\}/gm) || []).map(function(e) {
                return {
                    n: (e.match(/\{\{([\s\S]+?)\}\}/) || []).pop(),
                    m: e
                }
            })
        },
        data: function(e) {
            var t = {},
                n = this,
                r = n.f.length,
                i = n.t,
                s;
            for (; r--;) s = n.f[r], i = i.replace(s.m, e[s.n]);
            return i
        }
    }),
    gr = function() {
        var e = new tpl($("#group").text());
        return function(n) {
            var r = e.data(n);
            return r
        }
    }();
! function(e) {
    e.fn.getPrice = function(e) {
        var t, n = this.data(),
            r = n.url;
        e && r ? (t = this, ajax("http://steamcommunity.com/market/priceoverview/?country=" + e.country + "&currency=" + e.currency + "&" + r, function(e) {
            n.t = now(), t.html((n.p = JSON.parse(e).lowest_price) || "-"), n = t = null
        })) : this.text("-")
    }, e.fn.filterY = function(t) {
        return this.filter(function() {
            var n = e(this),
                r = n.offset().top,
                i = n.height();
            return r < t && r + i > t
        })
    }, e.fn.fView = function() {
        if (!this.length) return this;
        var t = 0,
            n = e(w).height();
        return this.filter(function() {
            var r = e(this).offset().top;
            return t < r + e(this).height() && n > r
        })
    }, e.fn.some = function(e, t) {
        var n;
        for (var r = 0, i = this.length; r < i; r++)
            if (this.hasOwnProperty(r)) {
                typeof t == "undefined" ? n = e(this[r], r, this) : n = e.call(t, this[r], r, this);
                if (n) return !0
            }
        return !1
    }
}(w.jQuery)