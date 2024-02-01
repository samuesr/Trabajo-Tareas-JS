<?php
        // filtramos los datos de la tabla segun el valor del nombre
        require_once 'connect.php';
        $db = 'bd_tareas';
      
       
       
        $nombre = $_REQUEST['nombre'];      
        $descripcion = $_REQUEST['descripcion'];
      
        $conexion = conectar($db);
        $parametros = array(
            ":nombre"=>$nombre,
            ":descripcion"=>$descripcion
        );
       
        $sql= "INSERT INTO tareas (nombre,descripcion) values (:nombre,:descripcion)";
       
     
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        $num = $pdo->rowcount(); 
        echo "registros insertados : ";

        // devolvemos los datos en formato json
        echo json_encode($num);
    
?>