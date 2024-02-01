<?php
        // filtramos los datos de la tabla segun el valor del nombre
        require_once 'connect.php';
        $db = 'bd_tareas';
            
        
        $id = $_REQUEST['id'];       
        $nombre = $_REQUEST['nombre'];       
        $descripcion = $_REQUEST['descripcion'];


        $conexion = conectar($db);
        $parametros = array(
            ":id"=>$id,
            ":nombre"=>$nombre,
            ":descripcion"=>$descripcion
        );
       
        $sql= "UPDATE tareas SET nombre = :nombre, descripcion = :descripcion WHERE id = :id";
       
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        $num = $pdo->rowcount();       

        // devolvemos los datos en formato json
        echo json_encode($num);
    
?>