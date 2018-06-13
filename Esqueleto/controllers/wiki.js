// wiki.js - Wiki route module

module.exports = {
  // Home page route
  home : function(req, res) {
    res.render('test/pages/index.ejs');
  },

  // About page route
  about : function(req, res) {
    res.render('test/pages/about.ejs');
  }
}

