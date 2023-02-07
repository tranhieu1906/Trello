// import ListController from '../controllers';
import {Router} from 'express';
import ListController from "../controllers/list.controller";
const listRouters = Router();

listRouters.get('/',ListController.getlist);
listRouters.post('',ListController.addList);
listRouters.delete('',ListController.deleteList);
listRouters.put('',ListController.updateList);