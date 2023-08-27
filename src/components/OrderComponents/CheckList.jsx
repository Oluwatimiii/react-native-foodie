import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { myTheme } from "../../utils/Theme";

const Checklist = ({ initialItems, displaySelected }) => {
  const [items, setItems] = useState(initialItems);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleSelection = async (itemId) => {
    const updatedItems = items.map((item) => ({
      ...item,
      checked: item.id === itemId,
    }));
    await displaySelected(itemId);
    setItems(updatedItems);
    setSelectedItemId(itemId);
  };

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleSelection(item.id)}
          style={[
            styles.item,
            { backgroundColor: item.checked ? myTheme.primary : "white" },
          ]}
        >
          <Text
            style={[
              styles.itemText,
              { color: item.checked ? "white" : "black" },
            ]}
          >
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingHorizontal: 2,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 2,
  },
  itemText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default Checklist;
