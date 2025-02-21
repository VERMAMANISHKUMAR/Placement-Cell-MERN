const Employee = require('../models/EmployeeSchema');
const validator = require('validator');

// Render SignIn Page
module.exports.SignInPage = async function (req, res) {
    return res.render('signIn', {
        title: "SignIn"
    });
};

// Handle SignIn Logic
module.exports.SignIn = async function (req, res) {
    try {
        req.flash('success', 'Sign In Successfully');
        return res.redirect('/employee/dashboard');
    } catch (error) {
        console.error("Error during sign in:", error);
        return res.send('<h1>Error in SignIn</h1>');
    }
};

// Render SignUp Page
module.exports.createSessionPage = async function (req, res) {
    return res.render('signUp', {
        title: "Sign Up",
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: ""
    });
};

// Handle SignUp Logic
module.exports.createSession = async function (req, res) {
    const { firstname, lastname, email, password } = req.body;

    try {
        // Validation for first name
        if (!firstname || !isNaN(firstname)) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: 'First name cannot be blank or a number',
                lastNameError: "",
                emailError: "",
                passwordError: ""
            });
        }

        // Validation for last name
        if (!lastname || !isNaN(lastname)) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: "",
                lastNameError: 'Last name cannot be blank or a number',
                emailError: "",
                passwordError: ""
            });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: "",
                lastNameError: "",
                emailError: 'Please enter a valid email address',
                passwordError: ""
            });
        }

        // Password validation
        if (password.length < 2) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: "",
                lastNameError: "",
                emailError: "",
                passwordError: 'Password must be at least 2 characters long'
            });
        }

        // Check if employee already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            req.flash('error', 'Employee already exists');
            return res.redirect('/');
        }

        // Register the new employee
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        req.flash('success', 'Sign Up Successful!');
        return res.redirect('/');
        
    } catch (error) {
        console.error("Error during sign up:", error);
        return res.send('<h1>Error in SignUp</h1>');
    }
};

// Handle SignOut Logic
module.exports.SignOut = async function (req, res) {
    req.logout();
    req.flash('success', 'Sign Out Successfully');
    return res.redirect('/');
};
