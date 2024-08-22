import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user.role) {
        router.push('/login');
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.push('/unauthorized'); // Redirect to an unauthorized page
      }
    }, [user, router, allowedRoles]);

    if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
      return null; // Or you can return a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
