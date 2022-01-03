console.log("helllo World")


let students = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector("#gallery");




// fetch data from API
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(res=> students = res)
//.then(res => console.log(res))
.then(displayStudents)
.catch(err => console.log(err))



function displayStudents(studentsData) {
    console.log(studentsData);
    //students = studentsData;
    // store the employee HTML as we create it
    gridContainer.innerHTML = '';

    let studentsHTML = '';
    // loop through each employee and create HTML markup
   

    studentsData.forEach((studentsData, index) => {
        let name = studentsData.name;
        let email = studentsData.email;
        let city = studentsData.location.city;
        let state = studentsData.location.state;
        let picture = studentsData.picture;

        // template literals make this so much cleaner!
        studentsHTML += `
        <div class="card">
                        <div class="card-img-container">
                            <img class="card-img" src="${picture.large}" alt="profile picture">
                        </div>
                        <div class="card-info-container">
                            <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
                            <p class="card-text">${email}</p>
                            <p class="card-text cap">${city}, ${state}</p>
                        </div>
                    </div>`
    });

    gridContainer.insertAdjacentHTML('beforeend', studentsHTML)

}





function displayModal(index) {
    
    let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = students[index];
    let date = new Date(dob.date);

    // create new inner Html
    const modalHTML = `<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="${picture.large}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
        <p class="modal-text">${email}</p>
        <p class="modal-text cap">${city}</p>
        <hr>
        <p class="modal-text">${phone}</p>
        <p class="modal-text">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p class="modal-text">${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>   
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>`;

    //create new div node
    var newDiv = document.createElement("div");
    newDiv.classList.add("modal-container");
    newDiv.innerHTML = modalHTML;
    gridContainer.parentNode.insertBefore(newDiv, gridContainer.nextSibling);

    // get closing button
    const modalClose= document.querySelector(".modal-close-btn")
    const overlay = document.querySelector(".modal-container");

    const modalnext= document.querySelector("#modal-next")
    const modalprev= document.querySelector("#modal-prev")
    

    // add eventlistener to button
    modalClose.addEventListener('click', () => {       
        overlay.remove()
    });

    // Button left
    modalprev.addEventListener('click', () => {   

        if(index-1>=0){
            overlay.remove()    
            displayModal(index-1);
        }
        
    });

     // Button right
     modalnext.addEventListener('click', () => {  
        if(index+1<students.length){ 
            overlay.remove()    
            displayModal(index+1);
        }
    });
}


gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
        // select the card element based on its proximity to actual element clicked
        const card = e.target.closest(".card");
        var mail = card.childNodes[3].childNodes[3].textContent  
        var index = getIndex(mail);
        displayModal(index);
    }
});



function getIndex(email) {
    for(i = 0; i< students.length; i++){
        if(students[i].email === email){
            return i;
        }
    }
    return -1;
}



const searchBar = document.querySelector('.search-container');
    
    searchBar.addEventListener('keyup',(e)=> {
      const target =e.target.value.toLowerCase(); 
      const filterdData = students.filter( object => {
        return object.name.first.toLowerCase().includes(target) || object.name.last.toLowerCase().includes(target);
      })
      if(filterdData.length === 0){
        //console.log("No results found");
        ul = document.querySelector(".gallery");
        ul.innerHTML = "No results found";
  
      }else{
        //console.log("in else");
        displayStudents(filterdData);
      }
      
    });
   
  
  



