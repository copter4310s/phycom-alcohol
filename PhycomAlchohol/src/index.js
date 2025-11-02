const alc_text = document.getElementById("alc-text")
const alc_front = document.getElementById("alc-front")
const alc_back = document.getElementById("alc-back")
const alc_value = document.getElementById("alc-value")
const alc_time = document.getElementById("alc-time")
const t10_body = document.getElementById("t10_body")

let lastValue = 0
let lastDate = ""

function setAlcValue(value, time) {
	if (lastValue != value && lastDate != time) {
		alc_front.classList.remove("bg-dark")
		alc_front.classList.add("bg-light")
		setTimeout(function() {
			alc_front.classList.remove("bg-light")
			alc_front.classList.add("bg-dark")
		}, 300)
	}
	lastValue = value
	
	alc_text.classList.remove("text-success")
	alc_text.classList.remove("text-warning")
	alc_text.classList.remove("text-danger")
	alc_back.classList.remove("bg-success")
	alc_back.classList.remove("bg-warning")
	alc_back.classList.remove("bg-danger")
	
	if (value < 30) {
		alc_text.classList.add("text-success")
		alc_back.classList.add("bg-success")
	} else if (value >= 30 && value < 50) {
		alc_text.classList.add("text-warning")
		alc_back.classList.add("bg-warning")
	} else {
		alc_text.classList.add("text-danger")
		alc_back.classList.add("bg-danger")
	}
	
	alc_value.innerText = value
	alc_time.innerText = time
}

async function getAlcValue() {
	let val_fetch = await fetch("value.php?t=get")
	let val_return = await val_fetch.text()
	val_return = val_return.split("\n")
	setAlcValue(Number(val_return[0]), val_return[1])
	
	setTimeout(getAlcValue, 2100)
}

async function getAlcStats() {
	let val_fetch = await fetch("value.php?t=stats")
	let val_return = await val_fetch.json()
	let returnddd = ""
	
	for (let i = 0; i < val_return.length; i++) {
		returnddd += "<tr>\
								<th scope=\"col\">\
									" + val_return[i][0] + "\
								</th>\
								<td>\
									" + val_return[i][1] + "\
								</th>\
								<td scope=\"col\">\
									" + val_return[i][2] + "\
								</th>\
							</tr>"
	}
	
	t10_body.innerHTML = returnddd
	setTimeout(getAlcValue, 11000)
}