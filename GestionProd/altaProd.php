
<?php
require_once '../config.php';
	__autoload('Producto');


if($_SERVER['REQUEST_METHOD'] == "POST") {
	$prod = new Producto();
	//$prod->cargarDatosDeForm();
	$prod->cargarDeArray($_POST);
	//if($prod->validate()) {
	$prod->grabar();
}
