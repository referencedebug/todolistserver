const express = require('express');
const bodyParser = require('body-parser');
const DB = require('./DB');

class App {
    constructor() {
        this.app = express();
        this.db = new DB();
        this.init();
        this.router();
    }
    init(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    router() {
        const commonHandler = (req, res, handler) => {
            console.log(req.body);
            const { data } = req.body;
            const _dbData = handler(data);
            res.send({ code: 0, data: _dbData, msg: 'success' });
        }

        this.app.get('/api/list',(req, res) => {
           const _dbData = this.db.listAll();
           res.send({
               code: 0,
               data: _dbData,
               msg: 'success'
           }) 
        })
        this.app.post('/api/add', (req, res) => commonHandler(req, res, this.db.addData.bind(this.db)));
        this.app.post('/api/delete', (req, res)  => commonHandler(req, res, this.db.deleteData.bind(this.db)));
        this.app.post('/api/modify', (req, res) => commonHandler(req, res, this.db.modifyData.bind(this.db)))
    }
    listen(port){
        this.app.listen(port, () => {
            console.log(`服务器已经启动: http://localhost:${port}`);
        })
    }
}

new App().listen(5555);