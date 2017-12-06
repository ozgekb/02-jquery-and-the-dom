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
  let $newArticle = $('article.template').clone();
  $newArticle.removeClass('template');
  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  $newArticle.find('a').html(`${this.author}`);
  $newArticle.find('h1').html(`${this.title}`);
  $newArticle.find('.article-body').html(`${this.body}`);
  $newArticle.find('a').attr('href', `${this.authorUrl}`);
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});



rawData.forEach(function(rawData) {
  articles.push(new Article(rawData));
});

articles.forEach(function(articles){
  $('#articles').append(articles.toHtml());
});
