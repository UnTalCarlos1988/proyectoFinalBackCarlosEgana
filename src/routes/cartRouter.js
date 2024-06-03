import { Router } from "express";
import passport from "passport";
import { createCart, getCart, insertProductCart, createTicket } from "../controllers/cartController.js";

const cartRouter = Router()

cartRouter.post('/', createCart)

cartRouter.get('/:cid', getCart)

cartRouter.post('/:cid/:pid', passport.authenticate('jwt', { session: false }), insertProductCart)

cartRouter.get('/purchase/:cid', passport.authenticate('jwt', { session: false }), createTicket)

export default cartRouter