	<form id="formNewUser" name="formNewUser" action="GestionUsr/agregarUsr.php" method="post">
		<div id="exito"></div>
		<div id="errorUsual"><p></p></div>
		<div >
			<label for="altaUsuario">Escribe el nombre de usuario: </label>
			<input id="altaUsuario" type="text" name="NOMBRE" >
		</div>
		<div>
			<label for="altaPassword">Escribe el password: </label>
			<input id="altaPassword" type="password" name="PASSWORD" >
		</div>
		<button type="submit" value="submit" id="altaUsuarioBtn">Registrar nuevo usuario</button>
	</form>
</li>