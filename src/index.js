import express from 'express';
import cartRouter from './routes/cartRouter.js';
import productsRouter from './routes/productsRouter.js';
import upload from './config/multer.js';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { __dirname } from './path.js';
import { Product } from './config/Product.js';

// Configuraciones o declaraciones
const app = express();
const PORT = 8000;

// Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

const io = new Server(server);

// Middlewares
app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Lista de productos
const productos = [];

// Socket.IO
io.on('connection', (socket) => {
    console.log("Conexion con Socket.io");

    socket.on('nuevoProducto', (productoData) => {
        const nuevoProducto = new Product(
            productoData.title,
            productoData.description,
            productoData.price,
            productoData.stock,
            productoData.code
        );

        productos.push(nuevoProducto);

        io.emit('actualizarProductos', productos);
    });

    socket.on('eliminarProducto', (productoId) => {
        const indice = productos.findIndex(p => p.id === productoId);
        if (indice !== -1) {
            productos.splice(indice, 1);
            io.emit('actualizarProductos', productos);
        }
    });
});

// Routes
app.use('/static', express.static(__dirname + '/public'));
app.use('/api/products', productsRouter, express.static(__dirname + '/public'));
app.use('/api/cart', cartRouter);

app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file);
        res.status(200).send("Imagen cargada correctamente");
    } catch (e) {
        res.status(500).send("Error al cargar imagen");
    }
});





