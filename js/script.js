/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// caching the dom elements
const header = document.querySelector('.header');
const stdList = document.querySelector('.student-list');
const pagination = document.querySelector('.link-list');
let activePage = 1;

// Adding Search Markup in the HTML
const searchMarkup = document.createElement('form');
searchMarkup.innerHTML = `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;

header.appendChild(searchMarkup);


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
            <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
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
   pagination.innerHTML = '';
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
// evoke the showpage functionality 
//and render the page
function render(list){
   stdList.innerHTML = '';
   showPage(list,activePage);
}

// Event listener //

//pagination data change and active page event
pagination.addEventListener('click',(e) => {
   const buttons = pagination.children;
   if(e.target.type == "button"){
      for (let i = 0; i< buttons.length; i++){
         buttons[i].firstElementChild.classList.remove('active');
      }
      e.target.classList.add('active');
      activePage = e.target.innerText;
      render(data);
   } 
})

//search functionality implementation

const searchBar = document.querySelector('.student-search');
const input = document.querySelector('#search');

//this event fires when user press the search button
searchBar.addEventListener('click', (e)=>{
   if(e.target.tagName == 'BUTTON' || e.target.tagName == 'IMG'){
      const searchStr = input.value.toLowerCase();
      const searchArr = [];
      for (let i = 0; i < data.length; i++){
         if(data[i].name.first.toLowerCase().includes(searchStr) || data[i].name.last.toLowerCase().includes(searchStr)){
            searchArr.push(data[i]);
         }
      }
      if(searchArr.length>0){
         addPagination(searchArr);
         render(searchArr);
      }
      else {
         stdList.innerHTML = `
            <li>NO DATA FOUND!</li>
         `;
         pagination.innerHTML = '';
      }
   }  
})

//this event fires when user start typing
input.addEventListener('keyup', ()=>{

      const searchStr = input.value.toLowerCase();
      const searchArr = [];
      for (let i = 0; i < data.length; i++){
         if(data[i].name.first.toLowerCase().includes(searchStr) || data[i].name.last.toLowerCase().includes(searchStr)){
            searchArr.push(data[i]);
         }
      }
      if(searchArr.length>0){
         addPagination(searchArr);
         render(searchArr);
      }
      else {
         stdList.innerHTML = `
            <li>NO DATA FOUND!</li>
         `;
         pagination.innerHTML = '';
      }
   }
)





// Call functions
render(data);
addPagination(data);
