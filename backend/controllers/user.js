const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


//Appelle le modèle
const model = require("../models/models")


//Inscription
exports.signup = (req, res, next) => {
    //Bcrypt va hasher le mot de passe 10x afin de s'assurer de la sécurité des données.
    console.log(req.body.name)
    if (req.body.email == null || req.body.password == null) return res.status(400)
    bcrypt.hash(req.body.password, 10)
    
    //Crée un nouvel utilisateur et hash le mot de passe
    .then(hash => {
        const user = new model.User({
            name: req.body.name,
            firstname: req.body.firstname,
            email: req.body.email,
            password: hash,
            imageUrl: '',
            is_moderator: 0
    });
    
    //Puis l'utilisateur va etre enregistré dans la base de données
    user.save()
            .then(() => {
                res.status(200).send({ message: 'Utilisateur créé !' })
            })
            .catch(error => {
                console.log(error);
                res.status(400).send({ error })
            })
    })
    .catch(error => res.status(500).send({  error  }))
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

//Affiche un utilisateur
exports.getOneUser = (req, res, next) => {
    model.User.findOne({
       where: { id : req.params.id }
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({error}))
}


//Mise a jour du profil utilisateur
exports.updateUser = (req, res, next) => {
    console.log(req)
    if (req.body.name || req.body.firstname || req.body.email !== "" ) {
        model.User.update({
            email : req.body.email,
            name: req.body.name,
            firstName: req.body.firstname,
            //imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`

        },
            {
            where:{
                id: req.params.id
            }
        })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({error}))
    }
    
    else{
        console.log('error')
    } 
}

exports.updatePhoto = (req,res,next) => {
    model.User.update({
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    },
    {
        where:{
            id:req.params.id
        }
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({error}))
}

//Mise à jour du nom
exports.updateName = (req,res,next) => {
    model.User.update({
        name: req.body.name,
    },
    {
        where:{
            id:req.params.id
        }
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({error}))
}

//Mise a jour du prénom
exports.updateFirstName = (req,res,next) => {
    model.User.update({
        firstname: req.body.firstname,
        
    },
    {
        where:{
            id:req.params.id
        }
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({error}))
}

//Mise a jour du mail
exports.updateMail = (req,res,next) => {
    model.User.update({
        email: req.body.email,
        
    },
    {
        where:{
            id:req.params.id
        }
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({error}))
}

//Mise a jour du mot de passe
exports.updateUserPassword = (req, res, next)=>{ 
    
    //Je cherche l'utilisateur dans la bdd
    console.log(req.body)
    model.User.findOne({ where: {id: req.params.id} })
    .then( user => {
        console.log(user)
        
        //Si je trouve, je compare l'ancien mot de passe envoyé et celui trouvé dans la bdd
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            console.log(valid)
            if(!valid) { //Si les mots de passe de correspondent pas
                return res.status(401).send({ error: "Mot de passe incorrect"})
            }

            //Si les mots de passe correspondent, je crypte le nouveau mp et je l'enregistre
            bcrypt.hash(req.body.password2, 10)
            .then(hash => {
                console.log(hash)
                
                model.User.update({
                    password: hash
                    },
                    {
                    where:{
                        id: req.params.id
                    }
                })
        
                .then(mdp => res.status(200).json({message: 'Mot de passe changé'}))
                .catch(error => res.status(400).send({ error  }))
            })
            .catch(error => res.status(500).send({  error  })) 
        }) 
        .catch(error => res.status(500).send({  error  }))
    })  
    .catch(error => res.status(500).send({  error  }))  
}


//Supprimer un compte
exports.deleteUser = (req, res, next) => {
    model.User.destroy({
        where:{
            id: req.params.id
        }  
    })
    .then(() => res.status(200).json({ message: 'Compte supprimé !'}))
    .catch(error => res.status(400).json({ error }));
    
}
