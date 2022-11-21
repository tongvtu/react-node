const Koa =require('koa') ;
const Router =require('koa-router') ;
const bodyParser =require('koa-bodyparser') ;
const {routes} =require('./api/routes/routes') ;
const mongoose = require('mongoose');   
const port = 4000;
const app = new Koa();
const router = Router();



const {Devices, Users, Login} =require('./api/models/deviceModel') ;
app.use(bodyParser());
routes(router);
app.use(async (ctx, next) => {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        ctx.set('Access-Control-Allow-Headers', "Content-Type,X-Auth-Token,Origin,Authorization")
        await next();
    });
app.use(router.routes())
app.use(router.allowedMethods());

app.listen(4000, async () => {
await mongoose.connect('mongodb+srv://tongtu:12345654321@cluster0.w8dl56p.mongodb.net/week_3?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
console.log(`Listening on ${port}`);
});
