$(function() {
	let counter = 0
	if(localStorage.getItem("counter") !== null) {
		counter = localStorage.getItem("counter")
	} else {
		localStorage.setItem("counter", counter)
	}


	function appendThing(where, text, id) {
		$("#" + where).append("<div class='thing' id='" + id + "'>" + text + "</div>")
	}


	function sync() {
		if(counter>0) {
			for(let i= 0; i<counter; i++) {
				if(localStorage.getItem(i) !== null) {
					let $id = $("#" + i)

					if($id.parent().attr("id") !== "rubbish") {
						let temp = $id.parent().attr("id") + ";" + $id.html()
						localStorage.setItem(i, temp)
					} else {
						$id.remove()
						localStorage.removeItem(i)
					}
				}
				
			}
		}
	}
	setInterval(sync, 3000)


	let temp
	if(counter>0) {
		for(let i= 0; i<counter; i++) {
			if(localStorage.getItem(i) !== null) {
				temp = localStorage.getItem(i).split(";")
				appendThing(temp[0], temp[1], i)
			}	
		}
	}


	$(".sortable").sortable({
		connectWith: ".sortable"
	}).disableSelection()

	
	$(document).on("click", "#add", () => {
		let $new = $("#new")
		if($new.val() !== "") {
			appendThing("todo", $new.val(), counter)
			localStorage.setItem(counter, "todo;" + $new.val())
			$new.val("")

			counter++
			localStorage.setItem("counter", counter)
		} else {
			alert("Not valid.")
		}
	})

	$(document).on("keypress", "#new", function(e) {
		if($("#new").val() !== "" && $("#new").val() !== " ") {
			if(e.key === "Enter") {
				$("#add").trigger("click")
			}
		} 
	})
})