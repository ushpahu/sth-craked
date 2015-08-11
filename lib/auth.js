! function(e, t) {
    var n = function(e) {
            var t = new XMLHttpRequest;
            return t.open("GET", e, !1), t.send(null), t.responseText
        },
        r = {
            __data: {},
            __t: null,
            get isGost() {
                if (this.__t) return t.get("https://steamcommunity.com/profiles/", function(e) {})
            }
        },
        i = {
            _d: {
                firstname: 'Dmitry',
                lastname: '@ovr',
                nick: '@ovr',
                username: '@ovr',
                password: 'testtesttest'
            },
            get isGost() {
                return _d;
            },
            setData: function(e) {
                if (e) return this._d = e
            }
        }
}(this, $)