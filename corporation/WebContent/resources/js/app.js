// configuração do módulo
var app = angular.module('loja', [ 'ngRoute', 'ngResource', 'ngAnimate' ]);

// configurando rotas
app.config(function($routeProvider) {

	$routeProvider.when("/clientelist", {
		controller : "clienteController",
		templateUrl : "cliente/list.html"
	})// listar

	.when("/clienteedit/:id", {
		controller : "clienteController",
		templateUrl : "cliente/cadastro.html"
	})// editar

	.when("/cliente/cadastro", {
		controller : "clienteController",
		templateUrl : "cliente/cadastro.html"
	})// novo

	.otherwise({
		redirectTo : "/"
	});

});

app.controller('clienteController', function($scope, $http, $location, $routeParams) {	
	
 	if($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != '') {
		$http.get("cliente/buscarcliente/" + $routeParams.id).success(function(response){
			$scope.cliente = response;
		}).error(function(data, status, headers, config){
			erro("Error buscarcliente : " + status);
		});
	} else {
		$scope.cliente = {};
	}
	
	$scope.editarCliente = function(id) {
		$location.path('clienteedit/' + id);
	}
	
	$scope.salvarCliente = function() {		
		$http.post("cliente/salvar", $scope.cliente).success(function(){
			$scope.cliente = {};
			sucesso("Salvo com sucesso");
		}).error(function(data, status, headers, config){
			erro("Error salvar : " + status);
		});
	};

	$scope.listarClientes = function() {
		$http.get("cliente/listar").success(function(response) {
			$scope.data = response;
		}).error(function(response){
			erro("Erro listar :" + response);
		});
	};
	
	$scope.removerCliente = function(codCliente) {
		$http.delete("cliente/deletar/" + codCliente).success(function(response){
			$scope.listarClientes();
			sucesso("Apagado com sucesso");
		}).error(function(data, status, headers, config){
			erro("Error deletar: " + status);
		});
	}; 

	
	

 	$scope.data = [ 
		{id: 1, nome : 'Fulano', endereco : 'Samamabaia', telefone : '(61)9999-5566', foto : null},
		{id: 2, nome : 'Beltrano', endereco : 'rec das emas', telefone : '(61)9988-5446', foto : null},
		{id: 3, nome : 'Ciclano', endereco : 'rec das emas', telefone : '(61)9988-5446', foto : null}
	];
	
	/*$scope.salvarCliente = function(cliente){
		$scope.data.push(angular.copy(cliente));	
		console.log($scope.data);
	}
	
	$scope.removerCliente = function(cliente) {
		$scope.data.splice(cliente, 1);
	};
	
	$scope.editarCliente = function(id) {
		$location.path('clienteedit/' + id);
		console.log($scope.data);
	}; */

});

function erro(texto) {	
	$.notify({
		message: texto
	},{
		type: 'danger',
		timer: 250
	});
}

function sucesso(texto) {	
	$.notify({
		message: texto
	},{
		type: 'success',
		timer: 250
	});
}



