const express = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const hashPass = require('../middlewares/hashPassMiddle');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');
const checkToken = require('../middlewares/checkToken');
const validators = require('../middlewares/validators');
const chatController = require('../controllers/chatController');
const upload = require('../utils/fileUpload');
const contestsRouter = require('./contestsRouter');
const usersRouter = require('./usersRouter');

const router = express.Router();

// post('',body);
// get('?page=2&results=10') => req.query
// get('/:id') => req.params.id
// patch('/:id', body)
// delete('/:id')
// /contests
// /users
// ...

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration
);

router.post('/login', validators.validateLogin, userController.login);

router.post('/getUser', checkToken.checkAuth);

// public endpoint before checkToken.checkToken
// TODO offerRouter, offerController
router.get('/offers', contestController.getOffers);

router.use(checkToken.checkToken);

// private endpoint after checkToken.checkToken

router.use('/users', usersRouter);
router.use('/contests', contestsRouter);

router.post('/dataForContest', contestController.dataForContest);

// get /contests/customers
// /users/id/contests
// /customers/id/contests
// get /contests/byCustomer
// router.post(
//   '/getCustomersContests',
//
//   contestController.getCustomersContests
// );

// get /getContestById -> get /contests/:id
// headers -> params
// router.get(
//   '/getContestById',
//
//   basicMiddlewares.canGetContest,
//   contestController.getContestById
// );

// router.post(
//   '/getAllContests',
//
//   basicMiddlewares.onlyForCreative,
//   contestController.getContests
// );

router.get('/downloadFile/:fileName', contestController.downloadFile);

router.post(
  '/updateContest',
  upload.updateContestFile,
  contestController.updateContest
);

router.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer
);

router.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus
);

router.post(
  '/changeMark',
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

router.post('/updateUser', upload.uploadAvatar, userController.updateUser);

router.post(
  '/cashout',
  basicMiddlewares.onlyForCreative,
  userController.cashout
);

router.post('/newMessage', chatController.addMessage);

router.post('/getChat', chatController.getChat);

router.post('/getPreview', chatController.getPreview);

router.post('/blackList', chatController.blackList);

router.post('/favorite', chatController.favoriteChat);

router.post('/createCatalog', chatController.createCatalog);

router.post('/updateNameCatalog', chatController.updateNameCatalog);

router.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);

router.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);

router.post('/deleteCatalog', chatController.deleteCatalog);

router.post('/getCatalogs', chatController.getCatalogs);

module.exports = router;
