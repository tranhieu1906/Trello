
import {Router} from 'express';
import ListController from "../controllers/list.controller";
const listRouters = Router();

listRouters.get('/:idBroad',ListController.getlist);
listRouters.post('/:idBroad',ListController.addList);
listRouters.delete('/:idList',ListController.deleteList);
listRouters.put('/:idList',ListController.updateList);