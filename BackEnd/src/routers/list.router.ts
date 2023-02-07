
import {Router} from 'express';
import ListController from "../controllers/list.controller";
const listRouters = Router();

listRouters.get('/:idBroad',ListController.getlist);
listRouters.post('/create',ListController.addList);
listRouters.delete('/:idList',ListController.deleteList);
listRouters.put('/edit',ListController.updateList);
export default listRouters