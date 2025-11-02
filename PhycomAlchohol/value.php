<?php
	include "./php/header.php";
	
	$v_success = "true";
	$v_fail = "false";
	$type = $_GET["t"];
	
	if ($type == "get") {
		$sql_query = mysqli_query($conn, "SELECT value, date FROM phycom_alcohol ORDER BY id DESC LIMIT 0, 1");
		
		if ($sql_query) {
			if (mysqli_num_rows($sql_query) > 0) {
				$sql_result = mysqli_fetch_assoc($sql_query);
				echo number_format((float) $sql_result["value"], 2, '.', '') . "\n";
				$getDate = strtotime($sql_result["date"]);
				echo date("M d, Y @H:i น.", $getDate);
			} else {
				echo "0";
			}
		} else {
			echo $v_fail;
		}
	} else if ($type == "set") {
		$value = (float) $_GET["v"];
		$curr_date = date("Y-m-d H:i:s");
		$sql_query = mysqli_query($conn, "INSERT INTO phycom_alcohol(value, date) VALUES ($value, '$curr_date')");
		
		echo ($sql_query ? $v_success : $v_fail);
	} else if ($type == "stats") {
		$sql_query = mysqli_query($conn, "SELECT * FROM phycom_alcohol ORDER BY id DESC LIMIT 0, 10");
		$stats_res = [];
		
		if ($sql_query) {
			if (mysqli_num_rows($sql_query) > 0) {
				while ($sql_result = mysqli_fetch_array($sql_query)) {
					array_push($stats_res, [$sql_result["id"], $sql_result["value"], date("M d, Y @H:i น.", strtotime($sql_result["date"]))]);
				}
				echo json_encode($stats_res);
			} else {
				echo "";
			}
		} else {
			echo $v_fail;
		}
	} else {
		echo $v_fail;
	}
?>