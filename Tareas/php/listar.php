<?php
    require_once 'connect.php';
    
    // conecta a la base de datos
    $db = 'bd_tareas';
    $conexion = conectar($db);
    
    $sql = "SELECT * FROM tareas ORDER BY id"; // recoge todas las asignaturas
    $pdo = $conexion->prepare($sql);
    $pdo->execute();

    $datos = $pdo->fetchAll(PDO::FETCH_ASSOC);  // cada posicion del array es cada registro recogido de la select
    
    // devolvemos los datos en formato json
    echo json_encode($datos);
?>