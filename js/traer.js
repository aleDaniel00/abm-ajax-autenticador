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
addEvent(window,'DOMContentLoaded',hacerAlgo);


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
					addEvent(altaUsuarioBtn,'click',function (){
						validarFormNewUser();
						ajaxRequest({
							metodo:'post',
							url:'GestionUsr/agregarUsr.php',
							data: getFormAltaData(),
							success:function(rta){
								rta = JSON.parse(rta);
								var div = $('exito');
								div.innerHTML = rta.message;
							}
						});
					});
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
function traer_abm_users(){
	
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
		
			addEvent($('interruptor_add_user'),'click',mostrarform_users);
			if(document.getElementsByTagName('tr')){
				var arrayTr = div.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
				for (var i = 0; i < arrayTr.length; i++) {
					var botonBorrar = arrayTr[i].getElementsByTagName('td')[2].getElementsByTagName('button')[0];
					var botonModificar = arrayTr[i].getElementsByTagName('td')[1].getElementsByTagName('button')[0];
					addEvent(botonBorrar,'click',function(){
						borrar(this);
						function borrar(x){
							ajaxRequest({
								url: 'GestionUsr/borrarUsr.php?ID_USUARIO='+x.name+'/',
								success: function(rta) {
									rta = JSON.parse(rta);
									var div = $('msg_user');
									div.innerHTML = rta.message;
									traer_abm_users();
									
								}
							});
						}
					});
					addEvent(botonModificar,'click',function(){
						modificar(this);
						function modificar(x){
							ajaxRequest({
								url: 'GestionUsr/modificarUsr.php?ID_USUARIO='+x.name+'/',
								success: function(rta) {
									$('form_load').style.display = 'none';
									$('list_modif').innerHTML = rta;
									var botonEnviarModi = $('botonModificarUser');
									addEvent(botonEnviarModi,'click',function(){
										modificar_usuario2();
										function modificar_usuario2(){
											ajaxRequest({
												metodo:'post',
												url: 'GestionUsr/modificarUsr_2.php',
												data: getFormEditarData(),
												success: function(rta) {
													rta = JSON.parse(rta);
													var div = $('msg_user');
													div.innerHTML = rta.message;
													$('form_load').style.display = 'none';
													traer_abm_users();
												}
											});
										}
										function getFormEditarData() {
											return 'ID_USUARIO=' + $('ID_USUARIO').value +
													'&NOMBRE=' + $('modifUsrName').value +
													'&PASSWORD=' + $('modifUsrPass').value ;
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
function traer_abm_prods(){
	
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

		
			addEvent($('interruptor_add_prod'),'click',mostrarform_prods);
			if(document.getElementsByTagName('tr')){
				var arrayTr = div.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
				for (var i = 0; i < arrayTr.length; i++) {
					var botonBorrar = arrayTr[i].getElementsByTagName('td')[2].getElementsByTagName('button')[0];
					var botonModificar = arrayTr[i].getElementsByTagName('td')[1].getElementsByTagName('button')[0];
					addEvent(botonBorrar,'click',function(){
						borrar(this);	
						function borrar(x){
							ajaxRequest({
								url: 'GestionProd/borrarProd.php?ID_PRODUCTOS='+x.name+'/',
								success: function(rta) {
									rta = JSON.parse(rta);
									var div = $('msg_prod');
										div.innerHTML = rta.message;
									traer_abm_prods();
								
								}
							});
						}
					});
					addEvent(botonModificar,'click',function(){
						
						(function(x){
							ajaxRequest({
								url: 'GestionProd/modificarProd.php?ID_PRODUCTOS='+x.name+'/',
								success: function(rta) {
									$('form_load_prods').style.display = 'none';
									$('list_modif_prods').innerHTML = rta;
									var botonEnviarModi = $('botonModificarProd');
									botonEnviarModi.addEventListener('click',function(){
										
										(function(){
											ajaxRequest({
												metodo:'post',
												url: 'GestionProd/modificarProd_2.php?',
												data: getFormEditarData(),
												success: function(rta) {
													rta = JSON.parse(rta);
													var div = $('msg_prod');
													div.innerHTML = rta.message;
													$('form_load_prods').style.display = 'none';
													traer_abm_prods();
												}
											});
										})();
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

function mostrarform_prods(){
	ajaxRequest({
		url: 'GestionProd/form_new_prod.php',
		success: function(rta) {

			$('subcaja_prods').innerHTML = rta;
			$('interruptor_add_prod').setAttribute('name','1'); 
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
			var altaProductoBtn = $('altaProductoBtn');
			addEvent(altaProductoBtn,'click',agregarProducto);

			function agregarProducto(){
				ajaxRequest({
					metodo:'post',
					url:'GestionProd/altaProd.php',
					data: getFormAltaDataProd(),
					success:function(rta){
						rta = JSON.parse(rta);
						var div = $('msg_prod');
						div.innerHTML = rta.message;
						
						traer_abm_prods();
						
						mostrarform_prods();
					}

				});
			}
		}
	});
}

function mostrarform_users(){
	ajaxRequest({
		url: 'GestionUsr/form_new_user.php',
		success: function(rta) {

			$('subcaja').innerHTML = rta;
			$('interruptor_add_user').setAttribute('name','1'); 
			removeEvent($('interruptor_add_user'),'click',mostrarform_users);
			$('interruptor_add_user').innerHTML = "Nuevo Usuario";
			
			var altaUsuarioBtn = $('altaUsuarioBtn');
			addEvent(altaUsuarioBtn,'click',function (){
				ajaxRequest({
					metodo:'post',
					url:'GestionUsr/agregarUsr.php',
					data: getFormAltaData(),
					success:function(rta){
						rta = JSON.parse(rta);
						var div = $('msg_user');
						div.innerHTML = rta.message;

						traer_abm_users();
						mostrarform_users();
					}

				});
			});
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
function validarLogin(event){
	if(formLogin.NOMBRE.value == '' || formLogin.PASSWORD.value == ''){
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
function validarFormNewUser(event){
	alert();	event.preventDefault();
	c(event)
	if(formNewUser.NOMBRE.value == '' || formNewUser.PASSWORD.value == ''){
	
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
function hacerAlgo(){
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

// animacion  al menu principal


// animacion  al menu principal