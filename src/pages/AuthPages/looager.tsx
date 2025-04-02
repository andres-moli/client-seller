import {useValidateUserTokenQuery } from "../../domain/graphql";
import { useNavigate, useParams } from "react-router";
import Cookies from 'js-cookie'

export function LoagerPage() {
  const navigate  = useNavigate()
  const { token } = useParams()
  Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
  Cookies.remove(import.meta.env.VITE_APP_KEY_COOKIE_USER)
  const { loading } = useValidateUserTokenQuery({
    variables: {
      validateTokenInput: {
        token: token ?? "",
      },
    },
    onCompleted: () => {
      navigate("/")
    },
    onError: (error) => {
      console.log("error", error);
      navigate("/signin");
    },
    fetchPolicy: "network-only",
  });


  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      {
        loading 
        &&
        (
          <>
          <img src="/loading.svg" alt="" />
          <span>Loagendo a super admin</span>
          </>
        )
      }
    </div>
  );
}
