const { Sequelize } = require('sequelize');


//Connexion à la base de donnée MySQL
const sequelize = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    dialect: process.env.DIALECT,
    host: process.env.HOST
  });
  try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
  } catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
  }




//MODELE UTILISATEUR (USER)
const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING(50), allowNull: false },
    firstname: { type: Sequelize.STRING(50), allowNull: false },
    email: { type: Sequelize.STRING(100), allowNull: false, unique: true },
    password: { type: Sequelize.STRING(255), allowNull: false },
    imageUrl: { type: Sequelize.STRING(255) },
    is_moderator: { type: Sequelize.INTEGER, allowNull: false }
},
{
    timestamps: true, createdAt: 'created', updatedAt: false, underscored: true
})
exports.User = User

//MODELE POST
const Post = sequelize.define('post', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: Sequelize.TEXT, allowNull: true },
    imageUrl: { type: Sequelize.STRING(255) },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    liked: { type: Sequelize.INTEGER(255), allowNull: true }
},
{ timestamps: true, underscored: true })
exports.Post = Post

//MODELE COMMENTAIRE(COMMENTARY)
const Commentary = sequelize.define('commentary', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: Sequelize.TEXT, allowNull: true },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    postId: { type: Sequelize.INTEGER, allowNull: false }    
},
{ timestamps: true, underscored: true })
exports.Commentary = Commentary



//l'utilisateur peut avoir plusieurs Commentaires
User.hasMany(Post, {foreignKey: 'userId'})

Post.belongsTo(User, {foreignKey: 'userId', as:'author'})

//un utilisateur peut avoir plusieurs Commentaires
User.hasMany(Commentary, {foreignKey: 'userId'})

Commentary.belongsTo(User, {foreignKey: 'userId'})

sequelize.sync()
