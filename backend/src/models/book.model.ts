import mongoose, { Schema } from 'mongoose';
import { StatusEnum } from '@muzammil328/education-packages/enums';
import { Document, Types } from 'mongoose';

interface IVUAssessmentComponent {
  title: string;
  weight: number; // percentage
  description?: string;
}

interface MediumComponent {
  slug: string;
  name: string;
  fileId: string;
}

interface IBook extends Document {
  name: string;
  slug: string;
  code: string; // CS001, MTH001, MGT211, etc.
  description?: string;
  classId: Types.ObjectId;
  serviceId?: Types.ObjectId[];
  creditHours?: number;
  fileId?: string; // Google Drive file ID
  pages?: number;
  chapters?: number;
  status: 'active' | 'inactive';
  image?: string;
  totalWeight?: number; // should equal 100
  components: IVUAssessmentComponent[];
  medium?: MediumComponent[];
  keywords?: string[];
  boardId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const VUAssessmentComponentSchema = new Schema(
  {
    title: { type: String, required: true },
    weight: { type: Number, required: true, min: 0, max: 100 },
    description: { type: String },
  },
  { _id: false }
);

const BookSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, lowercase: true, index: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    serviceId: [{ type: Schema.Types.ObjectId, ref: 'Service', index: true }],
    creditHours: { type: Number },
    fileId: { type: String },
    pages: { type: Number },
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.Active },
    image: { type: String },
    totalWeight: { type: Number, default: 100 },
    components: [VUAssessmentComponentSchema],
  },
  { timestamps: true }
);

// save slug from name if not provided
BookSchema.pre<IBook>('validate', function (this: IBook, next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

export const Book = mongoose.model<IBook>('Book', BookSchema);
export default Book;
