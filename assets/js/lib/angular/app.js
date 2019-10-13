var app = angular.module("app", ['ngSanitize']);

app.constant('API_URL', 'http://localhost/');

app.controller("MainController", ['appService', '$scope', function (appService, $scope) {
    var vm = this;
    vm.planes = [];

    vm.page = {
        "title": "Planes",
        "description": "En <b>Gestión Ahora</b> tenemos planes que se adaptan a tus necesidades, adquiere Ahora el que mas se ajuste a las necesidades y lleva tu negocio al mas alto nivel."
    }

    vm.get = function () {
        vm.planes.push({
            "title": "Pyme",
            "price_1": "80000",
            "users": "5",
            "facture": "100",
            "storage": "10",
            "price_2": "120000",
            "discount": "10"
        });

        vm.planes.push({
            "title": "Pro",
            "price_1": "120000",
            "users": "20",
            "facture": "400",
            "storage": "25",
            "price_2": "160000",
            "discount": "10"
        });

        vm.planes.push({
            "title": "Plus",
            "price_1": "160000",
            "users": "60",
            "facture": "1000",
            "storage": "100",
            "price_2": "220000",
            "discount": "10"
        });

        var promisePost = appService.get();
        promisePost.then(function (d) {


        }, function (err) {
            if (err.status == 402) {
                console.log(err.data.respuesta);
            } else {
                console.log("Ha ocurrido un problema!");
            }
        });
    };

}]);

app.controller("ContactController", ['appService', '$scope', function (appService, $scope) {
    var vm = this;

    vm.page = {
        "title": "Contactános",
        "description": "En <b>Gestión Ahora</b> si respondemos tus mensajes"
    };

    vm.message = {
        "name": "",
        "phone": "",
        "email": "",
        "message": ""
    };

    vm.send = function () {

        if (vm.message.name == "" || vm.message.phone == "" || vm.message.email == "" || vm.message.message == "") {
            return;
        }

        Swal.fire(
            'Gracias!',
            'Hemos recibido tu mensaje!',
            'success'
        );

        vm.message = {
            "name": "",
            "phone": "",
            "email": "",
            "message": ""
        }

        var promisePost = appService.get();
        promisePost.then(function (d) {
            console.log(d.data)

        }, function (err) {
            if (err.status == 402) {
                console.log(err.data.respuesta);
            } else {
                console.log("Ha ocurrido un problema!");
            }
        });
    };

}]);

(function () {
    angular
        .module('app')
        .service('appService', ['$http', '$q', 'API_URL', appService]);
    /* @ngInject */
    function appService($http, $q, API_URL) {
        var service = {
            get: get,
        };
        return service;

        function get() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(API_URL + 'page').then(success, error);
            return promise;

            function success(p) {
                defered.resolve(p);
            }

            function error(error) {
                defered.reject(error)
            }
        }
    }
})();

app.filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);