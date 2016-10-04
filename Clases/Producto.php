<?php
// Producto.php
__autoload('DBConnection');

class Producto{
	private $ID_PRODUCTOS;
	private $NOMBRE;
	private $CATEGORIA;
	private $MARCA;
	private $PRECIO;
	
	public function __construct($id = null) {
		if(!is_null($id)) {
			// DB
			$query = "SELECT * FROM productos
					WHERE ID_PRODUCTOS = ?";
			$stmt = DBConnection::getStatement($query);
			$stmt->execute(array($id));
			$fila = $stmt->fetch(PDO::FETCH_ASSOC);
			$this->cargarDeArray($fila);
		}
	}
	
	
	public function cargarDeArray($fila) {
	
		foreach($fila as $prop => $valor) {
			$this->$prop = $valor;
		}
	}
	
	public static function getAll() {
		$query = "SELECT * FROM productos";
		$stmt = DBConnection::getStatement($query);
		
		$stmt->execute();
		
		return $stmt->fetchAll();
	}
	
	public function grabar() {
		$query = "INSERT INTO 
					productos(NOMBRE,CATEGORIA,MARCA,PRECIO
					)
				VALUES (:nom,:cat,:mar,:pre)";
		$stmt = DBConnection::getStatement($query);
		$exito = $stmt->execute(
			array(
				':nom' => $this->NOMBRE,
				':cat' => $this->CATEGORIA,
				':mar' => $this->MARCA,
				':pre' => $this->PRECIO
			)
		);
		if($exito) {
		echo json_encode([
			'status' => 1,
			'message' => 'El Producto, se ha Modificado exitosamente! :D'
		]);
		} else {
			echo json_encode([
				'status' => 0,
				'message' => 'El Producto no existe, No se realizaron cambios! :´('
			]);
		}
		
			
	}
	public static function cargarDeArrayModif($id) {
		$query = "SELECT * FROM productos WHERE ID_PRODUCTOS = ?";
		$stmt = DBConnection::getStatement($query);
		$stmt->execute(array($id));
		return $stmt->fetchAll();
	}
	
	public function actualizar() {
		$query = "UPDATE 
							productos
						SET 
							NOMBRE=:nom,
							CATEGORIA=:cat,
							MARCA=:mar,
							PRECIO=:pre							
						WHERE ID_PRODUCTOS = :cod
					;";
		$stmt = DBConnection::getStatement($query);
		$exito = $stmt->execute(
			array(
				':nom' => $this->NOMBRE,
				':cat' => $this->CATEGORIA,
				':mar' => $this->MARCA,
				':pre' => $this->PRECIO,
				':cod' => $this->ID_PRODUCTOS
			)
		);
		if($exito) {
		echo json_encode([
			'status' => 1,
			'message' => 'El Producto, se ha Modificado exitosamente! :D'
		]);
		} else {
			echo json_encode([
				'status' => 0,
				'message' => 'El Producto no existe, No se realizaron cambios! :´('
			]);
		}
		
			
	}
	
	
	
	public static function borrar($id) {
		$query = "DELETE FROM productos WHERE ID_PRODUCTOS = ?;";
		$stmt = DBConnection::getStatement($query);
		$stmt->fetch(PDO::FETCH_ASSOC);
		$exito = $stmt->execute(array($id));
		if($exito) {
		echo json_encode([
			'status' => 1,
			'message' => 'Producto borrado exitosamente! :D'
		]);
		} else {
			echo json_encode([
				'status' => 0,
				'message' => 'Error... :('
			]);
		}

	}
	function setID_PRODUCTOS($cod) {
		$this->ID_PRODUCTOS = $cod;
	}
	
	function getID_PRODUCTOS() {
		return $this->ID_PRODUCTOS;
	}
	function setNOMBRE($nom) {
		$this->NOMBRE = $nom;
	}
	
	function getNOMBRE() {
		return $this->NOMBRE;
	}
	function setCATEGORIA($cat) {
		$this->CATEGORIA = $cat;
	}
	
	function getCATEGORIA() {
		return $this->CATEGORIA;
	}
	function setMARCA($mar) {
		$this->MARCA = $MAR;
	}
	
	function getMARCA() {
		return $this->MARCA;
	}

	function getPRECIO() {
		return $this->PRECIO;
	}
	
}