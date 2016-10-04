//::::::::::::::::::::::::::::::::::::
//::::::::: traer.js::::::::::::::::::
//::::::::::::::::::::::::::::::::::::

function removeEvent(elemento,evento,funcion) {
 if (elemento.removeEventListener) 
    elemento.removeEventListener (evento,funcion,false);
 if (elemento.detachEvent)
    elemento.detachEvent ('on'+evento,funcion); 
}

function addEvent(elemento, evento, funcion){
	if(elemento.addEventListener){
		elemento.addEventListener(evento, funcion);
	} else if(elemento.attachEvent){
		elemento.attachEvent('on'+evento, funcion);
	}
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

//otras funciones 
function c(str){return console.log(str);}
//
function crear(str){ return document.createElement(str);} 
//_______________________________________


var verFormRegistroUser = $('traerFormRegistroUser');
addEvent(window,'DOMContentLoaded',paginaCargada);
function paginaCargada(){
	var verFormRegistroUser = $('traerFormRegistroUser');
	var abm_users = $('abm_users');
	var abm_prods = $('abm_prods');
	var traerPeliculaBtn = $('traerPeliculaBtn');
	var altaPeliculaBtn = $('altaPeliculaBtn');
	var editarPeliculaBtn = $('editarPeliculaBtn');
	var formLogin = $('formLogin');

	if(formLogin){
		addEvent(formLogin,'submit',validarLogin);	
	}
	if(verFormRegistroUser){
		addEvent(verFormRegistroUser,'click',traer_forms);	
	}
	if(abm_users){
		addEvent(abm_users,'click',traer_abm_users);	
	}
	if(abm_prods){
		addEvent(abm_prods,'click',traer_abm_prods);	
	}
}

// login y registro inicial 
function traer_forms(){
	ajaxRequest({
		url: 'GestionUsr/form_new_user.php',
		success: function(rta) {
			var div = $('box_form_login');
			div.innerHTML = rta;
			borro_form_actual();
			function borro_form_actual(){
				if($('grabado_exitoso')){
					$('grabado_exitoso').parentNode.removeChild($('grabado_exitoso'));
				}
				if($('formLogin')){
					
					$('contenidoSinLogin').removeChild($('formLogin'));
				}else{
					$('box_form_login').removeChild($('formNewUser'));
				}
			}
			cambio_textos();
			function cambio_textos(){
				if($('traerFormRegistroUser').innerHTML == 'Login'){
					$('tituloForm').textContent = 'Logueate';
					$('traerFormRegistroUser').textContent = 'Registrate';
					addEvent($('traerFormRegistroUser'),'click',traer_forms);
				}else{
					$('tituloForm').textContent = 'Registrate';
					$('traerFormRegistroUser').textContent = 'Login';
					var altaUsuarioBtn = $('altaUsuarioBtn');
					addEvent($('formNewUser'),'submit',validarFormNewUser);
				}
			}				
			if($('traerFormRegistroUser').innerHTML == 'Login'){
			
				removeEvent(verFormRegistroUser,'click',traer_forms);
				
				(function (){
					addEvent(verFormRegistroUser,'click',verNuevoForm);
					function verNuevoForm() {
						ajaxRequest({
							url: 'GestionUsr/formLogin.php',
							success: function(rta) {
								borro_form_actual();
								var div = $('contenidoSinLogin');
								div.innerHTML = rta;
								if($('formLogin')){
									addEvent(formLogin,'submit',validarLogin);	
								}
								removeEvent(verFormRegistroUser,'click',verNuevoForm)
								cambio_textos();
							}
						});
					
					}
				})();
			}
		}
	});
}

//Mostrar CRUD de usuarios
function traer_abm_users(){
	//Enlistaros
	ajaxRequest({
		url: 'GestionUsr/lista_users.php',
		success: function(rta) {
			if($('list_table_users')){
				$('lista_users_abm').removeChild($('list_table_users'));
				var div = $('lista_users_abm');
				div.innerHTML = rta;
				mostrarform_users();
			}else{
				var div = $('lista_users_abm');
				div.innerHTML = rta;
			}
			//Agregar evento a Boton Listar Usuario
			addEvent($('interruptor_add_user'),'click',mostrarform_users);

			//agregar eventos a los botones de borrar y modificar
			if(document.getElementsByTagName('tr')){
				var arrayTr = div.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
				for (var i = 0; i < arrayTr.length; i++) {
					var botonBorrar = arrayTr[i].getElementsByTagName('td')[2].getElementsByTagName('button')[0];
					var botonModificar = arrayTr[i].getElementsByTagName('td')[1].getElementsByTagName('button')[0];

					//boton borrar
					addEvent(botonBorrar,'click',function(){
							borrar(this);
							function borrar(x){
								ajaxRequest({
									url: 'GestionUsr/borrarUsr.php?ID_USUARIO='+x.name+'/',
									success: function(rta) {
										rta = JSON.parse(rta);
										var p = $('list_table_users').getElementsByTagName('div')[0].getElementsByTagName('p')[0];
										p.innerHTML = rta.message;

										var z = setInterval(function () {
											traer_abm_users();
											clearInterval(z);
										},2000)
									}
								});
							}
						
					});

					//boton modificar			
					addEvent(botonModificar,'click',function(){
						modificar(this);
						function modificar(x){
							ajaxRequest({
								url: 'GestionUsr/modificarUsr.php?ID_USUARIO='+x.name+'/',
								success: function(rta) {
									//$('form_load').style.display = 'none';
									$('list_modif').innerHTML = rta;
									var botonEnviarModi = $('botonModificarUser');
									addEvent($('formModif'),'submit',function(){
										if($('formModif').NOMBRE.value == '' || $('formModif').PASSWORD.value == ''){
												event.preventDefault();
												$('errorUsual').getElementsByTagName('p')[0].innerHTML = 'Te falto llenar uno de los campos';
												var z = setInterval(function () {
													$('errorUsual').getElementsByTagName('p')[0].style.top = '-15%';
													$('errorUsual').style.height = '0';
													clearInterval(z);
													
												},2000)
												$('errorUsual').getElementsByTagName('p')[0].style.top = '10%';
												$('errorUsual').style.width = '100%';
												$('errorUsual').style.height = '25%';
										}else{
											event.preventDefault();
											modificar_usuario2();
											function modificar_usuario2(){
												ajaxRequest({
													metodo:'post',
													url: 'GestionUsr/modificarUsr_2.php',
													data: getFormEditarData(),
													success: function(rta) {
														rta = JSON.parse(rta);
														var p = $('list_table_users').getElementsByTagName('div')[0].getElementsByTagName('p')[0];
														p.innerHTML = rta.message;
														var z = setInterval(function () {
															traer_abm_users();
															clearInterval(z);
														},2000)
													}
												});
											}
											function getFormEditarData() {
												return 'ID_USUARIO=' + $('ID_USUARIO').value +
														'&NOMBRE=' + $('modifUsrName').value +
														'&PASSWORD=' + $('modifUsrPass').value ;
											}
										}
									});

								}
							});
						}
						
					}, false);
				};
			}
		}
	});
}

//Mostrar CRUD de productos
function traer_abm_prods(){
	//listar productos
	ajaxRequest({
		url: 'GestionProd/lista_prods.php',
		success: function(rta) {
			if($('list_table_prods')){
				$('lista_prods_abm').removeChild($('list_table_prods'));
				var div = $('lista_prods_abm');
				div.innerHTML = rta;
			}else{
				var div = $('lista_prods_abm');
				div.innerHTML = rta;
			}

			// boton Agregar productos
			addEvent($('interruptor_add_prod'),'click',mostrarform_prods);

			//Botones de borrar y modificar productos de la tabla
			if(document.getElementsByTagName('tr')){
				var arrayTr = div.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
				for (var i = 0; i < arrayTr.length; i++) {
					var botonBorrar = arrayTr[i].getElementsByTagName('td')[2].getElementsByTagName('button')[0];
					var botonModificar = arrayTr[i].getElementsByTagName('td')[1].getElementsByTagName('button')[0];

					//boton borrar Producto
					addEvent(botonBorrar,'click',function(){
						borrar(this);	
						function borrar(x){
							ajaxRequest({
								url: 'GestionProd/borrarProd.php?ID_PRODUCTOS='+x.name+'/',
								success: function(rta) {
									rta = JSON.parse(rta);
									var p = $('list_table_prods').getElementsByTagName('div')[0].getElementsByTagName('p')[0];
									p.innerHTML = rta.message;

									var z = setInterval(function () {
										traer_abm_prods();
										clearInterval(z);
									},2000)
								
								}
							});
						}
					});

					//boton modificar producto
					addEvent(botonModificar,'click',function(){
						(function(x){
							ajaxRequest({
								url: 'GestionProd/modificarProd.php?ID_PRODUCTOS='+x.name+'/',
								success: function(rta) {
									$('list_modif_prods').innerHTML = rta;
									var botonEnviarModi = $('botonModificarProd');
									addEvent($('formModif'),'submit',function(){
											if($('formModif').NOMBRE.value == ''){
												event.preventDefault();
												$('errorUsual').getElementsByTagName('p')[0].innerHTML = 'Te falto llenar uno de los campos';
												var z = setInterval(function () {
													$('errorUsual').getElementsByTagName('p')[0].style.top = '-15%';
													$('errorUsual').style.height = '0';
													clearInterval(z);
													
												},2000)
												$('errorUsual').getElementsByTagName('p')[0].style.top = '10%';
												$('errorUsual').style.width = '100%';
												$('errorUsual').style.height = '25%';
										}else{
											event.preventDefault();
											(function(){
												ajaxRequest({
													metodo:'post',
													url: 'GestionProd/modificarProd_2.php?',
													data: getFormEditarData(),
													success: function(rta) {
														rta = JSON.parse(rta);
														var p = $('list_table_prods').getElementsByTagName('div')[0].getElementsByTagName('p')[0];
														p.innerHTML = rta.message;
														var z = setInterval(function () {
															traer_abm_prods();
															clearInterval(z);
														},2000)
													}
												});
											})();
										}	
										function getFormEditarData() {
											return 'ID_PRODUCTOS=' + $('ID_PRODUCTOS').value +
													'&NOMBRE=' + $('NOMBRE_PROD').value +
													'&CATEGORIA=' + $('CATEGORIA_PROD').value +
													'&MARCA=' + $('MARCA').value +
													'&PRECIO=' + $('PRECIO').value;
											}
									});

								}
							});
						})(this);
						
					});
				};
			}
		}
	});
}
//traer form agregar producto
function mostrarform_prods(){
	ajaxRequest({
		url: 'GestionProd/form_new_prod.php',
		success: function(rta) {

			$('subcaja_prods').innerHTML = rta;
			$('interruptor_add_prod').setAttribute('name','1'); 

			//cambiar evento del boton para cerrar form agregar productos
			removeEvent($('interruptor_add_prod'),'click',mostrarform_prods);
			$('interruptor_add_prod').innerHTML = "Nuevo Producto";
				addEvent($('interruptor_add_prod'),'click',function(){
				
				if($('formNewProd')){
					$('subcaja_prods').removeChild($('formNewProd'));
					var btn_menu = $('interruptor_add_prod');	
					
					removeEvent($('interruptor_add_prod'),'click',function(){
						$('subcaja_prods').removeChild($('formNewProd'));
					});
					
					addEvent($('interruptor_add_prod'),'click',mostrarform_prods);
				}
			});

			//evento de agregar boton y su validacion
			var altaProductoBtn = $('altaProductoBtn');
			addEvent($('formNewProd'),'submit',function(){
				//si esta vacion mostrar el error usual
				event.preventDefault();
				if($('formNewProd').NOMBRE.value == ''){
					$('errorUsual').getElementsByTagName('p')[0].innerHTML = 'Te falto llenar el campo obligatorio';
					var z = setInterval(function () {
						$('errorUsual').getElementsByTagName('p')[0].style.top = '-15%';
						$('errorUsual').style.height = '0';
						clearInterval(z);
						
					},2000)
					$('errorUsual').getElementsByTagName('p')[0].style.top = '10%';
					$('errorUsual').style.width = '100%';
					$('errorUsual').style.height = '25%';
				}
				//si no, hacer la consulta y traer la respuesta del servidor 
				else{
					ajaxRequest({
						metodo:'post',
						url:'GestionProd/altaProd.php',
						data: getFormAltaDataProd(),
						success:function(rta){
							rta = JSON.parse(rta);
							if($('list_table_prods')){
								var p = $('list_table_prods').getElementsByTagName('div')[0].getElementsByTagName('p')[0];
							}else{
								var p = $('errorUsual').getElementsByTagName('p')[0];
							}
							p.innerHTML = rta.message;
							if($('list_table_prods')){
								var z = setInterval(function () {
									traer_abm_prods();
									mostrarform_prods();
									clearInterval(z);
								},2000)	
							}else{
								var z = setInterval(function () {
									clearInterval(z);
								},2000)
							}
						}
					});
				}
			});
		}
	});
}
// treaer y validar registro de usuarios
function mostrarform_users(){
	ajaxRequest({
		url: 'GestionUsr/form_new_user.php',
		success: function(rta) {

			$('subcaja_users').innerHTML = rta;
			$('interruptor_add_user').setAttribute('name','1'); 

			//cambiar evento del boton para cerrar form agregar usuarios
			removeEvent($('interruptor_add_user'),'click',mostrarform_users);
			$('interruptor_add_user').innerHTML = "Nuevo Usuario";
				addEvent($('interruptor_add_user'),'click',function(){
				
				if($('formNewUser')){
					$('subcaja_users').removeChild($('formNewUser'));
					var btn_menu = $('interruptor_add_user');	
					
					removeEvent($('interruptor_add_user'),'click',function(){
						$('subcaja_users').removeChild($('formNewUser'));
					});
					
					addEvent($('interruptor_add_user'),'click',mostrarform_users);
				}
			});

			//evento de alta usuarios
			var altaUsuarioBtn = $('altaUsuarioBtn');
			addEvent($('formNewUser'),'submit',validarFormNewUser);
			
			
		}
	});
}

function getFormAltaData() {
	return 'NOMBRE='+$('altaUsuario').value +'&PASSWORD='+$('altaPassword').value;
}
function getFormAltaDataProd() {
		return 'NOMBRE=' + $('altaNombreProd').value +
				'&CATEGORIA=' + $('altaCategoriaProd').value +
				'&MARCA=' + $('aAltaPrecioProd').value +
				'&PRECIO=' + $('aAltaPrecioProd').value;
}
//validar campos vacios login
function validarLogin(event){
	if($('formLogin').NOMBRE.value == '' || $('formLogin').PASSWORD.value == ''){
		event.preventDefault();
		$('errorUsual').getElementsByTagName('p')[0].innerHTML = 'Te falto llenar uno de los campos';
		var z = setInterval(function () {
			$('errorUsual').getElementsByTagName('p')[0].style.top = '-15%';
			$('errorUsual').style.height = '0';
			clearInterval(z);
			
		},2000)
		$('errorUsual').getElementsByTagName('p')[0].style.top = '10%';
		$('errorUsual').style.width = '100%';
		$('errorUsual').style.height = '25%';
	}
}
//enviar y validar alta usuarios
function validarFormNewUser(event){
	if($('formNewUser').NOMBRE.value == '' || $('formNewUser').PASSWORD.value == ''){
		event.preventDefault();
		$('errorUsual').getElementsByTagName('p')[0].innerHTML = 'Te falto llenar uno de los campos';
		var z = setInterval(function () {
			$('errorUsual').getElementsByTagName('p')[0].style.top = '-15%';
			$('errorUsual').style.height = '0';
			clearInterval(z);
		},2000)
		$('errorUsual').getElementsByTagName('p')[0].style.top = '10%';
		$('errorUsual').style.width = '100%';
		$('errorUsual').style.height = '25%';
	}else{
		if($('list_table_users')){
			event.preventDefault();
		}
		
		
				ajaxRequest({
				metodo:'post',
				url:'GestionUsr/agregarUsr.php',
				data: getFormAltaData(),
				success:function(rta){
						rta = JSON.parse(rta);
						if($('list_table_users')){
							var p = $('list_table_users').getElementsByTagName('div')[0].getElementsByTagName('p')[0];
						}else{
							var p = $('errorUsual').getElementsByTagName('p')[0];
						}
						p.innerHTML = rta.message;
						if($('list_table_users')){
							var z = setInterval(function () {
								traer_abm_users();
								clearInterval(z);
							},2000)	
						}else{
							var z = setInterval(function () {
								
								clearInterval(z);
							},2000)
						}
				}
				
			});
			
		
	}
}

