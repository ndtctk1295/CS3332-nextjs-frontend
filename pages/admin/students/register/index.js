import RegisterStudentForm from '@/components/RegisterStudentForm';
import { useRouter } from 'next/router';
const RegisterStudentPage = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  }
  return (
    <section>
      <button onClick={handleGoBack} class="absolute top-10 left-10 hover:opacity-90 bg-blue-500 px-4 py-2 border border-neutral-500 text-white rounded-lg">Go back</button>
      <RegisterStudentForm />
    </section>
  );
};

export default RegisterStudentPage;
