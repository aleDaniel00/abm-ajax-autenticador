<?php
require_once 'config.php';
__autoload('Usuario');
__autoload('DBConnection');

$usuario = $_POST['NOMBRE'];
$pwd = $_POST['PASSWORD'];
$usr = Usuario::login($usuario,$pwd);
if(empty($usr)){
	//error de usuario o clave porque ninguno coincide con los datos pedidos.
	$_SESSION['error'] = 'Esta mal tu usuario o clave';
	//var_dump($_SESSION);
}else{
	//al menos un usuario existe
	$_SESSION = $usr;
}
//echo "<a href='panelDPaneles.php'> click</a>";
header("Location:panelDPaneles.php");


