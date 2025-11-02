<?php
	include "../php/header.php";

	if (isset($_GET["t"]) && $_GET["t"] == "get") {
		$sql_query = mysqli_query($conn, "SELECT * FROM phycom_alcohol_question ORDER BY RAND() LIMIT 0, 1");
		$sql_result = mysqli_fetch_assoc($sql_query);
		
		echo json_encode($sql_result);
	} else {
		echo "false";
	}
?>