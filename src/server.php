<?php
if ($_POST) {

    $host = "db";
    $username = "MYSQL_USER";
    $password = "MYSQL_PASSWORD";
    $port = 3306;
    $db = 'MYSQL_DATABASE';


    $conn = new mysqli($host, $username, $password, $db, $port);
    
    if ($conn->connect_error) {
        die("Ошибка подключения к базе данных: ");
    }

    
    // $sql = "CREATE DATABASE myDB";

    // if (mysqli_query($conn, $sql)) {
    //     echo "БД создано успешно";
    // } else {
    //     echo "БД не создано: " . mysqli_error($conn);
    //     exit();
    // }

    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone_number = $_POST['phoneNumber'];

    if (!preg_match("/^[0-9]{10,10}+$/", $phone_number)) {
        echo ("Телефон задан в неверном формате");
    }

    if (filter_var($email_b, FILTER_VALIDATE_EMAIL)) {
        echo "E-mail адрес '$email_b' указан верно.\n";
    }
    else echo "E-mail адрес '$email_b' указан неверно.\n";



    $current_time = time();
    $five_minutes_ago = $current_time - 300;
    $sql = "SELECT * FROM myTable WHERE name='$name' AND email='$email' AND phone='$phone' AND timestamp>'$five_minutes_ago'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        echo "Заявка уже была отправлена ранее";
        exit();
    }

    // Добавление данных в базу данных
    $sql = "INSERT INTO myTable (name, email, phone, timestamp) VALUES ('$name', '$email', '$phone', '$current_time')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Заявка успешно отправлена";
    } else {
        echo "Ошибка: ". $sql. "<br>". $conn->error;
    }

    $conn->close();
}
// CREATE TABLE myTable (
// 	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
// 	name VARCHAR(30) NOT NULL,
// 	email VARCHAR(50) NOT NULL,
// 	phone VARCHAR(20) NOT NULL,
// 	timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );