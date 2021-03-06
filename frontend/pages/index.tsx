import { useEffect, useState, FormEvent } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
// Data
import { connect } from "react-redux";
import { AppDispatch, RootState, doLogin } from "../reduxs";
import { LoginDataType } from "../services/datatypes";

interface HomeProps {
  isLogin: boolean;
  doLogin: typeof doLogin;
}

const Home: NextPage<HomeProps> = (props: Partial<HomeProps>) => {
  const { isLogin, doLogin } = props;

  const [data, setData] = useState<LoginDataType>({
    username: "",
    password: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (isLogin) router.push("position");
  }, [isLogin, router]);

  const handleForm = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    doLogin!(data);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full flex items-center justify-center">
        <div style={{ width: 500 }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={data.username}
              onChange={(e) => handleForm("username", e.target.value)}
            />

            <input
              type="password"
              value={data.password}
              onChange={(e) => handleForm("password", e.target.value)}
            />

            <button
              className="bg-gray-300 hover:bg-gray-400"
              type="submit"
            >
                Login Now
              </button>
          </form>

          <div className="flex items-center justify-between mt-10">
            <p>username: lahipa</p>
            <p>password: 123456</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const { _xSe } = req.cookies;

  if (_xSe) {
    return {
      redirect: {
        destination: "/position",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

const mapStateToProps = (state: RootState) => ({
  isLogin: state.rdcusers.isLogin,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  doLogin: (data: LoginDataType) => dispatch(doLogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
