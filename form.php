<?php 
$title = $Q1 = $A1 = $Q2 = $A2 = $Q3 = $A3 = $Q4 = $A4 = $Q5 = $A5 = $ID = "";
$output = "";
$title = $_POST["QTitle"];
$Q1 = $_POST["Q1"];  
$Q2 = $_POST["Q2"]; 
$Q3 = $_POST["Q3"]; 
$Q4 = $_POST["Q4"]; 
$Q5 = $_POST["Q5"]; 
$A1 = $_POST["A1"]; 
$A2 = $_POST["A2"]; 
$A3 = $_POST["A3"]; 
$A4 = $_POST["A4"]; 
$A5 = $_POST["A5"]; 

//get, modify and save ID to numQuiz.txt (quiz number)
$ID = str_pad(file_get_contents('numQuiz.txt'), 4, '0', STR_PAD_LEFT); //get UID
$ID = str_pad(file_get_contents('numQuiz.txt') + 1, 4, '0', STR_PAD_LEFT);
file_put_contents('numQuiz.txt', $ID);

        //store each value in array $output
        $output = array(
            'title' => $title,
            'question_1' => $Q1,
            'answer_1' => $A1,
            'question_2' => $Q2,
            'answer_2' => $A2,
            'question_3' => $Q3,
            'answer_3' => $A3,
            'question_4' => $Q4,
            'answer_4' => $A4,
            'question_5' => $Q5,
            'answer_5' => $A5,
            'ID' => $ID,
        );

// read json file into array of strings
        $file      = "quiz.json";
        $filearray = file($file);
        
        // create one string from the file
        $jsonstring = "";
        foreach ($filearray as $line) {
            $jsonstring .= $line;
        }//foreach
        
        //decode the string from json to PHP array
        $phparray = json_decode($jsonstring, true);
        
        // add form submission to data (this does NOT remove submit button)
        $phparray[] = $output;
        
        // encode the php array to formatted json 
        $jsoncode = json_encode($phparray, JSON_PRETTY_PRINT);
        
        // write the json to the file
        file_put_contents($file, $jsoncode);


?>
