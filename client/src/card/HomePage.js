import React, { useState,useRef, useEffect } from 'react'
import { toast, Toaster } from "react-hot-toast";
import PostCard from './PostCard';
import {IoMdAdd} from "react-icons/io";
import {FiUpload} from "react-icons/fi";
import{BiLoaderAlt} from "react-icons/bi";
import axios from "axios";

const JWT = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZTUyNmI4Yy1hNmIzLTQyMGYtOTM5ZC0zZjUzZmRjZjA4ODMiLCJlbWFpbCI6InJvbm5pZXJhanNpbmdoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5OTZjNTJkYmFkZjFhZGZmOGU0YSIsInNjb3BlZEtleVNlY3JldCI6ImEyYmFjNjBjNzdlZGQ1ZDdhYTBhYTExNzY5OWZjYWJmMzc0ZmQxNTQzODZhMDQ5NTRmZTMzZTAxNWZlZTg0NzkiLCJpYXQiOjE2ODcyNDUzODJ9.CHifyXne4nGhyQcTSU8kVMFMdNaFktGpK45JdKiHVtI`
const HomePage = ({ contract }) => {
    const [friends, setfriends] = useState(null);
    const [data, setdata] = useState(false);
    const [file, setfile] = useState(null);
    const hiddenFileInput = useRef(null);
    const [fileName, setfileName] = useState('');
    const [uploading, setuploading] = useState(false);
    const [noFriends, setnoFriends] = useState(false);
    const [isImageReq, setisImageReq] = useState(false);
    const uploadImage = async () => {
        if (file) {
            setuploading(true);
            const formData = new FormData();
            formData.append('file', file);
            try {
                const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                    maxBodyLength: "Infinity",
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                        Authorization: JWT,
                    }
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
                const response = await contract.addPost(ImgHash);
                console.log("Response",response);
                toast.success("Image sent!",
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
            } catch (error) {
                console.log(error);
                toast.error("Couldn't Upload",
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
            }
            setfile(null);
            setuploading(false);
        } else {
            toast.error("Can't Upload File!",
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
        }
        setisImageReq(false);
    }
    const retrieveFile = (e) => {
        setfile(e.target.files[0]);
        setfileName(e.target.files[0].name);
        e.preventDefault();
        setisImageReq(true);
    };
    const getImage = () => {
        hiddenFileInput.current.click();
    }
    const getFriends = async () => {
        try {
            const response = await contract.getFriendList();
            setfriends(response);
            if (response.length === 0) {
                setnoFriends(true);
            } else {
                setdata(true);
            }
        } catch (error) {
            toast.error('Refresh the page',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }
    }
    useEffect(() => {
        getFriends();
    }, [friends])

    return (
        <div>
        <div className="relative flex flex-col items-center mt-3 max-h-[550px] w-[400px] sm:w-[550px]">
            <Toaster />
            <div className='p-2 flex justify-center items-center text-[#c8d2f7]  text-2xl '>
                Home
            </div>
            {noFriends ? <div className="p-2 text-xl flex overflow-auto items-center justify-center w-[400px] sm:w-[550px] rounded-xl bg-[#0b2f42] h-[476px]" >Add Friends for Posts</div> : 
                <div>
                    {data && 
                        <div className="flex overflow-auto flex-col  w-[400px] sm:w-[550px] rounded-xl bg-[#0b2f42] h-[476px]">
                            {friends.map((friend, i) => {
                                return (
                                    <div key={i} className='py-2'>
                                        <PostCard address={friend.friendAddress} contract={contract} />
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            }
            {isImageReq && 
            <div className="items-center text-md justify-end rounded-3xl -mt-16 py-3 px-3 bg-[#20202b]">
                <p className="px-4">{fileName}</p>
                {uploading ? 
                <BiLoaderAlt className='animate-spin absolute p-1 rounded-xl right-4 bottom-2' size={30} />
                :
                <FiUpload onClick={uploadImage} className="absolute hover:bg-[#20202b] p-1 rounded-xl right-4 bottom-2" size={30} />
                }
            </div>
            }
            {!isImageReq && 
            <button onClick={getImage} className="items-end absolute right-0.5 bottom-1 text-md justify-end rounded-3xl -mt-12 mb-1 mr-2 py-3 px-3 bg-[#20202b]">
                <IoMdAdd size={25} />
            </button>
            }
            <input
                disabled={uploading}
                type="file"
                name="data"
                accept="image/*"
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                onChange={retrieveFile}
            />
        </div>
        
        </div>
    )
}

export default HomePage