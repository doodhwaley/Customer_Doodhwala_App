import { StyleSheet, Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  select: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  selectText: {
    fontSize: 16,
  },
  placeholder: {
    color: "#999",
  },
  arrow: {
    position: "absolute",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dropdown: {
    width: "100%",
    maxHeight: SCREEN_HEIGHT * 0.4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  selectedItem: {
    backgroundColor: "#f0f0f0",
  },
  itemText: {
    fontSize: 16,
    color: "#000",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  list: {
    backgroundColor: "#fff",
  },
});

export default styles;
