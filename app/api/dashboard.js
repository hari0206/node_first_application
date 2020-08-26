module.exports = {
    dashboard: (req, res) => {
        if(req.session && req.session.user) {
            res.render('dashboard', {
                name: req.session.user.name,
                email: req.session.user.email,
                age: req.session.user.age,
                phoneNumber: req.session.user.phoneNumber
            });
        } else {
            res.redirect('/');
        }
    }
}