<?php
require_once '../config.php';
__autoload('Producto');
__autoload('DBConnection');
?>

<!--<li class="tituloDos"><h2>Tabla-lista de Usuarios y formulario de alta</h2></li>-->
<li id="list_table_prods">
	<div id="msg_prod"></div>
			<table border="1">
				<thead>               
					<tr>
					  <th>Producto</th>
					  <th>Modificar</th>
					  <th>Borrar</th>
					</tr>
				</thead>
				<?php
					$prod = Producto::getAll();
					foreach($prod as $fila) {
				
						?>
							<tr>
								<td>
									<?php echo $fila["NOMBRE"];?>
								</td>
								<td>
									<button class='botonModificar'  title='Modificar' name="<?php echo $fila["ID_PRODUCTOS"];?>">
									modificar	
									</button>
								</td>
							 	<td >
									<button class='botonBorrar'   title='Borrar' name="<?php echo $fila["ID_PRODUCTOS"];?>">
										BORRAR
									</button>
								</td> 
							</tr>
						<?php
					} 
				?> 
			</table>
		</li>
		<li id="form_load_prods">
			<?php
						if( isset($_GET['nuevoProd'])){
						echo '<div id="grabado_exitoso">Nuevo producto ha sido agregado exitosamente!</div>';
						unset( $_GET['nuevoProd'] );
						}
						?>
						<?php
						if( isset($_GET['error'])){
						echo '<div id="error_uno">Nombre Producto ya existente, intente registrar una vez mas!</div>';
						unset( $_GET['error'] );
						}
						?>
			<button id="interruptor_add_prod" class="text_btn" name='0'>
				Nuevo Producto
			
			</button>
		<div id="subcaja_prods"></div>
		</li>
		<li id="list_modif_prods"></li>