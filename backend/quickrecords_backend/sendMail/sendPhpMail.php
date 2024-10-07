<?php

  function sendPhpHtmlMail($mail, $mailObj){ 
        $mailFrom = $mailObj['mailFrom'];
        $mailTo = $mailObj['mailTo'];
        $mailSubject = $mailObj['mailSubject'];
        $mailBody = $mailObj['mailBody'];

        $mail->setFrom($mailFrom);
        $mail->addAddress($mailTo);
        $mail->isHTML(true);  
        $mail->Subject = $mailSubject;
        $mail->Body = $mailBody;

        //echo json_encode(['ok' => true, 'message' => '$mailBody']);
        //return;
        //If array of addresses (multiple addresses); Add recipients from the array
        if(isset($mailObj['toEmailAddresses'])) {
            foreach ($mailObj['toEmailAddresses'] as $email) {
                $mail->addAddress($email);
            }
        }

        if(isset($mailObj['cc'])){
        $mail->addCC($mailObj['cc']);
        }
        
        //If array of cc addresses is set; Add recipients from the array
        if(isset($mailObj['ccAddresses'])) {
            foreach ($mailObj['ccAddresses'] as $email) {
            $mail->addCC($email);
            }
        }
        
        if(isset($mailObj['bcc'])){
        $mail->addBCC($mailObj['bcc']);
        }
        
        //If array of bcc addresses is set; Add recipients from the array
        if(isset($mailObj['bccAddresses'])) {
            foreach ($mailObj['bccAddresses'] as $email) {
            $mail->addBCC($email);
            }
        }
        
        if(isset($mailObj['replyTo'])){
        $mail->addReplyTo($mailObj['replyTo']);
        }
        
        
        //Mail with attachment
        if(isset($mailObj['attachmentName'])){
            $filePath = $mailObj['attachment'];
            $fileName = $mailObj['attachmentName'];
            
            $mail->addAttachment($filePath, $fileName);
            if(!$mail->send()) {
                echo json_encode(['ok' => false, 'error' => true, 'message'=> "Mailer Error: " . $mail->ErrorInfo]);
            }else { 
                $mail->clearAddresses();
                //unlink($outputFilename);  //Delete a copy of the saved pdf
                echo json_encode(['ok' => true, 'message' => 'Mail sent successful']);
            }

        }else { //No attachment
            if(!$mail->send()) {
            echo json_encode(['ok' => false, 'error' => true, 'message'=> "Mailer Error: " . $mail->ErrorInfo]);
            }else { 
                $mail->clearAddresses();
                echo json_encode(['ok' => true, 'message' => 'Mail sent successful']);
            }
        }

  }  
    