var d, DemonEvent;
d = function() {
    defaults = {
        segments: [],
        title: document.getElementsByTagName("title")[0].innerHTML,
        error: [],
        events: [],
        user: {}
    }, d.prototype.init = function(f) {
        d.prototype.params(), d.prototype.bindEvents(), d.prototype.history(), "undefined" != typeof f && f(d)
    }, d.prototype.params = function() {
        var f = window.location.href;
        f = f.substr(f.indexOf("?") + 1), f.split("&").forEach(d.prototype.getParamArray)
    }, d.prototype.getParamArray = function(f) {
        defaults.segments.push(f)
    }, d.prototype.onComplete = function(f) {
        f(defaults)
    }, d.prototype.onError = function(f) {
        f(defaults.error)
    }, d.prototype.fireEvent = function(f, g) {
        g && defaults.events.push({
            e: g
        }), d.prototype.set()
    }, d.prototype.set = function() {
        var f = new XMLHttpRequest;
        f.open("POST", "/example.com", !0), f.setRequestHeader("Content-type", "application/json"), f.onreadystatechange = function() {
            4 == f.readyState && 200 == f.status || defaults.error.push(f.responseText)
        }, console.log(defaults), f.send(JSON.stringify(defaults))
    }, d.prototype.bindEvents = function() {
        for (var f = document.getElementsByTagName("input"), g = 0; g < f.length; g++) "submit" == f[g].getAttribute("type") && f[g].addEventListener("click", d.prototype.broadcast)
    }, d.prototype.history = function() {
        if ("undefined" != typeof Storage) {
            var g = window.location.href,
                k = -1 === g.indexOf("/foo/") ? -1 === g.indexOf("/bar/") ? {
                    a: 0,
                    b: 0
                } : {
                    a: -1 !== g.indexOf("/bar/"),
                    b: 1
                } : {
                    a: -1 !== g.indexOf("/foo/"),
                    b: 0
                };
            if (k.a) {
                var m = [],
                    n = g.split("/"),
                    o = n.length;
                g = n[o - 1], -1 !== g.indexOf("?") && (g = g.split("?")[0]);
                var r = null;
                if (null !== localStorage.getItem("e"))
                    for (var w, t = JSON.parse(localStorage.getItem("e")), v = 0; v < t.length; v++) w = t[v], r = JSON.parse(w).a == g ? 1 : null, m.push(w);
                null == r && m.push(JSON.stringify({
                    a: g,
                    b: k.b
                })), m.length && localStorage.setItem("e", JSON.stringify(m))
            }
        }
    }, d.prototype.broadcast = function(f) {
        defaults.user.ButtonText = f.srcElement.value, c = d.prototype.parent(f, "form"), c = document.getElementById(c);
        for (var g = 0; g < c.length; g++) "INPUT" == c[g].tagName && c[g].value && (defaults.user[c[g].name] = c[g].value);
        d.prototype.fireEvent("subscribed")
    }, d.prototype.console = function() {
        console.log(defaults)
    }, d.prototype.parent = function(f, g) {
        var k, m;
        if (m = document.getElementById(f.srcElement.id), null !== m && "" !== g) {
            for (k = m.parentNode, g = g.toUpperCase();
                 "HTML" !== k.tagName;) {
                if (k.tagName === g) return k.id;
                k = k.parentNode
            }
            return k
        }
    }
}, demon = new d, DemonEvent = demon;
