import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import { format, addDays, subDays } from "date-fns";

const { width } = Dimensions.get("window");
const BOX_SIZE = width * 0.15; // Reduced from 0.3 to 0.15 (half size)
const CONTAINER_SIZE = width * 0.95; // Container width (90% of screen)

const DateSlider = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dates, setDates] = useState(generateDates(selectedDate));
  const scrollViewRef = useRef(null);
  const lastScrollX = useRef(0);

  function generateDates(centerDate) {
    const datesArray = [];
    for (let i = -2; i <= 2; i++) {
      datesArray.push(addDays(centerDate, i));
    }
    return datesArray;
  }

  const handleDateChange = (direction) => {
    const newDate =
      direction === "next"
        ? addDays(selectedDate, 1)
        : subDays(selectedDate, 1);
    setSelectedDate(newDate);
    setDates(generateDates(newDate));
    scrollToCenter();
  };

  const scrollToCenter = () => {
    scrollViewRef.current?.scrollTo({
      x: BOX_SIZE * 2,
      animated: true,
    });
  };

  const handleScroll = (event) => {
    const currentScrollX = event.nativeEvent.contentOffset.x;
    const direction = currentScrollX > lastScrollX.current ? "next" : "prev";
    const diff = Math.abs(currentScrollX - lastScrollX.current);

    if (diff >= BOX_SIZE * 0.5) {
      const newDate =
        direction === "next"
          ? addDays(selectedDate, 1)
          : subDays(selectedDate, 1);
      setSelectedDate(newDate);
      setDates(generateDates(newDate));
      scrollToCenter();
    }
    lastScrollX.current = currentScrollX;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.arrow}
        onPress={() => handleDateChange("prev")}
      >
        <Text style={styles.arrowText}>←</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={BOX_SIZE}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={4}
      >
        {dates.map((date, index) => (
          <View
            key={index}
            style={[
              styles.dateBox,
              date.toDateString() === selectedDate.toDateString() &&
                styles.selectedDate,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                date.toDateString() === selectedDate.toDateString() &&
                  styles.selectedText,
              ]}
            >
              {format(date, "EEE")}
            </Text>
            <Text
              style={[
                styles.dateText,
                date.toDateString() === selectedDate.toDateString() &&
                  styles.selectedText,
              ]}
            >
              {format(date, "d")}
            </Text>
            <Text
              style={[
                styles.monthText,
                date.toDateString() === selectedDate.toDateString() &&
                  styles.selectedText,
              ]}
            >
              {format(date, "MMM")}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.arrow}
        onPress={() => handleDateChange("next")}
      >
        <Text style={styles.arrowText}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_SIZE,
    height: BOX_SIZE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    alignSelf: "center",
    overflow: "hidden",
  },
  scrollContent: {
    height: BOX_SIZE,
    alignItems: "center",
    flexGrow: 0,
  },
  dateBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 2,
    borderRadius: 8,
  },
  selectedDate: {
    backgroundColor: "#007AFF",
  },
  dayText: {
    fontSize: 12, // Reduced from 14
    color: "#666",
  },
  dateText: {
    fontSize: 18, // Reduced from 24
    fontWeight: "bold",
    color: "#333",
    marginVertical: 2, // Reduced from 4
  },
  monthText: {
    fontSize: 12, // Reduced from 14
    color: "#666",
  },
  arrow: {
    width: 30, // Reduced from 40
    height: 30, // Reduced from 40
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    fontSize: 20, // Reduced from 24
    color: "#007AFF",
  },
  selectedText: {
    color: "white", // Make text white when date is selected
  },
});

export default DateSlider;
