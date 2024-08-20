// pages/unauthorized.js
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
const UnauthorizedPage = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <section className='h-full min-h-screen flex flex-col justify-center items-center'>
      <h className="text-4xl font-bold">Unauthorized</h>
      <p className='text-2xl font-semibold'>You do not have access to this page.</p>
      <button className='bg-blue-500 px-4 py-2 text-white rounded-lg mt-4' onClick={handleGoBack}>
        
        Go back</button>
    </section>
  );
};

export default UnauthorizedPage;
