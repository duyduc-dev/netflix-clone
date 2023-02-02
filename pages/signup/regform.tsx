import * as React from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { yupResolver } from '@hookform/resolvers/yup';

import { SignUpLayout } from '~/components/common/layouts';
import { Input } from '~/components/modules/sign-up';
import { emailLoginState } from '~/store/emailLoginState';
import validateEmail from '~/utils/helper/validateEmail';
import { toast } from 'react-hot-toast';
import { useAuth } from '~/context/AuthContext';
import { IconLoading } from '~/components/icon';
import { useRouter } from 'next/router';
import { privateRoutes, publicRoutes } from '~/utils/constants/common';

interface SignUpSchema {
  email: string;
  password: string;
}

const signUpSchema = yup.object().shape({
  email: yup.string().required('Email is required.').email('Please enter a valid email.'),
  password: yup.string().required('Password is required.').min(6, 'The shortest password is 6'),
});

interface RegFormProps {}

function RegForm(props: RegFormProps) {
  const {} = props;

  const emailLogin = useRecoilValue(emailLoginState);
  const { signUp } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpSchema>({
    mode: 'all',
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: emailLogin,
      password: '',
    },
  });

  const onSubmitForm: SubmitHandler<SignUpSchema> = async data => {
    setLoading(true);
    await signUp(data.email, data.password)
      .then(() => {
        router.push(publicRoutes.signup);
        toast.success('Sign Up Success!');
      })
      .catch(() => {
        toast.error('Registration failed!');
      });
    setLoading(false);
  };

  return (
    <main>
      <div className="p-[20px_32px_55px]">
        <div className="max-w-[440px] mx-auto text-left text-dark_charcoal">
          <p className="text-[13px]">
            STEP <b>1</b> OF <b>3</b>
          </p>
          <h1 className="text-[32px] block w-full font-[500] mb-1">Create a password to start your membership</h1>
          <p className="text-[18px] block mb-3">Just a few more steps and you&apos;re done!</p>
          <p className="text-[18px] block mb-3">We hate paperwork, too.</p>
          <form onSubmit={handleSubmit(onSubmitForm)} className="my-5">
            <div className="my-2">
              <Input
                placeholder="Email"
                value={getValues().email}
                name="email"
                register={register}
                error={errors.email?.message}
              />
            </div>
            <div className="my-2">
              <Input
                placeholder="Add a password"
                type="password"
                value={getValues().password}
                name="password"
                register={register}
                error={errors.password?.message}
              />
            </div>
            <button
              disabled={loading}
              className="mt-5 bg-primaryRed text-white w-full hover:bg-[#f6121d] rounded text-[24px] font-[400] min-h-[64px] px-12"
            >
              {loading ? (
                <div className="flex items-center justify-center w-full">
                  <IconLoading height={25} width={25} />
                </div>
              ) : (
                'Next'
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

RegForm.Layout = SignUpLayout;

export default RegForm;
