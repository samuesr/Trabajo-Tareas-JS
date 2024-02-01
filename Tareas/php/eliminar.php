<?php
        // Eliminar el registro seleccionado
        require_once 'connect.php';
        $db = 'bd_tareas';
      
        
        $id = $_REQUEST['t_id'];        
        

        $conexion = conectar($db);
        $parametros = array(
            ":id"=>$id
        );
       
        $sql= "DELETE FROM  tareas WHERE id = :id";
       
     
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        $num = 0;
        $num = $pdo->rowcount(); 
     
        // devolvemos los datos en formato json
        echo json_encode($num);
    
?>