import UserModel from '../models/user.model';
import { RoleEnum } from '@muzammil328/education-packages/enums';
import { bcryptService } from '@/infrastructure/bcrypt.service';

const users = [
  {
    username: 'Super Admin',
    email: 'superadmin@education.com',
    password: 'Admin@1234',
    role: RoleEnum.SuperAdmin,
    isEmailVerified: true,
  },
  {
    username: 'Teacher One',
    email: 'teacher@education.com',
    password: 'Teacher@1234',
    role: RoleEnum.Teacher,
    isEmailVerified: true,
  },
  {
    username: 'Student One',
    email: 'student@education.com',
    password: 'Student@1234',
    role: RoleEnum.Student,
    isEmailVerified: true,
  },
];

export async function seedUsers() {
  let createdCount = 0;
  let updatedCount = 0;

  try {
    console.log('Starting User seed...');

    for (const raw of users) {
      const existing = await UserModel.findOne({ email: raw.email });

      if (existing) {
        existing.username = raw.username;
        existing.role = raw.role;
        existing.isEmailVerified = raw.isEmailVerified;
        await existing.save();
        updatedCount += 1;
        console.log(`Updated User: ${raw.email} (${raw.role})`);
        continue;
      }

      const hashed = await bcryptService.hash(raw.password);

      await UserModel.create({
        username: raw.username,
        email: raw.email,
        password: hashed,
        role: raw.role,
        isEmailVerified: raw.isEmailVerified,
      });

      createdCount += 1;
      console.log(`Created User: ${raw.email} (${raw.role})`);
    }

    console.log('User seeding completed.');
    console.log(`Created: ${createdCount}, Updated: ${updatedCount}`);
  } catch (error) {
    console.error('Error seeding Users:', error);
    throw error;
  }
}
