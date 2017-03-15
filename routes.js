var express = require('express');
var router = express.Router();
// GET /
router.get('/', function(req, res, next) {
    let sections = [
        {
             header : "Un Sacré template",
             body : "De quoi faire changé toute la conception",
             footer : "Par Vol4n3"
        },
        {
             header : "Un Sacré template2",
             body : "[wrap=50][vimeo=203914095][wrap=20][soundcloud=https://soundcloud.com/valentin-perez/snoop-dogg-the-eastsidaz-gd-up-pandrezz-g-funk-remix][/wrap][h1]De quoi  faire [color=ffffff] <faille> [font=arial]changé[/font]  la [right]toute[/right] conception[/color][/h1][wrap=30][youtube=DbJZJCkcs3U][/wrap][wrap=30][dailymotion=x5drl3m][/wrap][/warp]",
             footer : "Par Vol4n3"
        },
    ]
    let render = { 
        title : "Home", 
        sections :  sections
}
    return res.render('home.pug', render);
});
module.exports = router;