import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon } from "rsuite";
import { getLocalizedComponents, themeSelector } from "../../redux/selectors";
import { TableColumnObject } from "../../types/object";
import Input from "../Input";
import Pagination from "./components/pagination";
import filterData from "./functions/filter-data";
import sortData from "./functions/sort-data";
import "./style.css";

type TableProps = {
  columns: TableColumnObject[];
  data: any[] | Object;
  handleClick: (id: number | string) => void;
  buttonCheck?: string;
  defaultFilter?: string;
};

const Table = ({
  columns,
  data,
  handleClick,
  buttonCheck,
  defaultFilter,
}: TableProps) => {
  const theme = useSelector(themeSelector);
  const strings = useSelector(getLocalizedComponents);

  const [filteredData, setFilteredData] = useState<any[]>();
  const [filter, setFilter] = useState<string>("");
  const [sorting, setSorting] =
    useState<{ column: string; sort: "asc" | "desc" }>();

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [paginatedData, setPaginatedData] = useState<any[]>();

  useEffect(() => {
    if (defaultFilter) setFilter(defaultFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterData({
      data,
      filter,
      returnFilteredData: (filteredData) => {
        setFilteredData(filteredData);
        getPaginatedData(filteredData);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, data]);

  const getPaginatedData = (data: any[] | undefined) => {
    let paginated = data;
    paginated = data?.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);
    if (paginated) setPaginatedData(paginated);
  };

  useEffect(() => {
    getPaginatedData(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, pageNumber]);

  return (
    <div className="tableComponent">
      <Input
        styles={{ maxWidth: 400 }}
        placeholder={strings.getString("search")}
        onChange={(value) => setFilter(value)}
        value={filter}
        icon={filter ? "close" : undefined}
        iconPlace="right"
        onIconClick={() => setFilter("")}
      />
      <div className="tableDiv">
        <table style={theme === "dark" ? { borderColor: "#3c3f43" } : {}}>
          <thead
            style={{
              backgroundColor: theme === "dark" ? "#0f131a" : "#fff",
            }}
          >
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  style={
                    theme === "dark"
                      ? {
                          borderColor: "#3c3f43",
                          textAlign: column.align ? column.align : "left",
                        }
                      : { textAlign: column.align ? column.align : "left" }
                  }
                  onClick={() => {
                    sortData({
                      value: column.value,
                      filteredData: filteredData,
                      sort: sorting,
                      sortedArray: (sortedArray) => {
                        setFilteredData(sortedArray);
                        getPaginatedData(sortedArray);
                      },
                      newSorting: (sorting) => setSorting(sorting),
                    });
                  }}
                >
                  {column.header}{" "}
                  {sorting?.column === column.value && (
                    <Icon
                      icon={
                        sorting.sort === "desc"
                          ? "long-arrow-down"
                          : "long-arrow-up"
                      }
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item) => {
              return (
                <tr key={item.id}>
                  {columns.map((column, j) => {
                    return (
                      <td
                        key={j}
                        style={
                          theme === "dark"
                            ? {
                                borderColor: "#3c3f43",
                                textAlign: column.align ? column.align : "left",
                              }
                            : {
                                textAlign: column.align ? column.align : "left",
                              }
                        }
                      >
                        {column.value === "button"
                          ? buttonCheck &&
                            !item[buttonCheck] && (
                              <button
                                className="rs-btn rs-btn-default"
                                onClick={() => handleClick(item.id)}
                              >
                                {column.header}
                              </button>
                            )
                          : item[column.value] === true
                          ? strings.getString("yes")
                          : item[column.value] === false
                          ? strings.getString("no")
                          : item[column.value]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        dataLength={filteredData?.length}
        pageSize={pageSize}
        setPageSize={(value) => setPageSize(parseInt(value))}
        pageNumber={pageNumber}
        setPageNumber={(page) => setPageNumber(page)}
      />
    </div>
  );
};

export default Table;
