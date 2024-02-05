<?php
        // Busca los datos de la tabla segun el valor del identificador
        require_once 'connect.php';
        $db = 'bd_tareas';
      
       
        $id = $_REQUEST['t_id'];
        
        
        $conexion = conectar($db);
        $parametros = array(
            ":id"=>$id
        );
       
        $sql= "SELECT * FROM tareas WHERE id = :id";
       
     
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        // cada posicion del array es cada registro recogido de la select
        $datos = $pdo->fetchAll(PDO::FETCH_ASSOC);  

        // devolvemos los datos en formato json
        echo json_encode($datos);
    
?>