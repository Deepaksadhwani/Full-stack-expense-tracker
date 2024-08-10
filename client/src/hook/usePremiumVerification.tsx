import axios from "axios";
import { useEffect } from "react";

interface PropsType {
  SERVER_URL: string;
  config: object;
  setTogglePremiumButtom: (values: boolean) => void;
}

const usePremiumVerification = ({
  SERVER_URL,
  config,
  setTogglePremiumButtom,
}: PropsType) => {
  useEffect(() => {
    const verifyPremium = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/user/purchase/verified-premium`,
          config,
        );
        console.log(response)
        if (response.data.status === "SUCCESSFUL") {
          setTogglePremiumButtom(true);
        }
      } catch (error) {
        setTogglePremiumButtom(false);
      }
    };
    verifyPremium();
  }, []);
};

export default usePremiumVerification;
