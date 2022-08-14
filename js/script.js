/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// caching the dom elements
const stdList = document.querySelector('.student-list');
const pagination = document.querySelector('.link-list');
let activePage = 1;


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page){
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   for (let i = startIndex; i < endIndex; i++){
      const li = `
         <li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src=${list[i].picture.thumbnail} alt="Profile Picture">
            <h3>${list[i].name.first + " " + list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
      `;
      stdList.innerHTML += li;
   }
}




/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   const totalPages = Math.ceil(list.length / 9);
   for (let i = 1; i <= totalPages; i++){
      const button = `
         <li>
            <button type="button">${i}</button>
         </li>`
      pagination.innerHTML += button;
   }
   pagination.firstElementChild.firstElementChild.className = 'active';
}

// render function
function render(){
   stdList.innerHTML = '';
   showPage(data,activePage);
}

// Event listener
pagination.addEventListener('click',(e) => {
   const buttons = pagination.children;
   if(e.target.type == "button"){
      for (let i = 0; i< buttons.length; i++){
         buttons[i].firstElementChild.classList.remove('active');
      }
      e.target.classList.add('active');
      activePage = e.target.innerText;
      render();
   }
  
})





// Call functions
showPage(data,activePage);
addPagination(data);
