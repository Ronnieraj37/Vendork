import React, { useEffect, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa';
import { BsFillChatLeftDotsFill } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io'
import { AiFillHome } from 'react-icons/ai';
import UserCard from '../card/UserCard';
import FriendList from '../card/FriendList';
import Search from '../card/Search';
import Chat from '../card/Chat';
import HomePage from '../card/HomePage';

const BottomBar = ({ accountDetails, account, contract }) => {
  const [selected, setselected] = useState(1);
  const toProfile = (event) => {
    setselected(0);
  }
  const toChat = (event) => {
    setselected(2);
  }
  const toFriends = (event) => {
    setselected(3);
  }
  const toHome = (event) => {
    setselected(1);
  }
  return (
    <div>
      <div className="flex flex-col items-center bg-[#13131a] mt-4 py-1 h-[550px]  sm:w-[600px] rounded-lg ">
        {selected == 0 &&
          <div>
            <Search contract={contract} />
          </div>
        }
        {selected == 1 &&
          <div>
            <HomePage contract={contract} />
          </div>
        }
        {selected == 2 &&
          <div>
            <Chat contract={contract} />

          </div>
        }
        {selected == 3 &&
          <div>
            <FriendList contract={contract} />
          </div>
        }
      </div>
      <div className="flex flex-row items-center justify-around py-1  bg-black  sm:w-[600px] rounded-xl ">
        <button onClick={toProfile} className={` rounded-xl px-7 py-4 sm:px-3 mx-4 items-center flex flex-row ${selected == 0 ? " bg-[#103CE7]" : "hover:bg-[#0b2f42]"}`}>
          <div className="px-3 mr-1 text-lg font-light font-sans sm:flex hidden ">
            Search
          </div>
          <IoMdPersonAdd size={23} />
        </button>
        <button onClick={toHome} className={` rounded-xl px-7 py-4 sm:px-3 mx-4  items-center flex flex-row ${selected == 1 ? " bg-[#103CE7]" : "hover:bg-[#0b2f42]"}`}>
          <div className="px-3 mr-1 text-lg font-light font-sans sm:flex hidden ">
            Home
          </div>
          <AiFillHome size={23} />
        </button>
        <button onClick={toChat} className={` rounded-xl px-7 py-4 sm:px-3 mx-4 items-center flex flex-row ${selected == 2 ? " bg-[#103CE7]" : "hover:bg-[#0b2f42]"}`}>
          <div className="px-4 mr-1 text-lg font-light font-sans sm:flex hidden ">
            Chat
          </div>
          <BsFillChatLeftDotsFill size={23} />
        </button>
        <button onClick={toFriends} className={` rounded-xl px-7 py-4 sm:px-3 mx-4  items-center flex flex-row ${selected == 3 ? " bg-[#103CE7]" : "hover:bg-[#0b2f42]"}`}>
          <div className="px-3 mr-1 text-lg font-light font-sans sm:flex hidden ">
            Friends
          </div>
          <FaUserFriends size={23} />
        </button>


      </div>
    </div>

  )
}

export default BottomBar