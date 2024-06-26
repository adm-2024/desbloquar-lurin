import {Router}  from 'express'
import {getBloqueados,desbloquearUsuario} from "../controllers/desbloqueo.controller.js";
const router = Router()

router.get('/bloqueos',getBloqueados)


router.post('/desbloq',desbloquearUsuario)
 
export default router