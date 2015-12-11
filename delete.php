<?php
$id = $_POST["id"];

// file read
$file = "./data.json";
$fileResult = "";
// 왜 file에서 로드한 것은 decoding이 안되는지... 그냥 line을 지우는 것으로 delete 구현함.

$fp = fopen($file, 'r');  // 열기 
while ( ( $line = fgets( $fp, 4096 ) ) !== false ) {  // 파일이 끝날 때까지 loop
    if ( strpos($line,"\"id\":\"". $id ."\"") === false ) {
        // echo "</br><b>". $line ."</b></br>";
        $fileResult = $fileResult.$line;
    }
}
fclose($fp);

$fileResult = trim($fileResult);

if (substr($fileResult, -1) === ',') {
    $fileResult = substr($fileResult, 0, strlen($fileResult)-1);
}

// $json = "[".$fileResult."]";
// $json = "[{\"id\":\"ron-man\", \"Dept\":\"Marvels\"}, \n{\"id\":\"ron-man\", \"Dept\":\"Marvels\"}]";

//decoding
// $decode = json_decode($json, true) or die ("decode error");

//array 접근
// foreach($decode as $key=>$value) {
    // echo $value['id']."</br>";
// }

// file save
if(file_exists($file)){
    $fos = fopen($file, "w") or die("[error] can't open file");
    fwrite($fos, $fileResult);
    fclose($fos);
} else {
    echo "[error] File not exist, Making..". $file ."\n";
}

// ajax return
$fileResult = file_get_contents($file) or die("<!-- can't open file -->\n");
echo $fileResult;
?>