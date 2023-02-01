import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Input from './Input';
import { routesPath } from '~/utils/constants/common';

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

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    mode: 'all',
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (e: any) => {
    console.log(e);
    router.push(routesPath.splash);
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="pt-[60px] px-[68px] pb-[40px] bg-[rgba(0,0,0,.75)] rounded-[4px] max-w-[450px] text-white">
        <h1 className="text-[32px] font-[500] mb-[28px]">Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input placeholder="Email" error={errors.email?.message} register={register} name="email" />
          </div>
          <div className="mt-8">
            <Input
              type="password"
              placeholder="Password"
              error={errors.password?.message}
              register={register}
              name="password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-primaryRed w-full p-[16px] mt-[24px] mb-[12px] shadow-[0_1px_0_rgb(0_0_0/55%)] rounded-lg font-[500] text-[16px]"
            >
              Sign In
            </button>
          </div>
        </form>
        <div>
          <p className="text-nickel text-[16px] font-[400]">
            New to Netflix?{' '}
            <Link className="text-white hover:underline" href={routesPath.index}>
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
