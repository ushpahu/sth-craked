function debounce(e, t, n) {
    var r;
    return function() {
        if (!r || new Date - r >= t) return r = new Date, e.apply(this, arguments);
        if (n) return n.apply(this, arguments)
    }
}