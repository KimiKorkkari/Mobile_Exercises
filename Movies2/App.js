import * as React from 'react';
import React from 'react';
import type {Node} from 'react';
import { SafeAreaView } from 'react-native';

import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const App: () => Node = () => {
  return (
    <SafeAreaView>
     <Header
      centerComponent={{ text: 'Weather App', style: { color: '#fff' } }}
      rightComponent={{ icon: 'add', color: '#fff' }}
    />
    </SafeAreaView>
  );
};

export default App;