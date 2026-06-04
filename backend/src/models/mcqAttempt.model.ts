import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const mcqAttemptSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    institutionId: { type: Schema.Types.ObjectId, ref: 'Institution', index: true },
    mcqId: { type: Schema.Types.ObjectId, ref: 'Mcqs', required: true, index: true },
    selectedOption: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
    timeTakenMs: { type: Number },
    attemptedAt: { type: Date, default: Date.now, index: true },
    confidenceTag: { type: String, enum: ['sure', 'guessed', 'no_idea'] },
    outcomeType: {
      type: String,
      enum: ['true_knowledge', 'lucky_guess', 'confident_mistake', 'known_weakness'],
    },
    sessionId: { type: String, index: true },
    quizMode: {
      type: String,
      enum: [
        'practice', 'exam_sim', 'weak_topic', 'focused_drill',
        'speed_round', 'challenge', 'revision', 'micro_burst',
      ],
    },
  },
  { timestamps: true }
);

mcqAttemptSchema.index({ userId: 1, mcqId: 1, attemptedAt: -1 });
mcqAttemptSchema.index({ userId: 1, outcomeType: 1 });
mcqAttemptSchema.index({ userId: 1, sessionId: 1 });

mcqAttemptSchema.pre('save', function (next) {
  if (this.get('confidenceTag') !== undefined) {
    const sure = this.get('confidenceTag') === 'sure';
    const correct = this.get('isCorrect') as boolean;
    if (sure && correct) this.set('outcomeType', 'true_knowledge');
    else if (!sure && correct) this.set('outcomeType', 'lucky_guess');
    else if (sure && !correct) this.set('outcomeType', 'confident_mistake');
    else this.set('outcomeType', 'known_weakness');
  }
  next();
});

export type McqAttemptDoc = InferSchemaType<typeof mcqAttemptSchema> & {
  _id: mongoose.Types.ObjectId;
};

const McqAttempt = mongoose.models.McqAttempt || mongoose.model('McqAttempt', mcqAttemptSchema);

export default McqAttempt;
