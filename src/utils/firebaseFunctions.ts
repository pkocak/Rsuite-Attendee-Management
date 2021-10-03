import firebase from "firebase";
import { AttendeeObject } from "../types/object";

export const getAttendees = () => {
  return firebase.database().ref("Attendees").once("value");
};

export function checkInAttendee(
  attendeeId: string,
  onSuccess: (err: Error | null) => void
) {
  firebase
    .database()
    .ref("Attendees/")
    .once("value", (res) => {
      let attendeesList: any = res.val();
      let foundObject = Object.keys(attendeesList).find((id: string) => {
        return Object.values(attendeesList[id]).some((value) => {
          return value === attendeeId;
        });
      });
      if (foundObject) {
        firebase
          .database()
          .ref("Attendees/")
          .child(foundObject)
          .once("value", (res) => {
            const attendeeData: AttendeeObject = res.val();
            res.ref.update({ ...attendeeData, isAttended: true }, (err) =>
              onSuccess(err)
            );
          });
      }
    });
}

export function registerNewAttendee(
  newAttendee: AttendeeObject,
  onSuccess: (err: Error | null, fullName: string) => void
) {
  firebase
    .database()
    .ref("Attendees")
    .once("value", (res) => {
      newAttendee.id = generateRandomID();
      res.ref.push(newAttendee, (err) => onSuccess(err, newAttendee.fullName));
    });
}

export function generateRandomID(length = 8): string {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
