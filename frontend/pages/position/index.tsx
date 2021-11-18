import { useEffect, useState, useRef, useCallback, FormEvent } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
// Components
import { ListJobCard } from "../../components";
// Data
import { connect } from "react-redux";
import { AppDispatch, RootState, getListPositions } from "../../reduxs";
import { RecruitementParams, PositionDataType } from "../../services/datatypes";

interface PositionDataProps {
  positions: Array<PositionDataType>;
  getListPositions: typeof getListPositions;
  clearPositions: () => void;
}

const Positon: NextPage<PositionDataProps> = (props: PositionDataProps) => {
  const { positions, clearPositions, getListPositions } = props;

  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [fulltime, setFulltime] = useState<string>("false");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const observer = useRef<HTMLDivElement | IntersectionObserver>();

  const lastElementRef = useCallback(
    (node) => {
      // if (loading) return;

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => {
            return prevPage + 1;
          });
        }
      });

      if (observer.current) observer.current.disconnect();

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    clearPositions!();
  }, [])

  useEffect(() => {
    setHasMore(positions!.length > 0);
  }, [positions]);

  useEffect(() => {
    getListPositions({ page: page.toString() });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (hasMore) {
      clearPositions!();
      setPage(1);
    }

    getListPositions({ 
      description,
      location,
      full_time: fulltime,
      page: page.toString(),
    });
  }

  return (
    <div className="container sm:mx-auto px-5">
      <div className="py-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-4 items-center justify-center">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div>
              <input type="checkbox" id="isFulltime" value="true" onChange={(e) => setFulltime(e.target.value)} />
              <label htmlFor="isFulltime"> Fulltime Only</label>
            </div>

            <button type="submit">Cari</button>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        {positions.map((job: PositionDataType, i: number) => {
          if (positions.length === i + 1) {
            return (
              <div key={i.toString()} ref={lastElementRef}>
                <ListJobCard job={job} />
              </div>
            );
          } else {
            return (
              <div key={i.toString()}>
                <ListJobCard job={job} />
              </div>
            );
          }
        })}
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
  positions: state.rdcrecruitements.positions,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getListPositions: (params?: RecruitementParams) =>
    dispatch(getListPositions(params)),
  clearPositions: () => dispatch({ type: "CLEAR_POSITIONS" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Positon);
