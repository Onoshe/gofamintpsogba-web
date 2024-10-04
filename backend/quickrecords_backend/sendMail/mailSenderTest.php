<?php

    require '../lib/PHPMailer-master/src/Exception.php';
    require '../lib/PHPMailer-master/src/PHPMailer.php';
    require '../lib/PHPMailer-master/src/SMTP.php';
    
    $mail = new PHPMailer\PHPMailer\PHPMailer();

    $mail->isSMTP();
    $mail->SMTPSecure = 'ssl';
    $mail->SMTPAuth = true;
    $mail->Host = 'mail.gofamintpsogba.org';
    $mail->Port = 465;
    $mail->Username = 'no-reply@gofamintpsogba.org';
    $mail->Password = '#psGofamint@2020';
    $mail->setFrom('no-reply@gofamintpsogba.org');
    $mail->addAddress('ozitechstudio@gmail.com');
    $mail->Subject = 'Hello from PHPMailer!';
    $mail->Body = 'This is a test.';
    //send the message, check for errors
    if (!$mail->send()) {
        echo "ERROR: " . $mail->ErrorInfo;
    } else {
        echo "SUCCESS";
}