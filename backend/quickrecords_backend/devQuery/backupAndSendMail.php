<?php

 require_once './backup/emailBackupFile.php';


    $backup_root_dir = 'backup';
    //Zip the latest file and email

    $zipFile =  zip_latest_backup_folder($backup_root_dir);
    if ($zipFile['ok']) {
        $res = email_backup($zipFile['zipFile'], $mail);
        
        if($res['ok']){
            // Delete the ZIP file
            $zipedFile = $zipFile['zipFile'];
            if (unlink($zipedFile)) {
                echo json_encode(array('ok' => true, 'msg' => "Mail sent with zip file- $zipedFile deleted"));
            } else {
                echo json_encode(array('ok' => true, 'msg' => "Mail sent but unable to delete zip file- $zipedFile"));
            }
        }else{
            echo json_encode(array('ok' => false, 'msg' => $res['msg']));
        }
            
    }else{
        echo json_encode(array('ok' => $zipFile['ok'], 'msg' => $zipFile['msg']));
    }

