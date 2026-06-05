import { AppError } from '@muzammil328/server';
import { Types } from 'mongoose';
import { mcqsRepository } from '../repository/mcqs.repository';

function parseObjectId(value?: string): Types.ObjectId | undefined {
  if (!value || !Types.ObjectId.isValid(value)) return undefined;
  return new Types.ObjectId(value);
}

export interface GetQuestionsInput {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc' | 'ASC' | 'DESC';
  classId?: string;
  bookId?: string;
  chapterId?: string;
  headingId?: string;
  subHeadingId?: string;
  difficulty?: string;
}

export interface GetDropdownInput {
  chapterId?: string;
  difficulty?: string;
}

export interface CreateQuestionInput {
  name: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  aiHint?: string;
  isPremium?: boolean;
  classId: string;
  bookId: string;
  chapterId: string;
  headingId?: string;
  subHeadingId?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateQuestionInput {
  id: string;
  name?: string;
  question?: string;
  options?: string[];
  correctOption?: number;
  explanation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  aiHint?: string;
  isPremium?: boolean;
  headingId?: string;
  subHeadingId?: string;
  status?: 'active' | 'inactive';
}

export const mcqsService = {
  async getAll(input: GetQuestionsInput) {
    const sortOrder: 1 | -1 = input.sortDirection?.toUpperCase() === 'DESC' ? -1 : 1;
    const sort = input.sort ?? 'createdAt';

    const filters: {
      status?: string;
      classId?: Types.ObjectId;
      bookId?: Types.ObjectId;
      chapterId?: Types.ObjectId;
      headingId?: Types.ObjectId;
      subHeadingId?: Types.ObjectId;
      difficulty?: string;
    } = {
      status: input.status ?? 'active',
      classId: parseObjectId(input.classId),
      bookId: parseObjectId(input.bookId),
      chapterId: parseObjectId(input.chapterId),
      headingId: parseObjectId(input.headingId),
      subHeadingId: parseObjectId(input.subHeadingId),
      difficulty: input.difficulty,
    };

    return mcqsRepository.aggregatePaginate({
      pipeline: [
        { $match: Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined)) },
        { $sort: { [sort]: sortOrder } },
        {
          $lookup: {
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'classDoc',
          },
        },
        {
          $lookup: {
            from: 'books',
            localField: 'bookId',
            foreignField: '_id',
            as: 'bookDoc',
          },
        },
        {
          $lookup: {
            from: 'chapters',
            localField: 'chapterId',
            foreignField: '_id',
            as: 'chapterDoc',
          },
        },
        {
          $unwind: { path: '$classDoc', preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: '$bookDoc', preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: '$chapterDoc', preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            _id: 0,
            questionId: '$_id',
            name: 1,
            question: 1,
            options: 1,
            correctOption: 1,
            explanation: 1,
            difficulty: 1,
            aiHint: 1,
            isPremium: 1,
            status: 1,
            className: '$classDoc.name',
            bookName: '$bookDoc.name',
            chapterName: '$chapterDoc.name',
          },
        },
      ],
      page: input.page ?? 1,
      limit: input.limit ?? 10,
    });
  },

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw AppError.badRequest('Invalid question ID format');
    }

    const result = await mcqsRepository.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'classDoc',
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'bookDoc',
        },
      },
      {
        $lookup: {
          from: 'chapters',
          localField: 'chapterId',
          foreignField: '_id',
          as: 'chapterDoc',
        },
      },
      {
        $lookup: {
          from: 'headings',
          localField: 'headingId',
          foreignField: '_id',
          as: 'headingDoc',
        },
      },
      {
        $lookup: {
          from: 'subheadings',
          localField: 'subHeadingId',
          foreignField: '_id',
          as: 'subHeadingDoc',
        },
      },
      {
        $unwind: { path: '$classDoc', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$bookDoc', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$chapterDoc', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$headingDoc', preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: '$subHeadingDoc', preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 0,
          questionId: '$_id',
          name: 1,
          question: 1,
          options: 1,
          correctOption: 1,
          explanation: 1,
          difficulty: 1,
          aiHint: 1,
          isPremium: 1,
          status: 1,
          class: { classId: '$classDoc._id', className: '$classDoc.name' },
          book: { bookId: '$bookDoc._id', bookName: '$bookDoc.name' },
          chapter: { chapterId: '$chapterDoc._id', chapterName: '$chapterDoc.name' },
          heading: { headingId: '$headingDoc._id', headingName: '$headingDoc.name' },
          subHeading: { subHeadingId: '$subHeadingDoc._id', subHeadingName: '$subHeadingDoc.name' },
        },
      },
    ]);

    if (!result || result.length === 0) {
      throw AppError.notFound('Question not found');
    }

    return result[0];
  },

  async getDropdown(input: GetDropdownInput) {
    const chapterId = parseObjectId(input.chapterId);
    const difficulty = input.difficulty;

    return mcqsRepository.aggregate([
      {
        $match: {
          status: 'active',
          ...(chapterId ? { chapterId } : {}),
          ...(difficulty ? { difficulty } : {}),
        },
      },
      { $sort: { name: 1 } },
      {
        $project: {
          _id: 1,
          name: 1,
          question: 1,
        },
      },
    ]);
  },

  async getByChapter(chapterId: string, status?: string) {
    if (!Types.ObjectId.isValid(chapterId)) {
      throw AppError.badRequest('Invalid chapter ID format');
    }

    return mcqsRepository.findByChapter(
      new Types.ObjectId(chapterId),
      status as 'active' | 'inactive'
    );
  },

  async getByBook(bookId: string, status?: string) {
    if (!Types.ObjectId.isValid(bookId)) {
      throw AppError.badRequest('Invalid book ID format');
    }

    return mcqsRepository.findByBook(new Types.ObjectId(bookId), status as 'active' | 'inactive');
  },

  async getByClass(classId: string, status?: string) {
    if (!Types.ObjectId.isValid(classId)) {
      throw AppError.badRequest('Invalid class ID format');
    }

    return mcqsRepository.findByClass(new Types.ObjectId(classId), status as 'active' | 'inactive');
  },

  async create(input: CreateQuestionInput) {
    const {
      name,
      question,
      options,
      correctOption,
      explanation,
      difficulty = 'medium',
      aiHint,
      isPremium = false,
      classId,
      bookId,
      chapterId,
      headingId,
      subHeadingId,
      status = 'active',
    } = input;

    if (!name || !question || !options || correctOption === undefined) {
      throw AppError.badRequest('Name, question, options and correctOption are required');
    }

    if (!classId || !bookId || !chapterId) {
      throw AppError.badRequest('Class, book and chapter are required');
    }

    if (options.length < 2) {
      throw AppError.badRequest('Question must have at least 2 options');
    }

    if (correctOption < 0 || correctOption >= options.length) {
      throw AppError.badRequest('Invalid correctOption index');
    }

    const slug = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9]+/g, '-');

    const existingQuestion = await mcqsRepository.findOne({
      $or: [{ slug }, { name }],
    });

    if (existingQuestion) {
      throw AppError.badRequest('Question already exists');
    }

    return mcqsRepository.create({
      name,
      slug,
      question,
      options,
      correctOption,
      explanation,
      difficulty,
      aiHint,
      isPremium,
      classId: parseObjectId(classId),
      bookId: parseObjectId(bookId),
      chapterId: parseObjectId(chapterId),
      headingId: parseObjectId(headingId),
      subHeadingId: parseObjectId(subHeadingId),
      status,
    });
  },

  async update(input: UpdateQuestionInput) {
    const {
      id,
      name,
      question,
      options,
      correctOption,
      explanation,
      difficulty,
      aiHint,
      isPremium,
      headingId,
      subHeadingId,
      status,
    } = input;

    if (!id) {
      throw AppError.badRequest('Invalid question ID');
    }

    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9]+/g, '-');
      const duplicate = await mcqsRepository.findOne({
        $or: [{ slug }, { name }],
        _id: { $ne: new Types.ObjectId(id) },
      });

      if (duplicate) {
        throw AppError.badRequest('Question already exists');
      }
    }

    const updateData: Record<string, unknown> = {};

    if (name) updateData.name = name;
    if (question) updateData.question = question;
    if (options) {
      if (options.length < 2) throw AppError.badRequest('Question must have at least 2 options');
      updateData.options = options;
    }
    if (correctOption !== undefined) {
      if (options && (correctOption < 0 || correctOption >= options.length)) {
        throw AppError.badRequest('Invalid correctOption index');
      }
      updateData.correctOption = correctOption;
    }
    if (explanation !== undefined) updateData.explanation = explanation;
    if (difficulty) updateData.difficulty = difficulty;
    if (aiHint !== undefined) updateData.aiHint = aiHint;
    if (isPremium !== undefined) updateData.isPremium = isPremium;
    if (headingId !== undefined) updateData.headingId = parseObjectId(headingId);
    if (subHeadingId !== undefined) updateData.subHeadingId = parseObjectId(subHeadingId);
    if (status) updateData.status = status;

    const updated = await mcqsRepository.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      throw AppError.notFound('Question not found');
    }

    return updated;
  },

  async delete(id: string) {
    if (!id) {
      throw AppError.badRequest('Invalid question ID');
    }

    const deleted = await mcqsRepository.findByIdAndDelete(id);

    if (!deleted) {
      throw AppError.notFound('Question not found');
    }

    return deleted;
  },

  async countByChapter(chapterId: string) {
    if (!Types.ObjectId.isValid(chapterId)) {
      throw AppError.badRequest('Invalid chapter ID format');
    }

    return mcqsRepository.countByChapter(new Types.ObjectId(chapterId));
  },

  async countByBook(bookId: string) {
    if (!Types.ObjectId.isValid(bookId)) {
      throw AppError.badRequest('Invalid book ID format');
    }

    return mcqsRepository.countByBook(new Types.ObjectId(bookId));
  },
};
