import React from 'react';
import { Card } from '@uifabric/react-cards';
import { Stack, Text } from 'office-ui-fabric-react';
import './App.css';

function App() {
  return (
    <Stack>
      <Card>
        <Card.Item>
          <Text>Hello World!</Text>
        </Card.Item>
      </Card>
    </Stack>
  );
}

export default App;
