import { Types } from 'mongoose';
import User from '@/models/user.model';
import UserProgress from '@/models/userProgress.model';

export type BadgeKey =
  | 'conquer_it'
  | 'open_loop_closer'
  | 'confident_mistake_zero'
  | 'burst_streak_3'
  | 'burst_streak_7'
  | 'burst_streak_30'
  | 'exam_ready';

async function awardBadge(userId: string, badge: BadgeKey): Promise<void> {
  await User.updateOne(
    { _id: new Types.ObjectId(userId), badges: { $ne: badge } },
    { $addToSet: { badges: badge } },
  );
}

/**
 * Called after each attempt to check if any new badges are earned.
 * Fire-and-forget — never throws.
 */
export async function checkAndAwardBadges(userId: string): Promise<void> {
  try {
    const [userDoc, progress] = await Promise.all([
      User.findById(new Types.ObjectId(userId)).select('badges burstStreakCount').lean(),
      UserProgress.find({ user: new Types.ObjectId(userId) }).lean(),
    ]);
    if (!userDoc || !progress.length) return;

    const existingBadges = (userDoc.badges as string[]) ?? [];

    // conquer_it — at least one subHeading at 'strong'
    if (!existingBadges.includes('conquer_it')) {
      const hasStrong = progress.some(p => p.masteryBand === 'strong');
      if (hasStrong) await awardBadge(userId, 'conquer_it');
    }

    // open_loop_closer — all open loops cleared (openLoopCount === 0 on all progress)
    if (!existingBadges.includes('open_loop_closer')) {
      const allClear = progress.every(p => (p.openLoopCount ?? 0) === 0);
      if (allClear && progress.length >= 3) await awardBadge(userId, 'open_loop_closer');
    }

    // confident_mistake_zero — no confidentMistakeCount > 0 across all progress
    if (!existingBadges.includes('confident_mistake_zero')) {
      const noMistakes = progress.every(p => (p.confidentMistakeCount ?? 0) === 0);
      if (noMistakes && progress.length >= 5) await awardBadge(userId, 'confident_mistake_zero');
    }

    // burst_streak badges
    const streakCount = (userDoc.burstStreakCount as number) ?? 0;
    if (streakCount >= 3 && !existingBadges.includes('burst_streak_3')) await awardBadge(userId, 'burst_streak_3');
    if (streakCount >= 7 && !existingBadges.includes('burst_streak_7')) await awardBadge(userId, 'burst_streak_7');
    if (streakCount >= 30 && !existingBadges.includes('burst_streak_30')) await awardBadge(userId, 'burst_streak_30');

    // exam_ready — readiness score >= 80% (strong / total >= 0.8)
    if (!existingBadges.includes('exam_ready')) {
      const strong = progress.filter(p => p.masteryBand === 'strong').length;
      if (progress.length >= 5 && strong / progress.length >= 0.8) {
        await awardBadge(userId, 'exam_ready');
      }
    }
  } catch {
    // never block the attempt flow
  }
}

/**
 * Called when a Micro Burst session is completed. Updates streak and checks badges.
 */
export async function completeBurst(userId: string): Promise<void> {
  const user = await User.findById(new Types.ObjectId(userId)).select('lastBurstDate burstStreakCount').lean();
  if (!user) return;

  const now = new Date();
  const lastBurst = user.lastBurstDate ? new Date(user.lastBurstDate as Date) : null;
  const isConsecutive = lastBurst
    ? now.getTime() - lastBurst.getTime() < 2 * 86400000 // within 48h counts as next day
    : false;

  const newStreak = isConsecutive ? ((user.burstStreakCount as number) ?? 0) + 1 : 1;

  await User.findByIdAndUpdate(new Types.ObjectId(userId), {
    lastBurstDate: now,
    burstStreakCount: newStreak,
  });

  await checkAndAwardBadges(userId);
}
