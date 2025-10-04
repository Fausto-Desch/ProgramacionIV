import express from 'express';
import cors from 'cors';
import orderRoutes from "./routes/order.route"


class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.middlewares();
        this.routes();
        
    }
    middlewares(){
        this.app.use(express.json({limit: '150mb'}));
        //Cors
        this.app.use( cors());
    }
    routes(){
        this.app.use("/orders", orderRoutes)
        // this.app.use("/users",userRoute);
        // this.app.use( "/categories",categoryRoute);
        // this.app.use("/products",productRouote)
        // this.app.use("/restart",restartRoute);

    }
    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}
export default Server;