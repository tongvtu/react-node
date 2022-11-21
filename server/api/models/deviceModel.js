const mongoose =require('mongoose');

const DeviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Enter the name '
    },
    mac: {
        type: String,
        required: 'Enter the mac'
    },
    ip: {
        type: String,
        required: 'Enter the ip'
    },
    date:{
        type: String,
        required: 'Enter the date'
    }, 
    power:{
        type:Number,
        required:'Enter the power'
    },
    status:{
        type:String,
        required:'Enter the status'
    },
    login:{
        type:Number,
    },
});
const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Enter the username '
    },
    password: {
        type: String,
        required: 'Enter the password '
    },
    login:{
        type: Number,
    }
})

const LoginSchema = new mongoose.Schema({
    login:{
        type: Number,
    }
})

const Devices = mongoose.model('devices', DeviceSchema);
const Users = mongoose.model('users', UsersSchema);
const Login = mongoose.model('login', LoginSchema);



module.export = {
    Devices, Users, Login,
}
