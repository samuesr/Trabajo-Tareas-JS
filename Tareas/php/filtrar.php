<?php
        // filtramos los datos de la tabla segun el valor del nombre
        require_once 'connect.php';
        $db = 'bd_tareas';
      
        
        $nombre = $_REQUEST['nombre'];
        
        // hay que poner el % aqui, para que no de error en la select
        $nombre = "%".$nombre."%";
      
        echo $nombre . "<br>";

        $conexion = conectar($db);
        $parametros = array(
            ":nombre"=>$nombre
        );
       
        $sql= "SELECT * FROM tareas WHERE nombre LIKE :nombre";
       
     
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        // cada posicion del array es cada registro recogido de la select
        $datos = $pdo->fetchAll(PDO::FETCH_ASSOC);  

        // devolvemos los datos en formato json
        echo json_encode($datos);
    
?>