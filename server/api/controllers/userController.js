const mongoose=require('mongoose') ;
let Users = mongoose.model('users');

exports.listAllUsers = async (ctx, next) => {
    try {
        let user = await Users.find({});
        ctx.body = user;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

exports.createAUser = async (ctx, next) => {
    try {
        let new_user = new Users(ctx.request.body);
        await new_user.save();
        ctx.body = new_user;   
    } catch (err) {
        console.log(err)
        ctx.status = err.status || 400;
        ctx.body = err.message;

    }
};

exports.readAUser = async (ctx, next) => {
    try {
        let user = await Users.findById(ctx.params.userId);
        ctx.body = user;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

exports.updateAUser = async (ctx, next) => {
    try {
        let user = await Users.findOneAndUpdate({_id: ctx.params.userId}, ctx.request.body, {new: true});
        ctx.body = user;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

exports.deleteAUser = async (ctx, next) => {
    try {
        let user = await Users.remove({_id: ctx.params.id});
        ctx.body = {message: 'User successfully deleted'};
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};







