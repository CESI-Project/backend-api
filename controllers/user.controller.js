const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.getUser = async (req, res, next) => {
    const {
        params: { id },
    } = req;

    try {
        const user = await User.findOne({ _id: id });
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
          success: false,
          error: error.message,
        });
    }
};

exports.signup = async (req,res, next) => {
    const {
        body: {
            email,
            password,
            firstName,
            lastName,
            phone,
            address,
            postalCode,
            city,
            country
        }
    } = req;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            address,
            postalCode,
            city,
            country
        });
        await user.save();
        res.status(201).json({
            message: "User has been created."
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
};

exports.signupRestaurant = async (req,res, next) => {
    const {
        body: {
            email,
            password,
            firstName = "",
            lastName = "",
            phone,
            address,
            postalCode,
            city,
            country,
            restaurant
        }
    } = req;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await new User({
            email,
            password: hashedPassword,
            role: "Restaurant",
            phone,
            address,
            postalCode,
            city,
            country,
            firstName,
            lastName,
            restaurant
        });
        await user.save();
        res.status(201).json({
            message: "User has been created."
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
};

exports.login = async (req,res, next) => {
    const {
        body: {
            email,
            password
        }
    } = req;

    try {
        const user  = await User.findOne({
            email: email
        });
        
        if (!user) {
            return res.status(401).json({message: "Un utilisateur ayant cette adresse mail existe déjà."})
        }

        try {
            const isSamePassword = await bcrypt.compare(password, user.password)
            if (!isSamePassword) {
                res.status(401).json({message: "Le mot de passe ou l'identifiant ne sont pas corrects."})
            }
            else {                
                res.status(200).json({
                    userId: user._id,
                    role : user.role,
                    token: jwt.sign(
                        {userId: user._id},
                        process.env.SECRET_TOKEN,
                        ...(user.restaurant),
                        {expiresIn: '4h'}
                    )
              });
            }   
        }
        catch (error) {
            res.status(500).json({ error });
        }

    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
};

// exports.createUser = async (req, res, next) => {
//     try {
//         const user = new User({
//             ...req.body
//         });
    
//         console.log("req.body ", req.body)
    
//         await user.save()
//         res.status(201).json({message:"User is registered."})
//     }
//     catch (error) {
//         res.status(400).json({error});
//     }
// };

exports.updateUser = async (req, res, next) => {
    const {
        params: { id },
    } = req;

    try {
        const user = await User.findOne({ _id: id});
        if ( !user ) { res.status(404).json({message:"User not found."})};

        await User.updateOne({ _id: id }, {...req.body, _id: id})
        res.status(200).json({message:"User is updated."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};

exports.deleteUser = async (req, res, next) => {
    const {
        params: { id },
    } = req;

    try {
        const user = await User.findOne({ _id: id});
        if ( !user ) { res.status(404).json({message:"User not found."})};
        
        await User.deleteOne({ _id: id })
        res.status(200).json({message:"User is deleted."})
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          error: error.message,
        });
    }
};