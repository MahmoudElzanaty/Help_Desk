const bcrypt = require('bcryptjs'); // hat3ml require lel bcrypt
const jwt = require('jsonwebtoken'); // hat3ml require lel jsonwebtoken
const Communication = require('../models/CommunicationModel'); // hat3ml require lel communication model
const FAQ = require('../models/FAQModel'); // hat3ml require lel FAQ model
const Report = require('../models/ReportModel'); // hat3ml require lel Report model
const Ticket = require('../models/Ticket_Model'); // hat3ml require lel Ticket model
const User = require('../models/userModel'); // hat3ml require lel User model
const Workflow = require('../models/Workflow_Model'); // hat3ml require lel Workflow model
const secretKey =process.env.SECRET_KEY ;
require('dotenv').config();


const UserController = {
    createUser: async (req, res) => {
        try {
        const { user_id, Email, is_Agent, is_Manager, Phone_Number, Rate } = req.body; // Get input data from request body

        const existingUser = await User.findOne({ Email }); // dawar 3la el user de bel user id bta3o
        if (existingUser) { // law mawgod yb2a mawgod ba2a
            return res.status(409).json({ error: 'User already exists' });
        }

    
        if (!user_id || !Email) { // 2takd en el user id w el email msh mawgoden yb2a msh mawgoden
            return res.status(400).json({ error: 'Incomplete data for user creation' });
        }

        const newUser = new User({ user_id, Email, is_Agent: is_Agent || false, is_Manager: is_Manager || false, Phone_Number, Rate: Rate || 0,
        }); // betcreate instance mn el user model
        const savedUser = await newUser.save(); // save ybasha fel database
        res.status(201).json(savedUser);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    },
    
    getAllUsers: async (req, res) => {
        try {
        const users = await User.find(); // hatgeb kol el users
        res.status(200).json(users);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;// hatgeb el email w el password mn el request body
            const user = await User.findOne({ email });// dawar 3la el user de bel email bta3o    
            if (!user) { // law msh mawgod yb2a msh mawgod ba2a
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const isManager = user.role === 'manager'; // law el user role bta3o manager yb2a isManager true
            const isAgent = user.role === 'agent'; // law el user role bta3o agent yb2a isAgent true
            const isNormalUser = user.role === 'user'; // law el user role bta3o user yb2a isNormalUser true

            if (!isManager && !isAgent && !isNormalUser) { //law mesh wahed men talata yb2a enta bet3aml eh hena
                return res.status(403).json({ error: 'Access forbidden' });
              }
              const passwordMatch = await bcrypt.compare(password, user.password); // compare el password ely da5al el usero el password ely da5al el usero fel database
              if (!passwordMatch) { // law msh mawgod yb2a enta btsthabl
                return res.status(401).json({ error: 'Invalid credentials' });
              }
              const token = jwt.sign({ userId: user._id, role: user.role }, 'your_secret_key', { expiresIn: '1h' }); // hatgeb el token de mn el user id w el role bta3o w el secret key bta3o w el token de hatkoon valid le 1 hour
              res.status(200).json({ token, role: user.role });
            } catch (error) {
              res.status(500).json({ error: error.message });
            }},
/*
            const token = jwt.sign(
            { users: { user_id: users._id, role: users.role } },
            secretKey,
         {
          expiresIn: 3 * 60 * 60,
         }
            );

            let newSession = new sessionModel({
                userId: user._id,
                token,
                expiresAt: expiresAt,
              });
                await newSession.save();
                return res
                .cokkie("token", token, {
                expires: new Date(expiresAt),
                httpOnly: true,
                withCredentials: true,
                
                })
                .status(200)
                .json({ message: "Logged in successfully" , users });
             
            }catch (error) {
                return res.status(500).json({ error: error.message });
            },
    


*/
    getUserById : async (req, res) => {
        try {
            const user = await User.findById(req.params.id); // hatgeb el user de bel id bta3ha
            
            if (!user) { // law msh mawgod yb2a msh mawgod ba2a
                return res.status(404).json({ error: 'User not found' });
            }
        
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } ,

    updateUserById : async (req, res) => {
        try {
            const { user_id, Email, is_Agent, is_Manager, Phone_Number, Rate } = req.body; // hatgeeb el haga ely enta 3ayz t3ml update 3leha mn el request body
        
            if (!user_id || !Email) {
                return res.status(400).json({ error: 'Incomplete data for user update' });
            }
        
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { user_id, Email, is_Agent: is_Agent || false, is_Manager: is_Manager || false, Phone_Number, Rate: Rate || 0 },
                { new: true } // Return the updated document
            );
        
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
        
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } ,

    deleteUserById : async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id); // ay had mesh 3agbak yb2a hat delete el user de bel id bta3ha
        
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
        
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }



};

module.exports = UserController;
