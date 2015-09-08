    /*
     *  test
     */


    app.controller("PhotoController", function ($scope) {
        $scope.showFilter = function () {
//        console.log($scope.filter);
        };
        //              source: http://codepen.io/joshadamous/pen/CJmIB
        //              //http://jsfiddle.net/xujihui1985/9yk7a6v3/2/
        // create a message to display in our view
        $scope.title = 'My Photos';
        $scope.message = 'Select size';
        $scope.images = [
            {category: 'High', image: 'img/1.png', description: 'Random Photo', stars: '4/5'},
            {category: 'High', image: 'img/2.png', description: 'Sports Photo', stars: '4/5'},
            {category: 'High', image: 'img/3.png', description: 'Fashion Photo', stars: '5/5'},
            {category: 'High', image: 'img/4.png', description: 'Health Photo', stars: '4/5'},
            {category: 'High', image: 'img/5.png', description: 'Food Photo', stars: '5/5'},
            {category: 'Medium', image: 'img/6.png', description: 'ApplePhoto', stars: '3/5'},
            {category: 'Medium', image: 'img/7.png', description: 'Basket Photo', stars: '3/5'},
            {category: 'Medium', image: 'img/8.png', description: 'Caddy Photo', stars: '3/5'},
            {category: 'Medium', image: 'img/9.png', description: 'Dog Photo', stars: '3/5'},
            {category: 'Medium', image: 'img/10.png', description: 'Eagle Photo', stars: '3/5'},
            {category: 'Low', image: 'img/11.png', description: 'Fanta Photo', stars: '2/5'},
            {category: 'Low', image: 'img/12.png', description: 'Green Photo', stars: '2/5'},
            {category: 'Low', image: 'img/13.png', description: 'High Top Photo', stars: '2/5'},
            {category: 'Low', image: 'img/14.png', description: 'Iowa Photo', stars: '2/5'},
            {category: 'Low', image: 'img/15.png', description: 'Jack Photo', stars: '2/5'},
            {category: 'None', image: 'img/16.png', description: 'Kilt Photo', stars: '0/5'},
            {category: 'None', image: 'img/17.png', description: 'Lunar Photo', stars: '0/5'},
            {category: 'None', image: 'img/18.png', description: 'Moon Photo', stars: '0/5'},
            {category: 'None', image: 'img/19.png', description: 'Noon Photo', stars: '0/5'},
            {category: 'None', image: 'img/20.png', description: 'Park Photo', stars: '0/5'}
        ];
//    $scope.currentImage = _.first($scope.images);
        $scope.currentImage = $scope.images[0];
//    $scope.imageCategories = _.uniq(_.pluck($scope.images, 'category'));
        $scope.imageCategories = ["High", "Medium", "Low", "None"];

        $scope.size = "medium";

        $scope.s = function () {
            $scope.size = "small";
        };

        $scope.m = function () {
            $scope.size = "medium";
        };

        $scope.l = function () {
            $scope.size = "large";
        };
        $scope.iWidth = 5;
        $scope.iGScale = 0;
//filter: grayscale(75%); -webkit-filter: grayscale(75%);
        $scope.myStyle = {'width': ($scope.iWidth * 50) + "px",
            '-webkit-filter': 'grayscale(' + $scope.iGScale + '%)',
            'filter': 'grayscale(' + $scope.iGScale + '%)'
        };

        $scope.changeWidth = function () {
            $scope.myStyle = {'width': ($scope.iWidth * 50) + "px",
                '-webkit-filter': 'grayscale(' + $scope.iGScale + '%)',
                'filter': 'grayscale(' + $scope.iGScale + '%)'};
        };

        $scope.ciGScale = function () {
            $scope.myStyle = {'width': ($scope.iWidth * 50) + "px",
                '-webkit-filter': 'grayscale(' + $scope.iGScale + '%)',
                'filter': 'grayscale(' + $scope.iGScale + '%)'};
        };

        $scope.setCurrentImage = function (image) {
            $scope.currentImage = image;
        };
        $scope.valueSelected = function (value) {

            if (value === null) {
                $scope.catselect = undefined;
            }

            console.log($scope.catselect);
        };
        //        http://jsfiddle.net/xujihui1985/9yk7a6v3/2/

    });