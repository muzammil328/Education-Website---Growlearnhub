import mongoose, { Schema } from 'mongoose';
import type { IMcqs } from '@muzammil328/education-packages/types';
import { StatusEnum, DifficultyEnum, McqScopeEnum } from '@muzammil328/education-packages/enums';

const McqsSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 3 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true, maxlength: 1000 },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    headingId: { type: Schema.Types.ObjectId, ref: 'Heading' },
    subHeadingId: { type: Schema.Types.ObjectId, ref: 'SubHeading' },
    scope: {
      type: String,
      enum: Object.values(McqScopeEnum),
      default: McqScopeEnum.GLOBAL,
      index: true,
    },
    institutionId: { type: Schema.Types.ObjectId, ref: 'Institution', index: true },
    question: { type: String, required: true, trim: true, minlength: 5 },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length >= 2,
        message: 'Mcqs must have at least 2 options',
      },
      set: (opts: string[]) => Array.from(new Set(opts)), // remove duplicates
    },
    correctOption: { type: Number, required: true, min: 0 },
    explanation: { type: String, trim: true, maxlength: 2000 },
    difficulty: { type: String, enum: Object.values(DifficultyEnum), default: DifficultyEnum.Medium },
    aiHint: { type: String, trim: true, maxlength: 500 },
    isPremium: { type: Boolean, default: false },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    cognitiveLevel: { type: String, enum: ['recall', 'understand', 'apply', 'analyze'] },
    distractorType: {
      type: String,
      enum: ['similar_sounding', 'partially_correct', 'opposite', 'unrelated'],
    },
    examinersNote: { type: String, trim: true, maxlength: 1000, select: false },
    conceptNode: { type: String, trim: true },
    commonMisconception: { type: String, trim: true, maxlength: 500 },
    examSourceTag: { type: String, enum: ['past_paper', 'predicted', 'original'] },
    examYear: { type: Number },
    historicalWrongRate: { type: Number, min: 0, max: 100 },
    askedInExams: [
      {
        examName: { type: String, trim: true },
        year: { type: Number },
        board: { type: String, trim: true },
        _id: false,
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// ---------------- VIRTUALS ----------------
McqsSchema.virtual('totalOptions').get(function (this: IMcqs) {
  return this.options.length;
});

// generate slug from name before saving
McqsSchema.pre<IMcqs>('validate', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
  }
  next();
});

McqsSchema.index({ slug: 1 });
McqsSchema.index({ chapterId: 1, difficulty: 1, status: 1 });
McqsSchema.index({ bookId: 1, status: 1 });
McqsSchema.index({ classId: 1, scope: 1, status: 1 });

export const Mcqs = mongoose.model<IMcqs>('Mcqs', McqsSchema);

export default Mcqs;
