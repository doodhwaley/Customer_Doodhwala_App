import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  profileCard: {
    width: "97%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 10,
    elevation: 5,
    borderRadius: 10,
  },
  profileCardHeader: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 20,
  },
  profileCardHeaderImage: {
    width: 75,
    height: 70,
    marginTop: -15,
  },
  profileCardHeaderText: {
    flex: 1,
    marginLeft: 0,
  },
  profileCardHeaderTextName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileCardHeaderTextEmail: {
    fontSize: 16,
  },
  profileCardHeaderEdit: {
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "#4488FF",
    borderRadius: 100,
    opacity: 0.8,
    marginTop: -5,
    marginRight: -5,
  },
  profileCardHeaderEditText: {
    color: "#4488FF",
    fontWeight: "bold",
  },
  profileCardHeaderAddressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
  },
  profileCardHeaderAddressText: {
    flex: 1,
  },
  profileCardHeaderAddressTextTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileCardHeaderAddressTextAddress: {
    fontSize: 14,
    marginTop: 7,
  },
  profileCardHeaderAddress: {
    flex: 1,
    alignItems: "flex-end",
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  linkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    flex: 1,
    marginLeft: 10,
  },
  alertsText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#999999",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
});
