class Book {
    constructor(title, author, isbn){
        this.title = title;
        this. author = author;
        this.isbn = isbn;
    }
}
class UI {
    addBookToList(book){
    const list = document.getElementById('book-list');
    //Create <tr>
    const row = document.createElement('tr');
    //Insert Cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
    list.appendChild(row);
    }

    showAlert(message, className){
        //Create DIV
        const div = document.createElement('div');
        // Add Class
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        //Get Parent
        const container = document.querySelector('.container');
        //Get Form
        const form = document.querySelector('#book-form');
        //Insert alert
        container.insertBefore(div, form);
        //Timeout after 3 sec
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target){
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
            // target = <a>-Tag
            //.parentElement = <td>-Tag
            //.parentElement = <tr>-Tag
        }
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Event Listener for add Book
document.getElementById('book-form').addEventListener('submit',function(e) {
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value    
          isbn = document.getElementById('isbn').value;
    // Instantiate book
    const book = new Book(title, author, isbn);
    //Instatiate UI
    const ui = new UI();
    //Validate Entries
    if (title === '' || author === '' || isbn ===''){
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        //Add book to list
        ui.addBookToList(book);
        // Show success
        ui.showAlert('Book added', 'success')
        //Clear fields
        ui.clearFields();
    }
    e.preventDefault();
});

// Event Listener for delete book
document.getElementById('book-list').addEventListener('click', function(e) {
    //Instatiate UI
    const ui = new UI();
    //Delete Book
    ui.deleteBook(e.target);
    //Show delete alert
    ui.showAlert('Book removed', 'success');

    e.preventDefault();
});