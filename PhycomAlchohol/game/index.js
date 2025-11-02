const player_name = document.getElementById("player_name")
const f_go = document.getElementById("f_go")
const f_ply = document.getElementById("f_ply")

function goPlay() {
	if (player_name.value.trim() == "") {
		alert("กรุณากรอกชื่อผู้เล่น!")
	} else {
		f_ply.value = JSON.stringify(player_name.value.trim().split("\n"))
		f_go.submit()
	}
}