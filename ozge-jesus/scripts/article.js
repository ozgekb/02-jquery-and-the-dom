'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
//The Article function is a constructor that creates the prototype of articles. The article has properties :‘title’,‘category’,‘author’,‘authorUrl’,‘publishedOn’,‘body’
//The name is capitalized because that is a naming convention for constructor functions. rawDataObj is a parameter.

function Article (rawData) {
  this.title = rawData.title,
  this.category = rawData.category,
  this.author = rawData.author,
  this.authorUrl = rawData.authorUrl,
  this.publishedOn = rawData.publishedOn,
  this.body = rawData.body
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  //It makes a full copy of the articles and all of its descendent elements.

  let $newArticle = $('article.template').clone();
  $newArticle.removeClass('template');
  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:

      2. author url,

  */

  //$newArticle.attr('author' ,this.author);
  //$newArticle.find('').append(`<a href="">$this.title`)
  $newArticle.find('a').html(`${this.author}`);
  $newArticle.find('h1').html(`${this.title}`);
  $newArticle.find('.article-body').html(`${this.body}`);
  $newArticle.find('a').attr('href', `${this.authorUrl}`);
  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(rawData) {
  articles.push(new Article(rawData));
});

articles.forEach(function(articles){
  $('#articles').append(articles.toHtml());
});


// for(let i = 0; i < articles.length; i++) {
//   $('#articles').append(articles[i].toHtml());
// }
