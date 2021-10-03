import { useEffect, useState } from "react";
import { Icon, SelectPicker } from "rsuite";
import { PickerObject } from "../../../types/object";
import "./style.css";

type PaginationProps = {
  dataLength?: number;
  pageSize: number;
  setPageSize: (value: string) => void;
  pageNumber: number;
  setPageNumber: (page: number) => void;
};

const Pagination = ({
  dataLength,
  pageSize,
  setPageSize,
  pageNumber,
  setPageNumber,
}: PaginationProps) => {
  const [totalPages, setTotalPages] = useState<number>(1);

  const data: PickerObject[] = [
    { label: "5", value: "5", role: "number" },
    { label: "10", value: "10", role: "number" },
    { label: "15", value: "15", role: "number" },
    { label: "20", value: "20", role: "number" },
    {
      label: "All",
      value: dataLength ? dataLength.toString() : "0",
      role: "number",
    },
  ];

  useEffect(() => {
    if (dataLength) {
      let totalPages = 0;
      totalPages = dataLength / pageSize;
      setTotalPages(Math.ceil(totalPages));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, dataLength]);

  return (
    <div className="paginationOuterDiv">
      <SelectPicker
        defaultValue={pageSize.toString()}
        data={data}
        placement="topStart"
        searchable={false}
        cleanable={false}
        onSelect={(value) => setPageSize(value)}
      />
      <ul className="paginationList">
        <Icon icon="left" style={{ cursor: "pointer" }} />
        {Array.from(Array(totalPages)).map((x, index) => (
          <li
            className={
              pageNumber === index + 1
                ? "paginationListItem activeItem"
                : "paginationListItem"
            }
            onClick={() => setPageNumber(index + 1)}
          >
            {index + 1}
          </li>
        ))}
        <Icon icon="right" style={{ cursor: "pointer" }} />
      </ul>
    </div>
  );
};

export default Pagination;
