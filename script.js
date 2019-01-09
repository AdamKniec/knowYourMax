
  // Initialize Firebase
  var config = {
    
    authDomain: "knowyourlimit-bbda6.firebaseapp.com",
    databaseURL: "https://knowyourlimit-bbda6.firebaseio.com",
    projectId: "knowyourlimit-bbda6",
    storageBucket: "knowyourlimit-bbda6.appspot.com",
    messagingSenderId: "78879158513"
  };
  firebase.initializeApp(config);
  let exerciseDataRef = firebase.database().ref('exerciseData');

class Exercise  {
    constructor(muscleGroup, exerciseName, repsNumber, maxWeight){
        this.muscleGroup = muscleGroup;
        this.exerciseName = exerciseName;
        this.repsNumber = repsNumber;
        this.maxWeight = maxWeight;
    }
}
class Data {

    static displayData() {
        exerciseDataRef.on('value', gotData);

        function gotData(data) {
            let exerciseRecord = data.val();
            // let keys = Object.keys(exerciseRecord);//tu
            // console.log(keys);
            var values = Object.values(exerciseRecord);
            // console.log(values);
            values.forEach((oldExercise) => Data.addExercise(oldExercise));
            
            // singleRow.forEach((oldExercise,i)=>{
            //     // console.log(oldExercise, keys[i]);
            //     Data.addExercise(oldExercise);
            //     // oldExercise.setAttribute('data-key', keys[i])
            // })
        }
    }
    static addExercise(exercise) {
        const list = document.querySelector('#exercises-list');
        const exerciseRow = document.createElement('tr');

        exerciseRow.innerHTML = `
            <td>${exercise.muscleGroup}</td>
            <td>${exercise.exerciseName}</td>
            <td>${exercise.repsNumber}</td>
            <td contenteditable='true'>${exercise.maxWeight}</td>
            <td><button type="button" class="btn-xs btn-danger">X</button></td>
            <td><button type="button" class="btn-xs btn-info">Edit</button></td>
        `;
        list.appendChild(exerciseRow);
    }

    static clearFields(){ 
        form.reset();
    }
    static submitForm(muscleGroup,exerciseName,repsNumber,maxWeight){
        function sendFormData(){
            let newExerciseDataRef = exerciseDataRef.push();
                newExerciseDataRef.set({
                    muscleGroup,
                    exerciseName,
                    repsNumber,
                    maxWeight
                });
        }
        const list = document.querySelector('#exercises-list');
        list.innerHTML="";
        sendFormData();
    }
}
document.addEventListener('DOMContentLoaded', Data.displayData);

document.querySelector('#form').addEventListener('submit', (e)=> {
    e.preventDefault();

    const muscleGroup = document.querySelector('#muscleGroup').value;
    const exerciseName = document.querySelector('#exerciseName').value;
    const repsNumber = document.querySelector('#repsNumber').value;
    const maxWeight = document.querySelector('#maxWeight').value;

    // const newExercise = new Exercise (muscleGroup, exerciseName, repsNumber, maxWeight);

    // Data.addExercise(newExercise);
    Data.submitForm(muscleGroup,exerciseName,repsNumber,maxWeight);
    Data.clearFields();
})
