import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading/Loading';
import Forbidden from '../Pages/Dashboard/Forbidden/Forbidden';
import useRole from '../hooks/useRole';

const LibrarianRoute = ({ children }) => {
  
  const { role, roleLoading } = useRole();
  const { loading } = useAuth();

  if (loading || roleLoading) {
    return <Loading></Loading>
  }
  if (role !== 'librarian') {
    return <Forbidden></Forbidden>
  }

  return children;
};

export default LibrarianRoute;