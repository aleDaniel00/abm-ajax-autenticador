	<?php
	require_once 'config.php';
	__autoload('DBConnection');
	

	?>
<!doctype html>
<html>
<head>
	<title>PARCIAL 1 ALEX PEREZ</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="css/css.css" />
	<script type="text/javascript" src="js/ajax.js"></script>
</head>
<body>
	
	<?php
	if( empty($_SESSION) || isset($_SESSION['error'])){
		echo '<div id="barra_inicial"> <h1>Parcial 1 - tecno 4</h1><p >No has iniciado sesion!</p></div>'; 
	}
	if( ! isset($_SESSION['ID_USUARIO']) ){
	?>		
		
		<div id="miVentana" >
			<div id="login">
				<div class="encabezadoLogin">
					<p id="tituloForm">Logueate</p>
				</div>
				
				<div  id="contenidoSinLogin">
					<?php
						if( isset($_GET['error'])){
						echo '<div id="error_uno">Usuario ya existente, intente registrarse  una vez mas!</div>';
						unset( $_GET['error'] );
						}
						?>
					<form id="formLogin" method="post" action="login.php">
						<?php
						if( isset($_SESSION['error'])){
						echo '<div id="error_login">'.$_SESSION['error'].'</div>';
						unset( $_SESSION['error'] );
						}
						?>
						<div id="errorUsual"><p></p></div>
						<div>
							<input type="text" name="NOMBRE" placeholder="NOMBRE">
						</div>
						<div>
							<input type="password" name="PASSWORD" placeholder="PASSWORD">
						</div>
						 <div>
							<input type="submit" value="Entrar">
							<!--<a id="botonRegistrarme" href="index.php?seccion=registro">Registrarme</a> -->
						</div>
					</form>
				</div>
				<div id="box_form_login"></div>
			</div>
			<div id="caja_externa"> <a id="traerFormRegistroUser">Registrate</a></div>
		</div>
				<?php
	}else{ //tenes session[id] o sea que estas logueado
				?>
				<div  id="contenidoLogin">
					<h2>Logueado como:</h2>
					<?php
					echo "<p>"." ".strtoupper($_SESSION['NOMBRE'])."</p>";
					
					
					?>
					<div>
						<a href="logout.php">SALIR</a>
					</div>
				</div>
					
			</div>
		</div>
		<ul id="contenedor_items">
			<li id="encabezado"><h1>Administrador</h1></li>
			<li class="menuabm">
				<a id="abm_users">Usuarios</a>
				<ul id="lista_users_abm"></ul>

				
			</li>
			<li class="menuabm">
				<a id="abm_prods">Productos</a>
				<ul id="lista_prods_abm"></ul>

			</li>
		</ul>
		<footer>
		<ul> 
			<li>Presentado por: Alex Daniel Perez</a></li>
			<li>Materia: Tecno 4 (JS-Avanzado)</li>
			<li>Docente: Santiago Gallino</li>
			
			
		</ul>
		</footer>
		<?php
	}
	?>
	
	
<script type="text/javascript" src="js/traer.js"></script>	
</body>
</html>