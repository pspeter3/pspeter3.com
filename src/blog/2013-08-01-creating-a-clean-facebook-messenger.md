---
title: "Creating a Clean Facebook Messenger"
---

Sometimes you want to use Facebook Messages in a place where having all of Facebook would be
inconvenient and inappropriate. Facebook Messages does support the ability to be used with an XMPP
client but that loses location, read receipts, chat history and stickers. If you want to use the
Messages inbox without the rest of Facebook, run the script below in your JavaScript console or in
the browser bar with `javascript:` at the beginning.

```js
(function () {
    var messenger, nodes, width, columns;
    messenger = document.getElementById("pagelet_web_messenger");
    document.body.appendChild(messenger.parentNode.removeChild(messenger));
    nodes = document.getElementsByClassName("_li");
    for (var i = nodes.length - 1; i >= 0; i--) {
        nodes[i].remove();
    }
    width = messenger.clientWidth;
    columns = document.getElementsByClassName("uiScrollableAreaBody");
    for (var i = columns.length - 1; i >= 0; i--) {
        width -= columns[i].clientWidth;
    }
    width = parseInt(width / 2) + "px";
    messenger.style.paddingLeft = width;
})();
```
