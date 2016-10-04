
<?php
	require_once '../config.php';
	__autoload('Producto');
	__autoload('DBConnection');

$id = $_GET['ID_PRODUCTOS']	;
Producto::borrar(intval($id));

