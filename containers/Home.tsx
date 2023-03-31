import { NextPage } from "next";

import { Header } from "@/components/Header";
type HomeProps ={
    setAccessToken (s:string):void
}


export const Home : NextPage<HomeProps> = ({setAccessToken}) =>{
    return (
        <>
            <Header setAccessToken = {setAccessToken}/> 
        </>
    );
}