! function(e) {
    function i(e) {
        var t = document.createElement("script");
        t.src = chrome.extension.getURL(e), (document.head || document.documentElement).appendChild(t), t.onload = function() {
            t.parentNode.removeChild(t), t = null
        }
    }
    var t = "Add in STH",
        n = e("<a>", {
            hrf: "#",
            "class": "sth_link sthb",
            title: t
        }),
        r = function(t) {
            var n = this;
            return chrome.extension.sendMessage({
                url: t.data.href,
                "do": "add"
            }, function(t) {
                e(n).addClass("activ")
            }), !1
        };
    ! function() {
        setInterval(function() {
            e("#iteminfo0_item_market_actions a,#iteminfo1_item_market_actions a").not(".item_market_action_button,.sth_link,.steamtraderhelper_inventory").each(function() {
                n.clone().appendTo(this).bind("click", {
                    href: e(this).addClass("steamtraderhelper_inventory").attr("href")
                }, r)
            })
        }, 1e3)
    }(), ! function() {
        if (!e("#searchResultsRows").size() && !e("#searchResultsRows .market_listing_row_link .market_listing_right_cell.market_listing_num_listings").size()) return;
        setInterval(function() {
            e("#searchResultsRows .market_listing_row_link").not(".steamtraderhelper").each(function() {
                n.clone().appendTo(this).bind("click", {
                    href: this.href
                }, r), e(this).addClass("steamtraderhelper")
            })
        }, 3e3)
    }(), ! function() {
        e(".market_listing_largeimage").each(function() {
            n.clone().appendTo(this).appendTo(this).bind("click", {
                href: window.location.href
            }, r)
        })
    }(), i("site/inventory.js")
}(jQuery), ! function(e) {
    var t;
    sendMessage = function(e) {
        chrome.extension.sendMessage(e)
    }, chrome.runtime.onMessage.addListener(function(n, r, i) {
        console.log(n);
        if (t) i({
            res: "busy",
            id: n.id
        });
        else if (n.type == "sell") {
            t = !0;
            var s = n.assetid;
            e.ajax({
                url: "https://steamcommunity.com/market/sellitem/",
                type: "POST",
                data: {
                    sessionid: n.sessionid,
                    appid: n.appid,
                    contextid: n.contextid,
                    assetid: n.assetid,
                    price: n.price,
                    amount: n.amount || 1
                },
                crossDomain: !0,
                xhrFields: {
                    withCredentials: !0
                },
                success: function(e) {
                    sendMessage({
                        assetid: s,
                        "do": "ajax",
                        type: "ok"
                    })
                }
            }).done(function(e) {
                sendMessage({
                    assetid: s,
                    "do": "ajax",
                    type: "done"
                })
            }).fail(function(e) {
                sendMessage({
                    assetid: s,
                    "do": "ajax",
                    type: "fail",
                    status: e.status
                })
            }).always(function() {
                t = s = null
            }), i({
                res: "sell",
                i: s
            })
        } else if (n.type == "buy") {
            if (!(n && n.sessionid && n.currency && n.subtotal)) {
                i({
                    res: "BrdRequest",
                    i: n.i
                });
                return
            }
            t = !0, i({
                res: "ajax",
                i: n.i
            }), e.ajax({
                url: "https://steamcommunity.com/market/buylisting/" + n.listingid,
                type: "POST",
                data: {
                    sessionid: n.sessionid,
                    currency: n.currency,
                    subtotal: n.subtotal,
                    fee: n.fee,
                    total: n.subtotal + n.fee,
                    quantity: n.quantity
                },
                crossDomain: !0,
                xhrFields: {
                    withCredentials: !0
                }
            }).done(function(e) {
                chrome.extension.sendMessage({
                    "do": "pay",
                    res: "good",
                    id: n.id
                }), console.log(e)
            }).fail(function(e) {
                chrome.extension.sendMessage({
                    "do": "pay",
                    res: "bad",
                    id: n.id,
                    message: (e.responseJSON || {
                        message: "No message"
                    }).message
                })
            }).always(function() {
                t = n = null
            })
        }
    })
}(jQuery)