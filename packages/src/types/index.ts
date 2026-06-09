import type { Mode } from '@muzammil328/types';

export interface ModalProps {
  // trigger?: React.ReactNode;
  triggerLabel?: string;
  title?: string;
  mode?: Mode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export * from './auth.type';
export * from './comment.type';
export * from './chapter.type';
export * from './classGroup.type';
export * from './feedback.type';
export * from './adaptiveRecommendation.type';
export * from './analytics.type';
export * from './board.type';
export * from './classGroup.interface';
export * from './heading.type';
export * from './institution.type';
export * from './mcqs.type';
export * from './payment.type';
export * from './result.type';
export * from './service.type';
export * from './subHeading.type';
export * from './user.type';
export * from './userProgress.type';
export * from './otp.type';