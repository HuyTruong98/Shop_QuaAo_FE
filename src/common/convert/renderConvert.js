import moment from "moment";

export const renderTien = (value) => {
  if (value) {
    return (
      <span>
        {` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + "vnđ"}
      </span>
    );
  }
};

export const renderDate = (value) => {
  if (value) {
    return <>{moment(value).format("DD/MM/YYYY")}</>;
  }
};

export const renderDateTime = (value) => {
  if (value) {
    return <>{moment(value).format("DD/MM/YYYY HH:mm:ss")}</>;
  }
};
export const renderDateTheoHeThong = () => {
  return moment().format("DD/MM/yyyy HH:mm:ss ");
};
