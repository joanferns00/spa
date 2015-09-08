    /*
     *  test
     */


    //Controller for list.
    app.controller("ListController", function ($scope, ListService) {
        // create a message to display in our view
        $scope.title = 'My List';
        $scope.message = 'Start creating your list';
        $scope.newItem = {};
        $scope.editMode = {};
        $scope.tasks = ListService.getAll();
        //reset messages
        $scope.reset = function () {
            $scope.message = "";
        };
        //Add the item

        $scope.addItem = function () {
            var it = $scope.newItem.item;
            if (it === undefined || it.trim().length === 0) {
                $scope.message = "Please enter a task!";
            }

            //if item does not exist
            else if (ListService.getByItem(it) === null) {
                //add it to the list
                ListService.save($scope.newItem);
                $scope.newItem = {};
            }
            else {
                //else
                //return found message
                $scope.message = "Sorry, this item already exists";
            }
        };
        //edit the Status
        $scope.editStatus = function (item) {
            item.status = !item.status;
            ListService.save(item);
        };
        //Going to edit item
        $scope.editItem = function (item) {
            ListService.save(item);
        };
        //Going to delete item
        $scope.delItem = function (id) {
            ListService.delete(id);
        };
        //Change the view from input to span
        $scope.changeView = function (x) {
            $scope.editMode[x.id] = !$scope.editMode[x.id];
//        console.log($scope.editMode);
//        $scope.editMode = !$scope.editMode;
        };
    });