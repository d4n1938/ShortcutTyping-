import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, loginToken } from "../state/atoms/userLoginAtom";
import BGDots from "./layouts/BGDots";

const Signup = () => {
  const setIsLgoin = useSetRecoilState(loginState);
  const [_token, setToken] = useRecoilState(loginToken);
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [passCheckValue, setPassCheckValue] = useState("");
  const navigate = useNavigate();
  const longinFunc = async () => {
    try {
      const formParams = new URLSearchParams();
      formParams.append("email", emailValue);
      formParams.append("password", passValue);
      const result = await fetch(
        "https://shortcutgame.kumaa9.dev/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formParams
        }
      );

      // ステータスコードが200の時に成功のメッセージを表示
      if (result.status === 200) {
        const data = await result.json();
        setToken(data.token);
        setIsLgoin(true);
        navigate("/");
        return;
      }

      // ステータスコードが200以外のときに失敗のメッセージを表示
      if (result.status !== 200) {
        setEmailValue("");
        setPassValue("");
        window.alert("ログインに失敗しました");
      }
    } catch (error) {
      window.alert("ログインに失敗しました");
    }
  };
  const signupFunc = async () => {
    try {
      const result = await fetch("https://shortcutgame.kumaa9.dev/api/userregister/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passValue,
        }),
      });
      // ステータスコードが201の時に成功のメッセージを表示
      if (result.status === 201) {
        const data = await result.json();
        window.alert("登録に成功しました");
        longinFunc();
      }
      // ステータスコード400の時に失敗のメッセージを表示
      if (result.status === 400) {
        window.alert("メールアドレスの形式が正しくありません");
      }

      // ステータスコードが406の時にメールアドレスが既に登録されていると表示
      if (result.status === 406) {
        window.alert("メールアドレスが既に登録されています");
      }
      
    } catch (error) {
      window.alert("通信に失敗しました");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passValue !== passCheckValue) {
      window.alert("パスワードが一致しません");
      setPassValue("");
      setPassCheckValue("");
      return;
    }
    signupFunc();
  };
  return (
    <>
      <BGDots />
      <header className="fixed top-0 flex justify-between items-center w-[100vw] h-[10vh] p-4">
        <Link to="/">
          <h1 className="text-xl font-bold text-white">
            ショートカットタイピング
          </h1>
        </Link>
      </header>
      <main className="flex justify-around items-center w-[100vw] h-[100vh]">
        <div className="flex flex-col justify-center h-[70vh]">
          <div className="flex flex-col items-center justify-evenly w-[600px] h-96 bg-slate-800 rounded-md">
            <p className="text-white text-sm text-start">
              メールアドレスとパスワードを入力してください
            </p>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col justify-center items-start w-[300px]"
            >
              <input
                type="email"
                className="w-[300px] h-10 mb-4 px-2 outline-none rounded-md"
                placeholder="メールアドレス"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
              <input
                type="password"
                className="w-[300px] h-10 mb-4 px-2 outline-none rounded-md"
                placeholder="パスワード"
                value={passValue}
                onChange={(e) => setPassValue(e.target.value)}
              />
              <input
                type="password"
                className="w-[300px] h-10 mb-6 px-2 outline-none rounded-md"
                placeholder="パスワードの確認"
                value={passCheckValue}
                onChange={(e) => setPassCheckValue(e.target.value)}
              />
              <button className="w-[100px] h-10 px-2 rounded-md bg-blue-500 text-white">
                新規作成
              </button>
            </form>
            <Link to="/login">
              <p className="text-white text-sm text-start">
                既にアカウントをお持ちの方はこちら
              </p>
            </Link>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center fixed bottom-0 w-full h-16">
        <small className="text-slate-300">
          &copy; 2023 daipan-shortcut. All Rights Reserved
        </small>
      </footer>
    </>
  );
};

export default Signup;
