<?php 
	require_once '../config.php';
__autoload('Usuario');

$id = $_GET['ID_USUARIO'];


$nuevoUsr = Usuario::cargarDeArrayModif($id);

foreach($nuevoUsr as $fila) { 
	?>
	<h2>Modificar <strong><?php echo $fila["NOMBRE"]?></strong></h2>
					
	<form id="formModif" method="post" >
		<div id="errorUsual"><p></p></div>
		<div>
			<label>Nombre:</label>
			<input id="modifUsrName" type="text" name="NOMBRE" value="<?php echo $fila["NOMBRE"];?>">
		</div>
		<div>
			<input type="hidden" id="ID_USUARIO" name="ID_USUARIO" value="<?php echo $fila["ID_USUARIO"];?>">
		</div>
		
		<div>
			<label>Password:</label>
			<input id="modifUsrPass"type="text" name="PASSWORD" value="">
		</div>
		
		
		
		<button id="botonModificarUser" name="<?php echo $fila["ID_USUARIO"];?>">Aplicar cambios</button>
		
	
	</form>
		
	<?php 
} ?>