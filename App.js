import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, DrawerLayoutAndroid, Button, TextInput, ScrollView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Entypo, MaterialIcons, Ionicons, Feather, AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainActivity"
          component={ MainActivity }
          options={{
            title: '',
            headerLeft: () => (
              <Text>
                Softtrack Текстовый редактор
              </Text>
            ),
            headerRight: () => (
              <View
                style={styles.mainActivityHeaderRight}
              >
                <Entypo
                  name="folder"
                  size={24}
                  color="black"
                  style={styles.mainActivityHeaderRightItem}
                />
                <FontAwesome5
                  name="pen"
                  size={24}
                  color="black"
                  style={styles.mainActivityHeaderRightItem}
                />
                <Feather
                  name="more-vertical"
                  size={24}
                  color="black"
                  style={styles.mainActivityHeaderRightItem}
                />
              </View>
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer> 
  )
}

export function MainActivity() {
  
  const [mainTextAreaContent, setMainTextAreaContent] = useState('')

  const [lines, setLines] = useState([
    ''
  ])
  
  const asideDrawer = useRef(null)
  
  const [asideDrawerPosition, setAsideDrawerPosition] = useState('left')
  
  const articleDrawer = useRef(null)
  
  const [articleDrawerPosition, setArticleDrawerPosition] = useState('right')

  const cacheDir = FileSystem.cacheDirectory

  const [docsList, setDocsList] = useState([])

  const asideNavigationView = () => (
    <View style={styles.mainActivityContainerAsideNavigationViewContainer}>
      <View style={styles.mainActivityContainerAsideNavigationViewContainerRow}>
        <MaterialIcons name="smartphone" size={24} color="black" />
        <Text>
          Внутренняя память
        </Text>
      </View>
      <View style={styles.mainActivityContainerAsideNavigationViewContainerRow}>
        <AntDesign name="staro" size={24} color="black" />
        <Text>
          Закладки
        </Text>
      </View>
      <View style={styles.mainActivityContainerAsideNavigationViewContainerRow}>
        <MaterialCommunityIcons name="history" size={24} color="black" />
        <Text>
          Недавние файлы
        </Text>
      </View>
      <View style={styles.mainActivityContainerAsideNavigationViewContainerRow}>
        <AntDesign name="clouddownloado" size={24} color="black" />
        <Text>
          Диспетчер памяти
        </Text>
      </View>
      <View style={styles.mainActivityContainerAsideNavigationViewContainerRow}>
        <Entypo name="google-play" size={24} color="black" />
        <Text>
          Убрать рекламу
        </Text>
      </View>
      <View style={styles.mainActivityContainerAsideNavigationViewContainerRow}>
        <Feather name="mail" size={24} color="black" />
        <Text>
          Рекомендовать
        </Text>
      </View>
      <View style={styles.mainActivityContainerAsideNavigationViewContainerRow}>
        <Ionicons name="settings-sharp" size={24} color="black" />
        <Text>
          Настройки
        </Text>
      </View>
      <View style={styles.mainActivityContainerAsideNavigationViewContainerRow}>
        <Feather name="help-circle" size={24} color="black" />
        <Text>
          Справка
        </Text>
      </View>
      <View style={styles.mainActivityContainerAsideNavigationViewContainerRow}>
        <Ionicons name="exit-outline" size={24} color="black" />
        <Text>
          Выход
        </Text>
      </View>
    </View>
  )
  
  const changeArticleDrawerPosition = () => {
    if (articleDrawerPosition === 'left') {
      setArticleDrawerPosition('right')
    } else {
      setArticleDrawerPosition('left')
    }
  }

  const articleNavigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <View>
        {
          docsList.map((doc, docIndex) => {
            return (
              <Text>
                {
                  doc
                }
              </Text>
            )
          })
        }
      </View>
      <Button
        title="Open drawer"
        onPress={() => createFile()}
      />
    </View>
  )

  const _getAllFilesInDirectory = async() => {
    let dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory)
    dir.forEach(async (val) => {
      console.log(`FileSystem.cacheDirectory + val: ${FileSystem.cacheDirectory + val}`)
      // docsList.push(FileSystem.cacheDirectory + val)
      const fileUri = FileSystem.cacheDirectory + val
      const content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
      docsList.push(content)
    })
  }

  const createFile = async () => {
    let fileUri = FileSystem.cacheDirectory + 'expo_text_plain_2.txt'
    console.log(`create fileUri: ${fileUri}`)
    await FileSystem.writeAsStringAsync(fileUri, 'abc', { encoding: FileSystem.EncodingType.UTF8 })
  }

  useEffect(() => {
    console.log(`cacheDir: ${cacheDir}`)
    _getAllFilesInDirectory()
  }, [])

  return (
    <DrawerLayoutAndroid
      ref={asideDrawer}
      drawerWidth={300}
      drawerPosition={asideDrawerPosition}
      renderNavigationView={asideNavigationView}
    >
      <DrawerLayoutAndroid
        ref={articleDrawer}
        drawerWidth={300}
        drawerPosition={articleDrawerPosition}
        renderNavigationView={articleNavigationView}
      >
        <ScrollView
          style={styles.mainActivtyContainer}
        >
          <View
           style={styles.mainActivtyContainerRow}
          >
            <View
              style={styles.mainActivtyContainerRowAside}
            >
              {
                lines.map((line, lineIndex) => {
                  return (
                    <Text
                      key={lineIndex}
                    >
                      {lineIndex + 1}
                    </Text>
                  )
                })
              }
            </View>
            <TextInput
              multiline
              value={mainTextAreaContent}
              onChangeText={(value) => setMainTextAreaContent(value)}
              onContentSizeChange={(e) => {
                const nativeEvent = e.nativeEvent
                const contentSize = nativeEvent.contentSize
                const contentSizeHeight = contentSize.height
                const rawCountLines = contentSizeHeight / 20
                const countLines = Math.ceil(rawCountLines)
                const updatedLines = []
                for (let line = 0 ; line < countLines; line++) {
                  updatedLines.push(line)
                }
                setLines(updatedLines)
              }}
            />
          </View>
        </ScrollView>
      </DrawerLayoutAndroid>
    </DrawerLayoutAndroid>
  )
}

export function MainAsideActivity() {
  return (
    <View>
      <Text>
        MainActivity
      </Text>
    </View>
  )
}

export function ArticleActivity() {
  return (
    <View>
      <Text>
        MainActivity
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainActivityHeaderRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainActivityHeaderRightItem: {
    marginHorizontal: 10
  },
  mainActivtyContainer: {

  },
  mainActivtyContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  mainActivtyContainerRowAside: {
   marginHorizontal: 15 
  },
  mainActivityContainerAsideNavigationViewContainer: {
    padding: 25
  },
  mainActivityContainerAsideNavigationViewContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})