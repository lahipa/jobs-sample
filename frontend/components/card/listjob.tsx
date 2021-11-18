import Image from "next/image";
import { useRouter } from "next/router";
// Datatype
import { PositionDataType } from "../../services/datatypes";
// Utils
import { convertTimeAgo } from "../../utils";

interface ListJobCardProps {
  job: PositionDataType;
}

export default function ListJobCard(props: ListJobCardProps) {
  const { job } = props;

  const router = useRouter();

  return (
    <button 
      className="w-full flex flex-col overflow-hidden rounded-lg bg-white"
      onClick={() => router.push(`/position/${job?.id}`)}
    >
      <div className="px-8 w-full flex h-32 items-center justify-between">
        <div className="flex flex-col gap-2 items-start">
          <p className="text-base">
            <b>{job?.title}</b>
          </p>
          <p><span>{job?.company}</span> - {job?.type}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <p className="text-base">
            <b>{job?.location}</b>
          </p>
          <p>{convertTimeAgo(job?.created_at)}</p>
        </div>
      </div>
    </button>
  );
}
