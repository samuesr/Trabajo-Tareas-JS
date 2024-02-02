<?php

    // conecta a la base de datos pasada por parametro
	function conectar($db){
        try {
            $connect = new PDO("mysql:host=localhost; dbname=$db; charset=utf8", 'root', 'root');
        } catch (PDOException $e) {
            echo 'Error '.$e->getMessage();
        }
        return $connect;
    }

?>