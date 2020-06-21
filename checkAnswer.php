<?php
	$title = $Q1 = $A1 = $Q2 = $A2 = $Q3 = $A3 = $Q4 = $A4 = $Q5 = $A5 = $ID = "";
	$ErrA1 = $ErrA2 = $ErrA3 = $ErrA4 = $ErrA5 ="";
	$ID = $_POST["submit"]; 
	$A1 = $_POST["A1"]; 
	$A2 = $_POST["A2"]; 
	$A3 = $_POST["A3"]; 
	$A4 = $_POST["A4"]; 
	$A5 = $_POST["A5"];

	//call Json
	$file = "quiz.json";
	$json = file($file);
	$jsonstring = "";

	//read json
	foreach ($json as $line) {
	    $jsonstring .= $line;
	}//foreach

	//decode json into array
	$phparray = json_decode($jsonstring, true);
	for($i = 0; $i < sizeof($phparray); $i++){
		if($phparray[$i]['ID'] == $ID){
			if($phparray[$i]['answer_1'] != $A1){
				$ErrA1 =  "'" . $A1 . "'" . " is wrong! the correct answer is " .  $phparray[$i]['answer_1'];
			}

			if($phparray[$i]['answer_2'] != $A2){
				$ErrA2 = "'" . $A2 . "'" . " is wrong! the correct answer is " .  $phparray[$i]['answer_2'];
			}

			if($phparray[$i]['answer_3'] != $A3){
				$ErrA3 = "'" . $A3 . "'" . " is wrong! the correct answer is " .  $phparray[$i]['answer_3'];
			}

			if($phparray[$i]['answer_4'] != $A4){
				$ErrA4 = "'" . $A4 . "'" . " is wrong! the correct answer is " .  $phparray[$i]['answer_4'];
			}

			if($phparray[$i]['answer_5'] != $A5){
				$ErrA5 = "'" . $A5 . "'" . " is wrong! the correct answer is " .  $phparray[$i]['answer_5'];
			}

			$Q1 = $phparray[$i]['question_1'];
			$Q2 = $phparray[$i]['question_2'];
			$Q3 = $phparray[$i]['question_3'];
			$Q4 = $phparray[$i]['question_4'];
			$Q5 = $phparray[$i]['question_5'];
		}//if

	}//for

	if($ErrA1 != ""){
		echo("1.)  " . $Q1);
		echo "<br>";
		echo($ErrA1);
		echo "<br>";
		echo "<br>";
	}
	if($ErrA2 != ""){
		echo("2.)  " . $Q2);
		echo "<br>";
		echo($ErrA2);
		echo "<br>";
		echo "<br>";
	}
	if($ErrA3 != ""){
		echo("3.)  " . $Q3);
		echo "<br>";
		echo($ErrA3);
		echo "<br>";
		echo "<br>";
	}
	if($ErrA4 != ""){
		echo("4.)  " . $Q4);
		echo "<br>";
		echo($ErrA4);
		echo "<br>";
		echo "<br>";
	}
	if($ErrA5 != ""){
		echo("5.)  " . $Q5);
		echo "<br>";
		echo($ErrA5);
		echo "<br>";
		echo "<br>";
	}


 ?>