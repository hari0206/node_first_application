
module.exports = (req, res) => {
    if (req.session && req.session.user) {
        res.render('dashboard', {
            name: req.session.user.name,
            email: req.session.user.email,
            phoneNumber: req.session.user.phoneNumber,
            age: req.session.user.age
        });
    } else {
        res.render('index');
    }
}