<?php
 $title = $Q1 = $A1 = $Q2 = $A2 = $Q3 = $A3 = $Q4 = $A4 = $Q5 = $A5 = $ID = "";
 $ID = $_POST["submit"];

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
				echo($phparray[$i]['answer_4']);
			}

		}

 ?>