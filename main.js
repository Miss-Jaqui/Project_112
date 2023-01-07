
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

function tomar_foto() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-DgXgOXQ2/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
  }

  function verificar() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }
  
function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_gesto_nombre").innerHTML = results[0].label;
    prediction_1 = results[0].label;

    speak();
    if(results[0].label == "Amor y Paz") {
	    document.getElementById("update_gesto").innerHTML = "&#9996;";
    }

    if(results[0].label == "Me gusta") {
	    document.getElementById("update_gesto").innerHTML = "&#128077;";
    }
    if(results[0].label == "Muy Bien") {
	    document.getElementById("update_gesto").innerHTML = "&#128076;";
    }
    if(results[0].label == "Rock and Roll") {
	    document.getElementById("update_gesto").innerHTML = "&#129304;";
    }
}
}

prediction_1 = "";

function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "La primer prediccion es " + prediction_1; 
  var utterThis = new SpeechSynthesisUtterance(speak_data_1);
  synth.speak(utterThis);
}
