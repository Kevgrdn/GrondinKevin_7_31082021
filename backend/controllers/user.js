const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


//Appelle le modèle
const model = require("../models/models")


//Inscription
exports.signup = (req, res, next) => {
    //Bcrypt va hasher le mot de passe 10x afin de s'assurer de la sécurité des données.
    console.log(req.body.name)
    
    bcrypt.hash(req.body.password, 10)
    
    //Crée un nouvel utilisateur et hash le mot de passe
    .then(hash => {
        const user = new model.User({
            name: req.body.name,
            firstname: req.body.firstName,
            email: req.body.email,
            password: hash,
            imageUrl: '',
            is_moderator: 0
    });
    
    //Puis l'utilisateur va etre enregistré dans la base de données
    user.save()
        .then(() => { 
            res.status(201).json({ message: 'Utilisateur créé !' })})
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


//Connexion au site
exports.login = (req, res, next) => {
    //Vérifie s'il utilisateur existe bien
    model.User.findOne({
        where:{
            email: req.body.email
        }  
    })
    .then(user => {

        //S'il n'existe pas : "Utilisateur non trouvé"
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
       
        //Si il existe, compare les mots de passe
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
            
            //Si les mots de passe ne sont pas les mêmes : "Mot de passe incorrect"
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
           
            //Si les mots de passe concordent, renvoie un TOKEN d'authentification
            res.status(200).json({
                user: user,
                message: 'Connexion réussie !',
                token: jwt.sign( {userId: user.id}, process.env.TOKEN, { expiresIn: '24h'} )
            })})
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Afficher tous les utilisateurs
exports.getAllUsers = (req, res, next) => {

    model.User.findAll()
       .then(post => res.status(200).json(post))
       .catch(error => res.status(400).json({ error }));
  };