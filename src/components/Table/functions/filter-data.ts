type filterDataProps = {
  data: Object | any[] | undefined;
  filter: string;
  returnFilteredData: (array: any[] | undefined) => void;
};

const filterData = ({ data, filter, returnFilteredData }: filterDataProps) => {
  if (data) {
    let dataArr = data;
    if (!Array.isArray(data)) dataArr = Object.values(data);
    //@ts-ignore
    let exists = dataArr?.filter((e) => {
      return Object.values(e).some((r: any) => {
        if (typeof r === "string" && typeof filter === "string")
          return r.toLocaleUpperCase().indexOf(filter.toLocaleUpperCase()) > -1;
        else return false;
      });
    });
    returnFilteredData(exists);
  } else returnFilteredData([]);
};

export default filterData;
