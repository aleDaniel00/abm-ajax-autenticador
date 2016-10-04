<?php 
require_once '../config.php';
__autoload('Usuario');
//__autoload('Validator');

if($_SERVER['REQUEST_METHOD'] == "POST") {

	$usr = new Usuario();
	$usr->cargarDeArray($_POST);

	
	$usr->actualizar();
	
}