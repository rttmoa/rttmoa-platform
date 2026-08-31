import Router from '@koa/router';
const router = new Router();
import user from './user';
import my from './my';
import friends from './friends';
import qz from './qz';
import message from './message';
 

export default (app: any) => {
	router.use('/user', user.routes());
	router.use('/friends', friends.routes());
	router.use('/qz', qz.routes());
	router.use('/message', message.routes());
	router.use('/my', my.routes());

	app.use(router.routes()).use(router.allowedMethods());
};
