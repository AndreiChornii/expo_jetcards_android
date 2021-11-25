<script src="http://localhost:8097"></script>



import React from "react";
import { useCallback, useRef, useState, useEffect } from "react";
import { Linking, Alert, Button, Image, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
// import Auth from '../JetCards/src/components/Auth';

// const TextInANest = () => {
const titleText = "JET CARDS Service - Sign in";

export default () => {
  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      login: '',
      password: ''
    }
  });

  const onPress = data => {
    console.log(data);
  };

  const onSubmit = data => {
    console.log('SIGN IN');
    console.log(data);
    const { login, password } = data;

    const getMoviesFromApi = () => {
      return fetch(`https://www.jetcs.co/api/GetAPIKey/${login}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: password
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json.APIKey)
          alert('Logged in successfull');
          return json.APIKey;
        })
        .catch((error) => {
          console.error(error);
          alert('Wrong login/password');
        });
    };

    getMoviesFromApi();

    // <View>
    //   <Auth
    //     login="LLLL"
    //     password="PPP"
    //   />
    // </View>

  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  if ((typeof errors.login !== 'undefined') && (typeof errors.password !== 'undefined')) {
    console.log('login & password');
  } else if (typeof errors.login !== 'undefined') {
    console.log('login');
    Alert.alert(
      "Error",
      "Please, enter login",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  } else if (typeof errors.password !== 'undefined') {
    console.log('password');
    Alert.alert(
      "Error",
      "Please, enter password",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }
  // console.log('errors', errors);


  return (
    <View style={styles.container}>
      <View style={styles.middle}>
        <View style={styles.header}>
          <Text style={styles.titleText}>
            {titleText}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.contentelement}>
            <Image
              style={styles.image}

              source={require("./img/smile.png")}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                  placeholder="Login"
                />
              )}
              name="login"
              rules={{ required: true }}
            />
          </View>
          <View style={styles.contentelement}>
            <Image
              style={styles.image}
              source={require("./img/lock.png")}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  placeholder="Password"
                  value={value}
                  secureTextEntry={true}
                />
              )}
              name="password"
              rules={{ required: true }}
            />
          </View>
          <View style={styles.contentelement}>
            <Button
              title="SIGN IN"
              color="lightgrey"
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>{"Forgot your Login or Password?"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>

      </View>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  middle: {
    flex: 0.5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    alignItems: "center",

  },
  header: {
    flex: 0.25,
    backgroundColor: "#de2768",
    borderRadius: 5,
    position: "relative",
    width: "75%",
    justifyContent: 'center',
    marginTop: -40
  },
  content: {
    flex: 0.75,
    // backgroundColor: "green",
    justifyContent: "space-around",
    width: "90%"
    // alignItems: "center"
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff"
  },
  contentelement: {
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10
  },
  input: {
    height: 35,
    width: 60,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    padding: 10,
    flex: 0.75,
  },
  image: {
    resizeMode: "cover",
    height: 25,
    width: 25,
    marginRight: 25,
    // borderWidth: 1,
    // borderColor: 'brown',
    alignSelf: "center"
  },
  appButtonContainer: {
    // elevation: 8,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    // paddingVertical: 10,
    // paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 12,
    color: "#de2768",
    // fontWeight: "bold",
    alignSelf: "center",
    // textTransform: "uppercase"
  }
});