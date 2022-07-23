<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    header("Content-Type: text/text");
    $key = "UPLOADSECRET";
    $uploadhost = "UPLOADHOSTDOMAIN";
    $redirect = "REDIRECTDOMAIN";
    if ($_SERVER["REQUEST_URI"] == "/robot.txt") { die("User-agent: *\nDisallow: /"); }
    if (isset($_POST['k'])) {
        if ($_POST['k'] == $key) {
            $target = getcwd() . "/" . basename($_FILES['d']['name']);
            if (move_uploaded_file($_FILES['d']['tmp_name'], $target)) {
                $md5 = md5_file(getcwd() . "/" . basename($_FILES['d']['name']));
                            $explode = explode(".", $_FILES["d"]["name"]);
                rename(getcwd() . "/" . basename($_FILES['d']['name']), "/var/www/flows.host/upload/end/" . $_POST['n'] . "." . $md5 . "." . end($explode));
                echo $uploadhost . $_POST['n'] . '/' . $md5 . "/" . $md5 . '.html';
            } else {
                echo "Your file could not be uploaded! :(";
            }
        } else {
            header('Location: '.$redirect);
        }
    } else {
        header('Location: '.$redirect);
    }
?>