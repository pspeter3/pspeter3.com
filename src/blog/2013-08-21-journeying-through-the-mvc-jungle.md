---
title: "Journeying Through the MVC Jungle"
---

To give some context before I start, I primarily work on application servers, starting in Ruby with [Rails](http://rubyonrails.org/) and [Padrino](http://www.padrinorb.com/) and now working with [Express](http://expressjs.com/) and [Play!](http://www.playframework.com/). I wanted to learn how to make single page JavaScript applications to display the data I returned from my RESTful backends. Here is what I found so far.

## Backbone

[Backbone](http://backbonejs.org/) seems to be the C of client side frameworks. It gives you the bare minimum above the ES5 spec with underscore and then provides an eventing system for components to interact on the page. I found that Backbone was the most effective when used for progressive enhancement. The dependency on jQuery or Zepto and not specifying how data should be rendered makes it easy of Backbone to literally become the backbone for your jQuery event handling. Views in backbone essentially become the controllers and handle client events and bind it with the models and the collections.

Actually using Backbone for a single page application became harder. How to manage the code base and router is not intuitively clear. The biggest issue is managing [Zombie Views](http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/) and the instances in memory of every model, view and collection. That being said, Backbone's light footprint when using Zepto, Lodash, Backbone and JST is pretty awesome. One trick I found for adding mixin functionality was the code below:

```js
/**
 * Takes a Backbone object and calls extend with all of the traits merged
 * @param {Object} clazz The Backbone Class
 * @return {Object} The extended backbone class
 */
var withTraits = function (clazz) {
  var args = [].slice.call(arguments).slice(1);
  var traits = {};
  _.each(args, function (trait) {
    _.extend(traits, trait);
  });
  return clazz.extend(traits);
};

// Assume you have an object Commentable
var Post = withTraits(Backbone.Model, Commentable, {
  url: "/api/v1/posts",
});
```

## Ember

[Ember](http://emberjs.com/) was my next framework that I tried out. I want to start out by saying that I think Ember is an amazing piece of technology. When you first start out, everything just works. You type a little bit of code and all of a sudden you have a webapp. However, all of this comes at a cost. Ember's footprint is rather large and has hard dependencies on jQuery and Handlebars. While Handlebars is understandable since most webapps use it as the templating language of choice, not being able to switch out jQuery for Zepto makes it a hard choice for mobile. Once Ember downloads and starts running, it actually inflates all of those little lines of code into memory through various auto-generated support objects. This is fine but I worry about the performance on mobile. The Ember teams seems to be aware of this and is working hard to improve performance for Ember.

The one downside in the Ember story right now is how you actually connect data to it. The Ember team claims you don't need Ember Data but all of the documentation assumes it. There are a bunch of 3rd party modules out there but they assume a lot about the structure of your backend and force you to massage your data into that format. This works fine out of the box for most SQL backends coupled with Rails apps but starts to become problematic when you have nested documents with MongoDB. Having Ember Data be ready for production and be flexible in receiving data from the backend will help out Ember a lot.

Finally, I think Ember is amazing and probably the right choice for larger teams working on a large scale desktop only application. That's probably fine too. If you have an application that large, it's probably worth building a native mobile app which mitigates the concerns for Ember on mobile.

## Angular

[Angular](http://angularjs.org/) is my last stop on the journey and seems to be awesome. Initially, I was terrified because none of my jQuery/Zepto plugins worked. How was I supposed to use Bootstrap or Foundation? After exploring and playing around with Angular, I found myself not really wanting to write Bootstrap or Foundation markup and just do my own thing. As a result, my apps have been smaller than anything I wrote in the other two frameworks.

Angular is definitely a weird framework and involves a lot of new concepts which can be intimidating for developers who are not JavaScript experts. That being said, I think it represents where the web is going. With ES6 and Object.observe, Backbone and Ember's getters and setters just seem antiquated because of the native event binding. Web Components seem to be more powerful directives given that they have their own CSS scope and finally the `<template>` tag seems to have the Angular data binding syntax.

## TL;DR

All of the frameworks are awesome and have their own use case. Backbone is great for adding structure and progressive enhancement to an already existing page, Ember is great for large scale desktop applications, and Angular is just fun once you get the hang of it.
