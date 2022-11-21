const mongoose=require('mongoose') ;
let Login = mongoose.model('login');
exports.listLogin = async (ctx, next) => {
    try {
        let login = await Login.find({});
        ctx.body = login;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

exports.createALogin = async (ctx, next) => {
    try {
        let new_device= new Login(ctx.request.body);
        await new_device.save();
        ctx.body = new_device;   
    } catch (err) {
        console.log(err)
        ctx.status = err.status || 400;
        ctx.body = err.message;

    }
};
exports.deleteALogin = async (ctx, next) => {
    try {
        let device = await Login.remove({_id: ctx.params.loginId});
        ctx.body = {message: 'Device successfully deleted'};
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};