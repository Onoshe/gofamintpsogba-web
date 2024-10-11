<?php
 require_once './sendMail/sendPhpMail.php';


    if(isset($decodedData['mailObj'])){
        $mailObj = $decodedData['mailObj'];
        if(isset($mailObj['mailTo']) && isset($mailObj['mailFrom']) && isset($mailObj['mailSubject']) && isset($mailObj['mailBody'])){
            sendPhpHtmlMail($mail, $mailObj);
        }else{
            echo json_encode(array('ok' => false, 'msg' => "Incompleted mailObject variables"));
        }
    }else{
        echo json_encode(array('ok' => false, 'msg' => "Mail Object not set"));
    }
