import { SideBar } from './components/SideBar';
import { Content } from './components/Content';


import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { ContentProvider } from './hooks/useContent';



export function App() {
  

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ContentProvider>
        <SideBar />
        <Content />
      </ContentProvider>
    </div>
  )
}