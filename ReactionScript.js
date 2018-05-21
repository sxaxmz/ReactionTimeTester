        var audio = new Audio('melody.mp3');
		

		var startTime = new Date().getTime();
		var clicks = 0;
		var lowestScore= 0;


		//timer
		var counter = 900;
		var min;
		var sec;
		var timerSection;	


		//fastMode
		var shapeTime;
		var shapeDuration = ((Math.random() * 15) + 1) * 100;
		var shapeInterval;
		var shapes = 0;
		var missedClicks = 0;


		function convertSecond (second){
			min = Math.floor(second / 60);
			sec = Math.floor(second % 60);

			return min + ":" + sec;
		}

		function timer () {
			counter--;

			$("#time").html(convertSecond(counter));
		}

		$("#time").html(convertSecond(counter));

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
		var gameMode = 1;

		$('input:radio[name="gameMode"]').change(function () { 

			if ($(this).val() == 1) { 
			 gameMode = 1;
			} else {
			 gameMode = 2;
			}

			});


	

		$("#startButton").click(function () { 

			if (counter != 900) {
				counter = 900	
			}
			
			timerSection = setInterval(timer, 1000);



			audio.addEventListener('ended', function() {
	        this.currentTime = 0;
	        this.play();
	        }, false);
			audio.play();	

			if (timeTaken >= 0){
				timeTaken = 0;
				$("#timeTaken").html("");
			}
			if (lowestScore >= 0){
				lowestScore = 0;
				$("#lowestScore").html("");
			}

			if (clicks > 0){
				clicks = 0;
				$("#numberClicks").html("");
			}

			if (gameMode == 1) {

			$("#missedSection").css("display", "none");
			$("#gameIsOn").css("display", "block");
			$(".textSection").css("background-color", "green");

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

	} else {

		$("#missedSection").css("display", "block");
		//alert('Fast Mode');

		$("#gameIsOn").css("display", "block");
		$(".textSection").css("background-color", "green");

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

		}

		shapeInterval = setInterval(function shapeDuration() { shapeTime =  ((Math.random() * 10) + 1) * 1000; 
																//shapeDuration = shapeTime * 10000;
																shapes++;
																missedClicks = shapes - clicks;
																$("#missedClicks").html(missedClicks);
																
																	console.log(shapeTime); 
																	console.log(shapes);
																	shapeAppear();
																							}, shapeDuration);

		

} 


	});

	
		$("#stopButton").click(function () { 

			clearInterval(timerSection);

			clearInterval(shapeInterval);

			$(".textSection").css("background-color", "#0099ff");
			$("#gameIsOn").css("display", "none");
			$("#shape").css("display", "none");
			timeTaken = 0;

			audio.pause();
		});