import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, DrawerLayoutAndroid, Button, TextInput, ScrollView, TouchableOpacity, BackHandler, Share, ToastAndroid } from 'react-native'
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
            title: ''
          }}
        />
        <Stack.Screen
          name="HelpActivity"
          component={HelpActivity}
          options={{
            title: 'Справка'
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
                    <View
                      style={styles.mainActivityHeaderRightItemMenuItemRow}
                    >
                      <Feather name="hash" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Кодировка
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
                      <AntDesign name="picture" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Стиль оформления
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
                      <Ionicons name="ios-stats-chart-sharp" size={24} color="black" />
                      <Text
                        style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
                      >
                        Статистика
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
            <View
              style={styles.mainActivityHeaderRightItemMenuItemRow}
            >
              <Feather name="hash" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Кодировка
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
              <AntDesign name="picture" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Стиль оформления
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
              <Ionicons name="ios-stats-chart-sharp" size={24} color="black" />
              <Text
                style={styles.mainActivityHeaderRightItemMenuItemRowLabel}
              >
                Статистика
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
                        doc.info.modificationTime
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
                value={mainTextAreaContent}
                ref={(ref) => {
                  // console.log(`ref.selection: ${ref.selection.start}`)
                }}
                onSelectionChange={(event) => setMainTextAreaSelection(event.nativeEvent.selection)}
                selection={mainTextAreaSelection}
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
      </DrawerLayoutAndroid>
    </>
  )
}

export function SettingsActivity() {
  return (
    <View>
      <Text>
      SettingsActivity
      </Text>
    </View>
  )
}

export function HelpActivity() {
  return (
    <View>
      <Text>
      HelpActivity
      </Text>
    </View>
  )
}

export function BookmarksActivity() {
  return (
    <View>
      <Text>
        BookmarksActivity
      </Text>
    </View>
  )
}

export function FilesActionActivity() {
  return (
    <View>
      <Text>
        FilesActionActivity
      </Text>
    </View>
  )
}

export function RecentFilesActivity() {
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
  mainActivityHeaderRightItemMenuItemRowLabel: {
    marginLeft: 15
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
  }
})