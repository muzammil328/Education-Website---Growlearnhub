import crypto from 'crypto';
import { Types } from 'mongoose';
import { OtpPurposeEnum, type OtpPurposeValue } from '@muzammil328/education-packages/enums';
import { bcryptService } from './bcrypt.service';
import { otpRepository } from '@/repository/otp.repository';

const OTP_LENGTH = 6;
const OTP_TTL_MINUTES = 10;
const OTP_MAX_ATTEMPTS = 5;

function generateNumericOtp(length = OTP_LENGTH): string {
  const max = Math.pow(10, length);
  return String(crypto.randomInt(0, max)).padStart(length, '0');
}

function getExpiryDate(ttlMinutes = OTP_TTL_MINUTES): Date {
  return new Date(Date.now() + ttlMinutes * 60 * 1000);
}

export const otpService = {
  async createOtp(userId: Types.ObjectId, purpose: OtpPurposeValue = OtpPurposeEnum.EMAIL_VERIFICATION) {
    const otp = generateNumericOtp();
    const hashedOtp = await bcryptService.hash(otp);
    const expiresAt = getExpiryDate();

    await otpRepository.deleteManyByUserAndPurpose(userId, purpose);

    const record = await otpRepository.create({
      userId,
      hashedOtp,
      expiresAt,
      purpose,
      attempts: 0,
      maxAttempts: OTP_MAX_ATTEMPTS,
    });

    return { otp, recordId: String(record._id) };
  },

  async verifyOtp(userId: Types.ObjectId, inputOtp: string, purpose: OtpPurposeValue) {
    const record = await otpRepository.findByUserAndPurpose(userId, purpose);
    if (!record) return false;
    if (new Date() > record.expiresAt) return false;
    if (record.attempts >= record.maxAttempts) return false;

    const isValid = await bcryptService.compare(inputOtp, record.hashedOtp);

    await otpRepository.incrementAttempts(record._id as Types.ObjectId);

    return isValid;
  },
};
