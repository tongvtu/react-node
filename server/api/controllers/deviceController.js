const mongoose=require('mongoose') ;
let Devices = mongoose.model('devices');

exports.listAllDevices = async (ctx, next) => {
    try {
        let device = await Devices.find({});
        ctx.body = device;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

exports.createADevice = async (ctx, next) => {
    try {
        let new_device= new Devices(ctx.request.body);
        await new_device.save();
        ctx.body = new_device;   
    } catch (err) {
        console.log(err)
        ctx.status = err.status || 400;
        ctx.body = err.message;

    }
};

exports.readADevice = async (ctx, next) => {
    try {
        let device = await Devices.findById(ctx.params.deviceId);
        ctx.body = device;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

exports.updateADevice = async (ctx, next) => {
    try {
        let device = await Devices.findOneAndUpdate({_id: ctx.params.deviceId}, ctx.request.body, {new: true});
        ctx.body = device;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

exports.deleteADevice = async (ctx, next) => {
    try {
        let device = await Devices.remove({_id: ctx.params.deviceId});
        ctx.body = {message: 'Device successfully deleted'};
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};







