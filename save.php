<?php
$id = $_POST["id"];
$title = $_POST["title"];
$data = $_POST["data"];
$date = $_POST["date"];
$newJsonItem = ",\n{" . "\"id\":\"" . $id ."\", " . "\"title\":\"" . $title . "\", " . "\"data\":\"" . $data . "\", " . "\"date\":\"" . $date . "\"}";

// file read
$file = "./data.json";
$fileResult = file_get_contents($file) or die("<!-- can't open file -->\n");

// echo "</br>---encoding--</br>";
// $json = "[".$fileResult."]";
// $json = json_encode($fileResult);
// echo $json;

// file save
if(file_exists($file)){
    $fos = fopen($file, "a") or die("[error] can't open file");
    fwrite($fos, $newJsonItem);
    echo $fileResult.$newJsonItem;
    fclose($fos);
} else {
    echo "[error] File not exist, Making..". $file ."\n";
}
?>