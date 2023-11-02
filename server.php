<?php 
if ($_POST) {

    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone_number = $_POST['phoneNumber'];
    
    if(!preg_match("/^[0-9]{10,10}+$/", $phone_number)) echo ("Телефон задан в неверном формате");

    if (filter_var($email_b, FILTER_VALIDATE_EMAIL)) echo "E-mail адрес '$email_b' указан верно.\n";
    else echo "E-mail адрес '$email_b' указан неверно.\n";
    
}