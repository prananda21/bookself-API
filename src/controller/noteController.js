/* eslint-disable require-jsdoc */
const {nanoid} = require('nanoid');
const books = require('../books/books');

class NoteController {
  static async addBook(req, res) {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;
    if (pageCount === readPage) {
      finished = true;
    }

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    if (name === null || name === undefined || name === '') {
      const response = res.response({
        status: 'fail',
        // eslint-disable-next-line max-len
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = res.response({
        status: 'fail',
        // eslint-disable-next-line max-len
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    };

    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      const response = res.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }

    const response = res.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(500);
    return response;
  };

  static async getAllBook(req, res) {
    const {name, reading, finished} = req.query;

    let filterBooks = books;

    if (name !== undefined) {
      filterBooks = filterBooks.filter((book) => book.name
          .toLowerCase()
          .includes(name.toLowerCase()));
    }

    if (reading !== undefined) {
      filterBooks = filterBooks.filter((book) =>
        book.reading === !!Number(reading));
    };

    if (finished !== undefined) {
      filterBooks = filterBooks.filter((book) =>
        book.finished === !!Number(finished));
    }

    const response = res.response({
      status: 'success',
      data: {
        books: filterBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  static async getBookById(req, res) {
    const {id} = req.params;
    const book = books.filter((book) => book.id === id)[0];

    if (book !== undefined) {
      const response = res.response({
        status: 'success',
        data: {
          book: book,
        },
      });
      response.code(200);
      return response;
    }

    const response = res.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  static async updateBook(req, res) {
    const {id} = req.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    if (name === null || name === undefined || name === '') {
      const response = res.response({
        status: 'fail',
        // eslint-disable-next-line max-len
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    };

    if (readPage > pageCount) {
      const response = res.response({
        status: 'fail',
        // eslint-disable-next-line max-len
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    };

    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
      };


      const response = res.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }

    const response = res.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  static async deleteBook(req, res) {
    const {id} = req.params;
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books.splice(index, 1);
      const response = res.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }

    const response = res.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

module.exports = {NoteController};
