import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProfileControler from '../controllers/ProfileController';

const profileRouter = Router();
const profileControler = new ProfileControler();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileControler.show);
profileRouter.put('/', profileControler.update);

export default profileRouter;
