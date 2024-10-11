<?php
// Set the CORS headers to allow access from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Path to the asset folder
$asset_folder = 'asset/';

// Get the image name from the query parameter (e.g., ?image=filename.jpg)
$image_name = isset($_GET['image']) ? basename($_GET['image']) : null;

// Check if the image name is provided
if ($image_name) {
    // Construct the full path to the image
    $image_path = $asset_folder . $image_name;

    // Check if the file exists
    if (file_exists($image_path)) {
        // Get the MIME type of the image (e.g., image/jpeg, image/png)
        $mime_type = mime_content_type($image_path);

        // Set the appropriate content type for the image
        header('Content-Type: ' . $mime_type);

        // Output the image file to the browser
        readfile($image_path);
    } else {
        // Handle the case where the image file doesn't exist
        header("HTTP/1.0 404 Not Found");
        echo "Image not found.";
    }
} else {
    // Handle the case where no image is specified in the request
    header("HTTP/1.0 400 Bad Request");
    echo "No image specified.";
}

//Usage:
//example.com/serve-image.php?image=example.jpg