const UserModel = require('./user')
const PostModel = require('./post');
const DiaryModel = require('./diary');
const SchedModel = require('./schedule');
const LogModel =require('./workLog');
const RecipeModel =require('./recipe');
const CommentModel =require('./comment');
const OrderModel =require('./order');
const db = require('../db')



UserModel.hasMany(PostModel);
UserModel.hasMany(CommentModel);
UserModel.hasMany(DiaryModel);
UserModel.hasMany(RecipeModel);
UserModel.hasMany(LogModel);
UserModel.hasMany(SchedModel);
UserModel.hasMany(OrderModel);

PostModel.belongsTo(UserModel);
PostModel.hasMany(CommentModel);

CommentModel.belongsTo(PostModel);

SchedModel.belongsTo(UserModel);
SchedModel.hasMany(LogModel);

LogModel.belongsTo(SchedModel);

DiaryModel.belongsTo(UserModel);
RecipeModel.belongsTo(UserModel);
OrderModel.belongsTo(UserModel);

module.exports = {
    dbConnection: db,

    models: {
    PostModel,
    UserModel,
    DiaryModel,
    SchedModel,
    LogModel,
    RecipeModel,
    CommentModel,
    OrderModel
    }
}
