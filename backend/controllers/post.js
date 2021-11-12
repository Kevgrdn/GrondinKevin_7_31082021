//Appelle le modèle
const model = require('../models/models');
const { Sequelize } = require('sequelize');


//Accès aux fichiers système
const fs = require('fs');




//Obtenir tous les post
exports.getAllPosts = (req, res, next) => {

  model.Post.findAll({
    attributes: [
      'id','description', 'imageUrl', 'userId', 'liked',
      [Sequelize.fn('date_format', Sequelize.col('created_at'), 'le %d/%m/%Y à %H:%i:%s'), 'createdAt']
    ],

    include:[
      {model: model.User, as: 'author'}
    ],
    order: [['createdAt', 'DESC']]
  })
     .then(post => res.status(200).json(post))
     .catch(error => res.status(400).json({ error }));
};



//Enregistre un nouveau post
exports.createPost = (req, res, next) => {
  console.log(req)
  
  let urlMedia
  if(req.file){
    urlMedia = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  }
 
  else
  {
    urlMedia=""
  }

  //Ajoute le nouveau post grâce au modèle, et au tableau "post" de la requête 
  model.Post.create({
    description: req.body.description,
    userId : req.body.userId,
    imageUrl: urlMedia,
    liked: 0
  })
  .then(() => res.status(201).json({ message: 'Post créé !' }))
  .catch(error => res.status(400).json({ error }));
}


//Ajouter un commentaire
exports.createCommentary = (req, res, next) => {
  
  console.log(req)

  model.Commentary.create({
    content: req.body.content,
    userId: req.body.userId,
    postId: req.body.postId
  })
  .then(() => res.status(201).json({ message: 'Commentaire créé' }))
  .catch(error => res.status(400).json({ error }));
  
  
  
}


//Afficher les commentaires d'un post
exports.getCommentaries= (req, res, next)=> {

  model.Commentary.findAll({

    where:{
      postId: req.params.id
    },
    attributes: [
      'id','content', 'postId', 'userId', 
      [Sequelize.fn('date_format', Sequelize.col('created_at'), 'le %d/%m/%Y à %H:%i:%s'), 'createdAt']
    ],
    include:[
      {model: model.User, as: 'author'}
    ],
    order: [['createdAt', 'DESC']]
  })
  .then(post => res.status(200).json(post))
  .catch(error => res.status(400).json({ error }));
}



//Mettre à jour un post
exports.updateOnePost = (req, res, next) => {

  //Vérification si il y a un fichier a télécharger
  const postObject = req.file ?
    {

      //Récupération de l'élément "post" de la requête
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  //Remplace les données de l'ancien post, tout en gardant le même ID  
  model.Post.update({ id: req.params.id }, { ...postObject, id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};



//Supprime un post
exports.deleteOnePost = (req, res, next) => {
 
  //Trouve un post via son ID
  model.Post.findOne({
    where:{
      id: req.params.id
    }})

  //Puis supprime l'image via "unlink"
    .then(thing => {
      console.log(thing)
    const filename = thing.imageUrl.split('/images/')[1];
    console.log(filename)
    fs.unlink(`images/${filename}`, () => {
        
    
      //Supprime le post grace à son ID
      model.Post.destroy({
        where:{
          id: req.params.id
        }  
      })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};



//Aimer un post
exports.likeOrDislikePost = (req, res, next) => {
  
  
  if (req.body.like == 1) {
     like = 'liked + 1'
  }
  else {
     like = 'liked - 1'
  }
  model.Post.update({liked: Sequelize.literal(like) },{
    where:{
      id: req.params.id,
      
    }

  })
  .then(() => res.status(200).json({ message: 'Like modifié !'}))
  .catch(error => res.status(400).json({ error }));
  
};