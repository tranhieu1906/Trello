
import {Router} from 'express';
import ListController from "../controllers/list.controller";
const listRouters = Router();

listRouters.get('/:id',ListController.getlist);
listRouters.post('/',ListController.addList);
listRouters.put('/edit',ListController.updateList);
listRouters.patch("/move/:idList", ListController.moveList);
listRouters.patch("/rename/:id", ListController.renameList);
listRouters.patch("/archive/:id", ListController.archiveList);
export default listRouters