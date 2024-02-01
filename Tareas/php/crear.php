<?php
        // filtramos los datos de la tabla segun el valor del nombre
        require_once 'connect.php';
        $db = 'bd_tareas';
      
       // $nombre = $_POST['t_visualizar'];
        $nombre = "Comprar";  // esto es solo para problar el filtro
        // $descripcion = $_POST['t_descripcion'];
        $descripcion = "Compar algo para cenar";  // esto es solo para problar el filtro
      

        $conexion = conectar($db);
        $parametros = array(
            ":nombre"=>$nombre,
            ":descripcion"=>$descripcion
        );
       
        $sql= "INSERT INTO tareas (nombre,descripcion) values (:nombre,:descripcion)";
       
     
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        $num = $pdo->rowcount(); 
        echo "registros insertados : ".$num;

        // devolvemos los datos en formato json
        echo json_encode($num);
    
?>