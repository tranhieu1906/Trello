
import {Router} from 'express';
import ListController from "../controllers/list.controller";
const listRouters = Router();

listRouters.get('/:id',ListController.getlist);
listRouters.post('/',ListController.addList);
listRouters.delete('/:idList',ListController.deleteList);
listRouters.put('/edit',ListController.updateList);
listRouters.patch("/move/:idList", ListController.moveList);
export default listRouters