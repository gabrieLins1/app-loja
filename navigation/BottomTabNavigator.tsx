import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';

import Home from '../screens/HomeScreen';
import Carrinho from '../screens/CarrinhoScreen';
import Itenspedidos from '../screens/ItenspedidosScreen';
import Perfil from '../screens/PerfilScreen';


import { BottomTabParamList, TabOneParamList, TabTwoParamList, HomeParamList, CarrinhoParamList,ItenspedidosParamList,PerfilParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home-sharp" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Carrinho"
        component={CarrinhoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="cart-sharp" color={color} />,
        }}
      />

<BottomTab.Screen
        name="Itenspedidos"
        component={ItenspedidosNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Perfil"
        component={PerfilNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-person-circle" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={20} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}


const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerTitle: 'SEJA BEM VINDO' }}
      />
    </HomeStack.Navigator>
  );
}

const CarrinhoStack = createStackNavigator<CarrinhoParamList>();

function CarrinhoNavigator() {
  return (
    <CarrinhoStack.Navigator>
      <CarrinhoStack.Screen
        name="CarrinhoScreen"
        component={Carrinho}
        options={{ headerTitle: 'SUAS RESERVAS' }}
      />
    </CarrinhoStack.Navigator>
  );
}

const ItenspedidosStack = createStackNavigator<ItenspedidosParamList>();

function ItenspedidosNavigator() {
  return (
    <ItenspedidosStack.Navigator>
      <ItenspedidosStack.Screen
        name="ItenspedidosScreen"
        component={Itenspedidos}
        options={{ headerTitle: 'ITENS' }}
      />
    </ItenspedidosStack.Navigator>
  );
}

const PerfilStack = createStackNavigator<PerfilParamList>();

function PerfilNavigator() {
  return (
    <PerfilStack.Navigator>
      <PerfilStack.Screen
        name="PerfilScreen"
        component={Perfil}
        options={{ headerTitle: 'SEUS DADOS' }}
      />
    </PerfilStack.Navigator>
  );
}