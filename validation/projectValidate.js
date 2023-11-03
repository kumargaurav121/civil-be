const { validateEmail } = require('../utils/fieldChecks')

addProjectValidation = (req, res, next) => {
    const {name, descripiton, status} = req.body;

    next()
}

module.exports = { addProjectValidation }