/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


//selecting some main elements I will use throughout the program
const page = document.querySelector('.page');
const header = document.querySelector('.page-header');
const ul = document.querySelector('ul');
const studentList = ul.children;

// uses the functions created to create a default display
// and select the search button element to make the eventlistener on search work
showPage(studentList, 0);
appendPageLinks(studentList);
addSearchBar();
const search = document.querySelector('.searchButton');

//function makes at most 10 people display from a list
//takes as input the list of students and
//the first number of the studentlist it should output
//first sets all students to not displaying and then sets the right
//students to display (for displaying less than 10 at last page the else part is included)
function showPage(list, num){
for(let p = 0; p < studentList.length; p++){
   studentList[p].style.display = "none";

}
if((num+10) <= list.length){
  for(let i = num; i <num+10; i+=1){
      list[i].style.display = " block ";
  }
 } else {
   for(let i = num; i < list.length; i+=1){
      list[i].style.display = " block ";
  }
}
}



// first creates the rigth elements (div and ul)
//then add the right amount of list element with 'a' element.
// To every a element add an eventlistener so when clicking on the list item
// the right students show (by using the former function) t
function appendPageLinks(list){
   const paginationDiv = document.createElement('div');
   const paginationUl = document.createElement('ul');
   paginationDiv.className = 'pagination';

   page.appendChild(paginationDiv);
   paginationDiv.appendChild(paginationUl);

   for(let i = 0; i < list.length; i+=10){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = (i/10)+1;
      a.href = '#';
      a.addEventListener('click', () =>{
         showPage(list, i);
      });
     
      paginationUl.appendChild(li);
      li.appendChild(a);
   }

}

// this function dynamically adds a search bar
function addSearchBar (){
    const searchBar = document.createElement('div');
   searchBar.className = 'student-search';
   header.appendChild(searchBar);
   const input = document.createElement('input');
   input.className = 'searchInput';
   input.placeholder = "Search for student...";
   const search = document.createElement('button');
   search.className = 'searchButton';
   search.textContent = 'Search'
   searchBar.appendChild(input);
   searchBar.appendChild(search);

}
//sets an event listener on the search button so that it checks the input field
//and compares to the h3 element of every student to look for similar text
//and then displays the right students or outputs a error which is removed after a short amount
// of time to return to the default settings
   search.addEventListener('click', ()=>{
      
      const input = document.querySelector('.searchInput') ;
      if(input != null){
      let newStudentList = [];
            
      for( let i = 0; i < studentList.length; i++){
       const name = studentList[i].firstElementChild.children.item(1);
       const searchInput = input.value.toUpperCase();
       const nameStudent = name.textContent.toUpperCase(); 
      if(nameStudent.includes(searchInput)){
            newStudentList.push(studentList[i]);
         }
      }

         input.value = "";
         const removePag = document.querySelector('.pagination');
         page.removeChild(removePag); 
         showPage(newStudentList, 0);
         
         if(newStudentList.length !== 0){
         appendPageLinks(newStudentList);
         }
         
         
         
         if(newStudentList.length === 0){
         const errorDiv = document.createElement('div');
         const error = document.createElement('h1');
         error.textContent = "Sorry, no results found!";
         page.appendChild(errorDiv);
         errorDiv.appendChild(error);
         setTimeout(function(){ 
            page.removeChild(errorDiv);
            showPage(studentList, 0);
            appendPageLinks(studentList);
         }, 1000);
         }
      
      }
   });



// Remember to delete the comments that came with this file, and replace them with your own code comments.