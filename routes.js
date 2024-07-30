
var express = require('express');
var router = express.Router();
var tweeterController = require('./controllers/tweeter');

/**
 * @swagger
 * /ping:
 *   get:
 *     tags:
 *       - ping
 *     description: pings the service.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: SUCCESS.
 *       500:
 *         description: FAILURE.
 */
router.get('/ping', tweeterController.ping);

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - tweeter
 *     description: creates the user in tweeter database.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: SUCCESS.
 *       500:
 *         description: FAILURE.
 */
router.post('/user', tweeterController.createUser);


/**
 * @swagger
 * /message:
 *   post:
 *     tags:
 *       - tweeter
 *     description: postes the message for the loggied user in tweeter database.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: message
 *         description: Message Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Message'
 *     responses:
 *       200:
 *         description: SUCCESS.
 *       500:
 *         description: FAILURE.
 */
router.post('/message', tweeterController.postMessage);

/**
 * @swagger
 * /user/{lastName}:
 *   get:
 *     tags:
 *       - tweeter
 *     description: gets the specific user by lastname.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lastName
 *         description: user's lastName
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: SUCCESS.
 *       500:
 *         description: FAILURE.
 */
router.get('/user/:lastName', tweeterController.getUser);

/**
 * @swagger
 * /messages/{userId}:
 *   get:
 *     tags:
 *       - tweeter
 *     description: gets the messages for the specific user by userId.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: user's ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: SUCCESS.
 *       500:
 *         description: FAILURE.
 */
router.get('/messages/:userName', tweeterController.getMessages);

/**
 * @swagger
 * /{userName}/follow/{followUserName}:
 *   put:
 *     tags:
 *       - tweeter
 *     description: a user follows a specific user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: user's userName
 *         in: path
 *         required: true
 *         type: string
 *       - name: followUserName
 *         description: user's ID that has to be followed.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: SUCCESS.
 *       500:
 *         description: FAILURE.
 */
router.put('/:userName/follow/:followUserName', tweeterController.followUser);

/**
 * @swagger
 * /{userName}/unfollow/{followUserName}:
 *   delete:
 *     tags:
 *       - tweeter
 *     description: a user unfollows a specific user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: user's userName
 *         in: path
 *         required: true
 *         type: string
 *       - name: followUserName
 *         description: user's ID that has to be followed.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: SUCCESS.
 *       500:
 *         description: FAILURE.
 */
router.delete('/:userName/unfollow/:followUserName', tweeterController.unfollowUser);

/**
 * @swagger
 * /connections/{userName}:
 *   get:
 *     tags:
 *       - tweeter
 *     description: gets the list of followers and following for the speecified userName.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: user's userName
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: SUCCESS.
 *       500:
 *         description: FAILURE.
 */
router.get('/connections/:userName', tweeterController.getConnections);

/**
 * @swagger
 * /mostPopularFollower/{userName}:
 *   get:
 *     tags:
 *       - tweeter
 *     description: gets the list of followers and their most popular follower's userName.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userName
 *         description: user's userName
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: SUCCESS.
 *       500:
 *         description: FAILURE.
 */
router.get('/mostPopularFollower/:userName', tweeterController.getMostPopularFollower);


module.exports = router;


/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       userName:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 *       email:
 *         type: string
 *   Message:
 *     properties:
 *       userName:
 *         type: string
 *       content:
 *         type: string
 */