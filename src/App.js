import { Button, Input, Stack } from "@mui/material";
import "./App.css";
import ChatGPT from "./openai";
import { useEffect, useState } from "react";
import PromptBox from "./components/promptBox";
import opentype from "opentype.js";
import ConvertTexttoPath from "./components/textToPath/index";
import Nuclear from "./assets/nuclear";
import * as d3 from 'd3'
import PrismSplitSVG from "./components/prism";
import AtomSVG from "./components/atom";
import BalancedScale from "./components/balancedScale"
import Pie from "./components/pie"
import PlantCare from "./components/plant"
import SupistaFeaturesSVG from "./components/supista";

function App() {
  const [search, setSearch] = useState("");
  const [heading, setHeading] = useState(null);

  const SearchChangehandler = (e) => {
    setSearch(e.target.value);
  };

 
  useEffect( () => {
   const fetchData = async () => {
    console.log("fetching....")
    const heading = await ConvertTexttoPath("heading", 325, 40, 20);
    const sub_heading_1 = await ConvertTexttoPath("Practice Mindfllness and Meditation", 300, 390, 20);
    const sub_heading_2 = await ConvertTexttoPath("subheading2", 500, 150, 20);
    const sub_heading_3 = await ConvertTexttoPath("subheading3", 325, 40, 20);
    const sub_heading_4 = await ConvertTexttoPath("subheading4", 325, 40, 20);
    const sub_heading_5 = await ConvertTexttoPath("subheading5", 325, 40, 20);
    const sub_heading_6 = await ConvertTexttoPath("subheading6", 325, 40, 20);

    let svg = document.getElementById("heading");
    svg.setAttribute("d", heading.getAttribute("d"));
    svg.setAttribute("fill", "#ffffff");

    svg = document.getElementById("sub_heading_1");
    svg.setAttribute("d", sub_heading_1.getAttribute("d"));
    svg.setAttribute("fill", "#ffffff");

    svg = document.getElementById("sub_heading_2");
    svg.setAttribute("d", sub_heading_2.getAttribute("d"));
    svg.setAttribute("fill", "#ffffff");

    svg = document.getElementById("sub_heading_3");
    svg.setAttribute("d", sub_heading_3.getAttribute("d"));
    svg.setAttribute("fill", "#ffffff");

    svg = document.getElementById("sub_heading_4");
    svg.setAttribute("d", sub_heading_4.getAttribute("d"));
    svg.setAttribute("fill", "#ffffff");

    svg = document.getElementById("sub_heading_5");
    svg.setAttribute("d", sub_heading_5.getAttribute("d"));
    svg.setAttribute("fill", "#ffffff");
  
    svg = document.getElementById("sub_heading_6");
    svg.setAttribute("d", sub_heading_6.getAttribute("d"));
    svg.setAttribute("fill", "#ffffff");
  

   }
    //fetchData();
  }, []);

  return (
    <>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        <h1 style={{ textrAlign: "center" }}>Welcome to Visio.AI</h1>
        <PromptBox />
        <Pie/>
        <Button onClick={ChatGPT.bind(null, search)}> Call AI</Button>
       
        
        <PlantCare/>
        <SupistaFeaturesSVG/>
       <PrismSplitSVG overallHeading="Supista ERP" incomingHeading="Supista" 
       //outgoingHeading="Desgin" 
       outlineHeadings={["Grid", "User", "Home", "Payment", "Dashboard"]} 
       lines={5}/>
       <AtomSVG iconHeadings={["head1","head1","head1","head1","head1","head1"]}/>
     
        {<Nuclear/>}
      </Stack>
    </>
  );
}

export default App;
