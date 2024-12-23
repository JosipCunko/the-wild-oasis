import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;

/*eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1 Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //If there is no user, redirect to /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
