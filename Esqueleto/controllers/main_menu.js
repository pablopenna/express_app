/** MAIN MENU.js */
/** Renderiza el template main_menu.js que contiene
 * la funcionalidad del menú principal.
 */

 module.exports = {
    menu : function(req, res)
    {
        res.render('angular_main.html');
    },
    about: function(req, res)
    {
        res.render('about.html');
    },
    help: function(req, res)
    {
        res.render('help.html');
    }
 };