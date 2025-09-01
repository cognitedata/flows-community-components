import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, TopBar, Button, Flex, Card, Typography, List } from '@cognite/cogs.js';
import '@cognite/cogs.js/dist/cogs.css';

function App() {
  return (
    <ConfigProvider>
      <Flex direction="column" style={{ minHeight: '100vh' }}>
        <TopBar>
          <TopBar.Logo>
            <Typography variant="h3" style={{ color: 'white' }}>My Cogs Page</Typography>
          </TopBar.Logo>
          <TopBar.Navigation>
            <Button type="ghost" href="#">Home</Button>
            <Button type="ghost" href="#">About</Button>
            <Button type="ghost" href="#">Services</Button>
            <Button type="ghost" href="#">Contact</Button>
          </TopBar.Navigation>
          <TopBar.Actions>
            <Button type="primary">Get Started</Button>
          </TopBar.Actions>
        </TopBar>

        <Flex direction="column" gap={16} padding={24} style={{ flexGrow: 1, maxWidth: '1200px', margin: '24px auto' }}>
          <Card>
            <Typography variant="h2">About This Page</Typography>
            <Typography variant="body">This is a simple web page built with the Cogs Design System.</Typography>
          </Card>

          <Card>
            <Typography variant="h2">Features</Typography>
            <List>
              <List.Item>Responsive Design</List.Item>
              <List.Item>Clean Layout</List.Item>
              <List.Item>Cogs Components</List.Item>
            </List>
          </Card>
        </Flex>

        <Flex justify="center" align="center" style={{ backgroundColor: '#333', color: 'white', padding: '1em 0' }}>
          <Typography variant="body-small" style={{ color: 'white' }}>&copy; 2023 My Cogs Web Page. All rights reserved.</Typography>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
