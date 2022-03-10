import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, DrawerLayoutAndroid, Button, TextInput, ScrollView, TouchableOpacity, BackHandler, Share, ToastAndroid, Switch } from 'react-native'
// import CheckBox from '@react-native-community/checkbox'
import CheckBox from 'react-native-check-box'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Entypo, MaterialIcons, Ionicons, Feather, AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import {
  Paragraph,
  Dialog,
  Portal,
  Provider,
  RadioButton
} from 'react-native-paper'
import * as MaterialMenu from 'react-native-material-menu'
import { setStatusBarBackgroundColor } from 'expo-status-bar'
// import * as RNFetchBlob from 'rn-fetch-blob'
// import RNFetchBlob from 'react-native-fetch-blob'

const Stack = createNativeStackNavigator()

export default function App() {

  const [isMainActivityFolderContextMenuVisible, setIsMainActivityFolderContextMenuVisible] = useState(false)
  
  const [isMainActivityPenContextMenuVisible, setIsMainActivityPenContextMenuVisible] = useState(false)

  const [isMainActivityMoreContextMenuVisible, setIsMainActivityMoreContextMenuVisible] = useState(false)

  const [isFindDialogVisible, setIsFindDialogVisible] = useState(false)

  const testActivity = 'MainActivity'

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={testActivity}>
        <Stack.Screen
          name="RecentFilesActivity"
          component={SettingsActivity}
          options={{
            title: 'Недавние файлы'
          }}
        />
        <Stack.Screen
          name="MemoryManagerActivity"
          component={SettingsActivity}
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

export function MainActivity({ navigation }) {
  
  const [isMainActivityFolderContextMenuVisible, setIsMainActivityFolderContextMenuVisible] = useState(false)

  const [isMainActivityPenContextMenuVisible, setIsMainActivityPenContextMenuVisible] = useState(false)

  const [isMainActivityMoreContextMenuVisible, setIsMainActivityMoreContextMenuVisible] = useState(false)

  const [mainTextAreaContent, setMainTextAreaContent] = useState('')

  const [mainTextAreaSelection, setMainTextAreaSelection] = useState({
    start: 0,
    end: 0
  })

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

  const [isToolBarEnabled, setIsToolBarEnabled] = useState(true)

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
              onPress={() => setIsGoToStrokeDialogVisible(true)}
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
        onPress={() => goToActivity(navigation, 'FilesActionActivity')}
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
        onPress={() => {
          // expo intent launcher
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
                      doc.content
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
                        'doc.info.modificationTime'
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
    docsList = []
    let dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory)
    dir.forEach(async (val) => {
      console.log(`FileSystem.cacheDirectory + val: ${FileSystem.cacheDirectory + val}`)
      // docsList.push(FileSystem.cacheDirectory + val)
      const fileUri = FileSystem.cacheDirectory + val
      const content = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })
      const info = await FileSystem.getInfoAsync(fileUri)
      const docInfo = {
        content: content,
        info: info
      }
      docsList.push(docInfo)
    })
  }

  const createFile = async () => {
    let fileUri = FileSystem.cacheDirectory + 'expo_text_plain_2.txt'
    console.log(`create fileUri: ${fileUri}`)
    await FileSystem.writeAsStringAsync(fileUri, 'abc', { encoding: FileSystem.EncodingType.UTF8 })
  }

  useEffect(() => {
    _getAllFilesInDirectory()
  }, [])

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
                editable={isMainTextAreaEditable}
                value={isMainTextAreaEditable}
                ref={(ref) => {
                  // console.log(`ref.selection: ${ref.selection.start}`)
                }}
                onSelectionChange={(event) => setMainTextAreaSelection(event.nativeEvent.selection)}
                // selection={mainTextAreaSelection}
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
          {
            isToolBarEnabled ?
              <View
                style={styles.mainActivtyToolBar}
              >
                <Feather
                  name="folder"
                  size={24}
                  color="black"
                  onPress={() => goToActivity(navigation, 'FilesActionActivity')}  
                />
                <MaterialIcons name="undo" size={24} color="black" />
                <MaterialIcons name="redo" size={24} color="black" />
                <Ionicons
                  name="search-outline"
                  size={24}
                  color="black"
                  onPress={() => setIsFindDialogVisible(true)}
                />
                <Ionicons name="ios-save" size={24} color="black" />
                <Entypo name="cross" size={24} color="black" />
              </View>
            :
              <View>

              </View>
          }
        </DrawerLayoutAndroid>
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
                isFindDialogCaseMatch = !isFindDialogCaseMatch
              }}
              rightText={'Учитывать поиск'}
            />
            <CheckBox
              isChecked={isFindDialogRegex}
              onClick={() => {
                isFindDialogRegex = !isFindDialogRegex
              }}
              rightText={'Регулярное выражение'}
            />
            <CheckBox
              isChecked={isFindDialogCycle}
              onClick={() => {
                isFindDialogCycle = !isFindDialogCycle
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
                // const isMatchFound = mainTextAreaContent.includes(findDialogSearchInput)
                // if (isMatchFound) {
                  // const findIndex = mainTextAreaContent.indexOf(findDialogSearchInput)
                  // const isIndexExists = findIndex !== -1
                  // if (isIndexExists) {
                  //   const nextCharIndex = findIndex + 1
                  //   setMainTextAreaSelection({
                  //     start: findIndex,
                  //     end: nextCharIndex
                  //   })
                  //   setIsFindDialogVisible(false)
                  // } else {
                  //   setIsFindDialogVisible(false)
                  //   showToast(`Для \"${findDialogSearchInput}\" соответствий не найдено`)
                  // }
                // } else {
                //   setIsFindDialogVisible(false)
                //   showToast(`Для \"${findDialogSearchInput}\" соответствий не найдено`)
                // }
                // setIsFindDialogVisible(false)
                // showToast(`Для \"${findDialogSearchInput}\" соответствий не найдено`)
                showToast(`Для \"${findDialogSearchInput}\" соответствий не найдено`)
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
                showToast(`ОК`)
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

  return (
    <View
      style={styles.bookmarksActivity}
    >
      {
        bookmarks.length >= 1 ?
          bookmarks.map((doc, docIndex) => {
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
                  style={styles.bookmarksActivityItem}
                >
                  <Text
                    style={styles.bookmarksActivityItemNameLabel}
                  >
                    Закладка Имя  
                  </Text>
                  <Text
                    style={styles.bookmarksActivityItemPathLabel}
                  >
                    Закладка Путь
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

export function FilesActionActivity({ navigation }) {
  
  const [docsList, setDocsList] = useState([])

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
        />
        <AntDesign
          name="staro"
          size={24}
          color="black"
          style={styles.filesActionAcitivityMenuItem}
        />
        <AntDesign
          name="filter"
          size={24}
          color="black"
          style={styles.filesActionAcitivityMenuItem}
        />
      </View>
    )
  })
  
  return (
    <View>
      <Text>
        FilesActionActivity
      </Text>
    </View>
  )
}

export function RecentFilesActivity() {
  
  const [docsList, setDocsList] = useState([])
  
  return (
    <View>
      <Text>
        RecentFilesActivity
      </Text>
    </View>
  )
}

export function MemoryManagerActivity() {
  return (
    <View>
      <Text>
        MemoryManagerActivity
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
    flexDirection: 'row'
  },
  bookmarksActivityItem: {
    display: 'flex',
    flexDirection: 'column'
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
  }
})