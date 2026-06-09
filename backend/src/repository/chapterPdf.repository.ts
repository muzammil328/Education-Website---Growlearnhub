import { BaseRepository } from '@/config/db.config';
import ChapterPdf, { IChapterPdf } from '../models/chapterPdf.model';
import { Types } from 'mongoose';

class ChapterPdfRepository extends BaseRepository<IChapterPdf> {
  constructor() {
    super(ChapterPdf);
  }

  async findByChapter(chapterId: Types.ObjectId) {
    return this.findAll({ query: { chapterId, status: 'active' } });
  }

  async findByBook(bookId: Types.ObjectId) {
    return this.findAll({ query: { bookId, status: 'active' } });
  }
}

export const chapterPdfRepository = new ChapterPdfRepository();
