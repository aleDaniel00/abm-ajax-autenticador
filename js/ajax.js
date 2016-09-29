/*
Vamos a crear nuestra función ajaxRequest.
v1
--

ajaxRequest(metodo, url, esJson, data, nocache, success, error);

ajaxRequest('get', 'saraza.php', function(rta) {
	doc.gEBI('saraza').innerHTML = rta;
}, 'dada=a');

ajaxRequest('get', 'saraza.php', null, function(rta) {
	doc.gEBI('saraza').innerHTML = rta;
});
*/

/*function ajaxRequest(metodo, url, success, data) {
	// Instanciamos XHR
	var xhr = new XMLHttpRequest();

	// Configuramos la petición
	xhr.open(metodo, url);

	// Agregás una imagen de carga

	// Configurar el callback
	xhr.addEventListener('readystatechange', function() {
		console.log(xhr.readyState);
		if(xhr.readyState == 4) {
			// Quitás la imagen de carga
			if(xhr.status == 200) {
				success(xhr.responseText);
			} else {
				error();
			}
		}
	});

	// Enviamos la petición
	xhr.send(null);
}*/

/*
v2.0.0!
ajaxRequest({
	'metodo': 'get',
	'url': 'saraza.php',
	'data': 'saraza=saraza',
	'success': function(rta) {
		// Yeahhh
	}
});
*/
/*
ajaxRequest({
	'metodo': 'post',
	'url': 'check-user.php',
	'data': 'u=' + userInput.value,
	'success': function(response) {
		document.getElementById('respuesta').innerHTML = response;
	}
})
*/
function ajaxRequest(options) {
	//var opcionesCompletas = ['metodo', 'url', 'data', 'success', 'error'];

	var defaults = {
		'metodo': 'get',
		'success': function() {},
		'error': function() {}
	};

	options = objectMerge(defaults, options);

	/*for (var i = 0; i < opcionesCompletas.length; i++) {
		if(options[opcionesCompletas[i]] == undefined &&
			defaults[opcionesCompletas[i]] != undefined) {
			options[opcionesCompletas[i]] = defaults[opcionesCompletas[i]];
		}
	}*/

	// Instanciamos XHR
	var xhr = new XMLHttpRequest(),
		urlData = '',
		sendData = null;

	// Paso el método a minúsculas
	options.metodo = options.metodo.toLowerCase();

	if(options.metodo == "get") {
		urlData = '?' + options.data;
	} else if(options.metodo == "post" || options.metodo == "put") {
		sendData = options.data;
	}

	// Configuramos la petición
	xhr.open(options.metodo, options.url + urlData);

	// Agregás una imagen de carga

	if(options.metodo == "post" || options.metodo == "put") {
		// Agrego el header para que PHP capture los datos del form automágicamente.
		xhr.setRequestHeader('Content-Type', 
			'application/x-www-form-urlencoded');
	}

	// Configurar el callback
	xhr.addEventListener('readystatechange', function() {
		//console.log(xhr.readyState);
		if(xhr.readyState == 4) {
			// Quitás la imagen de carga
			if(xhr.status == 200) {
				options.success(xhr.responseText);
			} else {
				options.error();
			}
		}
	});

	// Enviamos la petición
	xhr.send(sendData);
}


function $(id) {
	return document.getElementById(id);
}

/**
 * Mezcla el segundo objeto en el primero.
 */
function objectMerge(obj1, obj2) {
	for(var i in obj2) {
		obj1[i] = obj2[i];
	}
	return obj1;
}
/*
objectMerge(defaults, options);
obj1 = {
	'metodo': 'get',
	'success': function() {},
	'error': function() {}
}
obj2 = {
	'url': 'check-user.php',
	'data': 'u=' + userInput.value,
	'success': function(response) {
		document.getElementById('respuesta').innerHTML = response;
	}
}

Vuelta 1: i = 'url'
obj1['url'] = obj2['url']
Vuelta 1: i = 'data'
obj1['data'] = obj2['data']
Vuelta 1: i = 'success'
obj1['success'] = obj2['success']
*/

// TDD: Test-Driven Development


/*var unObjeto = {
	'asd': 1,
	'qwerty': 'hola'
};

var otroObjeto = {
	'zxc': ['saraza', 1],
	'qwerty': 'chau'
}

var res = objectMerge(unObjeto, otroObjeto);
assertEquals(res, {'asd': 1, 'qwerty': 'chau', 'zxc': ['saraza', '1']});*/