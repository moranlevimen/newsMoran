
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";



export default class App extends Component {

  state = {
    news: [],
    newsFeed: []
  };
  componentWillMount() {
    const axios = require('axios');
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => {
        console.log("respose:" + response);
        const news = [];
        for (let i = 0; i < 10; i++) {
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
              this.setState({ newsFeed });



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

  renderNews() {
    return this.state.newsFeed.map((data) => {
      return (
        <View><Text>{this.data}</Text></View>
      )
    })
  }
  render() {
    return (
      // <View style={styles.container}>
      // <Image resizeMode = 'cover' style={styles.imageProp}
      // source={require('./src/images/news_image.png')}/>
      //   </View>
      <Container>
        <Header />
        <Content padder>
          <Card>
            <CardItem header button onPress={() => alert("news")}>
              <Text>{this.state.newsFeed.length > 0 ?  this.renderNews() : <Text>' error loading the data'</Text>}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  }
});
