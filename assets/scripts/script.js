//@ts-check
window.addEventListener('DOMContentLoaded', init);
//Use localStorage to get what class we want to deal with in this page.
document.getElementById('Classname').innerText = JSON.parse(localStorage.getItem('currClass')).class;

//This variable is used to store current class
var current_class = "";
function init() {
    /*
     *This part is for professor_modify_category
     */
    const category_table = document.getElementById("categorylist");
    current_class=JSON.parse(localStorage.getItem('currClass')).class;
    //Build a list with the categories of this class.
    var list = JSON.parse(localStorage.getItem(current_class));
    //Build a category list with delete button.
    if(category_table){
        for(let i=0;i<list.length;i++){
            var new_row = category_table.insertRow();
            var new_cell = new_row.insertCell();
            var new_category =document.createTextNode(list[i]);
            new_cell.appendChild(new_category);
            //category list for given class
            let cell = new_row.insertCell(1);
            //create delete button for each category
            let delete_button = document.createElement("button");
            delete_button.innerHTML = "Delete Category";
            delete_button.setAttribute("id","deletebutton")
            //when the deleteButton is clicked, the row should be deleted
            delete_button.onclick = function(){
                delete_button.parentNode.parentNode.remove();
                deleteCategory(current_class,list[i]);
            };
            cell.appendChild(delete_button);
        }
        //Use addCategory to update new category both on this page and in localStorage
        let add_category_button = document.getElementById("addCategoryButton");
        add_category_button?.addEventListener('click', () => {
        addCategory(current_class,document.getElementById("addNewCategory").value);
    });
    } 
    

    /* 
     *This Part is for student_add_comment
     */
    const checkboxlist = document.getElementById("ctgrlist");
    //Add checkboxes based on the categories of class
    const currentCategoryList = JSON.parse(localStorage.getItem(current_class));
    for(let i=0;i<currentCategoryList.length;i++){
        var category = document.createElement("INPUT");
        var category_name = document.createTextNode(currentCategoryList[i]);
        //Set attributes for each category
        category.setAttribute("type", "checkbox");
        category.setAttribute("value",currentCategoryList[i]);
        category.setAttribute("name","Categories_of_Class");
        category.innerHTML=currentCategoryList[i];
        //Add category name and checkbox to page
        checkboxlist?.appendChild(category_name);
        checkboxlist?.appendChild(category);
    }
    //set the title of page 
    document.getElementById("Classname").innerHTML=current_class;
    const submit_button = document.getElementById("submitB");
    submit_button?.addEventListener('click', () => {
        //create a new single comment object.
        const comment_object=new Object();
        //Set attribute to this new object
        comment_object["title"] = document.getElementById("FeedbackTitle").value;
        comment_object["classname"] = current_class;
        var category_array=[];
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
        for (var i = 0; i < checkboxes.length; i++) {
            category_array.push(checkboxes[i].value);
        }
        comment_object["category"]=JSON.stringify(category_array);
        comment_object["feedBack"] = document.querySelector("textarea").value;
        comment_object["Anon"] = document.getElementById("yes").checked;
        const temp = document.createElement('the-element');
        temp.data = comment_object;
        const cur_comments = getCommentsFromStorage();
        cur_comments.push(comment_object);
        saveCommentToStorage(cur_comments);
        alert("Feedback submited");
    });
}

/**
 * function NewclassCategory(classname)
 * 
 * Operation: This function is used to assign default categories
 * @author Chris
 * @param className name of the class you want to set default categories.
 */
function NewclassCategory(className){
    var category = ["Exam","Lecture","Discussion"];
    localStorage.setItem(className,JSON.stringify(category));
}

/**
 * function deleteCategory(classname,category)
 * 
 * Operation: This function is used to delete category from localStorage
 * @author Chris
 * @param classname
 * @param category
 */
function deleteCategory(classname,category){
    var curr_category = JSON.parse(localStorage.getItem(classname));
    curr_category = curr_category.filter(function(item) {
        return item !== category
    })
    localStorage.setItem(classname,JSON.stringify(curr_category));
}
/**
 * function addCategory(classname,category)
 * 
 * Operation: This function is used to add a category in localStorage
 * @author Chris
 * @param classname
 * @param category
 */
function addCategory(classname, category){
    var curr_category = JSON.parse(localStorage.getItem(classname));
    curr_category.push(category);
    localStorage.setItem(classname,JSON.stringify(curr_category));
}

/**
 * function saveCommentToStorage(comment)
 * 
 * Operation: This function is used to set comment to localStorage
 * @author Chris
 * @param comment 
 */
function saveCommentToStorage(comment) {
        
    localStorage.setItem("comment",JSON.stringify(comment));
}

/**
  * Reads 'comments' from localStorage and returns an array of
  * all of the comments found (parsed, not in string form). If
  * nothing is found in localStorage for 'comments', an empty array
  * is returned.
  * @returns {Array<Object>} An array of recipes found in localStorage
  */
 function getCommentsFromStorage() {
    if (localStorage.getItem('comment') == null) {
        const empty_array = [];
        return empty_array;
    }
    const str = localStorage.getItem("comment");
    return JSON.parse(str);
}