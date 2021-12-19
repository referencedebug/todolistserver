// 数据库
class DB {
    constructor(){
        this.data = [];
        this.initData(2);
    }
    // 初始化数据
    initData(num){
        for(let i = 0; i < num; i++){
            const _item = {id: i, value: '吃饭啦', completed: false };
            this.data.push(_item);
        }
    }
    // 查询数据
    listAll() {
        return this.data;
    }
    // 增加数据
    addData(items = []){
        const _num = this.data.length;
        const _items = items.map((value, index) => {
            return {id: _num + index, value, completed: false };
        });
        this.data = [...this.data, ..._items];
        return this.data;
    }

    // 删除数据 支持批量删除
    deleteData(ids = []) {
        this.data = this.data.filter(item => {
            if(ids.indexOf(item.id) > -1){
                return false;
            } else {
                return true;
            } 
        });
        return this.data;
    }

    // 修改数据 支持批量修改，结构体: [{id: id, data: {}}], id: 查询的数据，data：需要修改的数据
    modifyData(items = []){
       // 首先 判读传入的结构体是否正常
       let flag = true;
       items.forEach(item => {
         if(typeof item?.id !== 'number' || !(item?.data instanceof Object)){
             flag = false;
         }
       })
       if(!flag) {
           throw Error('传入的数据格式不对');
       }
       this.data = this.data.map(item => {
           const [ _dataItem ] = items.filter(_item => _item.id === item.id);
           if(_dataItem){
            Object.keys(_dataItem.data).forEach(_key => {
                if(item[_key]){
                    item[_key] = _dataItem.data[_key];
                }
            });
            return item;
           }else{
               return item;
           }
       })
       return this.data;
    }
}

module.exports = DB;