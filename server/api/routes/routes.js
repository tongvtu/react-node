
export function routes(router) {
  let deviceController = require('../controllers/deviceController');
  let userController = require('../controllers/userController');
  let loginController = require('../controllers/loginController')
    router.get('/device', deviceController.listAllDevices);
    router.post('/device', deviceController.createADevice);
    router.get('/device/:deviceId', deviceController.readADevice);
    router.put('/device/:deviceId', deviceController.updateADevice);
    router.delete('/device/:deviceId', deviceController.deleteADevice);


    router.get('/user', userController.listAllUsers);
    router.post('/user', userController.createAUser);
    router.get('/user/:userId', userController.readAUser);
    router.put('/user/:userId', userController.updateAUser);

    router.get('/login', loginController.listLogin);
    router.post('/login', loginController.createALogin);


};