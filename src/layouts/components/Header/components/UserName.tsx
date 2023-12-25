import { RootState, useSelector } from "@/redux";
import { useTranslation } from "react-i18next";

const UserName: React.FC = () => {
  const { t } = useTranslation();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  return (
    <span className="username" style={{ fontFamily: "aliFonts" }}>
      {t("user.username")}
    </span>
  );
};

export default UserName;
