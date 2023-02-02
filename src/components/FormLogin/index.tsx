import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Input from './Input';
import { privateRoutes, publicRoutes } from '~/utils/constants/common';
import { useRecoilValue } from 'recoil';
import { emailLoginState } from '~/store/emailLoginState';
import { useAuth } from '~/context/AuthContext';
import { toast } from 'react-hot-toast';
import { IconLoading } from '../icon';
import { useIsomorphicLayoutEffect } from 'hooks-react-custom';

interface LoginSchema {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required.').email('Please enter a valid email.'),
  password: yup.string().required('Password is required.').min(6, 'The shortest password is 6'),
});

interface FormLoginProps {}

function FormLogin(props: FormLoginProps) {
  const {} = props;

  const emailLogin = useRecoilValue(emailLoginState);
  const { signIn, user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginSchema>({
    mode: 'all',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: emailLogin,
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginSchema> = async data => {
    const user = await signIn(data.email, data.password);
    if (user) {
      router.push(privateRoutes.splash);
      toast.success('Login success!');
    } else {
      toast.error('login unsuccessful!');
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="pt-[60px] px-[68px] pb-[40px] bg-[rgba(0,0,0,.75)] rounded-[4px] max-w-[450px] text-white">
        <h1 className="text-[32px] font-[500] mb-[28px]">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              placeholder="Email"
              error={errors.email?.message}
              register={register}
              name="email"
              value={getValues().email}
            />
          </div>
          <div className="mt-8">
            <Input
              type="password"
              placeholder="Password"
              error={errors.password?.message}
              register={register}
              name="password"
              value={getValues().password}
            />
          </div>
          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-primaryRed w-full p-[16px] mt-[24px] mb-[12px] shadow-[0_1px_0_rgb(0_0_0/55%)] rounded-lg font-[500] text-[16px]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center w-full">
                  <IconLoading height={25} width={25} />
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        <div>
          <p className="text-nickel text-[16px] font-[400]">
            New to Netflix?{' '}
            <Link className="text-white hover:underline" href={publicRoutes.index}>
              Sign up now.
            </Link>
          </p>
        </div>
        <div className="text-philippine_gray text-[13px] mt-[11px]">
          This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
