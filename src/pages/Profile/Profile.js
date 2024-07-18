import axios from "axios";
import React, { useEffect } from "react";
import API_URLS from "../../config/apiUrls";

export default function Profile() {

useEffect(()=>{
    axios.post(API_URLS.PROFILE)
},[])

}