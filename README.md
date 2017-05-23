# mongodb-crud

sebuah aplikasi perpustakaan yg mempunyai fitur crud untuk books dan customers


|Route    |http   |description|
|-----    |----   |-----------|
/books    |GET    |Get all the books info (admin only)
/books/:id|GET    |Get a single book info
/books    |POST   |Create a book
/books/:id|DELETE |Delete a book
/books/:id|PUT    |Update a book with new info
|
/customers    |GET    |Get all the customers info (admin only)
/customers/:id|GET    |Get a single customer info
/customers    |POST   |Create a customer
/customers/:id|DELETE |Delete a customer
/customers/:id|PUT    |Update a customer with new info
To Use
```javascript
npm install
npm start
```
