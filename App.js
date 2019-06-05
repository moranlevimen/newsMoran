
import React, { Component } from 'react';
import { StyleSheet, Linking, WebView, Button, View, ScrollView, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { Container, Header, Content, Card, CardItem, Text, Body,ScrollView, Thumbnail } from "native-base";
console.disableYellowBox = true


export default class App extends Component {

  // static navigationOptions = {
  //   header: "your news feed",
  // };




  constructor() {
    super()
    this.state = {
      news: [],
      newsFeed: [],
      loading: true,
      amount: 20,

    }

  }
  componentWillMount() {
    const axios = require('axios');
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => {
        console.log("respose:" + response);
        const news = [];
        for (let i = 0; i < 20; i++) {
          news.push(response.data[i]);
        }

        this.setState({ news });
        console.log("news:" + news);

        for (let i of this.state.news) {
          console.log(i)
          axios.get('https://hacker-news.firebaseio.com/v0/item/' + i + '.json')
            .then(res => {
              const newsFeed = res.data;
              console.log("response:" + res)
              console.log("newsFeed" + newsFeed);
              this.setState({
                loading: false,
                newsFeed: [...this.state.newsFeed, newsFeed]

              });

            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
        }
      })

      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }


  renderFeeds() {
    return (
      <View style={styles.mainContainer}>
        <View   >
          <FlatList
            data={this.state.newsFeed}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    )
  }

  handleClick = (item) => {
    const data = item.url;

    return (
      Linking.openURL(data)
    );
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.handleClick(item)}>
        <View>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      this.state.loading // While fetching data show indicator
        ?
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" />
        </View>
        :
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "gery", flex: 1, paddingRight: 30, paddingLeft: 30 }}>
          {this.state.newsFeed.length > 0 ? this.renderFeeds() : <Text>' we are loading the data'</Text>}
        </View>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  imageProp: {
    width: 200,
    height: 200,

    paddingTop: 20,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
