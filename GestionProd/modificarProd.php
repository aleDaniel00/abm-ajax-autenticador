<?php
	require_once '../config.php';
	__autoload('Producto');
	

	$id = $_GET['ID_PRODUCTOS']	;
	$nuevoProd = Producto::cargarDeArrayModif($id);
			
	foreach($nuevoProd as $fila) { 
		?>
				
		<h2>Modificar <strong><?php echo $fila["NOMBRE"]?></strong></h2>
		<div id="formModif">
			
			<div>
				<label>Nombre Producto </label>
				<input type="text" id="NOMBRE_PROD" name="NOMBRE" value="<?php echo $fila["NOMBRE"];?>">
			</div>
			<div>
				<input type="hidden" id="ID_PRODUCTOS" name="ID_PRODUCTOS" value="<?php echo $fila["ID_PRODUCTOS"];?>">
			</div>
			<div>
				<label>Categoria Producto </label>
				<input type="text" id="CATEGORIA_PROD" name="CATEGORIA" value="<?php echo $fila["CATEGORIA"];?>">
			</div>
			
			
			<div>
				<label>Marca Producto </label>
				<input type="text" id="MARCA" name="MARCA" value="<?php echo $fila["MARCA"];?>">
			</div>
			
			
			
			<div>
				<label>Precio:</label>
				<input type="number" id="PRECIO" step="any" name="PRECIO"   min="10" step="500" value="<?php echo $fila["PRECIO"];?>">
			</div>
			
			
			<button id="botonModificarProd" name="<?php echo $fila["ID_PRODUCTOS"];?>">Aplicar cambios</button>
			
		</div>
		<?php 
	} 
	?>
		