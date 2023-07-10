import React,{useState,useEffect} from 'react';
import {BiLoaderAlt} from "react-icons/bi";
import {FaUserCircle} from "react-icons/fa";
const PostCard = ({address,contract}) => {
    const [post, setpost] = useState(null);
    const [isEmpty, setisEmpty] = useState(false);
    const [userDetails, setuserDetails] = useState(null);
    const [loading, setloading] = useState(true);
    const [postDate, setpostDate] = useState("");
    const [postTime, setpostTime] = useState('');
    const [postURL, setpostURL] = useState('');
    const getTime = (timestamp1) => {
        if (timestamp1 !== undefined) {
        const mssg = JSON.parse(JSON.stringify(timestamp1));
        var timestamp = parseInt(mssg.hex, 16);
        timestamp = timestamp * 1000;
        var date = new Date(timestamp).toDateString();
        var timer = new Date(timestamp).toTimeString();
        timer = JSON.stringify(timer);
        date = JSON.stringify(date);
        const samay = timer.slice(1,6);
        const time = date.slice(5,date.length-5);
        setpostTime(samay);
        setpostDate(time);
        }
    }
    const getPost=async()=>{
        const response = await contract.retrievePost(address);
        const userResponse = await contract.getUserDetails(address);
        setuserDetails(userResponse);
        if(response == null || response.length === 0){
            setisEmpty(true);
        } else{
            setpost(response);
            console.log("Response",response[0].hash);
            setpostURL(response[0].hash);
            getTime(response[0].timestamp);
        }
        setloading(false);
    }    
    useEffect(()=>{
        getPost();
    },[])

    return (
        <div className="flex items-center text-white ">
            {loading ? 
            <div>
                <BiLoaderAlt className='animate-spin p-1 mt-12 rounded-xl items-center flex flex-col w-[400px] sm:w-[550px]' size={50} />
            </div>
            : <div>
                {isEmpty ?
                <div>No one Posted in a While</div>
                 : 
                  <div className=" mt-1 flex flex-col w-[400px] sm:w-[550px] rounded-xl -mt-1 hove:bg-[#0b2f42]">
                    <div className=" mt-1 mb-3  text-xl relative flex flex-row px-2">
                    <div className=' ml-2'>
                        {userDetails?.Image === '' && <FaUserCircle className='mr-1' size={30} />}
                        {userDetails?.Image !== '' && <img src={userDetails?.Image} className="mr-1 w-[30px] h-[30px] rounded-full" />}
                    </div>
                    <div className="ml-3">{userDetails.Name}</div>
                    <p className="absolute right-2 text-[17px] font-light">{postTime} {postDate}</p>
                    </div>
                    <img src={postURL} className='h-max mb-4 px-2 rounded-2xl' />
                    <hr className="h-[4px] rounded-xl bg-gray-200 border-0 dark:bg-black" />
                </div>
                }
            </div>
            }
        </div>
    )
}

export default PostCard;