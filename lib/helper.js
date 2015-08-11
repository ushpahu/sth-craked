! function(e) {
    if (e.HAL) return;
    var t = chrome.runtime.getManifest();
    locale = t.current_locale || t.default_locale, version = t.version, obj = e.HAL = function() {}, obj.version = version
}(this)