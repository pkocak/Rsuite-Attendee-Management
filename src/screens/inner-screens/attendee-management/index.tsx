import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Alert } from "rsuite";
import { Table } from "../../../components";
import { getAttendeesList } from "../../../redux/actions/staticActions";
import { getLocalizedAttendees } from "../../../redux/selectors";
import { AttendeeObject, TableColumnObject } from "../../../types/object";
import { checkInAttendee } from "../../../utils/firebaseFunctions";

const AttendeeManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const strings = useSelector(getLocalizedAttendees);
  const [attendees, setAttendees] = useState<AttendeeObject[]>();
  const [filter, setFilter] = useState<string>("");

  const columns: TableColumnObject[] = [
    { id: "1", header: strings.getString("full_name"), value: "fullName" },
    { id: "2", header: strings.getString("email"), value: "email" },
    { id: "3", header: strings.getString("hes"), value: "hes" },
    {
      id: "4",
      header: strings.getString("check_in_status"),
      value: "isAttended",
      align: "center",
    },
    {
      id: "5",
      header: strings.getString("check_in"),
      value: "button",
      align: "center",
    },
  ];

  const getListOfAttendees = () => {
    dispatch(
      getAttendeesList({
        onSuccess: (message, payload) => setAttendees(payload),
        onError: (message) => Alert.error(message),
      })
    );
  };

  useEffect(() => {
    getListOfAttendees();
    if (location.hash) setFilter(location.hash.substring(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCheckIn = (err: Error | null) => {
    if (err) Alert.error(strings.getString("check_in_failed"));
    else {
      Alert.success(strings.getString("checked_in_successfully"), 5000);
      getListOfAttendees();
    }
  };

  return (
    <>
      {attendees && (
        <Table
          columns={columns}
          data={attendees}
          handleClick={(id) =>
            checkInAttendee(id.toString(), (err) => onCheckIn(err))
          }
          buttonCheck="isAttended"
          defaultFilter={filter}
        />
      )}
    </>
  );
};

export default AttendeeManagement;
