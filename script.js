
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
            const list = document.querySelector('#exercises-list');//ogarnac 
            if(exerciseRecord == null) {
                alert('W bazie nie ma juz nic!');
                list.innerHTML = "";
            } else {
                let keys = Object.keys(exerciseRecord);
                var values = Object.values(exerciseRecord);
                // const list = document.querySelector('#exercises-list');//ogarnac do globala?
                list.innerHTML = "";
                values.forEach((oldExercise) => Data.addExercise(oldExercise));
                //dodawanie id
                let allExercises = document.querySelectorAll('tbody tr');
                allExercises.forEach((item,i) => {
                    item.classList.add(keys[i]);
                }) 
            }  
        }
    }
    static addExercise(exercise) {
        const list = document.querySelector('#exercises-list');
        const exerciseRow = document.createElement('tr');

        exerciseRow.innerHTML = `
            <td>${exercise.muscleGroup}</td>
            <td>${exercise.exerciseName}</td>
            <td>${exercise.repsNumber}</td>
            <td contenteditable='true' class="editable">${exercise.maxWeight}</td>
            <td><button type="button" class="btn-xs btn-danger remove">X</button></td>
            <td><button type="button" class="btn-xs btn-info edit">Edit</button></td>
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
    static removeData(e){
        let IdToBeRemoved = e.target.parentNode.parentNode.className;
        exerciseDataRef.child(IdToBeRemoved).remove();
    }
    static updateDb(e){
        let clickedId = e.target.parentNode.parentNode.className;
        let maxWeight = document.querySelector(`.${clickedId}` +" " + ".editable").textContent;
        let data = {maxWeight};
        console.log(data);
        exerciseDataRef.child(clickedId).update(data);
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
document.querySelector('tbody').addEventListener('click', (e)=> {
    const removeButtons = document.querySelectorAll('.remove');
        removeButtons.forEach((singleButton) => {
            if(e.target == singleButton) {
                Data.removeData(e);
            }
        })
    const editButtons = document.querySelectorAll('.btn-info');
        editButtons.forEach((editButton)=> {
            if(e.target == editButton) {
                Data.updateDb(e);
        }
    })
    // const editableFields = document.querySelectorAll('.editable');
    // editableFields.forEach((singleField) => { //tu
    //     if(e.target == singleField) {
    //         singleField.addEventListener('click', ()=> {
                
    //         })
    //     }
    // })
})