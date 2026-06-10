import { Types } from 'mongoose';
import UserProgress from '@/models/userProgress.model';
import Mcqs from '@/models/mcqs.model';

const MASTERY_CORRECT_DELTA = 5;
const MASTERY_WRONG_DELTA = 8;
const PROMOTE_THRESHOLD = 80;
const DEMOTE_THRESHOLD = 50;
const MAX_SPACED_INTERVAL_DAYS = 30;
const CONFIDENT_MISTAKE_OPEN_LOOP_THRESHOLD = 3;
const WRONG_ANSWER_OPEN_LOOP_THRESHOLD = 3;

function computeMasteryBand(score: number): 'weak' | 'developing' | 'strong' {
  if (score >= 70) return 'strong';
  if (score >= 40) return 'developing';
  return 'weak';
}

function computeDifficultyBand(band: 'weak' | 'developing' | 'strong'): 'easy' | 'medium' | 'hard' {
  if (band === 'strong') return 'hard';
  if (band === 'developing') return 'medium';
  return 'easy';
}

export async function updateUserProgressOnAttempt(params: {
  userId: string;
  mcqId: string;
  isCorrect: boolean;
  isConfidentMistake: boolean;
}): Promise<void> {
  const { userId, mcqId, isCorrect, isConfidentMistake } = params;

  const mcq = await Mcqs.findById(mcqId).select('subHeadingId headingId chapterId bookId classId').lean();
  if (!mcq) return;

  const filter = {
    user: new Types.ObjectId(userId),
    ...(mcq.subHeadingId
      ? { subHeadingId: mcq.subHeadingId }
      : mcq.headingId
        ? { headingId: mcq.headingId }
        : { chapterId: mcq.chapterId }),
  };

  const progress = await UserProgress.findOne(filter);

  if (!progress) {
    // Create new record
    const masteryScore = isCorrect ? MASTERY_CORRECT_DELTA : 0;
    const masteryBand = computeMasteryBand(masteryScore);
    await UserProgress.create({
      user: new Types.ObjectId(userId),
      classId: mcq.classId,
      bookId: mcq.bookId,
      chapterId: mcq.chapterId,
      headingId: mcq.headingId ?? undefined,
      subHeadingId: mcq.subHeadingId ?? undefined,
      correct: isCorrect ? 1 : 0,
      incorrect: isCorrect ? 0 : 1,
      totalAttempts: 1,
      masteryScore,
      masteryBand,
      currentDifficultyBand: computeDifficultyBand(masteryBand),
      lastAttempt: new Date(),
      confidentMistakeCount: isConfidentMistake ? 1 : 0,
      openLoopCount: isConfidentMistake ? 1 : 0,
      spacedRepetitionInterval: isCorrect ? 1 : 1,
      nextReviewAt: new Date(Date.now() + 86400000),
      retryCount: isCorrect ? 0 : 1,
    });
    return;
  }

  // Update existing
  const newCorrect = progress.correct + (isCorrect ? 1 : 0);
  const newIncorrect = progress.incorrect + (isCorrect ? 0 : 1);
  const newTotal = (progress.totalAttempts ?? 0) + 1;

  // Mastery score: clamp 0–100
  let newMasteryScore = (progress.masteryScore ?? 0) + (isCorrect ? MASTERY_CORRECT_DELTA : -MASTERY_WRONG_DELTA);
  newMasteryScore = Math.max(0, Math.min(100, newMasteryScore));

  const newMasteryBand = computeMasteryBand(newMasteryScore);
  const newDifficultyBand = computeDifficultyBand(newMasteryBand);

  // Spaced repetition (SM-2 simplified)
  let interval = progress.spacedRepetitionInterval ?? 1;
  if (isCorrect) {
    interval = Math.min(Math.round(interval * 2.5), MAX_SPACED_INTERVAL_DAYS);
  } else {
    interval = 1;
  }
  const nextReviewAt = new Date(Date.now() + interval * 86400000);

  // Confident mistake escalation
  const newConfidentMistakeCount = (progress.confidentMistakeCount ?? 0) + (isConfidentMistake ? 1 : 0);

  // Open loop: increment on confident mistake threshold or 3+ wrong answers
  let newOpenLoopCount = progress.openLoopCount ?? 0;
  if (isConfidentMistake && newConfidentMistakeCount >= CONFIDENT_MISTAKE_OPEN_LOOP_THRESHOLD) {
    newOpenLoopCount = Math.max(newOpenLoopCount, 1);
  }
  if (!isCorrect && newIncorrect > 0 && newIncorrect % WRONG_ANSWER_OPEN_LOOP_THRESHOLD === 0) {
    newOpenLoopCount++;
  }

  await UserProgress.updateOne(filter, {
    $set: {
      correct: newCorrect,
      incorrect: newIncorrect,
      totalAttempts: newTotal,
      masteryScore: newMasteryScore,
      masteryBand: newMasteryBand,
      currentDifficultyBand: newDifficultyBand,
      lastAttempt: new Date(),
      spacedRepetitionInterval: interval,
      nextReviewAt,
      confidentMistakeCount: newConfidentMistakeCount,
      openLoopCount: newOpenLoopCount,
      retryCount: (progress.retryCount ?? 0) + (isCorrect ? 0 : 1),
    },
  });
}
