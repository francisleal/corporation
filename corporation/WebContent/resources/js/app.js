// configuração do módulo
var app = angular.module('loja', [ 'ngRoute', 'ngResource', 'ngAnimate' ]);

// configurando rotas
app.config(function($routeProvider) {

	// listar
	$routeProvider.when("/clientelist", {
		controller : "clienteController",
		templateUrl : "cliente/list.html"
	})
	
	// visualizar
	.when("/clientevisualizar/:id", {
		controller : "clienteController",
		templateUrl : "cliente/visualizar.html"
	})

	// editar
	.when("/clienteedit/:id", {
		controller : "clienteController",
		templateUrl : "cliente/cadastro.html"
	})

	// novo
	.when("/cliente/cadastro", {
		controller : "clienteController",
		templateUrl : "cliente/cadastro.html"
	})

	.otherwise({
		redirectTo : "/"
	});

});

app.controller('clienteController', function($scope, $http, $location, $routeParams) {	
	
 	if($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != '') {
		$http.get("cliente/buscarcliente/" + $routeParams.id).success(function(response){
			$scope.cliente = response;			
			//------------------ carrega estados e cidades do cliente em edi��o
			setTimeout(function () {
				$("#selectEstados").prop('selectedIndex', (new Number($scope.cliente.estados.id) + 1));
				
				$http.get("cidades/listar/" + $scope.cliente.estados.id).success(function(response) {
					$scope.cidades = response;
					setTimeout(function () {
						$("#selectCidades").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.cliente.cidades.id));
					}, 500);					
				}).error(function(data, status, headers, config) {
					erro("Error: " + status);
				});			
			}, 1000);
			//----------------------			
		}).error(function(data, status, headers, config){
			erro("Error buscarcliente : " + status);
		});
	} else {
		$scope.cliente = {};
	}
	
 	//editar cliente
	$scope.editarCliente = function(id) {
		$location.path('clienteedit/' + id);
	}
	
	// visualizar cliente
	$scope.visualizarCliente = function(id) {
		$location.path('clientevisualizar/' + id);
	}
	
	//salvar cliente
	$scope.salvarCliente = function() {		
		$http.post("cliente/salvar", $scope.cliente).success(function(){
			$scope.cliente = {};
			$location.path('clientelist/');
			sucesso("Salvo com sucesso");
		}).error(function(data, status, headers, config){
			erro("Error salvar : " + status);
		});
	};

	//listar clientes
	$scope.listarClientes = function() {
		$http.get("cliente/listar").success(function(response) {
			response == null ? $scope.data = response : $scope.data = response;
		}).error(function(response){
			erro("Erro listar :" + response);
		});
	};
	
	//remover cliente
	$scope.removerCliente = function(codCliente) {
		$http.delete("cliente/deletar/" + codCliente).success(function(response){
			$scope.listarClientes();
			sucesso("Apagado com sucesso");
		}).error(function(data, status, headers, config){
			erro("Error deletar: " + status);
		});
	}; 

	//carregar estados
	$scope.carregarEstados = function() {
		$scope.dataEstados = [{}];
		$http.get("estados/listar").success(function(response) {
			$scope.dataEstados = response;
		}).error(function(response){
			erro("Erro listar :" + response);
		});
	};
	
	//carregar cidades
	$scope.carregarCidades = function(estado) {
		$http.get("cidades/listar/" + estado.id).success(function(response) {
			$scope.cidades = response;
			console.log(response);
		}).error(function(response){
			erro("Erro listar :" + response);
		});
	};
	

//	$scope.data = [ 
//		{id: 1, nome : 'Fulano', endereco : 'Marte', telefone : '(61)9999-5566', estados : { nome : 'Acre' }, cidades : { nome : 'Capixaba' }, foto : null},
//		{id: 2, nome : 'Beltrano', endereco : 'Jupter', telefone : '(61)9988-5446', estados : { nome : 'Bahia'}, cidades : { nome : 'Abare' } , foto : null},
//		{id: 3, nome : 'Ciclano', endereco : 'Venus', telefone : '(61)9988-5446', estados : { nome : 'Tocantins'}, cidades : { nome : 'Araguatins' } , foto : null},
//		{id: 3, nome : 'Armano', endereco : 'Nova Terra', telefone : '(61)3333-2255', estados : { nome : 'Distrito Federal'}, cidades : { nome : 'Cruzeiro' } , foto : null}
//	];
	
	/*
	$scope.removerCliente = function(cliente) {
		$scope.data.splice(cliente, 1);
	};
	
	$scope.salvarCliente = function(cliente){
		$scope.data.push(angular.copy(cliente));	
		console.log($scope.data);
	}
	
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

function buscarKeyJson(obj, key, value) {
	for (var i = 0; i < obj.length; i++) {
		if (obj[i][key] == value) {
			return i + 2;
		}
	}
	return null;
}



