/**
 * RSUITE ATTENDEE MANAGEMENT PANEL
 *
 * @author Mehmet Polat KOÇAK <mehmetpolatkocak@gmail.com>
 * @format
 * @flow strict-local
 */

import { SVGIcon } from "rsuite/lib/@types/common";
import { IconNames } from "rsuite/lib/Icon";

export type SidebarItem = {
  id: string;
  icon: IconNames | SVGIcon;
  title: string;
  url: string;
};

/** USER **/
export type UserObject = {
  token: string;
  email: string;
  uid: string;
};

/** STATIC **/
export type AttendeeObject = {
  fullName: string;
  email: string;
  hes: string;
  id?: number | string;
  isAttended: boolean;
};

/** OTHERS **/
export type TableColumnObject = {
  id: string;
  header: string;
  value: string;
  align?: "left" | "center" | "right" | "justify" | undefined;
};

export interface PickerObject {
  label: string;
  value: string;
  role: string;
}
