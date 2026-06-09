import { BaseRepository } from '@/config/db.config';
import BookPdf, { IBookPdf } from '../models/bookPdf.model';
import { Types } from 'mongoose';

class BookPdfRepository extends BaseRepository<IBookPdf> {
  constructor() {
    super(BookPdf);
  }

  async findByBook(bookId: Types.ObjectId) {
    return this.findAll({ query: { bookId, status: 'active' } });
  }
}

export const bookPdfRepository = new BookPdfRepository();
