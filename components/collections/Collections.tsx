import { PlusOutlined as PlusIcon } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { ICollection } from "../../types";
import Collection from "./Collection";

interface IProps {
  collections: ICollection[];
  isFetching?: boolean;
  onFetchNextPage?: Function;
  isInfinite?: boolean;
}

const Collections = ({
  collections,
  isFetching,
  onFetchNextPage,
  isInfinite = true,
}: IProps) => {
  return (
    <div className="">
      <div className="flex flex-col gap-[5px]">
        {collections.map((collection) => (
          <Collection key={collection._id} collection={collection} />
        ))}
      </div>

      {isInfinite && (
        <>
          {isFetching! ? (
            <div className="text-center mt-[20px]">
              <Spin />
            </div>
          ) : (
            <div className="text-center">
              <Button
                onClick={() => onFetchNextPage!()}
                className="mt-[20px]"
                shape="circle"
                icon={<PlusIcon />}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Collections;
