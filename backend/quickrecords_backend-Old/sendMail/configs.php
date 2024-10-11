<?php

    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
	//header("Access-Control-Allow-Headers: Content-Type");
	header("Access-Control-Allow-Headers: X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");

    error_reporting(E_ALL);
	ini_set('display_errors', 3);
    
    require './lib/PHPMailer-master/src/Exception.php';
    require './lib/PHPMailer-master/src/PHPMailer.php';
    require './lib/PHPMailer-master/src/SMTP.php';
    
    
    function getMailConfigs($username, $password){
        $mail = new PHPMailer\PHPMailer\PHPMailer();

        $mail->isSMTP();
        $mail->SMTPSecure = 'ssl';
        $mail->SMTPAuth = true;
        $mail->Host = 'mail.gofamintpsogba.org';
        $mail->Port = 465;
        $mail->Username = $username;
        $mail->Password = $password;
        
        return $mail;
    }