import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
  },
  slide: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: screenWidth,
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default styles;
