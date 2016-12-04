
	
function bindEvents(){
	//$('#login').on('click', loginClick);
	$('#register').click(registerClick);

	
}

function getOptionChange(e){
		console.log('option3');
}

function registerClick(e){
	$('#register-modal').modal('show');
}





function addPublication(){
	var temp = document.getElementById('temp').cloneNode(true);
	temp.style.display = "block";
	
	var comment = document.getElementById('comment').value;
	var city = document.getElementById('select-city').value;
	
	var newCity = temp.getElementsByTagName("h4")[0];
	var newComment = temp.getElementsByTagName("p")[0];
	
	newCity.innerHTML = city;
	newComment.innerHTML = comment;
	
	var list = document.getElementById('statuses');
	 
	list.appendChild(temp);
	
}

function deletePublication(but){
	var elm = but.parentElement.parentElement.parentElement;
	elm.parentElement.removeChild(elm);	
	
	//var list = document.getElementById('statuses');
	//list.removeChild(elm);	
}

                              var countryCities = [
                                 ["София", "Пловдив","Варна", "Бургас","Стара Загора", "Велико Търново"],
                                 ["Москва", "Санкт Петербург", "Калининград","Якутск"],
                              ["Лондон", "Бирмингам", "Портсмут"]
                              ];
                              
                              $("#countries").change(function() {
                                 var country = this.selectedIndex - 1;
                                 $("#select-city").empty();
                                 if (country === -1) {
                                     $("#select-city").attr("disabled", true);
                                 } else {
                                     var selectedCity = countryCities[country];
                                     for (var i = 0; i < selectedCity.length; i++) {
                                         $("#select-city").append($("<option></option>").text(selectedCity[i]));
                                     }
                                     $("#select-city").attr("disabled", false);
									  $("#select-unit").attr("disabled", false);
                                 }
                              });
 

function addComment(){

	var city = $('#select-city').val();
	var temp = $('#select-unit').val();

	getCurrentTemp(city,temp,true);
}

function getCurrentTemp(city,temp,add){
	//let tempSymbol;
	//if (temp ==)
	let apiCallURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",bg&units=" + temp +"&appid=67abfd06b6b4ec60fb3e391d6788f317";
	console.log(apiCallURL);
	$.ajax({
		method:"GET",
		url: apiCallURL,
		dataType: "json"
	}).done(function(response){
		if(add)
			addAndRenderDiv(city, response);
		else
			renderTemperature(response);
	}).fail(function(){
		console.log('Error occured!');
	}).always(function(){
		console.log('Completed!');
	});	
}

function addAndRenderDiv(city, weatherData){
	var weatherCode = weatherData.weather[0].id.toString();
	var currentWeather = getWeatherData(weatherCode);
	
	var comment = $('#comment').val();
	var temp = $('#temp').clone();
	temp.css("display", "block");
	
	temp.find('#temp-temperature').text(weatherData.main.temp);
	temp.find('#temp-comment').html(comment);
	temp.find('h4').html(city);
	temp.find('img').attr('src', 'assets/img/icons/' +
			currentWeather.icon);
	
	$('#statuses').append(temp);
}

function renderTemperature(weatherData){
	$('#current-temperature').text(weatherData.main.temp);
	
	var weatherCode = weatherData.weather[0].id.toString();
	var currentWeather = getWeatherData(weatherCode);
	$('#current-condition').text(currentWeather.condition);
	$('.img-container').find('img').
		attr('src','assets/img/icons/' + currentWeather.icon);
	$('.img-container').find('img').show();
	
}

function getWeatherData(weatherCode){
	var weatherData = {};
	var weatherCondition = '';
	var icon = '';
	
	if(weatherCode.charAt(0) == '2'){
		weatherCondition = 'Гръмотевична буря';
		icon = 'thunderstorm.png';
	}else if(weatherCode.charAt(0) == '3'){
		weatherCondition = 'Преваляване';
		icon = 'rain.png';
	}else if(weatherCode.charAt(0) == '6'){
		weatherCondition = 'Снеговалеж';
		icon = 'snow.png';
	}else if(weatherCode.charAt(0) == '7'){
		weatherCondition = 'Мъгла';
		icon = 'mist.png';
	}else if(weatherCode.charAt(0) == '8'){
		if(weatherCode == 800){
			weatherCondition = 'Слънчево'
			icon = 'clear_sky.png';
		}else{
			weatherCondition = 'Лека Облачност';
			icon = 'few_clouds.png';
		}		
	}else if(weatherCode == 500){
		weatherCondition = 'Слабо преваляване';
		icon = 'shower_rain.png';
	}else if(weatherCode == 501){
		weatherCondition = 'Дъждовно';
		icon = 'rain.png';
	} 
	
	weatherData.condition = weatherCondition;
	weatherData.icon = icon;
	
	return weatherData;
}
	
$(document).ready(function(){
    $("button").click(function(){
        $(this).closest('li').slideUp("high", function(){ $(this).remove(); })
    });
});







