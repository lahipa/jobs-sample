import { useEffect } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
// Data
import { connect } from "react-redux";
import { AppDispatch, RootState, getDetailPosition } from "../../reduxs";
import { PositionDataType } from "../../services/datatypes";

interface DetailProps {
  position: PositionDataType;
  getDetailPosition: typeof getDetailPosition;
}

const Detail: NextPage<DetailProps> = (props: DetailProps) => {
  const { position, getDetailPosition } = props;

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getDetailPosition(id as string);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className="container sm:mx-auto px-5">
      <div className="my-16">
        <small>{position?.type} / {position?.location}</small>
        <h3>{position?.title}</h3>
      </div>
      <div className="flex flex-row gap-2">
        <div
          className="flex-1" 
          dangerouslySetInnerHTML={{ __html: position?.description as string }}
        />
        <div className="flex flex-col" style={{ width: 400 }}>
          <div className="relative">
            <img 
              src={position.company_logo ? position?.company_logo as string : "/null"} 
              alt="Company" 
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: position?.how_to_apply as string }}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const { _xSe } = req.cookies;

  if (!_xSe) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};


const mapStateToProps = (state: RootState) => ({
  position: state.rdcrecruitements.position,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getDetailPosition: (id: string) => dispatch(getDetailPosition(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
