        var audio = new Audio('melody.mp3');
		audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
        }, false);
		audio.play();

		var startTime = new Date().getTime();
		var clicks = 0;
		var lowestScore= 0;

		function getRandomColor(){
			var letters = '0123456789ABCDEF'.split('');
			var color = '#';

			for (var i = 0; i < 6; i++) {
				color += letters[Math.floor(Math.random() * 16)]
			}

			return color;
		}

		function shapeAppear(){
			var top = Math.random() * 400;
			var left = Math.random() * 400;
			var width = (Math.random() * 200) + 100;
			var height = (Math.random() * 200) + 100;

			if (Math.random() > 0.5){
				document.getElementById("shape").style.borderRadius = "50%";
			} else {
				document.getElementById("shape").style.borderRadius = "0";
			}

			document.getElementById("shape").style.top =  top + "px";
			document.getElementById("shape").style.left = left + "px";
			document.getElementById("shape").style.width =  width + "px";
			document.getElementById("shape").style.height = height + "px";
			document.getElementById("shape").style.backgroundColor =  getRandomColor();

			document.getElementById("shape").style.display = "block";

			startTime = new Date().getTime();
		}

		function appearAfter() {
			setTimeout(shapeAppear, Math.random() * 2000);
		}

		
		var timeTaken = 0;

		$("#startButton").click(function () { 

			$("#gameIsOn").css("display", "block");
			$(".textSection").css("background-color", "green");

			if (timeTaken > 0){
				timeTaken = 0;
				$("#timeTaken").html("");
			}
			if (lowestScore > 0){
				lowestScore = 0;
				$("#lowestScore").html("");
			}

			if (clicks > 0){
				clicks = 0;
				$("#numberClicks").html("");
			}
			appearAfter();

		document.getElementById("shape").onclick = function () {
			++clicks;

			if (clicks > 0){
				document.getElementById("numberClicks").innerHTML = clicks;
			}

			document.getElementById("shape").style.display = "none";

			var endTime = new Date().getTime();

			timeTaken = (startTime - endTime) / 1000;

			if (lowestScore == 0) {
				lowestScore = Math.abs(timeTaken);
				document.getElementById("lowestScore").innerHTML = lowestScore + "s";
			} 

			if (lowestScore < Math.abs(timeTaken)) {

				lowestScore = Math.abs(timeTaken);
				document.getElementById("lowestScore").innerHTML = lowestScore + "s";
			} 

			document.getElementById("timeTaken").innerHTML = Math.abs(timeTaken) + "s";

			appearAfter();

		}

	});

		$("#stopButton").click(function () { 
			$(".textSection").css("background-color", "#0099ff");
			$("#gameIsOn").css("display", "none");
			$("#shape").css("display", "none");
			timeTaken = 0;
		});