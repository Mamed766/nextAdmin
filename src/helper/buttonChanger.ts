const getTypeBgColor = (type: string) => {
  switch (type) {
    case "Medium":
      return "bg-[#d97706]";
    case "High":
      return "bg-[#3C3FDE]";
    case "Low":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export default getTypeBgColor;
