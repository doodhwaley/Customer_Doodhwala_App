import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 7,
    padding: 10,
    backgroundColor: "white",
    // android shadow
    elevation: 5,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    paddingRight: 10,
  },
  imageContainer: {
    width: "50%",
    borderRadius: 7,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "lightgray",
    height: 200,
    height: 200,
  },
  productInfoContainer: {
    width: "50%",
    height: 200,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 15,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    justifyContent: "center",
    backgroundColor: "#E5EADA",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#64A939",
  },
  ratingCount: {
    fontSize: 14,
    color: "gray",
    fontWeight: "400",
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000",
    marginTop: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 7,
  },
  buyOnceButton: {
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderColor: "#6B6B6B",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    width: "40%",
  },
  buyOnceButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B6B6B",
  },
  subscriptionButton: {
    backgroundColor: "#E95F6C",
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    width: "59%",
  },
  subscriptionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default styles;
