<!DOCTYPE html>
<html lang="th" data-bs-theme="dark">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="icon" type="image/x-icon" href="../src/beer_128.png">
		<title>Phycom Alcohol</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
		<link href="../src/index.css" rel="stylesheet" />
		<link href="play.css" rel="stylesheet" />
	</head>
	<body>
		<nav class="navbar sticky-top bg-primary bg-gradient">
			<div class="container-fluid">
				<span class="navbar-brand fs-4">
					<img src="../src/beer_128.png" alt="Logo" width="36" class="d-inline-block align-text-center">
					&nbsp;Phycom Alcohol
				</span>
				<ul id="nav-subtitle" class="navbar-nav me-auto">
					<li class="nav-item">
						<span class="text-light">Game</span>
					</li>
				</ul>
				<span class="p-1"></span>
				<button id="btn_endgame" class="btn btn-outline-danger bg-dark" data-bs-toggle="modal" href="#modal_endgame">
					หยุดเกม
				</button>
			</div>
		</nav>
		<div class="container-fluid">
			<div class="container-sm">
				<div id="get_player" class="gameplay text-center mt-5">
					<div>
						<h2 class="text-primary">
							ผู้เล่นในรอบนี้ 🍻
						</h2>
						<h1 id="player_name" class="mt-5">
							ชื่อผู้เล่นที่ 1
						</h1>
					</div>
					<div class="mt-5">
						<div class="i-center mt-1">
							<div id="alc-back" class="gr-back bg-gradient bg-success"></div>
							<div id="alc-front" class="gr-front bg-gradient bg-dark">
								<span id="alc-value" class="text-white">
									0
								</span><br>
								<span class="text-secondary i-unit">
									mg.%
								</span>
							</div>
						</div>
						<div class="mt-4">
							ดื่มแล้วเริ่มเป่าได้เลย!!!
						</div>
					</div>
					<div class="mt-5">
						<button type="button" class="btn btn-lg btn-dark rainbow fw-bold bg-gradient px-4 py-3" onclick="saveAlcValue()">
							ตอบคำถามวัดความเมา
						</button>
					</div>
				</div>
				<div id="get_question" class="gameplay text-center mt-4" style="display: none;">
					<h2 class="rainbow fs-1">
						ตอบคำถามต่อไปนี้ คนละ 3 ข้อ
					</h2>
					<div class="mt-4">
						<img id="ques_img" src="../src/wheel.svg" class="rounded" />
						<div class="mt-3 fs-5">
							(<span id="ques_num" class="fs-large">-</span>) <span id="ques_text">---</span>
						</div>
					</div>
					<div class="ans_grid mt-3">
						<button class="btn btn-lg bg-gradient btn-primary" id="ans1" onclick="chooseAnswer(this.id)">
							1
						</button>
						<button class="btn btn-lg bg-gradient btn-success" id="ans2" onclick="chooseAnswer(this.id)">
							2
						</button>
						<button class="btn btn-lg bg-gradient btn-warning" id="ans3" onclick="chooseAnswer(this.id)">
							3
						</button>
						<button class="btn btn-lg bg-gradient btn-danger" id="ans4" onclick="chooseAnswer(this.id)">
							4
						</button>
					</div>
				</div>
				<div id="get_score" class="gameplay text-center mt-4" style="display: none;">
					<h2 class="text-primary fs-1">
						ใครคอแข็งที่สุด 🤓
					</h2>
					<div class="mt-4 score_table">
						<table class="table">
							<thead>
								<tr>
									<th scope="col">อันดับ</th>
									<th scope="col">ชื่อผู้เล่น</th>
									<th scope="col">ค่าความเมา &nbsp;<button type="button" class="btn btn-sm btn-primary rounded-circle fw-bold bg-gradient" onclick="alert('ค่าความเมาจะถูกคำนวณจากปริมาณแอลกฮอล์ที่วัดและจากการตอบคำถามแต่ละข้อ')">?</button></th>
								</tr>
							</thead>
							<tbody id="tb_scorebd">
								<tr>
									<td class="rainbow">
										1
									</td>
									<td class="rainbow">
										ชื่อผู้เล่นที่ 1
									</td>
									<td class="rainbow">
										999
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="mt-4">
						<a type="button" class="btn btn-lg btn-primary bg-gradient px-4 py-3 fw-bold" href="../">
							ปิดเกม
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="modal_endgame" tabindex="-1">
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">หยุดเกม</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<p>แน่ใจไหมว่าต้องการหยุดเกมนี้?</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary btn-gradient" data-bs-dismiss="modal">เล่นต่อ</button>
						<button type="button" class="btn btn-danger btn-gradient" data-bs-dismiss="modal" onclick="endGame()">หยุดเกม</button>
					</div>
				</div>
			</div>
		</div>
		<div id="loading">
			<img src="../src/wheel.svg" />
		</div>
		<script src="../src/script.js"></script>
		<script src="play.js"></script>
		<script>
			setPlayer(<?= $_POST["ply"] ?>)
		</script>
	</body>
</html>