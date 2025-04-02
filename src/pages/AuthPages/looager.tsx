import {useValidateUserTokenQuery } from "../../domain/graphql";
import { useNavigate, useParams } from "react-router";

export function LoagerPage() {
  const navigate  = useNavigate()
  const { token } = useParams()
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
