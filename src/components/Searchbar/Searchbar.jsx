import react from "react";
import SearchIcon from '@mui/icons-material/Search';
import "./Searchbar.css";

export default function Searchbar(props){

    return (
        <div className={"d-inline-flex align-items-center mt-2 w-100 bgc-white searchbar " + props.classNames}>

            <SearchIcon className="align-items-center ms-2 me-3" fontSize="medium" sx={{ color: "rgb(83, 100, 113)" }} />
            <input className="d-flex w-100 bgc-white" type="text" placeholder="Search Twitter" />
            
        </div>
    );
}