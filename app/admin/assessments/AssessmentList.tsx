import React from "react";
import { Edit, Eye, Trash, Share2 } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import ActionButton from "@/components/buttons/ActionButton";
import { useQuery } from "@tanstack/react-query";
import { getAssessments } from "@/api/assessments";
import { GLOBAL_CONFIG } from "@/config/globals";
import { toast } from "sonner";

const dummyList = [
  { name: "word1", value: "word1" },
  { name: "word2", value: "word2" },
  { name: "word3", value: "word3" },
  { name: "word4", value: "word4" },
  { name: "word5", value: "word5" },
  { name: "word6", value: "word6" },
  { name: "word7", value: "word7" },
  { name: "word8", value: "word8" },
  { name: "word9", value: "word9" },
  { name: "word10", value: "word10" },
  { name: "word11", value: "word11" },
  { name: "word12", value: "word12" },
  { name: "word13", value: "word13" },
  { name: "word14", value: "word14" },
  { name: "word15", value: "word15" },
  { name: "word16", value: "word16" },
  { name: "word17", value: "word17" },
  { name: "word18", value: "word18" },
  { name: "word19", value: "word19" },
  { name: "word20", value: "word20" },
];

const AssessmentList: React.FC<{ initialAssessmentsList: any }> = ({
  initialAssessmentsList,
}) => {
  const { data } = useQuery({
    queryKey: ["assessments"],
    queryFn: getAssessments,
    initialData: initialAssessmentsList,
  });

  return (
    <>
      <ul>
        {data?.length &&
          data.map(
            ({
              _id,
              name,
              access_code,
            }: {
              _id: string;
              name: string;
              access_code: string;
            }) => (
              <li
                key={_id}
                className="m-3 flex items-center justify-between rounded-lg bg-card p-3"
              >
                <span>{name}</span>
                <div className="flex gap-2 items-center">
                  <ActionButton title="View" Icon={Eye} />
                  <ActionButton title="Edit" Icon={Edit} />
                  <ActionButton title="Delete" Icon={Trash} />
                  <ActionButton 
                    title="Copy to Share"
                    onClick={() => {
                    navigator.clipboard.writeText(
                      `${GLOBAL_CONFIG.APP.BASE_URL}/login?access-code=${access_code}`,
                    );
                    toast.success("Link copied to clipboard");
                  }}
                    Icon={Share2} />
                </div>
              </li>
            ),
          )}
      </ul>
    </>
  );
};

export default AssessmentList;
