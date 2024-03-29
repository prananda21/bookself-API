const {NoteController} = require('../controller/bookController');

const router = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      const response = res.response({
        status: 'success',
        message: 'Welcome to Book Library',
      });
      response.code(200);
      return response;
    },
  },
  {
    method: 'POST',
    path: '/books',
    handler: NoteController.addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: NoteController.getAllBook,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: NoteController.getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: NoteController.updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: NoteController.deleteBook,
  },
];

module.exports = router;
