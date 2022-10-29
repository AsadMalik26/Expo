import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
// import TheModal from "./TheModal";
import { Picker } from "@react-native-picker/picker";
import useToast from "./useToast";

const data = [];
export default function MRM() {
  let optionText = "Choose an option";
  const [list, setList] = useState([]);
  const [name, setName] = useState(optionText);
  const [qty, setQty] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("re-render occured");
    console.log("Item name: ", name);
    console.log("Item Qty: ", qty);
  }, []);
  const addItem = (id, name, qty = 1) => {
    if (qty <= 0) qty = 1;
    // console.log("Adding: ", id, name, qty);
    setList([
      ...list,
      {
        id: id,
        name: name,
        qty: qty,
      },
    ]);
    setQty(0);
    setName(optionText);
    toast("Item Added");
  };
  const handleDelete = (index) => {
    // console.log("Deleting the id: ", index);
    let refinedList = [...list];
    // console.log("Before REfinded: ", refinedList);
    refinedList.splice(index, 1);
    // console.log("After REfinded: ", refinedList);
    setList([...refinedList]);
    toast("item deleted");
  };
  return (
    <View style={styles.body}>
      <View
        info="card"
        style={{ width: "90%", height: "85%", backgroundColor: "#e3d5ca" }}
      >
        <View info="Header" style={styles.header}>
          <View>
            <Text>Complaint abc-123</Text>
            <Text>Customer Test User</Text>
          </View>
          <View style={styles.city}>
            <Text>City: Faislabad</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.add}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text>Add more</Text>
        </TouchableOpacity>
        {/* list */}
        <View info="list">
          <FlatList
            data={list}
            renderItem={({ item, index }) => (
              <View key={index} style={{ flexDirection: "row" }}>
                {console.log(item?.id, item?.name, item?.qty)}
                <Text style={[styles.values, { flex: 0.7 }]}>{item.name}</Text>
                <Text style={[styles.values, { flex: 0.2 }]}>{item.qty}</Text>
                <TouchableOpacity
                  style={styles.dell}
                  onPress={() => handleDelete(index)}
                >
                  <Text>Dell</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            toast("Model Closed");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            {/* <View style={styles.centeredView}> */}
            <View style={styles.modalView}>
              <View style={styles.modelSelection}>
                <Picker
                  selectedValue={name}
                  style={[styles.values, { flex: 0.7 }]}
                  onValueChange={(itemValue, itemIndex) => {
                    setName(itemValue);
                  }}
                  prompt="Option"
                >
                  <Picker.Item
                    label={optionText}
                    value={optionText}
                    enabled={false}
                  />
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                  <Picker.Item label="C++" value="C++" />
                  <Picker.Item label="HTML" value="HTML" />
                  <Picker.Item label="CSS" value="CSS" />
                </Picker>
                <TextInput
                  style={[styles.values, { flex: 0.2 }]}
                  placeholder={"0"}
                  value={qty}
                  onChangeText={(text) => {
                    // console.log(text);
                    setQty((prev) => {
                      return text * 1;
                    });
                  }}
                />
              </View>
              <View style={styles.buttons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    if (optionText != name) {
                      let id = list.length;
                      // console.log("Adding");
                      // toast("Adding item");
                      addItem(id, name, qty);
                      setModalVisible(!modalVisible);
                    } else {
                      console.log("not Adding due to ", optionText);
                      toast("Please Select item");
                    }
                    // } else {
                    // console.log("Not Adding");
                    // }
                  }}
                >
                  <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* </View> */}
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#faedcd",
  },
  header: {
    backgroundColor: "#90e0ef",
    width: "80%",
    height: 100,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
  },
  city: {
    backgroundColor: "#e5989b",
    height: 50,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  add: {
    height: 33,
    marginVertical: 10,
    alignItems: "center",
    textAlignVertical: "center",
    backgroundColor: "lightblue",
  },
  values: {
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 4,
  },
  dell: {
    flex: 0.2,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // width: "70%",
    // borderWidth: 1,
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 35,
    width: "80%",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modelSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
    width: "100%",
  },
  buttons: {
    flexDirection: "row",
    // justifyContent: "",
    alignItems: "center",
    paddingTop: 30,

    width: "100%",
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    paddingVertical: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
