const gameplay = document.getElementsByClassName("gameplay");
const get_question = gameplay.get_question

const curr_player_name = document.getElementById("player_name")
const ques_img = document.getElementById("ques_img")
const ques_num = document.getElementById("ques_num")
const ques_text = document.getElementById("ques_text")
const ans = [document.getElementById("ans1"), document.getElementById("ans2"), document.getElementById("ans3"), document.getElementById("ans4")]
const tb_scorebd = document.getElementById("tb_scorebd")

let player_lst = []
let player_alc = []
let player_scr = []
let player_ans_cnt = []
let player_res = []
let player_cnt = 0
let current_player = 0
let current_ques = 1

let current_max_alc = 0
let current_alc = 0
let current_scr
let is_get_alc = true

let score_board_res = ""

function setPlayer(ply) {
	player_lst = ply.slice(0)
	player_cnt = player_lst.length
	
	for (let i = 0; i < player_cnt; i++) {
		player_alc.push([0])
		player_scr.push([0])
		player_ans_cnt.push([0, 0])
	}
	
	current_player = 0
	curr_player_name.innerText = player_lst[current_player]
	getAlcValue()
}

async function loadNewQuestion() {
	get_question.style.opacity = 0
	
	if (current_ques > 3) {
		current_player = (current_player + 1) % player_cnt
		current_ques = 1

		displayContent("get_player")
	} else {
		let qes_fetch = await fetch("question.php?t=get")
		let qes_return = await qes_fetch.json()
		qes_return.ques_ans = JSON.parse(qes_return.ques_ans)
		qes_return.ques_val = JSON.parse(qes_return.ques_val)
		current_scr = qes_return.ques_val
		
		ques_img.src = qes_return.ques_img
		ques_num.innerText = current_ques++
		ques_text.innerText = qes_return.ques_text
		
		for (let i = 0; i < 4; i++) {
			ans[i].innerText = qes_return.ques_ans[i]
		}
	}

	setTimeout(function() {
		get_question.style.opacity = 1
	}, 250)
}

function saveAlcValue() {
	player_alc[current_player] = Number(current_alc) + Number(player_alc[current_player])
	player_ans_cnt[current_player][0] = Number(player_ans_cnt[current_player][0]) + 1
	displayContent("get_question")
}

function chooseAnswer(id) {
	player_scr[current_player] = Number(current_scr[Number(id[3]) - 1]) + Number(player_scr[current_player])
	player_ans_cnt[current_player][1] = Number(player_ans_cnt[current_player][1]) + 1

	loadNewQuestion()
}

function endGame() {
	is_get_alc = false
	
	for (let i = 0; i < player_cnt; i++) {
		let avg_alc = player_alc[i] / player_ans_cnt[i][0]
		let avg_scr = player_scr[i] / player_ans_cnt[i][1]
		let calc_res = Number(Number(Math.max(avg_alc * avg_scr * 0.75, 1)).toFixed(2))
		player_res.push(calc_res)
	}
	console.log(player_res)
	
	let curr_lowest = Infinity
	for (let j = 0; j < player_cnt; j++) {
		let curr_lowest = Infinity
		let index_lowest = 0
		for (let k = 0; k < player_cnt; k++) {
			if (Number(player_res[k]) == -1) {
				continue
			}
			
			if (Number(player_res[k]) <= curr_lowest) {
				index_lowest = k
				curr_lowest = Number(player_res[k])
			}
		}
		
		if (j == 0) {
			score_board_res += "<tr>\
									<td class=\"rainbow\">\
										" + Number(j + 1) + "\
									</td>\
									<td class=\"rainbow\">\
										" + player_lst[index_lowest] + "\
									</td>\
									<td class=\"rainbow\">\
										" + player_res[index_lowest] + "\
									</td>\
								</tr>"
		} else {
			score_board_res += "<tr>\
									<td>\
										" + Number(j + 1) + "\
									</td>\
									<td>\
										" + player_lst[index_lowest] + "\
									</td>\
									<td>\
										" + player_res[index_lowest] + "\
									</td>\
								</tr>"
		}
		
		player_res[index_lowest] = -1
	}
	
	tb_scorebd.innerHTML = score_board_res
	displayContent("get_score")
}

async function getAlcValue() {
	if (is_get_alc) {
		let val_fetch = await fetch("../value.php?t=get")
		let val_return = await val_fetch.text()
		val_return = val_return.split("\n")
		current_alc = Number(Number(val_return[0]).toFixed(2))
		
		if (current_alc >= current_max_alc) {
			current_max_alc = Number(current_alc)
		}
		setAlcValue(current_max_alc)

		setTimeout(getAlcValue, 2000)
	}
}

function displayContent(id) {
	for (let i = 0; i < gameplay.length; i++) {
		gameplay.item(i).style.opacity = 0
		
		setTimeout(function() {
			gameplay.item(i).style.display = "none"
		}, 250)
	}
	curr_player_name.classList.add("text-danger")

	is_get_alc = (id == "get_player" ? true : false)
	curr_player_name.innerText = player_lst[current_player]
	getAlcValue()
	
	if (id == "get_question") {
		loadNewQuestion()
	}
	
	current_max_alc = 0

	setTimeout(function() {
		document.getElementById(id).style.display = "block"
		document.getElementById(id).style.opacity = 1
		
		document.getElementById("btn_endgame").style.display = (id == "get_score" ? "none" : "block")
		curr_player_name.classList.remove("text-danger")
	}, 250)
}

const alc_front = document.getElementById("alc-front")
const alc_back = document.getElementById("alc-back")
const alc_value = document.getElementById("alc-value")

let lastValue = 0

function setAlcValue(value) {
	if (lastValue != value) {
		alc_front.classList.remove("bg-dark")
		alc_front.classList.add("bg-light")
		setTimeout(function() {
			alc_front.classList.remove("bg-light")
			alc_front.classList.add("bg-dark")
		}, 300)
	}
	lastValue = value
	
	if (value < 30) {
		alc_back.classList.add("bg-success")
	} else if (value >= 30 && value < 50) {
		alc_back.classList.add("bg-warning")
	} else {
		alc_back.classList.add("bg-danger")
	}
	
	alc_value.innerText = value
}