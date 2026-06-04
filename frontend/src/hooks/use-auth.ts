import { trpc } from '@/trpc/trpc';

export const useRegister = () => {
  const utils = trpc.useUtils();
  return trpc.auth.register.useMutation({
    onSuccess: () => {
      void utils.auth.invalidate();
    },
  });
};

export const useVerifyOTP = () => {
  const utils = trpc.useUtils();
  return trpc.auth.otpVerification.useMutation({
    onSuccess: () => {
      void utils.auth.invalidate();
    },
  });
};

export const useLogin = () => {
  const utils = trpc.useUtils();
  return trpc.auth.login.useMutation({
    onSuccess: () => {
      void utils.auth.invalidate();
    },
  });
};

export const useForgotPassword = () => {
  const utils = trpc.useUtils();
  return trpc.auth.forgotPassword.useMutation({
    onSuccess: () => {
      void utils.auth.invalidate();
    },
  });
};

export const useVerifyForgotPassword = () => {
  const utils = trpc.useUtils();
  return trpc.auth.verifyForgotPassword.useMutation({
    onSuccess: () => {
      void utils.auth.invalidate();
    },
  });
};

export const useResetPassword = () => {
  const utils = trpc.useUtils();
  return trpc.auth.resetPassword.useMutation({
    onSuccess: () => {
      void utils.auth.invalidate();
    },
  });
};

export const useRefreshToken = () => trpc.auth.refreshToken.useMutation();

export const useLogout = () => {
  const utils = trpc.useUtils();
  return (
    trpc.auth.logout?.useMutation?.({
      onSuccess: () => {
        void utils.auth.invalidate();
      },
    }) ??
    (() => {
      /* empty */
    })
  );
};
