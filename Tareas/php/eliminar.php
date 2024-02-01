<?php
        // Eliminar el registro seleccionado
        require_once 'connect.php';
        $db = 'bd_tareas';
      
       // $id = $_POST['t_id'];   CON $_REQUEST ??
        $id = "Comprar";  // esto es solo para problar el filtro
        

        $conexion = conectar($db);
        $parametros = array(
            ":id"=>$id
        );
       
        $sql= "DELETE FROM  tareas WHERE id = :id";
       
     
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        $num = $pdo->rowcount(); 
        echo "registros eliminados : ".$num;

        // devolvemos los datos en formato json
        echo json_encode($num);
    
?>