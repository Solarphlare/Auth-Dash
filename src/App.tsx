import { useState } from 'react';
import Navbar from './views/Navbar';
import AccountHeader from './views/AccountHeader';
import PasskeysView from './views/PasskeysView';
import HorizontalSeparator from './Components/HorizontalSeparator';
import Dialog from './Components/Dialog';
import TextEntryDialog from './Components/TextEntryDialog';
import SessionsView from './views/SessionsView';
import { APIUser } from 'discord-api-types/v10';

function App() {
  const [userInfo, setUserInfo] = useState<APIUser>({} as APIUser);

  return (
    <div className="w-full h-[100vh] bg-neutral-100/60 dark:bg-zinc-900 flex flex-col">
      <Navbar />
      <div className='flex flex-col items-center flex-1 bg-neutral-100/60 dark:bg-zinc-900 px-6 2xl:px-96 xl:px-48 lg:px-28 md:px-8 pt-28' id="content">
        <AccountHeader setUserInfo={setUserInfo} />
        <HorizontalSeparator />
        <PasskeysView userInfo={userInfo} />
        <HorizontalSeparator />
        <SessionsView />
        <HorizontalSeparator />
      </div>
      <Dialog />
      <TextEntryDialog />
    </div>
  )
}

export default App;
