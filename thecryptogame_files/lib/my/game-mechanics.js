
$(document).ready(function(){
	$(document).ready(function() {
	

		//check if localStorage available or not.
	  	if(typeof(Storage) !== "undefined") {
		    // Code for localStorage/sessionStorage. (is available)

		    //Case 1: User opens app for first time. not registered already.
		    if(!localStorage.user){	//no username
		    	//redirect to first page
		    	window.location.href = "index.html";
		    }
		    //case 3: user registered, but progress less.
		    else if (parseInt(localStorage.progress) < chapter){
		    	//redirect to storyline page
		    	window.location.href = "storyline.html";
		    }

		    //Case 2: User already stored in localStorage.
		    else{	//username registered already.

		    	//display name
		    	$(".username").text(localStorage.user);

				//as per the 'progress', render the button.
				//if chapter (eg. 0) is less than progress. (i.e. that chapter has already been played.), so render different button
				if(chapter < localStorage.progress){
					$("#submit-btn").removeClass('red accent-2').addClass('teal darken-1').attr('data-tooltip', 'Show');
				}
		    }


		} else {
		    // Sorry! No Web Storage support..
		    var msg = "<div class='center-align' style='margin:3em'> : (<br><br>Cannot run the App.<br><br>'localStorage' feature Not Found. <br><br>Use a Newer version of the Web Browser.<br><br></div>";
		    $("body").html(msg);
		}


	});
});

//Retrieve the solutionPretty and solutionRaw for this level.
var solutionRaw = "";
var solutionPretty = "";
solutionRaw = solutions[chapter]["solutionRaw"];
solutionPretty = solutions[chapter]["solutionPretty"];

$("#submit-btn").click(function(){

	if(chapter < parseInt(localStorage.progress)){	//already passed that level, now just 'reveal' directly the solution from DB

		$("#solution").val(solutionPretty);
		$("#solution").trigger('autoresize');
	}

	else{	//yet to pass that level/chapter.
		var solution = $.trim($("#solution").val());

		if(solution == ""){
			Materialize.toast("Please Enter Solution first.", 5000);
			return;
		}

		solution = solution.replace(/[\n\r ]/g, "");	//remove space from solution
		solution = solution.toUpperCase();
		
		if(solution == solutionRaw){
			result = "1";
		}else{
			result = "0";
		}

		if(result==="1"){	//if solution was right: 1.
			localStorage.progress = parseInt(localStorage.progress) + 1;
			Materialize.toast("Congratulations! New Level Unlocked.", 4000);
			setTimeout(function(){
			    //do what you need here
				window.location = "storyline.html";
			}, 5000);
		}else{	//otherwise, just prompt the error message
			Materialize.toast("Incorrect Solution!", 5000);
		}

	}	

});
