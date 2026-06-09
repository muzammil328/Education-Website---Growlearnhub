import mongoose, { Schema } from 'mongoose';
import { StatusEnum } from '@muzammil328/education-packages/enums';
import { Document, Types } from 'mongoose';

interface IVUAssessmentComponent {
  title: string;
  type: 'assignment' | 'quiz' | 'midterm' | 'final' | 'project' | 'lab' | 'other';
  weight: number; // percentage of total grade
  maxMarks?: number;
  passingMarks?: number;
  dueWeek?: number; // week number in semester
  isOnline?: boolean;
  description?: string;
  instructions?: string;
}

interface IPairingScheme {
  image?: string; // image URL of the pairing scheme
  year?: number;
  board?: string;
}

interface MediumComponent {
  slug: string;
  name: string;
  fileId: string;
}

interface IExternalLink {
  name: string;
  slug: string;
  url: string;
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
  pairingScheme?: IPairingScheme;
  medium?: MediumComponent[];
  externalLinks?: IExternalLink[];
  keywords?: string[];
  boardId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const VUAssessmentComponentSchema = new Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['assignment', 'quiz', 'midterm', 'final', 'project', 'lab', 'other'],
      default: 'other',
    },
    weight: { type: Number, required: true, min: 0, max: 100 },
    maxMarks: { type: Number },
    passingMarks: { type: Number },
    dueWeek: { type: Number },
    isOnline: { type: Boolean, default: false },
    description: { type: String },
    instructions: { type: String },
  },
  { _id: false }
);

const PairingSchemeSchema = new Schema(
  {
    image: { type: String },
    year: { type: Number },
    board: { type: String },
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
    pairingScheme: { type: PairingSchemeSchema },
    externalLinks: [
      new Schema({ name: { type: String, required: true }, slug: { type: String, required: true }, url: { type: String, required: true } }, { _id: false })
    ],
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
