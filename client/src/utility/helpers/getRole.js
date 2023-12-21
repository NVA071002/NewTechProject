export const getRole = (value) => {
  let label;
  switch (value) {
    case 1:
      label = "Sinh viên";
      break;
    case 2:
      label = "Giáo viên";
      break;
    case 3:
      label = "Trưởng bộ môn";
      break;
    case 4:
      label = "Admin";
      break;
    default:
      label = "";
      break;
  }

  return label;
};

export const getColor = (value) => {
  let color;
  switch (value) {
    case 0:
      color = "primary";
      break;
    case 1:
      color = "success";
      break;
    case 2:
      color = "error";
      break;
    case 3:
      color = "secondary";
      break;
    default:
      color = "";
      break;
  }

  return color;
};
