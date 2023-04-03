const roles = {
  ALL: "ALL",
  ADMIN: "CHEF",
  DEVELOPER: "DEVELOPER",
};

const isAll = () => {
  return true;
};
const isADMIN = (user) => {
  return user?.role === roles.ADMIN;
};
const isDEVELOPER = (user) => {
  return user?.role === roles.SUPERADMIN;
};
export { roles, isAll, isADMIN, isDEVELOPER };
