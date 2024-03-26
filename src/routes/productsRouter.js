import { Router } from "express";
import productModel from "../models/product.js";

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const prods = await productModel.find().lean()
        let limite = parseInt(limit)
        if (!limite)
            limite = prods.length
        const prodsLimit = prods.slice(0, limite)
        res.status(200).render('templates/home', {
            mostrarProductos: true,
            productos: prodsLimit,
            css: 'product.css'
        })

    } catch (error) {
        res.status(500).render('templates/error', {
            error: error,
        })
    }
})

 
productsRouter.get('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid 
        const prod = await productModel.findById(idProducto)
        if (prod)
            res.status(200).send(prod)
        else
            res.status(404).send("Producto no existe")
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar producto: ${error}`)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const product = req.body
        const mensaje = await productModel.create(product)
        res.status(201).send(mensaje)

    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const updateProduct = req.body
        const prod = await productModel.findByIdAndUpdate(idProducto, updateProduct)
        res.status(200).send(prod)

    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar producto: ${error}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const mensaje = await productModel.findByIdAndDelete(idProducto)
        res.status(200).send(mensaje)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar producto: ${error}`)
    }
})

export default productsRouter