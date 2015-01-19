angular.module('myApp', ["firebase"])
    .constant('FIREBASE_URI', "https://website-techs.firebaseio.com/")
    .controller("myCtrl", function($scope, ItemsService) {
        
        $scope.items = ItemsService.getItems();
        console.log($scope.items);
        $scope.addItem = function(text) {
            ItemsService.addItem({text: text});
            delete $scope.newItemText;
        }
        $scope.updateItem = function (id) {
            ItemsService.updateItem(id);
        };
    
        $scope.removeItem = function (id) {
            ItemsService.removeItem(id);
        };
    })
    .factory("ItemsService", function($firebase, FIREBASE_URI) {
        var ref = new Firebase(FIREBASE_URI+"/items");
        var sync = $firebase(ref);
        var items = sync.$asArray();
        
        var getItems = function() {
            return items;
        }
        
        var addItem = function(item) {
            items.$add(item);
        }
        
        var removeItem = function(id) {
            items.$remove(id);
        }
        
        var updateItem = function (id) {
            items.$save(id);
        };
        
        return {
            getItems: getItems,
            addItem: addItem,
            removeItem: removeItem,
            updateItem: updateItem
        }
    });