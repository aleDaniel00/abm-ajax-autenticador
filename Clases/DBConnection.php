<?php
// DBConnection.php
// Clase para manejar la BBDD en modo singleton.

class DBConnection {
	// dbh => Database Handler
	private static $dbh;
	
	private function __construct() {}
	
	public static function getConnection() {
		if(empty(self::$dbh)) {
			//echo "Abro conexión<br>";
			try {
				self::$dbh = new PDO('mysql:host=localhost;dbname=parcial', 'root', '');
				
			} catch(Exception $e) {
				echo "Error al conectar con la BBDD: " . $e->getMessage();
			}
		}
		
		return self::$dbh;
		
	}
	
	public static function getStatement($query) {
		
		return self::getConnection()->prepare($query);
	}
}
