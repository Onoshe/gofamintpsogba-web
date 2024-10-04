<?php

function zip_latest_backup_folder($backup_root_dir) {
    // Get all directories in the backup root folder
    $backup_dirs = array_filter(glob($backup_root_dir . '/*'), 'is_dir');

    if (empty($backup_dirs)) {
        echo "No backup folders found.";
        return false;
    }

    // Sort directories by their modification time (newest first)
    usort($backup_dirs, function($a, $b) {
        return filemtime($b) - filemtime($a); // Newest first
    });

    //return ['ok' => false, "msg"=>"Zip folder successful", 'zipFile' => $backup_dirs];

    // Get the latest directory
    $latest_backup_dir = $backup_dirs[0];
    
    // Zip the latest backup directory
    $zipFile = zip_backup_folder($latest_backup_dir);

    if ($zipFile) {
        return ['ok' => true, "msg"=>"Zip folder successful", 'zipFile' => $zipFile];
    } else {
        return ['ok' => false, 'msg' => "Failed to zip the latest backup folder."];
    }
}


function zip_backup_folder($folder) {
    $zipFile = $folder . ".zip";
    $zip = new ZipArchive();

    if ($zip->open($zipFile, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== TRUE) {
        return false;
    }

    $folder = realpath($folder);
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($folder), RecursiveIteratorIterator::LEAVES_ONLY);

    foreach ($files as $name => $file) {
        if (!$file->isDir()) {
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($folder) + 1);
            $zip->addFile($filePath, $relativePath);
        }
    }

    $zip->close();
    return $zipFile;
}

function email_backup($zipFile, $mail) {
    try {
        // Recipients
        $mail->setFrom('no-reply@gofamintpsogba.org', 'Backup Service');
        $mail->addAddress('ozitechstudio@gmail.com', 'Recipient Name'); // Add a recipient
        
        // Optional: Add more recipients or CC/BCC
        // $mail->addCC('cc@example.com');
        // $mail->addBCC('bcc@example.com');

        // Attachments
        $mail->addAttachment($zipFile);  // Add attachment

        // Content
        $mail->isHTML(true);                                    // Set email format to HTML
        $mail->Subject = 'Database Backup';
        $mail->Body    = 'Attached is the database backup.';
        $mail->AltBody = 'Attached is the database backup in ZIP format.';

        // Send the email
        $mail->send();
        return ['ok'=>true, 'msg'=> "Backup emailed successfully."];
    } catch (Exception $e) {
        return ['ok'=>false, 'msg'=> "Failed to email backup. Mailer Error: {$mail->ErrorInfo}"];
    }
}

function email_backup_with_defEmail($zipFile, $mailTo,$mailSubject) {
    $to = $mailTo; //"recipient@example.com"; // Change to your email address
    $subject = $mailSubject; //"Database Backup";
    $message = "Attached is the database backup.";
    $headers = "From: sender@example.com"; // Change to your sender email address

    $attachment = chunk_split(base64_encode(file_get_contents($zipFile)));
    $separator = md5(time());

    // Headers for attachment
    $headers .= "\r\nMIME-Version: 1.0\r\nContent-Type: multipart/mixed; boundary=\"" . $separator . "\"";

    // Email body
    $body = "--" . $separator . "\r\n";
    $body .= "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $message . "\r\n";

    // Attachment
    $body .= "--" . $separator . "\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"" . basename($zipFile) . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment\r\n\r\n";
    $body .= $attachment . "\r\n";
    $body .= "--" . $separator . "--";

    // Send mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Backup emailed successfully.";
    } else {
        echo "Failed to email backup.";
    }
}
