import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, DrawerLayoutAndroid, Button, TextInput, ScrollView, TouchableOpacity, BackHandler, Share, ToastAndroid, Switch, Clipboard, useWindowDimensions } from 'react-native'
import CheckBox from 'react-native-check-box'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Entypo, MaterialIcons, Ionicons, Feather, AntDesign, MaterialCommunityIcons, FontAwesome5, Foundation } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import {
  Paragraph,
  Dialog,
  Portal,
  Provider,
  RadioButton,
  FAB 
} from 'react-native-paper'
import * as MaterialMenu from 'react-native-material-menu'
import { setStatusBarBackgroundColor } from 'expo-status-bar'
import { ColorPicker } from 'react-native-color-picker'
import { TabView, SceneMap } from 'react-native-tab-view'
import * as SQLite from 'expo-sqlite'
import * as IntentLauncher from 'expo-intent-launcher'
// import { startActivityAsync, ActivityAction } from 'expo-intent-launcher'
import * as WebBrowser from 'expo-web-browser'
import * as DocumentPicker from 'expo-document-picker'

const Stack = createNativeStackNavigator()

var db = null

export default function App() {

  const [isMainActivityFolderContextMenuVisible, setIsMainActivityFolderContextMenuVisible] = useState(false)
  
  const [isMainActivityPenContextMenuVisible, setIsMainActivityPenContextMenuVisible] = useState(false)

  const [isMainActivityMoreContextMenuVisible, setIsMainActivityMoreContextMenuVisible] = useState(false)

  const [isFindDialogVisible, setIsFindDialogVisible] = useState(false)

  const testActivity = 'MainActivity'

  db = SQLite.openDatabase('texteditordatabase.db')

  db.transaction(transaction => {
    let sqlStatement = 'CREATE TABLE IF NOT EXISTS bookmarks (_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, path TEXT);'
    transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
    })
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={testActivity}>
        <Stack.Screen
          name="RecentFilesActivity"
          component={RecentFilesActivity}
          options={{
            title: 'Недавние файлы'
          }}
        />
        <Stack.Screen
          name="MemoryManagerActivity"
          component={MemoryManagerActivity}
          options={{
            title: 'Диспетчер памяти'
          }}
        />
        <Stack.Screen
          name="SettingsActivity"
          component={SettingsActivity}
          options={{
            title: 'Настройки'
          }}
        />
        <Stack.Screen
          name="BookmarksActivity"
          component={BookmarksActivity}
          options={{
            title: 'Закладки'
          }}
        />
        <Stack.Screen
          name="FilesActionActivity"
          component={FilesActionActivity}
          options={{
            title: '',
            headerRight: () => (
              <View>
              </View>
            )
          }}
        />
        <Stack.Screen
          name="HelpActivity"
          component={HelpActivity}
          options={{
            title: 'Softtrack Текстовый редактор',
            headerRight: () => (
              <Entypo name="home" size={24} color="black" />
            )
          }}
        />
        <Stack.Screen
          name="MainActivity"
          // initialParams={{
          //   fileUri: ''
          // }}
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
                <MaterialMenu.Menu
                  onRequestClose={() => setIsMainActivityFolderContextMenuVisible(false)}
                  visible={isMainActivityFolderContextMenuVisible}
                  style={styles.mainActivityHeaderRightItemMenu}
                >
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityFolderContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <Ionicons name="add-outline" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Создать
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityFolderContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <Feather name="folder" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Открыть
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityFolderContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <Feather name="folder" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Открыть (SAF)
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityFolderContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <Ionicons name="ios-save" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Сохранить
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityFolderContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <Ionicons name="ios-save" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Сохранить как
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityFolderContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <Ionicons name="refresh-outline" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Перезагрузить
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityFolderContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <Entypo name="cross" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Закрыть
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                </MaterialMenu.Menu>
                <Entypo
                  name="folder"
                  size={24}
                  color="black"
                  style={styles.mainActivityHeaderRightItem}
                  onPress={() => setIsMainActivityFolderContextMenuVisible(true)}
                />
                <MaterialMenu.Menu
                  onRequestClose={() => setIsMainActivityPenContextMenuVisible(false)}
                  visible={isMainActivityPenContextMenuVisible}
                  style={styles.mainActivityHeaderRightItemMenu}
                >
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityPenContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <MaterialIcons name="undo" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Отменить
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityPenContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <MaterialIcons name="redo" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Повторить
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityPenContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <MaterialIcons name="select-all" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Выделить всё
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityPenContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <MaterialIcons name="content-paste" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Вставить
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityPenContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <FontAwesome5 name="palette" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Вставить цвет
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityPenContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <MaterialIcons name="access-time" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Вставить времен. метку
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityPenContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <AntDesign name="arrowright" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Увеличить отступ
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityPenContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <AntDesign name="arrowleft" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Уменьшить отступ
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                </MaterialMenu.Menu>
                <FontAwesome5
                  name="pen"
                  size={24}
                  color="black"
                  style={styles.mainActivityHeaderRightItem}
                  onPress={() => setIsMainActivityPenContextMenuVisible(true)}
                />
                <MaterialMenu.Menu
                  onRequestClose={() => setIsMainActivityMoreContextMenuVisible(false)}
                  visible={isMainActivityMoreContextMenuVisible}
                  style={styles.mainActivityHeaderRightItemMenu}
                >
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityMoreContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <TouchableOpacity
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                      onPress={() => setIsFindDialogVisible(true)}
                    >
                      <Ionicons name="search-outline" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Найти
                      </Text>
                    </TouchableOpacity>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityMoreContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <FontAwesome5 name="share-alt" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Отправить
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityMoreContextMenuVisible(false)
                      setIsFindeDialogVisible(true)
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <MaterialCommunityIcons name="chevron-double-right" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Перейти к строке
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityMoreContextMenuVisible(false)
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <TouchableOpacity
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                      onPress={() => setIsEncodingDialogVisible(true)}
                    >
                      <Feather name="hash" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Кодировка
                      </Text>
                    </TouchableOpacity>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityMoreContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <TouchableOpacity
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                      onPress={() => setIsStyleDialogVisible(true)}
                    >
                      <AntDesign name="picture" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Стиль оформления
                      </Text>
                    </TouchableOpacity>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityMoreContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <TouchableOpacity
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                      onPress={() => setIsStatisticsDialogVisible(true)}
                    >
                      <Ionicons name="ios-stats-chart-sharp" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Статистика
                      </Text>
                    </TouchableOpacity>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityMoreContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <MaterialCommunityIcons name="printer" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Печать
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityMoreContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <MaterialIcons name="touch-app" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Панель инстр...
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityMoreContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <MaterialCommunityIcons name="wrap" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Переносить слова
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                  <MaterialMenu.MenuItem
                    onPress={() => {
                      setIsMainActivityMoreContextMenuVisible(false)
                      
                    }}
                    style={styles.mainActivityHeaderRightItemMenuItem}
                  >
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <MaterialIcons name="lock" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Только чтение
                      </Text>
                    </View>
                  </MaterialMenu.MenuItem>
                </MaterialMenu.Menu>
                <Feather
                  name="more-vertical"
                  size={24}
                  color="black"
                  style={styles.mainActivityHeaderRightItem}
                  onPress={() => setIsMainActivityMoreContextMenuVisible(true)}
                />
              </View>
            )
          }}
        />
      </Stack.Navigator>
    </NavigationContainer> 
  )
}

export function MainActivity({ navigation, route }) {
  
  // const { fileUri } = route.params
  const fileUri = route.params?.fileUri ?? ''

  // useEffect(async () => {
  //   if (fileUri.length) {
  //     const info = await FileSystem.getInfoAsync(fileUri)
  //     const content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
  //     console.log(`передаваемый файл ${content}`)
  //   } else {
  //     console.log(`передаваемый файл не существует`)
  //   }
  // }, [fileUri])

  const getFileContent = async () => {
    if (fileUri.length) {
      const info = await FileSystem.getInfoAsync(fileUri)
      const content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
      console.log(`передаваемый файл ${content}`)
      setMainTextAreaContent(content)
    } else {
      console.log(`передаваемый файл не существует`)
    }
  }

  getFileContent()

  const [isMainActivityFolderContextMenuVisible, setIsMainActivityFolderContextMenuVisible] = useState(false)

  const [isMainActivityPenContextMenuVisible, setIsMainActivityPenContextMenuVisible] = useState(false)

  const [isMainActivityMoreContextMenuVisible, setIsMainActivityMoreContextMenuVisible] = useState(false)

  const [mainTextAreaContent, setMainTextAreaContent] = useState('')

  var mainTextAreaRef = useRef(null)

  const [isMainTextAreaEditable, setIsMainTextAreaEditable] = useState(true)

  const [encodingType, setEncodingType] = useState({
    checked: 'UTF-8'
  })

  const [styleType, setStyleType] = useState({
    checked: 'Стандартная'
  })

  const [lines, setLines] = useState([
    ''
  ])
  
  const asideDrawer = useRef(null)
  
  const [asideDrawerPosition, setAsideDrawerPosition] = useState('left')
  
  const articleDrawer = useRef(null)
  
  const [articleDrawerPosition, setArticleDrawerPosition] = useState('right')

  const [docsList, setDocsList] = useState([])

  const [isFindDialogVisible, setIsFindDialogVisible] = useState(false)

  const [findDialogSearchInput, setFindDialogSearchInput] = useState('')

  const [findDialogReplacementInput, setFindDialogReplacementInput] = useState('')

  const [isFindDialogCaseMatch, setIsFindDialogCaseMatch] = useState(false)

  const [isFindDialogRegex, setIsFindDialogRegex] = useState(false)

  const [isFindDialogCycle, setIsFindDialogCycle] = useState(false)

  const [isGoToStrokeDialogVisible, setIsGoToStrokeDialogVisible] = useState(false)

  const [goToStrokeDialogLineInput, setGoToStrokeDialogLineInput] = useState('')

  const [isEncodingDialogVisible, setIsEncodingDialogVisible] = useState(false)

  const [isStyleDialogVisible, setIsStyleDialogVisible] = useState(false)

  const [isStatisticsDialogVisible, setIsStatisticsDialogVisible] = useState(false)

  const [isInsertColorDialogVisible, setIsInsertColorDialogVisible] = useState(false)

  const [openedDocs, setOpenedDocs] = useState([
    {
      name: 'Безымянный.txt',
      content: ''
    }
  ])

  const [isSaveDialogVisible, setIsSaveDialogVisible] = useState(false)

  const [activeOpenedDocIndex, setActiveOpenedDocIndex] = useState(0)

  const [savedFileName, setSavedFileName] = useState('Безымянный.txt')

  // const [hue, setHue] = useState(null)

  // const [colorVal, setColorVal] = useState(null)
  
  // const [saturation, setSaturation] = useState(null)

  const [color, setColor] = useState('') 

  const [isInsertTimeStampDialogVisible, setIsInsertTimeStampDialogVisible] = useState(false)

  const [timeStamp, setTimeStamp] = useState({
    checked: ''
  })
  
  const [timeStamps, setTimeStamps] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ])

  const monthLabels = {
    '1': 'янв.',
    '2': 'фев.',
    '3': 'мар.',
    '4': 'апр.',
    '5': 'мая',
    '6': 'июн.',
    '7': 'июл.',
    '8': 'авг.',
    '9': 'сен.',
    '10': 'окт.',
    '11': 'ноя.',
    '12': 'дек.'
  }

  const [isToolBarEnabled, setIsToolBarEnabled] = useState(true)

  const _pickDocument = async () => {
    await DocumentPicker.getDocumentAsync({})
  }

  navigation.setOptions({
    headerRight: () => (
      <View
        style={styles.mainActivityHeaderRight}
      >
        <MaterialMenu.Menu
          onRequestClose={() => setIsMainActivityFolderContextMenuVisible(false)}
          visible={isMainActivityFolderContextMenuVisible}
          style={styles.mainActivityHeaderRightItemMenu}
        >
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityFolderContextMenuVisible(false)
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => {
                const updatedDocs = openedDocs
                updatedDocs.push({
                  name: 'Безымянный.txt',
                  content: ''
                })
                setOpenedDocs(updatedDocs)
              }}
            >
              <Ionicons name="add-outline" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Создать
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityFolderContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <View
              style={styles.mainActivityHeaderRightItemMenuItemRow}
            >
              <Feather name="folder" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Открыть
              </Text>
            </View>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityFolderContextMenuVisible(false)
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => {
                // IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                //   flags: 1
                // })
                _pickDocument()
              }}
            >
              <Feather name="folder" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Открыть (SAF)
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityFolderContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <View
              style={styles.mainActivityHeaderRightItemMenuItemRow}
            >
              <Ionicons name="ios-save" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Сохранить
              </Text>
            </View>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityFolderContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => goToActivity(navigation, 'FilesActionActivity', {
                filesAction: 'Сохранить файл как'
              })}
            >
              <Ionicons name="ios-save" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Сохранить как
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityFolderContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <View
              style={styles.mainActivityHeaderRightItemMenuItemRow}
            >
              <Ionicons name="refresh-outline" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Перезагрузить
              </Text>
            </View>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityFolderContextMenuVisible(false)
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => {
                let updatedDocs = openedDocs
                const openedDocsCount = updatedDocs.length
                const isOpenedDocumentsMore = openedDocsCount >= 2
                if (isOpenedDocumentsMore) {
                  updatedDocs = updatedDocs.filter((updatedDoc, updatedDocIndex) => {
                    const isNotActiveDoc = updatedDocIndex !== activeOpenedDocIndex
                    return isNotActiveDoc
                  })
                  setOpenedDocs(updatedDocs)
                  setActiveOpenedDocIndex(0)
                }
              }}
            >
              <Entypo name="cross" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Закрыть
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
        </MaterialMenu.Menu>
        <Entypo
          name="folder"
          size={24}
          color="black"
          style={styles.mainActivityHeaderRightItem}
          onPress={() => setIsMainActivityFolderContextMenuVisible(true)}
        />
        <MaterialMenu.Menu
          onRequestClose={() => setIsMainActivityPenContextMenuVisible(false)}
          visible={isMainActivityPenContextMenuVisible}
          style={styles.mainActivityHeaderRightItemMenu}
        >
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityPenContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <View
              style={styles.mainActivityHeaderRightItemMenuItemRow}
            >
              <MaterialIcons name="undo" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Отменить
              </Text>
            </View>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityPenContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <View
              style={styles.mainActivityHeaderRightItemMenuItemRow}
            >
              <MaterialIcons name="redo" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Повторить
              </Text>
            </View>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityPenContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => {
                setIsMainActivityPenContextMenuVisible(false)
                mainTextAreaRef.focus()
                const mainTextAreaContentLength = mainTextAreaContent.length
                mainTextAreaRef.setNativeProps({
                  selection: {
                    start: 0,
                    end: mainTextAreaContentLength
                  }
                })
              }}
            >
              <MaterialIcons name="select-all" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Выделить всё
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityPenContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => fetchCopiedText()}
            >
              <MaterialIcons name="content-paste" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Вставить
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityPenContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => setIsInsertColorDialogVisible(true)}
            >
              <FontAwesome5 name="palette" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Вставить цвет
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityPenContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => {
                setIsMainActivityPenContextMenuVisible(false)
                setIsInsertTimeStampDialogVisible(true)
                const currentDate = new Date()
                let currentDateDay = currentDate.getDate()
                const currentDateMonthIndex = currentDate.getMonth()
                let currentDateMonth = currentDateMonthIndex + 1
                const currentDateYear = currentDate.getFullYear()
                let currentDateHours = currentDate.getHours()
                let currentDateMinutes = currentDate.getMinutes()
                let currentDateSeconds = currentDate.getSeconds()
                const currentDateAmPm = currentDateHours >= 12 ? 'PM' : 'AM'
                let currentDateTimeZoneOffset = currentDate.getTimezoneOffset()
                currentDateTimeZoneOffset = currentDateTimeZoneOffset / 60
                const currentDateMonthLabel = monthLabels[currentDateMonth]
                let isAddPrefix = currentDateDay <= 9
                if (isAddPrefix) {
                  currentDateDay = `0${currentDateDay}`
                }
                isAddPrefix = currentDateMonth <= 9
                if (isAddPrefix) {
                  currentDateMonth = `0${currentDateMonth}`
                }
                isAddPrefix = currentDateHours <= 9
                if (isAddPrefix) {
                  currentDateHours = `0${currentDateHours}`
                }
                isAddPrefix = currentDateMinutes <= 9
                if (isAddPrefix) {
                  currentDateMinutes = `0${currentDateMinutes}`
                }
                isAddPrefix = currentDateSeconds <= 9
                if (isAddPrefix) {
                  currentDateSeconds = `0${currentDateSeconds}`
                }
                const firstTimeStampFirstFormat = `${currentDateYear}/${currentDateMonth}/${currentDateDay} ${currentDateHours}:${currentDateMinutes}`
                const firstTimeStampSecondFormat = `${currentDateYear}/${currentDateMonth}/${currentDateDay} ${currentDateHours}:${currentDateMinutes} ${currentDateAmPm}`
                const firstTimeStampThirdFormat = `${currentDateYear}/${currentDateMonth}/${currentDateDay} ${currentDateHours}:${currentDateMinutes}:${currentDateSeconds} GMT ${currentDateTimeZoneOffset}`
                const secondTimeStampFirstFormat = `${currentDateMonth}/${currentDateDay}/${currentDateYear} ${currentDateHours}:${currentDateMinutes}`
                const secondTimeStampSecondFormat = `${currentDateMonth}/${currentDateDay}/${currentDateYear} ${currentDateHours}:${currentDateMinutes} ${currentDateAmPm}`
                const secondTimeStampThirdFormat = `${currentDateMonth}/${currentDateDay}/${currentDateYear} ${currentDateHours}:${currentDateMinutes}:${currentDateSeconds} GMT ${currentDateTimeZoneOffset}`
                const thirdTimeStampFirstFormat = `${currentDateMonthLabel}/${currentDateDay}/${currentDateYear} ${currentDateHours}:${currentDateMinutes}`
                const thirdTimeStampSecondFormat = `${currentDateMonthLabel}/${currentDateDay}/${currentDateYear} ${currentDateHours}:${currentDateMinutes} ${currentDateAmPm}`
                const thirdTimeStampThirdFormat = `${currentDateMonthLabel}/${currentDateDay}/${currentDateYear} ${currentDateHours}:${currentDateMinutes}:${currentDateSeconds} GMT ${currentDateTimeZoneOffset}`
                const fourthTimeStampFirstFormat = `${currentDateDay}/${currentDateMonthLabel}/${currentDateYear} ${currentDateHours}:${currentDateMinutes}`
                const fourthTimeStampSecondFormat = `${currentDateDay}/${currentDateMonthLabel}/${currentDateYear} ${currentDateHours}:${currentDateMinutes} ${currentDateAmPm}`
                const fourthTimeStampThirdFormat = `${currentDateDay}/${currentDateMonthLabel}/${currentDateYear} ${currentDateHours}:${currentDateMinutes}:${currentDateSeconds} GMT ${currentDateTimeZoneOffset}`
                const updatedTimeStamps = [
                  firstTimeStampFirstFormat,
                  firstTimeStampSecondFormat,
                  firstTimeStampThirdFormat,
                  secondTimeStampFirstFormat,
                  secondTimeStampSecondFormat,
                  secondTimeStampThirdFormat,
                  thirdTimeStampFirstFormat,
                  thirdTimeStampSecondFormat,
                  thirdTimeStampThirdFormat,
                  fourthTimeStampFirstFormat,
                  fourthTimeStampSecondFormat,
                  fourthTimeStampThirdFormat
                ]
                setTimeStamps(updatedTimeStamps)
              }}
            >
              <MaterialIcons name="access-time" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Вставить времен. метку
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityPenContextMenuVisible(false)
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => {
                setMainTextAreaContent(`\t${mainTextAreaContent}`)
                setIsMainActivityPenContextMenuVisible(false)
              }}
            >
              <AntDesign name="arrowright" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Увеличить отступ
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityPenContextMenuVisible(false)
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => {
                const findIndex = mainTextAreaContent.indexOf('\t')
                const isIndexFound = findIndex !== -1
                if (isIndexFound) {
                  const mainTextAreaContentLength = mainTextAreaContent.length
                  const updatedMainTextAreaContent = mainTextAreaContent.substring(2, mainTextAreaContentLength)
                  setMainTextAreaContent(updatedMainTextAreaContent)
                }
                setIsMainActivityPenContextMenuVisible(false)
              }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Уменьшить отступ
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
        </MaterialMenu.Menu>
        <FontAwesome5
          name="pen"
          size={24}
          color="black"
          style={styles.mainActivityHeaderRightItem}
          onPress={() => setIsMainActivityPenContextMenuVisible(true)}
        />
        <MaterialMenu.Menu
          onRequestClose={() => setIsMainActivityMoreContextMenuVisible(false)}
          visible={isMainActivityMoreContextMenuVisible}
          style={styles.mainActivityHeaderRightItemMenu}
        >
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityMoreContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => {
                setIsFindDialogVisible(true)
                setIsMainActivityMoreContextMenuVisible(false)
              }}
            >
              <Ionicons name="search-outline" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Найти
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityMoreContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => onShare()}
            >
              <FontAwesome5 name="share-alt" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Отправить
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityMoreContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => {
                setIsMainActivityMoreContextMenuVisible(false)
                setIsGoToStrokeDialogVisible(true)
              }}
            >
              <MaterialCommunityIcons name="chevron-double-right" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Перейти к строке
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityMoreContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => setIsEncodingDialogVisible(true)}
            >
              <Feather name="hash" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Кодировка
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityMoreContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => setIsStyleDialogVisible(true)}
            >
              <AntDesign name="picture" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Стиль оформления
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityMoreContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <TouchableOpacity
              style={styles.mainActivityHeaderRightItemMenuItemRow}
              onPress={() => setIsStatisticsDialogVisible(true)}
            >
              <Ionicons name="ios-stats-chart-sharp" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Статистика
              </Text>
            </TouchableOpacity>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityMoreContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <View
              style={styles.mainActivityHeaderRightItemMenuItemRow}
            >
              <MaterialCommunityIcons name="printer" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Печать
              </Text>
            </View>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityMoreContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <View
              style={styles.mainActivityHeaderRightItemMenuItemCheckableRow}
            >
              <View
                style={styles.mainActivityHeaderRightItemMenuItemCheckableRowAside}
              >
                <MaterialIcons name="touch-app" size={24} color="black" />
                <Text
                  style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                >
                  Панель инстр...
                </Text>
              </View>
              <CheckBox
                isChecked={isToolBarEnabled}
                onClick={() => {
                  setIsToolBarEnabled(!isToolBarEnabled)
                }}
              />
            </View>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityMoreContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <View
              style={styles.mainActivityHeaderRightItemMenuItemCheckableRow}
            >
              <View
                style={styles.mainActivityHeaderRightItemMenuItemCheckableRowAside}
              >
                <MaterialCommunityIcons name="wrap" size={24} color="black" />
                <Text
                  style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                >
                  Переносить слова
                </Text>
              </View>
              <CheckBox
                isChecked={isToolBarEnabled}
                onClick={() => {
                  setIsToolBarEnabled(!isToolBarEnabled)
                }}
              />
            </View>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setIsMainActivityMoreContextMenuVisible(false)
              
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <View
              style={styles.mainActivityHeaderRightItemMenuItemCheckableRow}
            >
              <View
                style={styles.mainActivityHeaderRightItemMenuItemCheckableRowAside}
              >
                <MaterialIcons name="lock" size={24} color="black" />
                <Text
                  style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                >
                  Только чтение
                </Text>
              </View>
              <CheckBox
                isChecked={isMainTextAreaEditable}
                onClick={() => {
                  setIsMainTextAreaEditable(!isMainTextAreaEditable)
                }}
              />
            </View>
          </MaterialMenu.MenuItem>
        </MaterialMenu.Menu>
        <Feather
          name="more-vertical"
          size={24}
          color="black"
          style={styles.mainActivityHeaderRightItem}
          onPress={() => setIsMainActivityMoreContextMenuVisible(true)}
        />
      </View>
    )
  })

  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG)
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  const asideNavigationView = () => (
    <View style={styles.mainActivityContainerAsideNavigationViewContainer}>
      <TouchableOpacity
        style={styles.mainActivityContainerAsideNavigationViewContainerRow}
        onPress={() => goToActivity(navigation, 'FilesActionActivity', {
          filesAction: 'Открыть файл'
        })}
      >
        <MaterialIcons name="smartphone" size={24} color="black" />
        <Text>
          Внутренняя память
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainActivityContainerAsideNavigationViewContainerRow}
        onPress={() => goToActivity(navigation, 'BookmarksActivity')}
      >
        <AntDesign name="staro" size={24} color="black" />
        <Text>
          Закладки
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainActivityContainerAsideNavigationViewContainerRow}
        onPress={() => goToActivity(navigation, 'RecentFilesActivity')}
      >
        <MaterialCommunityIcons name="history" size={24} color="black" />
        <Text>
          Недавние файлы
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainActivityContainerAsideNavigationViewContainerRow}
        onPress={() => goToActivity(navigation, 'MemoryManagerActivity')}
      >
        <AntDesign name="clouddownloado" size={24} color="black" />
        <Text>
          Диспетчер памяти
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainActivityContainerAsideNavigationViewContainerRow}
        onPress={async () => {
          await WebBrowser.openBrowserAsync('market://details?id=com.google.android.youtube')
        }}
      >
        <Entypo name="google-play" size={24} color="black" />
        <Text>
          Убрать рекламу
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainActivityContainerAsideNavigationViewContainerRow}
        onPress={() => onShare()}
      >
        <Feather name="mail" size={24} color="black" />
        <Text>
          Рекомендовать
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainActivityContainerAsideNavigationViewContainerRow}
        onPress={() => goToActivity(navigation, 'SettingsActivity')}    
      >
        <Ionicons name="settings-sharp" size={24} color="black" />
        <Text>
          Настройки
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mainActivityContainerAsideNavigationViewContainerRow}
        onPress={() => goToActivity(navigation, 'HelpActivity')}  
      >
        <Feather name="help-circle" size={24} color="black" />
        <Text>
          Справка
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => BackHandler.exitApp()}
        style={styles.mainActivityContainerAsideNavigationViewContainerRow}
      >
        <Ionicons name="exit-outline" size={24} color="black" />
        <Text>
          Выход
        </Text>
      </TouchableOpacity>
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
    <ScrollView
      style={styles.mainActivityContainerArticleNavigationViewContainer}
    >
      {
        docsList.map((doc, docIndex) => {
          return (
            <View
              key={docIndex}
              style={styles.mainActivityContainerArticleNavigationViewContainerRow}
            >
              <View
                style={styles.mainActivityContainerArticleNavigationViewContainerRowAside}
              >
                <Entypo
                  name="folder"
                  size={24}
                  color="black"  
                />
                <View
                  style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfo}
                >
                  <Text
                    style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoName}
                  >
                    {
                      doc.name
                    }
                  </Text>
                  <View
                    style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooter}
                  >
                    <Text
                      style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterSizeLabel}
                    >
                      {
                        `${doc.info.size} байт`
                      }
                    </Text>
                    <Text
                      style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterDateLabel}
                    >
                      {
                        getParsedDate(doc.info.modificationTime)
                      }
                    </Text>
                  </View>
                </View>
              </View>
              <Feather
                name="more-vertical"
                size={24}
                color="black"
                style={styles.mainActivityHeaderRightItem}
              />
            </View>
          )
        })
      }
      <Button
        title="Open drawer"
        onPress={() => createFile()}
      />
    </ScrollView>
  )

  const _getAllFilesInDirectory = async() => {
    let dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory)
    dir.forEach(async (val) => {
      console.log(`FileSystem.cacheDirectory + val: ${FileSystem.cacheDirectory + val}`)
      const fileUri = FileSystem.cacheDirectory + val
      const content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
      const info = await FileSystem.getInfoAsync(fileUri)
      const fileUriParts = fileUri.split('/')
      const fileUriPartsLength = fileUriParts.length
      const lastFileUriPartIndex = fileUriPartsLength - 1
      const fileName = fileUriParts[lastFileUriPartIndex]
      const docInfo = {
        content: content,
        info: info,
        name: fileName
      }
      docsList.push(docInfo)
    })
  }

  const createFile = async () => {
    let fileUri = FileSystem.cacheDirectory + savedFileName
    console.log(`create fileUri: ${fileUri}`)
    await FileSystem.writeAsStringAsync(fileUri, mainTextAreaContent, { encoding: FileSystem.EncodingType.UTF8 })
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString()
    console.log(`text: ${text}`)
    setMainTextAreaContent(`${mainTextAreaContent}${text}`)
  }

  const getParsedDate = (millis) => {
    const date = new Date()
    date.setMilliseconds(millis)
    const parsedDate = date.toLocaleDateString()
    return parsedDate
  }

  const getCustomStyle = () => {
    let backgroundColor = ''
    if (styleType === 'Стандартная') {
      backgroundColor = 'rgb(255, 255, 255)' 
    } else if (styleType === 'GitHub') {
      backgroundColor = 'rgb(250, 250, 250)'
    } else if (styleType === 'GitHubv2') {
      backgroundColor = 'rgb(245, 245, 245)'
    } else if (styleType === 'Tomorrow') {
      backgroundColor = 'rgb(240, 240, 240)'
    } else if (styleType === 'Hemisu') {
      backgroundColor = 'rgb(235, 235, 235)'
    } else if (styleType === 'AtelierCave') {
      backgroundColor = 'rgb(230, 230, 230)'
    } else if (styleType === 'AtelierDune') {
      backgroundColor = 'rgb(225, 225, 225)'
    } else if (styleType === 'AtelierEstuary') {
      backgroundColor = 'rgb(220, 220, 220)'
    } else if (styleType === 'AtelierForest') {
      backgroundColor = 'rgb(215, 215, 215)'
    } else if (styleType === 'AtelierHeath') {
      backgroundColor = 'rgb(210, 210, 210)'
    } else if (styleType === 'AtelierLakeside') {
      backgroundColor = 'rgb(205, 205, 205)'
    } else if (styleType === 'AtelierPlateau') {
      backgroundColor = 'rgb(200, 200, 200)'
    } else if (styleType === 'AtelierSavanna') {
      backgroundColor = 'rgb(195, 195, 195)'
    } else if (styleType === 'AtelierSeaside') {
      backgroundColor = 'rgb(190, 190, 190)'
    } else if (styleType === 'AtelierSulphurpool') {
      backgroundColor = 'rgb(185, 185, 185)'
    }
    return {
      backgroundColor: backgroundColor
    }
  }

  const getActiveOpenedDoc = (openedDocIndex) => {
    if (activeOpenedDocIndex === openedDocIndex) {
      return {
        backgroundColor: 'rgb(235, 235, 235)'
      }
    } else {
      return {
        backgroundColor: 'rgb(200, 200, 200)'
      }
    }
  }

  useEffect(() => _getAllFilesInDirectory(), [])

  return (
    <>
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
          {
            openedDocs.length >= 2 ?
              <ScrollView
                horizontal={true}
                style={styles.mainActivtyTabs}
              >
                {
                  openedDocs.map((openedDoc, openedDocIndex) => {
                    return (
                      <TouchableOpacity
                        key={openedDocIndex}
                        style={
                          [
                            styles.mainActivtyTab,
                            getActiveOpenedDoc(openedDocIndex)
                          ]
                        }
                        onPress={() => {
                          setActiveOpenedDocIndex(openedDocIndex)
                          const activeOpenedDoc = openedDocs[activeOpenedDocIndex]
                          const activeOpenedDocContent = activeOpenedDoc.content
                          setMainTextAreaContent(activeOpenedDocContent)
                        }}
                      >
                        <Text>
                          {
                            openedDoc.name
                          }
                        </Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </ScrollView>
            :
              <View>

              </View>
          }
          <ScrollView
            style={[
              styles.mainActivtyContainer,
              getCustomStyle()
            ]}
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
                editable={isMainTextAreaEditable}
                value={mainTextAreaContent}
                ref={(ref) => mainTextAreaRef = ref}
                onChangeText={async (value) => {
                  await setMainTextAreaContent(value)
                  const updatedOpenedDocs = openedDocs
                  updatedOpenedDocs[activeOpenedDocIndex].content = value
                  setOpenedDocs(updatedOpenedDocs)
                }}
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
          {
            isToolBarEnabled ?
              <View
                style={styles.mainActivtyToolBar}
              >
                <Feather
                  name="folder"
                  size={24}
                  color="black"
                  onPress={() => goToActivity(navigation, 'FilesActionActivity', {
                    filesAction: 'Открыть файл'
                  })}  
                />
                <MaterialIcons name="undo" size={24} color="black" />
                <MaterialIcons name="redo" size={24} color="black" />
                <Ionicons
                  name="search-outline"
                  size={24}
                  color="black"
                  onPress={() => setIsFindDialogVisible(true)}
                />
                <Ionicons
                  name="ios-save"
                  size={24}
                  color="black"
                  onPress={() => setIsSaveDialogVisible(true)}
                />
                <Entypo name="cross" size={24} color="black" />
              </View>
            :
              <View>

              </View>
          }
        </DrawerLayoutAndroid>
        <Dialog
          visible={isInsertColorDialogVisible}
          onDismiss={() => setIsInsertColorDialogVisible(false)}>
          <Dialog.Title>
            Вставить цвет
          </Dialog.Title>
          <Dialog.Content>
            <View
              style={styles.colorPickerWrap}
            >

            </View>
            <ColorPicker
              onColorSelected={color => setColor(color)}
              style={styles.colorpiker}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              title="ОТМЕНА"
              onPress={() => {
                showToast(`ОТМЕНА`)
                setIsInsertColorDialogVisible(false)
              }}
            />
            <Button
              title="ОК"
              onPress={() => {
                showToast(`ОК`)
                setMainTextAreaContent(mainTextAreaContent + color)
                setIsInsertColorDialogVisible(false)
              }}
            />
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={isInsertTimeStampDialogVisible}
          onDismiss={() => setIsInsertTimeStampDialogVisible(false)}>
          <Dialog.Title>
            Вставить временную метку
          </Dialog.Title>
          <Dialog.Content>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[0]}
                label={timeStamps[0]}
                status={timeStamp.checked === timeStamps[0] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[0] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[0]
                }
              </Text>
            </View>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[1]}
                label={timeStamps[1]}
                status={timeStamp.checked === timeStamps[1] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[1] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[1]
                }
              </Text>
            </View>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[2]}
                label={timeStamps[2]}
                status={timeStamp.checked === timeStamps[2] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[2] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[2]
                }
              </Text>
            </View>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[3]}
                label={timeStamps[3]}
                status={timeStamp.checked === timeStamps[3] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[3] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[3]
                }
              </Text>
            </View>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[4]}
                label={timeStamps[4]}
                status={timeStamp.checked === timeStamps[4] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[4] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[4]
                }
              </Text>
            </View>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[5]}
                label={timeStamps[5]}
                status={timeStamp.checked === timeStamps[5] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[5] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[5]
                }
              </Text>
            </View>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[6]}
                label={timeStamps[6]}
                status={timeStamp.checked === timeStamps[6] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[6] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[6]
                }
              </Text>
            </View>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[7]}
                label={timeStamps[7]}
                status={timeStamp.checked === timeStamps[7] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[7] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[7]
                }
              </Text>
            </View>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[8]}
                label={timeStamps[8]}
                status={timeStamp.checked === timeStamps[8] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[8] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[8]
                }
              </Text>
            </View>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[9]}
                label={timeStamps[9]}
                status={timeStamp.checked === timeStamps[9] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[9] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[9]
                }
              </Text>
            </View>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[10]}
                label={timeStamps[10]}
                status={timeStamp.checked === timeStamps[10] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[10] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[10]
                }
              </Text>
            </View>
            <View
              style={styles.dialogContentRow}
            >
              <RadioButton
                value={timeStamps[11]}
                label={timeStamps[11]}
                status={timeStamp.checked === timeStamps[11] ? 'checked' : 'unchecked'}
                onPress={() => { setTimeStamp({ checked: timeStamps[11] }) }}
              />
              <Text
                style={styles.dialogContentRowLabel}
              >
                {
                  timeStamps[11]
                }
              </Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              title="ОТМЕНА"
              onPress={() => {
                setIsInsertTimeStampDialogVisible(false)
              }}
            />
            <Button
              title="ОК"
              onPress={() => {
                setIsInsertTimeStampDialogVisible(false)
                let updatedMainTextAreaContent = mainTextAreaContent
                const checkedTimeStamp = timeStamp.checked
                updatedMainTextAreaContent = `${updatedMainTextAreaContent}${checkedTimeStamp}`
                setMainTextAreaContent(updatedMainTextAreaContent)
              }}
            />
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={isFindDialogVisible}
          onDismiss={() => setIsFindDialogVisible(false)}>
          <Dialog.Title>Найти</Dialog.Title>
          <Dialog.Content>
            <Text>
              Найти:
            </Text>
            <TextInput
              value={findDialogSearchInput}
              onChangeText={(value) => setFindDialogSearchInput(value)}
            />
            <Text>
              Заменить на:
            </Text>
            <TextInput
              value={findDialogReplacementInput}
              onChangeText={(value) => setFindDialogReplacementInput(value)}
            />
            <CheckBox
              isChecked={isFindDialogCaseMatch}
              onClick={() => {
                setIsFindDialogCaseMatch(!isFindDialogCaseMatch)
              }}
              rightText={'Учитывать регистр'}
            />
            <CheckBox
              isChecked={isFindDialogRegex}
              onClick={() => {
                setIsFindDialogRegex(!isFindDialogRegex)
              }}
              rightText={'Регулярное выражение'}
            />
            <CheckBox
              isChecked={isFindDialogCycle}
              onClick={() => {
                setIsFindDialogCycle(!isFindDialogCycle)
              }}
              rightText={'Зациклить поиск'}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              title="Заменить все"
              onPress={() => {
                const updatedMainTextAreaContent = mainTextAreaContent.replace(findDialogSearchInput, findDialogReplacementInput)
                setMainTextAreaContent(updatedMainTextAreaContent)
                setIsFindDialogVisible(false)
              }}
            />
            <Button
              title="Заменить"
              onPress={() => {
                const updatedMainTextAreaContent = mainTextAreaContent.replace(findDialogSearchInput, findDialogReplacementInput)
                setMainTextAreaContent(updatedMainTextAreaContent)
                setIsFindDialogVisible(false)
              }}
            />
            <Button
              title="Найти"
              onPress={() => {
                let textAreaContent = mainTextAreaContent
                let searchInput = findDialogSearchInput
                const isMatchFound = textAreaContent.toLowerCase().includes(searchInput.toLowerCase())
                if (isMatchFound) {
                  const isNotFindDialogCaseMatch = !isFindDialogCaseMatch
                  if (isNotFindDialogCaseMatch) {
                    textAreaContent = textAreaContent.toLowerCase()
                    searchInput = searchInput.toLowerCase()
                  }
                  let findIndex = -1
                  if (isFindDialogCaseMatch) {
                    findIndex = textAreaContent.indexOf(searchInput)
                  } else {
                    findIndex = textAreaContent.search(new RegExp(`${searchInput}`,"g"))
                  }
                  const isIndexExists = findIndex !== -1
                  if (isIndexExists) {
                    const searchMsgLength = findDialogSearchInput.length
                    const lastIndex = findIndex + searchMsgLength
                    mainTextAreaRef.focus()
                    mainTextAreaRef.setNativeProps({
                      selection: {
                        start: findIndex,
                        end: lastIndex
                      }
                    })
                    setIsFindDialogVisible(false)
                  } else {
                    setIsFindDialogVisible(false)
                    showToast(`Для \"${findDialogSearchInput}\" соответствий не найдено`)
                  }
                } else {
                  setIsFindDialogVisible(false)
                  showToast(`Для \"${findDialogSearchInput}\" соответствий не найдено`)
                }
                setIsFindDialogVisible(false)
                setFindDialogSearchInput('')
                setIsMainActivityMoreContextMenuVisible(false)
              }}
            />
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={isGoToStrokeDialogVisible}
          onDismiss={() => setIsGoToStrokeDialogVisible(false)}>
          <Dialog.Title>
            Перейти к строке
          </Dialog.Title>
          <Dialog.Content>
            <Text>
              {
                `Введите номер строки (1 .. ${lines.length}):`
              }
            </Text>
            <TextInput
              value={goToStrokeDialogLineInput}
              onChangeText={(value) => setGoToStrokeDialogLineInput(value)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              title="ОТМЕНА"
              onPress={() => {
                showToast(`ОТМЕНА`)
                setIsGoToStrokeDialogVisible(false)
              }}
            />
            <Button
              title="ОК"
              onPress={() => {
                const findIndex = mainTextAreaContent.indexOf('\n')
                const lineIndex = findIndex + 1
                mainTextAreaRef.focus()
                mainTextAreaRef.setNativeProps({
                  selection: {
                    start: lineIndex,
                    end: lineIndex
                  }
                })
                setIsGoToStrokeDialogVisible(false)
              }}
            />
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={isEncodingDialogVisible}
          onDismiss={() => setIsEncodingDialogVisible(false)}>
          <Dialog.Title>
            Кодировка
          </Dialog.Title>
          <Dialog.Content>
            <ScrollView>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="UTF-8"
                  label="UTF-8"
                  status={encodingType.checked === 'UTF-8' ? 'checked' : 'unchecked'}
                  onPress={() => { setEncodingType({ checked: 'UTF-8' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  UTF-8
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="UTF-16"
                  label="UTF-16"
                  status={encodingType.checked === 'UTF-16' ? 'checked' : 'unchecked'}
                  onPress={() => { setEncodingType({ checked: 'UTF-16' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  UTF-16
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="UTF-16BE"
                  label="UTF-16BE"
                  status={encodingType.checked === 'UTF-16BE' ? 'checked' : 'unchecked'}
                  onPress={() => { setEncodingType({ checked: 'UTF-16BE' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  UTF-16BE
                </Text>
              </View>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              title="ОТМЕНА"
              onPress={() => {
                showToast(`ОТМЕНА`)
                setIsEncodingDialogVisible(false)
              }}
            />
            <Button
              title="ОК"
              onPress={() => {
                showToast(`ОК`)
                setIsEncodingDialogVisible(false)
              }}
            />
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={isStyleDialogVisible}
          onDismiss={() => setIsStyleDialogVisible(false)}>
          <Dialog.Title>
            Стиль оформления
          </Dialog.Title>
          <Dialog.Content>
            <ScrollView>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="Стандартная"
                  label="Стандартная"
                  status={styleType.checked === 'Стандартная' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'Стандартная' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Стандартная
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="GitHub"
                  label="GitHub"
                  status={styleType.checked === 'GitHub' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'GitHub' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  GitHub
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="GitHubv2"
                  label="GitHubv2"
                  status={styleType.checked === 'GitHubv2' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'GitHubv2' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  GitHub v2
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="Tommorow"
                  label="Tommorow"
                  status={styleType.checked === 'Tommorow' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'Tommorow' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Tommorow
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="Hemisu"
                  label="Hemisu"
                  status={styleType.checked === 'Hemisu' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'Hemisu' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Hemisu
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="AtelierCave"
                  label="AtelierCave"
                  status={styleType.checked === 'AtelierCave' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'AtelierCave' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Atelier Cave
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="AtelierDune"
                  label="AtelierDune"
                  status={styleType.checked === 'AtelierDune' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'AtelierDune' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Atelier Dune
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="AtelierEstuary"
                  label="AtelierEstuary"
                  status={styleType.checked === 'AtelierEstuary' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'AtelierEstuary' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Atelier Estuary
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="AtelierForest"
                  label="AtelierForest"
                  status={styleType.checked === 'AtelierForest' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'AtelierForest' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Atelier Forest
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="AtelierHeath"
                  label="AtelierHeath"
                  status={styleType.checked === 'AtelierHeath' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'AtelierHeath' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Atelier Heath
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="AtelierLakeside"
                  label="AtelierLakeside"
                  status={styleType.checked === 'AtelierLakeside' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'AtelierLakeside' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Atelier Lakeside
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="AtelierPlateau"
                  label="AtelierPlateau"
                  status={styleType.checked === 'AtelierPlateau' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'AtelierPlateau' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Atelier Plateau
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="AtelierSavanna"
                  label="AtelierSavanna"
                  status={styleType.checked === 'AtelierSavanna' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'AtelierSavanna' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Atelier Savanna
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="AtelierSeaside"
                  label="AtelierSeaside"
                  status={styleType.checked === 'AtelierSeaside' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'AtelierSeaside' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Atelier Seaside
                </Text>
              </View>
              <View
                style={styles.dialogContentRow}
              >
                <RadioButton
                  value="AtelierSulphurpool"
                  label="AtelierSulphurpool"
                  status={styleType.checked === 'AtelierSulphurpool' ? 'checked' : 'unchecked'}
                  onPress={() => { setStyleType({ checked: 'AtelierSulphurpool' }) }}
                />
                <Text
                  style={styles.dialogContentRowLabel}
                >
                  Atelier Sulphurpool
                </Text>
              </View>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              title="ОТМЕНА"
              onPress={() => {
                showToast(`ОТМЕНА`)
                setIsStyleDialogVisible(false)
              }}
            />
            <Button
              title="ОК"
              onPress={() => {
                showToast(`ОК`)
                setIsStyleDialogVisible(false)
              }}
            />
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={isStatisticsDialogVisible}
          onDismiss={() => setIsStatisticsDialogVisible(false)}>
          <Dialog.Title>
            Статистика
          </Dialog.Title>
          <Dialog.Content>
            <Text>
              Количество символов
            </Text>
            <Text>
              {
                mainTextAreaContent.length
              }
            </Text>
            <Text>
              Количество слов
            </Text>
            <Text>
              {
                (mainTextAreaContent.split(' ').length && mainTextAreaContent.length) ?
                  mainTextAreaContent.split(' ').length
                :
                  '0'
              }
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              title="ОТМЕНА"
              onPress={() => {
                showToast(`ОТМЕНА`)
                setIsStatisticsDialogVisible(false)
              }}
            />
            <Button
              title="ОК"
              onPress={() => {
                showToast(`ОК`)
                setIsStatisticsDialogVisible(false)
              }}
            />
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={isSaveDialogVisible}
          onDismiss={() => setIsSaveDialogVisible(false)}>
          <Dialog.Content>
            <View
              style={styles.dialogRowBetween}
            >
              <Text>
                /storage/emulated/0
              </Text>
              <Entypo name="home" size={24} color="black" />
            </View>
            <ScrollView
              style={styles.saveDialogScrollBody}
            >
              {
                docsList.map((doc, docIndex) => {
                  return (
                    <TouchableOpacity
                      key={docIndex}
                      style={styles.mainActivityContainerArticleNavigationViewContainerRow}
                      onPress={() => setSavedFileName(doc.name)}
                    >
                      <View
                        style={styles.mainActivityContainerArticleNavigationViewContainerRowAside}
                      >
                        <Entypo
                          name="folder"
                          size={24}
                          color="black"  
                        />
                        <View
                          style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfo}
                        >
                          <Text
                            style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoName}
                          >
                            {
                              doc.name
                            }
                          </Text>
                          <View
                            style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooter}
                          >
                            <Text
                              style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterSizeLabel}
                            >
                              {
                                `${doc.info.size} байт`
                              }
                            </Text>
                            <Text
                              style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterDateLabel}
                            >
                              {
                                getParsedDate(doc.info.modificationTime)
                              }
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Feather
                        name="more-vertical"
                        size={24}
                        color="black"
                        style={styles.mainActivityHeaderRightItem}
                      />
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
            <View
              style={styles.dialogRowBetween}
            >
              <Text>
                Имя файла:
              </Text>
              <TextInput
                width={125}
                value={savedFileName}
                onChangeText={(value) => setSavedFileName(value)}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              title="ОТМЕНА"
              onPress={() => {
                setIsSaveDialogVisible(false)
              }}
            />
            <Button
              title="ОК"
              onPress={() => {
                createFile()
                setIsSaveDialogVisible(false)
              }}
            />
          </Dialog.Actions>
        </Dialog>
      </DrawerLayoutAndroid>
    </>
  )
}

export function SettingsActivity() {
  
  
  
  return (
    <ScrollView
      style={styles.settingsActivityContainer}
    >
      <Text
        style={styles.settingsActivityContainerHeader}
      >
        Общие настройки
      </Text>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Язык
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Авто (По умолчанию).'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Кодировка по умолчанию
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Кодировка по умолчанию при открытии и\nсоздании файлов.'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Сопоставление файлов
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Укажите расширения файлов для сопоставления с\nдоступными редакторами'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Разрыв строки
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Символ разрыва строки при сохранении файлов.'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Символ абзаца
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Символ строки, используемый при отступе.'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemRow}
      >
        <View
          style={styles.settingsActivityContainerItemColumn}
        >
          <Text
            style={styles.settingsActivityContainerItemHeader}
          >
            Перенос по словам
          </Text>
          <Text
            style={styles.settingsActivityContainerItemLabel}
          >
            {
              'Включить перенос слов по ширине\nэкрана.'
            }
          </Text>
        </View>
        <Switch
        
        />
      </View>
      <View
        style={styles.settingsActivityContainerItemRow}
      >
        <View
          style={styles.settingsActivityContainerItemColumn}
        >
          <Text
            style={styles.settingsActivityContainerItemHeader}
          >
            Панель папок
          </Text>
          <Text
            style={styles.settingsActivityContainerItemLabel}
          >
            {
              'Включить панель навигации по папкам на\nглавном экране.'
            }
          </Text>
        </View>
        <Switch
        
        />
      </View>
      <View
        style={styles.settingsActivityContainerItemRow}
      >
        <View
          style={styles.settingsActivityContainerItemColumn}
        >
          <Text
            style={styles.settingsActivityContainerItemHeader}
          >
            Автоотступ
          </Text>
          <Text
            style={styles.settingsActivityContainerItemLabel}
          >
            {
              'Включить автоматический отступ для\nновых строк.'
            }
          </Text>
        </View>
        <Switch
        
        />
      </View>
      <View
        style={styles.settingsActivityContainerItemRow}
      >
        <View
          style={styles.settingsActivityContainerItemColumn}
        >
          <Text
            style={styles.settingsActivityContainerItemHeader}
          >
            {
              'Отмена кнопкой \"Назад\"'
            }
          </Text>
          <Text
            style={styles.settingsActivityContainerItemLabel}
          >
            {
              'Отменять посленднее изменение с\nпомощью кнопки \"Назад\".'
            }
          </Text>
        </View>
        <Switch
        
        />
      </View>
      <View
        style={styles.settingsActivityContainerItemRow}
      >
        <View
          style={styles.settingsActivityContainerItemColumn}
        >
          <Text
            style={styles.settingsActivityContainerItemHeader}
          >
            Фильтр файлов
          </Text>
          <Text
            style={styles.settingsActivityContainerItemLabel}
          >
            {
              'Скрывать нетекстовые файлы при\nоткрытии файлов.'
            }
          </Text>
        </View>
        <Switch
        
        />
      </View>
      <View
        style={styles.settingsActivityContainerItemRow}
      >
        <View
          style={styles.settingsActivityContainerItemColumn}
        >
          <Text
            style={styles.settingsActivityContainerItemHeader}
          >
            Возобновление сеанса
          </Text>
          <Text
            style={styles.settingsActivityContainerItemLabel}
          >
            {
              'Восстанавливать открытые файлы при\nследующем запуске приложения.'
            }
          </Text>
        </View>
        <Switch
        
        />
      </View>
      <Text
        style={styles.settingsActivityContainerHeader}
      >
        Способ ввода
      </Text>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Показывать подсказки
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Предлагать варианты слов во время ввода: ОТКЛ.\n(По умолчанию).'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemRow}
      >
        <View
          style={styles.settingsActivityContainerItemColumn}
        >
          <Text
            style={styles.settingsActivityContainerItemHeader}
          >
            Заглавные автоматически
          </Text>
          <Text
            style={styles.settingsActivityContainerItemLabel}
          >
            {
              'Писать первое слово предложения с\nпрописной буквы.'
            }
          </Text>
        </View>
        <Switch
        
        />
      </View>
      <View
        style={styles.settingsActivityContainerItemRow}
      >
        <View
          style={styles.settingsActivityContainerItemColumn}
        >
          <Text
            style={styles.settingsActivityContainerItemHeader}
          >
            Дополнительная клавиатура
          </Text>
          <Text
            style={styles.settingsActivityContainerItemLabel}
          >
            {
              'Показывать дополнительную клавиатуру\nпод редактором'
            }
          </Text>
        </View>
        <Switch
        
        />
      </View>
      <Text
        style={styles.settingsActivityContainerHeader}
      >
        Параметры просмотра
      </Text>
      <View
        style={styles.settingsActivityContainerItemRow}
      >
        <View
          style={styles.settingsActivityContainerItemColumn}
        >
          <Text
            style={styles.settingsActivityContainerItemHeader}
          >
            Номера строк
          </Text>
          <Text
            style={styles.settingsActivityContainerItemLabel}
          >
            {
              'Показывать номера строк.'
            }
          </Text>
        </View>
        <Switch
        
        />
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Тип шрифта
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Тип шрифта для редактирования текста: Обычный\n(По умолчанию).'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Размер шрифта
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Размер шрифта для редактировани текста: 18sp.'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Интервал между строками
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Междустрочный интервал для редактирования\nтекста: 2sp.'
          }
        </Text>
      </View>
      <Text
        style={styles.settingsActivityContainerHeader}
      >
        Автосохранение
      </Text>
      <View
        style={styles.settingsActivityContainerItemRow}
      >
        <View
          style={styles.settingsActivityContainerItemColumn}
        >
          <Text
            style={styles.settingsActivityContainerItemHeader}
          >
            Автосохранение
          </Text>
          <Text
            style={styles.settingsActivityContainerItemLabel}
          >
            {
              'Автоматически сохранять изменения.'
            }
          </Text>
        </View>
        <Switch
        
        />
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Интервал автосохранения
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Частота автосохранения: 1 мин (По умолчанию).'
          }
        </Text>
      </View>
      <Text
        style={styles.settingsActivityContainerHeader}
      >
        Внешний вид
      </Text>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Тема
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Выберите предпочтительную тему приложения.'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemRow}
      >
        <View
          style={styles.settingsActivityContainerItemColumn}
        >
          <Text
            style={styles.settingsActivityContainerItemHeader}
          >
            Во весь экран
          </Text>
          <Text
            style={styles.settingsActivityContainerItemLabel}
          >
            {
              'Открывать приложение в полноэкранном\nрежиме.'
            }
          </Text>
        </View>
        <Switch
        
        />
      </View>
      <Text
        style={styles.settingsActivityContainerHeader}
      >
        О программе
      </Text>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Версия
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            '1.0.0'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Разработчик
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Softtrack'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Следить за новостями
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Следите за нашими новостями на Facebook.'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Отправить отзыв
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Сообщите о проблеме на форуме.'
          }
        </Text>
      </View>
      <View
        style={styles.settingsActivityContainerItemColumn}
      >
        <Text
          style={styles.settingsActivityContainerItemHeader}
        >
          Убрать рекламу
        </Text>
        <Text
          style={styles.settingsActivityContainerItemLabel}
        >
          {
            'Скачать версию без рекламы из Google Play.'
          }
        </Text>
      </View>
    </ScrollView>
  )
}

export function HelpActivity() {
  return (
    <ScrollView
      style={styles.helpActivityContainer}
    >
      <Text
        style={styles.helpActivityContainerHeader}
      >
        Softtrack текстовый редактор
      </Text>
      <Text
        style={styles.helpActivityContainerWelcomeLabel}
      >
        {
          'Добро пожаловать в Softtrack текстовый\nредактор справочныйцентр.'
        }
      </Text>
      <View
        style={styles.helpActivityContainerItem}
      >
        <View
          style={styles.helpActivityContainerItemHeader}
        >
          <Text
            style={styles.helpActivityContainerItemHeaderLabel}
          >
            НАЧИНАЯ
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Введение
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Журнал изменений
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Мултиязычность
          </Text>
        </View>
      </View>
      <View
        style={styles.helpActivityContainerItem}
      >
        <View
          style={styles.helpActivityContainerItemHeader}
        >
          <Text
            style={styles.helpActivityContainerItemHeaderLabel}
          >
            НАВИГАЦИЯ
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Панель навигации
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Панель каталога
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Панель инструментов
          </Text>
        </View>
      </View>
      <View
        style={styles.helpActivityContainerItem}
      >
        <View
          style={styles.helpActivityContainerItemHeader}
        >
          <Text
            style={styles.helpActivityContainerItemHeaderLabel}
          >
            ФАЙЛ
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Открыть файл
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Сохранить файл
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Управление хранилищем
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Недавние файлы
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Закладки
          </Text>
        </View>
      </View>
      <View
        style={styles.helpActivityContainerItem}
      >
        <View
          style={styles.helpActivityContainerItemHeader}
        >
          <Text
            style={styles.helpActivityContainerItemHeaderLabel}
          >
            РЕДАКТИРОВАНИЕ
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Выделение
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Отменить/повторить
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Поиск/замена
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Вставить цвет
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Редактирование данных на Android
          </Text>
        </View>
      </View>
      <View
        style={styles.helpActivityContainerItem}
      >
        <View
          style={styles.helpActivityContainerItemHeader}
        >
          <Text
            style={styles.helpActivityContainerItemHeaderLabel}
          >
            РАСШИРЕННОЕ
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Синтаксис языка
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Кодировка
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Клавиатурные сокращения
          </Text>
        </View>
      </View>
      <View
        style={styles.helpActivityContainerItem}
      >
        <View
          style={styles.helpActivityContainerItemHeader}
        >
          <Text
            style={styles.helpActivityContainerItemHeaderLabel}
          >
            ДРУГОЕ
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Настройки
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Убрать рекламу
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            Лицензии
          </Text>
        </View>
        <View
          style={styles.helpActivityContainerItemRow}
        >
          <Entypo
            name="text-document"
            size={24}
            color="green"
          />
          <Text
            style={styles.helpActivityContainerItemRowLabel}
          >
            ЧАВО
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export function BookmarksActivity() {
  
  const [bookmarks, setBookmarks] = useState([])

  db.transaction(transaction => {
    const sqlStatement = 'SELECT * FROM bookmarks;'
    transaction.executeSql(sqlStatement, [], (tx, receivedBookmarks) => {
      let tempReceivedBookmarks = []
      Array.from(receivedBookmarks.rows).forEach((bookmarksRow, bookmarksRowIdx) => {
        const bookmark = Object.values(receivedBookmarks.rows.item(bookmarksRowIdx))
        tempReceivedBookmarks = [
          ...tempReceivedBookmarks,
          {
            id: bookmark[0],
            name: bookmark[1],
            path: bookmark[2]
          }
        ]
      })
      setBookmarks(tempReceivedBookmarks)
    })
  })

  return (
    <View
      style={styles.bookmarksActivity}
    >
      {
        bookmarks.length >= 1 ?
          bookmarks.map((bookmark, bookmarkIndex) => {
            return (
              <View
                style={styles.bookmarksActivityItem}
              >
                <AntDesign
                  name="staro"
                  size={24}
                  color="black"
                />
                <View
                  style={styles.bookmarksActivityItemAside}
                >
                  <Text
                    style={styles.bookmarksActivityItemNameLabel}
                  >
                    {
                      bookmark.name
                    }
                  </Text>
                  <Text
                    style={styles.bookmarksActivityItemPathLabel}
                  >
                    {
                      bookmark.path
                    }
                  </Text>
                </View>
              </View>
            )
          })
        :
        <Text
          style={styles.bookmarksActivityNotFoundLabel}
        >
          Нет закладок  
        </Text>
      }
    </View>
  )
}

export function FilesActionActivity({ navigation, route }) {
  
  const { filesAction } = route.params
  
  const [docsList, setDocsList] = useState([])

  const [bookmarks, setBookmarks] = useState([])
  
  const [currentPath, setCurrentPath] = useState('/storage/emulated/0')

  const [savedBookmarkName, setSavedBookmarkName] = useState('')

  const [isAddBookmarkDialogVisible, setIsAddBookmarkDialogVisible] = useState(false)

  const [isBookmarkFound, setIsBookmarkFound] = useState(false)

  const [isSortFilesByMenuVisible, setIsSortFilesByMenuVisible] = useState(false)

  const [sortFilesBy, setSortFilesBy] = useState('name')

  const [isFilterEnabled, setIsFilterEnabled] = useState(false)

  const [open, setOpen] = useState(false)
  // const open = true

  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG)
  }

  const getParsedDate = (millis) => {
    const date = new Date()
    date.setMilliseconds(millis)
    const parsedDate = date.toLocaleDateString()
    return parsedDate
  }

  const toggleBookmark = () => {
    const iterableBookMarks = bookmarks
    const isBookmarkExists = isBookmarkFound
    if (isBookmarkExists) {
      let sqlStatement = `DELETE FROM \"bookmarks\" WHERE path=\"${currentPath}\";`
      db.transaction(transaction => {
        transaction.executeSql(sqlStatement, [], (tx, receivedIndicators) => {
          setIsBookmarkFound(false)
          showToast('Удалено из закладок')
        })
      })
    } else {
      setIsAddBookmarkDialogVisible(true)
    }
  }

  const _getAllFilesInDirectory = async() => {
    // setDocsList([])
    let dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory)
    dir.forEach(async (val) => {
      console.log(`FileSystem.cacheDirectory + val: ${FileSystem.cacheDirectory + val}`)
      const fileUri = FileSystem.cacheDirectory + val
      const content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
      const info = await FileSystem.getInfoAsync(fileUri)
      const fileUriParts = fileUri.split('/')
      const fileUriPartsLength = fileUriParts.length
      const lastFileUriPartIndex = fileUriPartsLength - 1
      const fileName = fileUriParts[lastFileUriPartIndex]
      const docInfo = {
        content: content,
        info: info,
        name: fileName
      }
      docsList.push(docInfo)
    })
  }

  navigation.setOptions({
    title: filesAction
  })

  useEffect(() => _getAllFilesInDirectory(), [])

  db.transaction(transaction => {
    const sqlStatement = 'SELECT * FROM bookmarks;'
    transaction.executeSql(sqlStatement, [], (tx, receivedBookmarks) => {
      let tempReceivedBookmarks = []
      Array.from(receivedBookmarks.rows).forEach((bookmarksRow, bookmarksRowIdx) => {
        const bookmark = Object.values(receivedBookmarks.rows.item(bookmarksRowIdx))
        tempReceivedBookmarks = [
          ...tempReceivedBookmarks,
          {
            id: bookmark[0],
            name: bookmark[1],
            path: bookmark[2]
          }
        ]
      })
      setBookmarks(tempReceivedBookmarks)
    })
  })

  useEffect(() => {
    const iterableBookMarks = bookmarks
    const isBookmarkExists = iterableBookMarks.some((bookmark) => {
      setIsBookmarkFound(true)
      return bookmark.path === currentPath
    })
    setIsBookmarkFound(isBookmarkExists)
  }, [bookmarks])

  navigation.setOptions({
    headerRight: () => (
      <View
        style={styles.filesActionAcitivityMenu}
      >
        <Feather
          name="list"
          size={24}
          color="black"
          style={styles.filesActionAcitivityMenuItem}
          onPress={() => setIsSortFilesByMenuVisible(true)}
        />
        {
          isBookmarkFound ?
            <AntDesign
              name="star"
              size={24}
              color="black"
              style={styles.filesActionAcitivityMenuItem}
              onPress={() => toggleBookmark()}
            />
          :
            <AntDesign
              name="staro"
              size={24}
              color="black"
              style={styles.filesActionAcitivityMenuItem}
              onPress={() => toggleBookmark()}
            />
        }
        {
          isFilterEnabled ?
            <Foundation
              name="filter"
              size={24}
              color="black"
              onPress={() => setIsFilterEnabled(!isFilterEnabled)}
            />
          :
            <AntDesign
              name="filter"
              size={24}
              color="black"
              style={styles.filesActionAcitivityMenuItem}
              onPress={() => setIsFilterEnabled(!isFilterEnabled)}
            />  
        }
        <MaterialMenu.Menu
          onRequestClose={() => setIsSortFilesByMenuVisible(false)}
          visible={isSortFilesByMenuVisible}
          style={styles.mainActivityHeaderRightItemMenu}
        >
          <MaterialMenu.MenuItem
            onPress={() => {
              setSortFilesBy('name')
              setIsSortFilesByMenuVisible(false)
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <Text>
              По имени
            </Text>
          </MaterialMenu.MenuItem>
          <MaterialMenu.MenuItem
            onPress={() => {
              setSortFilesBy('date')
              setIsSortFilesByMenuVisible(false)
            }}
            style={styles.mainActivityHeaderRightItemMenuItem}
          >
            <Text>
              По дате
            </Text>
          </MaterialMenu.MenuItem>
        </MaterialMenu.Menu>
      </View>
    )
  })
  
  useEffect(() => {
    if (sortFilesBy === 'name') {
      let sortedDocsList = docsList
      sortedDocsList.sort((someDoc, anotherDoc) => {
        if (someDoc.name > anotherDoc.name) {
          return 1
        } else if (someDoc.name < anotherDoc.name) {
          return -1
        }
        return 0
      })
      setDocsList(sortedDocsList)
    } else {
      let sortedDocsList = docsList
      sortedDocsList.sort((someDoc, anotherDoc) => {
        if (someDoc.modificationTime > anotherDoc.modificationTime) {
          return 1
        } else if (someDoc.modificationTime < anotherDoc.modificationTime) {
          return -1
        }
        return 0
      })
      setDocsList(sortedDocsList)
    }
  }, [sortFilesBy])

  useEffect(() => {
    if (isFilterEnabled) {
      let filteredDocsList = docsList
      filteredDocsList = filteredDocsList.filter((doc, docIndex) => {
        const fileNameParts = doc.name.split('.')
        const fileNamePartsLength = fileNameParts.length
        const lastFileNamePartsIndex = fileNamePartsLength - 1
        const fileExt = fileNameParts[lastFileNamePartsIndex]
        const isTextExt = fileExt === 'txt'
        return isTextExt
      })
      setDocsList(filteredDocsList)
      showToast('Фильтр ВКЛ')
    } else {
      _getAllFilesInDirectory()
      showToast('Фильтр ОТКЛ')
    }
  }, [isFilterEnabled])

  return (
    <>
      <ScrollView>
        {
          docsList.map((doc, docIndex) => {
            return (
              <TouchableOpacity
                key={docIndex}
                style={styles.mainActivityContainerArticleNavigationViewContainerRow}
                onPress={() => {
                  console.log(`doc.info.uri: ${doc.info.uri}`)
                  goToActivity(navigation, MainActivity, {
                    fileUri: doc.info.uri
                  })
                }}
              >
                <View
                  style={styles.mainActivityContainerArticleNavigationViewContainerRowAside}
                >
                  <Entypo
                    name="folder"
                    size={24}
                    color="black"  
                  />
                  <View
                    style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfo}
                  >
                    <Text
                      style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoName}
                    >
                      {
                        doc.name
                      }
                    </Text>
                    <View
                      style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooter}
                    >
                      <Text
                        style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterSizeLabel}
                      >
                        {
                          `${doc.info.size} байт`
                        }
                      </Text>
                      <Text
                        style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterDateLabel}
                      >
                        {
                          getParsedDate(doc.info.modificationTime)
                        }
                      </Text>
                    </View>
                  </View>
                </View>
                <Feather
                  name="more-vertical"
                  size={24}
                  color="black"
                  style={styles.mainActivityHeaderRightItem}
                />
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
      <FAB.Group
        style={styles.fab}
        icon={
          open ?
            'close'
          :
            'plus'
        }
        open={open}
        color={"#333366"}
        actions={[
          {
            icon: 'plus',
            label: 'Создать файл',
            labelStyle: styles.fabGrounpLabelStyle,
            labelTextColor: 'rgb(255, 255, 255)',
            onPress: () => console.log('Создать файл')
          },
          {
            icon: 'plus',
            label: 'Создать папку',
            labelStyle: styles.fabGrounpLabelStyle,
            labelTextColor: 'rgb(255, 255, 255)',
            onPress: () => console.log('Создать папку'),
          },
          {
            icon: 'email',
            label: 'Сохранить как',
            labelStyle: styles.fabGrounpLabelStyle,
            labelTextColor: 'rgb(255, 255, 255)',
            onPress: () => console.log('Сохранить как'),
          }
        ]}
        onStateChange={() => console.log('onStateChange')}
        onPress={() => {
          console.log('Pressed')
          setOpen(!open)
        }}
      />
      <Dialog
          visible={isAddBookmarkDialogVisible}
          onDismiss={() => setIsAddBookmarkDialogVisible(false)}>
          <Dialog.Title>
            Закладка
          </Dialog.Title>
          <Dialog.Content>
            <Text>
              Имя
            </Text>
            <TextInput
              value={savedBookmarkName}
              onChangeText={(value) => setSavedBookmarkName(value)}
            />
            <Text>
              Путь
            </Text>
            <Text>
              {
                currentPath
              }
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              title="ОТМЕНА"
              onPress={() => {
                showToast(`ОТМЕНА`)
                setIsAddBookmarkDialogVisible(false)
              }}
            />
            <Button
              title="ОК"
              onPress={() => {
                let sqlStatement = `INSERT INTO \"bookmarks\"(name, path) VALUES (\"${savedBookmarkName}\", \"${currentPath}\");`
                db.transaction(transaction => {
                  transaction.executeSql(sqlStatement, [], (tx, receivedTable) => {
                    showToast('Добавлено в закладки')
                    setIsAddBookmarkDialogVisible(false)
                  })
                })
              }}
            />
          </Dialog.Actions>
        </Dialog>
    </>
  )
}

export function RecentOpenedFilesActivity() {

  const [docsList, setDocsList] = useState([])

  const getParsedDate = (millis) => {
    const date = new Date()
    date.setMilliseconds(millis)
    const parsedDate = date.toLocaleDateString()
    return parsedDate
  }

  const _getAllFilesInDirectory = async () => {
    let dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory)
    dir.forEach(async (val) => {
      console.log(`FileSystem.cacheDirectory + val: ${FileSystem.cacheDirectory + val}`)
      const fileUri = FileSystem.cacheDirectory + val
      const content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
      const info = await FileSystem.getInfoAsync(fileUri)
      const fileUriParts = fileUri.split('/')
      const fileUriPartsLength = fileUriParts.length
      const lastFileUriPartIndex = fileUriPartsLength - 1
      const fileName = fileUriParts[lastFileUriPartIndex]
      const docInfo = {
        content: content,
        info: info,
        name: fileName
      }
      const modificationTime = info.modificationTime
      const currentDate = new Date()
      const currentDateMillis = currentDate.getMilliseconds()
      const currentDateMillisEarlier = currentDateMillis - 1000000
      const isCanPush = modificationTime > currentDateMillisEarlier
      if (isCanPush) {
        docsList.push(docInfo)
      }
    })
  }

  useEffect(() => _getAllFilesInDirectory(), [])

  return (
    <ScrollView
      
    >
      {
        docsList.map((doc, docIndex) => {
          return (
            <TouchableOpacity
              key={docIndex}
              style={styles.mainActivityContainerArticleNavigationViewContainerRow}
            >
              <View
                style={styles.mainActivityContainerArticleNavigationViewContainerRowAside}
              >
                <Entypo
                  name="folder"
                  size={24}
                  color="black"  
                />
                <View
                  style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfo}
                >
                  <Text
                    style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoName}
                  >
                    {
                      doc.name
                    }
                  </Text>
                  <View
                    style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooter}
                  >
                    <Text
                      style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterSizeLabel}
                    >
                      {
                        `${doc.info.size} байт`
                      }
                    </Text>
                    <Text
                      style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterDateLabel}
                    >
                      {
                        getParsedDate(doc.info.modificationTime)
                      }
                    </Text>
                  </View>
                </View>
              </View>
              <Feather
                name="more-vertical"
                size={24}
                color="black"
                style={styles.mainActivityHeaderRightItem}
              />
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  )
}

export function RecentAddedFilesActivity() {
  
  const [docsList, setDocsList] = useState([])

  const getParsedDate = (millis) => {
    const date = new Date()
    date.setMilliseconds(millis)
    const parsedDate = date.toLocaleDateString()
    return parsedDate
  }

  const _getAllFilesInDirectory = async () => {
    let dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory)
    dir.forEach(async (val) => {
      console.log(`FileSystem.cacheDirectory + val: ${FileSystem.cacheDirectory + val}`)
      const fileUri = FileSystem.cacheDirectory + val
      const content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
      const info = await FileSystem.getInfoAsync(fileUri)
      const fileUriParts = fileUri.split('/')
      const fileUriPartsLength = fileUriParts.length
      const lastFileUriPartIndex = fileUriPartsLength - 1
      const fileName = fileUriParts[lastFileUriPartIndex]
      const docInfo = {
        content: content,
        info: info,
        name: fileName
      }
      const modificationTime = info.modificationTime
      const currentDate = new Date()
      const currentDateMillis = currentDate.getMilliseconds()
      const currentDateMillisEarlier = currentDateMillis - 1000
      const isCanPush = modificationTime > currentDateMillisEarlier
      if (isCanPush) {
        docsList.push(docInfo)
      }
    })
  }
  
  useEffect(() => _getAllFilesInDirectory(), [])

  return (
    <ScrollView
      
    >
      {
        docsList.map((doc, docIndex) => {
          return (
            <TouchableOpacity
              key={docIndex}
              style={styles.mainActivityContainerArticleNavigationViewContainerRow}
            >
              <View
                style={styles.mainActivityContainerArticleNavigationViewContainerRowAside}
              >
                <Entypo
                  name="folder"
                  size={24}
                  color="black"  
                />
                <View
                  style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfo}
                >
                  <Text
                    style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoName}
                  >
                    {
                      doc.name
                    }
                  </Text>
                  <View
                    style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooter}
                  >
                    <Text
                      style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterSizeLabel}
                    >
                      {
                        `${doc.info.size} байт`
                      }
                    </Text>
                    <Text
                      style={styles.mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterDateLabel}
                    >
                      {
                        getParsedDate(doc.info.modificationTime)
                      }
                    </Text>
                  </View>
                </View>
              </View>
              <Feather
                name="more-vertical"
                size={24}
                color="black"
                style={styles.mainActivityHeaderRightItem}
              />
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  )
}

export function RecentFilesActivity() {
  
  const layout = useWindowDimensions()

  const renderScene = SceneMap({
    first: RecentOpenedFilesActivity,
    second: RecentAddedFilesActivity
  })

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Недавно открытые' },
    { key: 'second', title: 'Недавно добавленные' }
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

export function MemoryManagerActivity({ navigation }) {
  
  const [open, setOpen] = useState(false)

  const goToActivity = (navigation, activityName, params = {}) => {
    navigation.navigate(activityName, params)
  }
  
  return (
    <>
      <View
        style={styles.memoryManagerActivityContainer}
      >
        <TouchableOpacity
          style={styles.memoryManagerActivityContainerInternalStorage}
          onPress={() => goToActivity(navigation, 'MainActivity')}
        >
          <MaterialIcons name="smartphone" size={24} color="black" />
          <View
            style={styles.memoryManagerActivityContainerInternalStorageAside}
          >
            <Text
              style={styles.memoryManagerActivityContainerInternalStorageAsideNameLabel}
            >
              Внутренняя память
            </Text>
            <Text
              style={styles.memoryManagerActivityContainerInternalStorageAsidePathLabel}
            >
              /storage/emulated/0
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <FAB.Group
        style={styles.fab}
        icon={
          open ?
            'close'
          :
            'plus'
        }
        open={open}
        color={"#333366"}
        actions={[
          {
            icon: 'plus',
            label: 'FTP/FTPS/SFTP',
            labelStyle: styles.fabGrounpLabelStyle,
            labelTextColor: 'rgb(255, 255, 255)',
            onPress: () => console.log('FTP/FTPS/SFTP')
          },
          {
            icon: 'plus',
            label: 'WebDAV',
            labelStyle: styles.fabGrounpLabelStyle,
            labelTextColor: 'rgb(255, 255, 255)',
            onPress: () => console.log('WebDAV'),
          },
          {
            icon: 'email',
            label: 'Google Drive',
            labelStyle: styles.fabGrounpLabelStyle,
            labelTextColor: 'rgb(255, 255, 255)',
            onPress: () => console.log('Google Drive'),
          },
          {
            icon: 'email',
            label: 'OneDrive',
            labelStyle: styles.fabGrounpLabelStyle,
            labelTextColor: 'rgb(255, 255, 255)',
            onPress: () => console.log('OneDrive'),
          },
          {
            icon: 'email',
            label: 'GitHub',
            labelStyle: styles.fabGrounpLabelStyle,
            labelTextColor: 'rgb(255, 255, 255)',
            onPress: () => console.log('GitHub'),
          },
          {
            icon: 'email',
            label: 'GitLab',
            labelStyle: styles.fabGrounpLabelStyle,
            labelTextColor: 'rgb(255, 255, 255)',
            onPress: () => console.log('GitLab'),
          }
        ]}
        onStateChange={() => console.log('onStateChange')}
        onPress={() => {
          console.log('Pressed')
          setOpen(!open)
        }}
      />
    </>
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
  mainActivityHeaderRightItemMenu: {
    width: 275
  },
  mainActivityHeaderRightItemMenuItem: {

  },
  mainActivityHeaderRightItemMenuItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainActivityHeaderRightItemMenuItemCheckableRowAside: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainActivityHeaderRightItemMenuItemCheckableRow: {
    width: 210,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainActivityHeaderRightItemMenuItemRowLabel: {
    marginLeft: 15
  },
  mainActivtyContainer: {
    
  },
  mainActivtyToolBar: {
    position: 'absolute',
    top: '95%',
    width: '100%',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
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
  },
  mainActivityContainerArticleNavigationViewContainer: {
    padding: 25
  },
  mainActivityContainerArticleNavigationViewContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainActivityContainerArticleNavigationViewContainerRowAside: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainActivityContainerArticleNavigationViewContainerRowAsideInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
  },
  mainActivityContainerArticleNavigationViewContainerRowAsideInfoName: {

  },
  mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooter: {
    display: 'flex',
    flexDirection: 'row'
  },
  mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterSizeLabel: {

  },
  mainActivityContainerArticleNavigationViewContainerRowAsideInfoFooterDateLabel: {
    marginLeft: 10
  },
  filesActionAcitivityMenu: {
    display: 'flex',
    flexDirection: 'row'
  },
  filesActionAcitivityMenuItem: {
    marginLeft: 15
  },
  settingsActivityContainer: {

  },
  settingsActivityContainerHeader: {
    color: 'rgb(0, 150, 0)',
    fontWeight: '900'
  },
  settingsActivityContainerItemColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  settingsActivityContainerItemHeader: {
    fontSize: 16
  },
  settingsActivityContainerItemLabel: {
    color: 'rgb(200, 200, 200)'
  },
  settingsActivityContainerItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  helpActivityContainer: {

  },
  helpActivityContainerHeader: {
    fontSize: 24
  },
  helpActivityContainerWelcomeLabel: {
    fontSize: 18,
    margin: 10
  },
  helpActivityContainerItem: {
    margin: 25
  },
  helpActivityContainerItemHeader: {
    borderBottomColor: 'rgb(175, 175, 175)',
    borderBottomWidth: 1,
    padding: 10
  },
  helpActivityContainerItemHeaderLabel: {
    fontSize: 18
  },
  helpActivityContainerItemRow: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10
  },
  helpActivityContainerItemRowLabel: {
    marginLeft: 25,
    color: 'rgb(0, 150, 0)'
  },
  bookmarksActivity: {

  },
  bookmarksActivityItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bookmarksActivityItemAside: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 25
  },
  bookmarksActivityItemNameLabel: {

  },
  bookmarksActivityItemPathLabel: {

  },
  bookmarksActivityNotFoundLabel: {
    textAlign: 'center'
  },
  dialogContentRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dialogContentRowLabel: {
    marginLeft: 25
  },
  colorPickerWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  colorpiker:{
    width: '75%',
    height: '75%'
  },
  mainActivtyTabs: {
    maxHeight: 35
  },
  mainActivtyTab: {
    marginHorizontal: 15,
    width: 175,
    height: 35,
    backgroundColor: 'rgb(200, 200, 200)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dialogRowBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  saveDialogScrollBody: {
    maxHeight: 150
  },
  memoryManagerActivityContainerInternalStorage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  memoryManagerActivityContainerInternalStorageAside: {
    marginLeft: 25
  },
  memoryManagerActivityContainerInternalStorageAsideNameLabel: {
    fontSize: 16
  },
  memoryManagerActivityContainerInternalStorageAsidePathLabel: {
    color: 'rgb(200, 200, 200)'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  fabGrounpLabelStyle: {
    backgroundColor: 'rgb(150, 150, 150)'
  }
})