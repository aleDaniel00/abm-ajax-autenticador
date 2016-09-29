<?php 
require_once '../config.php';
	__autoload('Producto');
	
if($_SERVER['REQUEST_METHOD'] == "POST") {
	$prod = new Producto();
	//$pel->cargarDatosDeForm();
	$prod->cargarDeArray($_POST);
	//if($pel->validate()) {
	$prod->actualizar();
	//}
}