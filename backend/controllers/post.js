//Appelle le modèle
const model = require('../models/models');


//Accès aux fichiers système
const fs = require('fs');




//Obtenir tous les post
exports.getAllPosts = (req, res, next) => {

  model.Post.findAll()
     .then(post => res.status(200).json(post))
     .catch(error => res.status(400).json({ error }));
};



//Enregistre un nouveau post
exports.createPost = (req, res, next) => {
  console.log(req)
  //Ajoute le nouveau post grâce au modèle, et au tableau "post" de la requête 
  model.Post.create({
    description: req.body.description,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  })
  .then(() => res.status(201).json({ message: 'Post créé !' }))
  .catch(error => res.status(400).json({ error }));
}


// A MODIFIER POUR AJOUTER DES COMMENTAIRES
exports.createCommentary = (req, res, next) => {
  
  //Transforme l'élément post de la requête en tableau
  let postCommentary = JSON.parse(req.body);

  const commentary = new commentary(
    postCommentary
  )

  //Sauvegarde le commentaire sur la base de données
  commentary.save()
    .then(() => res.status(201).json({ message: 'Commentaire créé !' }))
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
  model.Post.findAll({
    where:{
      id: req.params.id
    }})

  //Puis supprime l'image via "unlink"
    .then(thing => {
    const filename = thing.imageUrl.split('/images/')[1];
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
  
  //Si on like le post
  if (req.body.like === 1) { 
    
    //On ajoute 1 like et on l'envoie dans le tableau "usersLiked"
    Post.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
      .then((post) => res.status(200).json({ message: 'Like' }))
      .catch(error => res.status(400).json({ error }));
  } 
  
  //Si l'utilisateur n'aime pas le post
  else if (req.body.like === -1) { 
    
    //On ajoute 1 dislike et on l'envoie dans le tableau "usersDisliked"
    Post.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } }) 
      .then((post) => res.status(200).json({ message: 'Dislike' }))
      .catch(error => res.status(400).json({ error }));
  } 
  else { 
    
    //Si like === 0 l'utilisateur supprime son vote
    Post.findOne({ _id: req.params.id })
    .then(post => {
        
      //Si le tableau "userLiked" contient l'ID de l'utilisateur
      if (post.usersLiked.includes(req.body.userId)) { 
        
        //On enlève un like de "userLiked" 
        Post.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
            .then((post) => { res.status(200).json({ message: 'Like supprimé' }) })
            .catch(error => res.status(400).json({ error }))
      } 
      
      //Si le tableau "userDisliked" contient l'ID de l'utilisateur
      else if (post.usersDisliked.includes(req.body.userId)) {
          
        //Enlève un dislike 
        Post.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
          .then((post) => { res.status(200).json({ message: 'Dislike supprimé' }) })
          .catch(error => res.status(400).json({ error }))
      }
    })
    .catch(error => res.status(400).json({ error }));
  }
};