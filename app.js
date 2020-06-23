class Item{
    constructor(category, name, price){
        this.category= category;
        this.name= name;
        this.price= price;
    }
}

class UI{
    static displayBooks(){
        // const storedItems= [
        //     {
        //         category : "my category",
        //         name : "my name",
        //         price : "my price"
        //     },
        //     {
        //         category : "your category",
        //         name: "your name",
        //         price : "your price"
        //     }
        // ];
        const items=Store.getItems();
        items.forEach((item) => UI.addItemToList(item));
    }

    static addItemToList(item){
        const list= document.querySelector('#item-list');

        const tr= document.createElement('tr');
        tr.innerHTML=`
            <td>${item.category}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</td>
        `;
        list.appendChild(tr);
    }

    static deleteItem(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
    
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    
    }

    static clearFields(){
        document.querySelector('#item-category').value= '';
        document.querySelector('#item-name').value='';
        document.querySelector('#item-price').value='';
    }

}
class Store{
    static getItems(){
        let items;
        if(localStorage.getItem('items') === null){
            items=[];
        }
        else{
            items=JSON.parse(localStorage.getItem('items'));
        }
        return items;
    }

    static addItems(item){
        const items= Store.getItems();
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
    }

    static removeItems(name){
        const items= Store.getItems();
        items.forEach((item, index) =>{
            if(item.name === name){
                items.splice(index,1);
            }
        });
        localStorage.setItem('items', JSON.stringify(items));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#item-form').addEventListener('submit',(e) => {
    e.preventDefault();

    const category= document.querySelector('#item-category').value;
    const name= document.querySelector('#item-name').value;
    const price= document.querySelector('#item-price').value;

    if(category === '' || name === '' || price ===''){
        UI.showAlert("Field cant be empty", 'danger');
    }

    else{
        //instantiate a list
        const item= new Item(category, name, price);

        //Add item to the UI
        UI.addItemToList(item);

        //Add item to the store 
        Store.addItems(item);

        //Show the success message 
        UI.showAlert("Item added successfully", 'success');

        //clear the fields 
        UI.clearFields();
    }
});

//Event: Remove an item
document.querySelector('#item-list').addEventListener('click',(e)=>{
    //removing from the UI class
    UI.deleteItem(e.target);

    //removing from the store class
    Store.removeItems(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    
    //show the alert 
    UI.showAlert("Item removed successfully", 'info');
});