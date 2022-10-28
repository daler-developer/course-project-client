import { PlusOutlined as PlusIcon } from "@ant-design/icons";
import { Button, Empty, Spin } from "antd";
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
  const hasData = Boolean(collections.length);

  return (
    <div>
      {hasData ? (
        <div className="grid grid-cols-[repeat(3,1fr)] gap-[10px] tablet:grid-cols-[repeat(2,1fr)] mobile:grid-cols-[repeat(1,1fr)] ">
          {collections.map((collection) => (
            <Collection key={collection._id} collection={collection} />
          ))}
        </div>
      ) : (
        <Empty description="No collections" />
      )}

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
