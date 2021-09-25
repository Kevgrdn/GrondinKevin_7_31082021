//Appelle le modèle
const Post = require('../models/post');


//Accès aux fichiers système
const fs = require('fs');


//Obtenir toutes les sauces
exports.getAllPosts = (req, res, next) => {
  Post.find()
     .then(post => res.status(200).json(post))
     .catch(error => res.status(400).json({ error }));
};



//Obtenir une sauce spécifique via l'ID
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }))
};



//Enregistre une nouvelle sauce
exports.createPost = (req, res, next) => {

  //res.status(200).json(req.body)
  //Transforme l'élément sauce de la requête en tableau
  
  let postObject = JSON.stringify(req.body);
  
  //Puis retire l'id du tableau
  delete postObject._id;
  
  //Ajoute la nouvelle sauce grâce au modèle, et au tableau "sauce" de la requête 
  const post = new Post({
    ...postObject,
    //imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  });

  //Sauvegarde la sauce sur la base de données
  post.save()
    .then(() => res.status(201).json({ message: 'Post créé !' }))
    .catch(error => res.status(400).json({ error }));
}



//Mettre à jour un post
exports.updateOnePost = (req, res, next) => {

  //Vérification si il y a un fichier a télécharger
  const postObject = req.file ?
    {

      //Récupération de l'élément "sauce" de la requête
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  //Remplace les données de l'ancienne sauce, tout en gardant le même ID  
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};



//Supprime un post
exports.deleteOnePost = (req, res, next) => {
 
  //Trouve un post via son ID
  Post.findOne({ _id: req.params.id })
  
  //Puis supprime l'image via "unlink"
    .then(thing => {
    const filename = thing.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
        
      //Supprime le post grace à son ID
      Post.deleteOne({ _id: req.params.id })
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