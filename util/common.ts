import moment from "moment";

export const changeTimeFormat = (date: any) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

export const changeTime = async (data: any) => {
  return data.map((e: any) => {
    e.dataValues.createdAt = changeTimeFormat(e.dataValues.createdAt);
    e.dataValues.updatedAt = changeTimeFormat(e.dataValues.updatedAt);
  });
};
