<?php
    
        require_once 'connect.php';
        $db = 'escuela';
      
        $cod_asig = $_POST['cod_asig'];
        $conexion = conectar($db);
        $parametros = array(
            ":cod_asig"=>$cod_asig
        );
       
        $sql= "select * from alumnos where clave_alumno in ( select clave_alumno  from matriculas where clave_asignatura = :cod_asig)";
        //$sql = "SELECT a.*, m.clave_asignatura FROM alumnos as a, matriculas as m WHERE m.clave_alumno = a.clave_alumno and m.clave_asignatura = :cod_asig ";         
     
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);

        // cada posicion del array es cada registro recogido de la select
        $datos = $pdo->fetchAll(PDO::FETCH_ASSOC);  

        // devolvemos los datos en formato json
        echo json_encode($datos);
    
?>