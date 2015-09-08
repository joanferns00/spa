    /*
     *  test
     */

    app.service('ListService', function () {
        var uid = 1;
        var tmp = {};
        var list = [{id: 0, item: 'Make Bed', status: false}];
        this.save = function (item) {
            if (item.id === undefined) {
                //add a new item
                item.id = uid++;
                item.status = false;
                list.push(item);
            }
            else {
                //edit the exsisting item
                for (var i in list) {
                    if (list[i].id === item.id) {
                        list[i] = item;
                    }
                }
            }
        };
        this.getByItem = function (item) {
            for (var i in list) {
                if (list[i].item.toLowerCase() === item.toLowerCase()) {
                    return list[i];
                }
            }
            return null;
        };
        this.getOne = function (id) {
            for (var i in list) {
                if (list[i].id === id) {
                    return list[i];
                }
            }
        };
        this.delete = function (id) {
            for (var i in list) {
                if (list[i].id === id) {
                    tmp = {i: list.splice(i, 1)};
                }
            }

        };
        this.undo = function () {
            //to do
        };
        this.getAll = function () {
            return list;
        };
    });