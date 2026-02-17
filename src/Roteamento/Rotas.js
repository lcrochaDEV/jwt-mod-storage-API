import { Router } from 'express';
import Rotas from '../Controllers/ClassRequest.js';

const router = Router();

// Se no app.js você usa app.use("/mencached", router)
router.get("/", Rotas.methodGet);               // Acessa via GET /mencached
router.get("/:id", Rotas.methodGet);            // Acessa via GET /mencached/1
router.post("/", Rotas.methodPost);             // Acessa via POST /mencached
router.patch("/:id", Rotas.methodPetch);        // Acessa via PATCH /mencached/1
router.delete("/:id", Rotas.methodDelete);      // Acessa via DELETE /mencached/1
router.post("/hash", Rotas.methodPostHash);          // Acessa via GET /mencached/hash

export default router;